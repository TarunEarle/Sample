#!groovy
import groovy.json.JsonSlurperClassic

node {
    def BUILD_NUMBER = env.BUILD_NUMBER
    def RUN_ARTIFACT_DIR = "tests/${BUILD_NUMBER}"
    def SFDC_USERNAME
    def TEST_LEVEL = 'RunLocalTests'
    def HUB_ORG = env.HUB_ORG_DH
    def SFDC_HOST = env.SFDC_HOST_DH
    def JWT_KEY_CRED_ID = env.JWT_CRED_ID_DH
    def CONNECTED_APP_CONSUMER_KEY = '3MVG9pRzvMkjMb6lo8vCHgGoDZiG3_n5oNi.qmWkHF8WhPu3K3nnoum0Pf7F6yjNlAma7ZCTwCih2lTM66ymh'

    println "KEY IS: $JWT_KEY_CRED_ID"
    println "HUB_ORG: $HUB_ORG"
    println "SFDC_HOST: $SFDC_HOST"
    println "CONNECTED_APP_CONSUMER_KEY: $CONNECTED_APP_CONSUMER_KEY"

    def toolbelt = tool 'toolbelt'

    stage('checkout source') {
        checkout scm
    }

    withCredentials([file(credentialsId: JWT_KEY_CRED_ID, variable: 'jwt_key_file')]) {
        stage('Authorize to Dev Org') {
            def cmd = "${toolbelt}/sfdx force:auth:jwt:grant --client-id ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG} --jwt-key-file ${jwt_key_file} --setdefaultdevhubusername --instance-url ${SFDC_HOST}"
            if (isUnix()) {
                sh returnStatus: true, script: cmd
            } else {
                bat returnStatus: true, script: "\"${toolbelt}/sfdx\" $cmd"
            }
            if (rc != 0) { error 'hub org authorization failed' }
        }

        stage('Check Apex Test Coverage') {
            def cmd = "${toolbelt}/sfdx force:source:deploy:report -u ${HUB_ORG} --test-level ${TEST_LEVEL} --code-coverage"
            if (isUnix()) {
                rmsg = sh returnStdout: true, script: cmd
            } else {
                rmsg = bat returnStdout: true, script: "\"${toolbelt}/sfdx\" $cmd"
            }
            def jsonSlurper = new JsonSlurperClassic()
            def report = jsonSlurper.parseText(rmsg)

            if (report.status == 'Succeeded' && report.result.totalCoverage < 75) {
                error "Code coverage (${report.result.totalCoverage}%) does not meet the minimum requirement (75%)."
            } else if (report.status != 'Succeeded') {
                error 'Failed to retrieve code coverage report.'
            }
        }

        stage('Deploy Code') {
            def cmd = "${toolbelt}/sfdx force:source:deploy --manifest manifest/package.xml -u ${HUB_ORG}"
            if (isUnix()) {
                rmsg = sh returnStdout: true, script: cmd
            } else {
                rmsg = bat returnStdout: true, script: "\"${toolbelt}/sfdx\" $cmd"
            }
            echo rmsg
            echo 'Hello from a Job DSL script!'
            echo rmsg
        }
    }
}
