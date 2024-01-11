#!groovy
import groovy.json.JsonSlurperClassic
node {
    def BUILD_NUMBER = env.BUILD_NUMBER
    def RUN_ARTIFACT_DIR = "tests/${BUILD_NUMBER}"
    def SFDC_USERNAME = env.HUB_ORG_DH_PREFERENCE
    def TEST_LEVEL='RunLocalTests'
    //def HUB_ORG = 'preferenceform@sfdx.com'
    //def SFDC_HOST = env.SFDC_HOST_DH
    def SF_INSTANCE_URL = env.SF_INSTANCE_URL ?: "https://login.salesforce.com"
    def JWT_KEY_CRED_ID = env.JWT_CRED_ID_DH
    def CONNECTED_APP_CONSUMER_KEY = env.CONNECTED_APP_CONSUMER_KEY_DH_PREFERENCE
    println 'KEY IS' 
    println JWT_KEY_CRED_ID
    println SFDC_USERNAME
    println SF_INSTANCE_URL
    println CONNECTED_APP_CONSUMER_KEY
    def toolbelt = tool 'toolbelt'
    stage('checkout source') {
        //When running in multi-branch job, one must issue this command
        checkout scm
    }
     withEnv(["HOME=${env.WORKSPACE}"]) {
        
        withCredentials([file(credentialsId: SERVER_KEY_CREDENTALS_ID, variable: 'server_key_file')]) {

            // -------------------------------------------------------------------------
            // Authorize the Dev Hub org with JWT key and give it an alias.
            // -------------------------------------------------------------------------

            stage('Authorize DevHub') {
                rc = command "${toolbelt}/sf org login jwt --instance-url ${SF_INSTANCE_URL} --client-id ${SF_CONSUMER_KEY} --username ${SF_USERNAME} --jwt-key-file ${server_key_file} --set-default-dev-hub --alias HubOrg"
                if (rc != 0) {
                    error 'Salesforce dev hub org authorization failed.'
                }
            }
        }
     
    /*withCredentials([file(credentialsId: JWT_KEY_CRED_ID, variable: 'jwt_key_file')]) {
        stage('Authorize to Dev Org') {
            if (isUnix()) {
                rc = sh returnStatus: true, script: "${toolbelt}/sfdx force:auth:jwt:grant --client-id ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG} --jwt-key-file ${jwt_key_file} --set-default-dev-hub --instance-url ${SFDC_HOST}"
            } else {
                rc = bat returnStatus: true, script: "\"${toolbelt}/sfdx\" force:auth:jwt:grant --client-id ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG} --jwt-key-file \"${jwt_key_file}\" --set-default-dev-hub --instance-url ${SFDC_HOST}"
            }
            if (rc != 0) { error 'hub org authorization failed' }
        }
       stage('Check Apex Test Coverage') {
            if (isUnix()) {
                rmsg = sh returnStdout: true, script: "${toolbelt}/sfdx force:source:deploy:report -u ${HUB_ORG} --test-level ${TEST_LEVEL} --code-coverage"
            } else {
                rmsg = bat returnStdout: true, script: "\"${toolbelt}/sfdx\" force:source:deploy:report -u ${HUB_ORG} --test-level ${TEST_LEVEL} --code-coverage"
            }
            def jsonSlurper = new JsonSlurperClassic()
            def report = jsonSlurper.parseText(rmsg)

            if (report.status == 'Succeeded') {
                if (report.result.totalCoverage < 75) {
                    error "Code coverage (${report.result.totalCoverage}%) does not meet the minimum requirement (75%)."
                }
            } else {
                error 'Failed to retrieve code coverage report.'
            }
        }*/
        stage('Deploy Code') {
            // need to pull out assigned username

            if (isUnix()) {
                rmsg = sh returnStdout: true, script: "${toolbelt}/sfdx force:source:deploy --manifest manifest/package.xml -u ${HUB_ORG}"
            } else {
                rmsg = bat returnStdout: true, script: "\"${toolbelt}/sfdx\" force:source:deploy --manifest manifest/package.xml -u ${HUB_ORG}"
            }			  
       printf rmsg
            println('Hello from a Job DSL script!')
            println(rmsg)
        }
    }
}
