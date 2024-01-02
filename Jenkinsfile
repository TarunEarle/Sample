#!groovy
import groovy.json.JsonSlurperClassic

node {
    def BUILD_NUMBER = env.BUILD_NUMBER
    def RUN_ARTIFACT_DIR = "tests/${BUILD_NUMBER}"
    def HUB_ORG = env.HUB_ORG_DH
    def SFDC_HOST = env.SFDC_HOST_DH
    def JWT_KEY_CRED_ID = env.JWT_CRED_ID_DH
    def CONNECTED_APP_CONSUMER_KEY = '3MVG9pRzvMkjMb6lo8vCHgGoDZiG3_n5oNi.qmWkHF8WhPu3K3nnoum0Pf7F6yjNlAma7ZCTwCih2lTM66ymh'

    echo 'KEY IS'
    echo JWT_KEY_CRED_ID
    echo HUB_ORG
    echo SFDC_HOST
    echo CONNECTED_APP_CONSUMER_KEY

    def toolbelt = tool 'toolbelt'

    stage('checkout source') {
        checkout scm
    }

    withCredentials([file(credentialsId: JWT_KEY_CRED_ID, variable: 'jwt_key_file')]) {
        stage('Authorize to Dev Org') {
            def authCmd = isUnix() ?
                "${toolbelt}/sfdx force:auth:jwt:grant --clientid ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG} --jwtkeyfile ${jwt_key_file} --setdefaultdevhubusername --instanceurl ${SFDC_HOST}" :
                "\"${toolbelt}/sfdx\" force:auth:jwt:grant --clientid ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG} --jwtkeyfile \"${jwt_key_file}\" --setdefaultdevhubusername --instanceurl ${SFDC_HOST}"

            def authResult = sh(script: authCmd, returnStatus: true)
            if (authResult != 0) {
                error 'Hub org authorization failed'
            }
        }

        stage('Check Apex Test Coverage') {
            def coverageCmd = isUnix() ?
                "${toolbelt}/sfdx force:source:deploy:report -u ${HUB_ORG} --testlevel RunLocalTests --code-coverage" :
                "\"${toolbelt}/sfdx\" force:source:deploy:report -u ${HUB_ORG} --testlevel RunLocalTests --code-coverage"

            def coverageResult = sh(script: coverageCmd, returnStatus: true)
            if (coverageResult != 0) {
                error 'Failed to retrieve code coverage report.'
            }
        }

        stage('Deploy Code') {
            def deployCmd = isUnix() ?
                "${toolbelt}/sfdx force:source:deploy --manifest manifest/package.xml -u ${HUB_ORG}" :
                "\"${toolbelt}/sfdx\" force:source:deploy --manifest manifest/package.xml -u ${HUB_ORG}"

            def deployResult = sh(script: deployCmd, returnStatus: true)
            if (deployResult != 0) {
                error 'Failed to deploy code.'
            }
        }
    }
}
