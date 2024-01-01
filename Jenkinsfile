#!groovy
import groovy.json.JsonSlurperClassic

node {
    def BUILD_NUMBER = env.BUILD_NUMBER
    def SFDC_USERNAME

    def HUB_ORG = env.HUB_ORG_DH
    def SFDC_HOST = env.SFDC_HOST_DH
    def JWT_KEY_CRED_ID = env.JWT_CRED_ID_DH
    def CONNECTED_APP_CONSUMER_KEY = '3MVG9pRzvMkjMb6lo8vCHgGoDZiG3_n5oNi.qmWkHF8WhPu3K3nnoum0Pf7F6yjNlAma7ZCTwCih2lTM66ymh'

    def toolbelt = tool 'toolbelt'

    stage('checkout source') {
        checkout scm
    }

    withCredentials([file(credentialsId: JWT_KEY_CRED_ID, variable: 'jwt_key_file')]) {
        stage('Deploy Code') {
            script {
                def authCmd
                if (isUnix()) {
                    authCmd = "${toolbelt}/sfdx force:auth:jwt:grant --client-id ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG} --jwt-key-file ${jwt_key_file} --setdefaultdevhubusername --instanceurl ${SFDC_HOST}"
                } else {
                    authCmd = "\"${toolbelt}/sfdx\" force:auth:jwt:grant --client-id ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG} --jwt-key-file \"${jwt_key_file}\" --setdefaultdevhubusername --instanceurl ${SFDC_HOST}"
                }

                def rc = sh(script: authCmd, returnStatus: true)
                if (rc != 0) { 
                    error 'Hub org authorization failed' 
                }

                // Need to pull out the assigned username
                def assignedUsername = sh(script: "${toolbelt}/sfdx force:user:display -u ${HUB_ORG} --json", returnStdout: true).trim()
                SFDC_USERNAME = new JsonSlurperClassic().parseText(assignedUsername).result.username

                if (isUnix()) {
                    stage('Run Apex Tests') {
                        sh "sfdx force:apex:test:run -u ${SFDC_USERNAME}"
                    }
                } else {
                    bat "\"${toolbelt}/sfdx\" force:apex:test:run -u ${SFDC_USERNAME}"
                }
            }
        }
    }
}
