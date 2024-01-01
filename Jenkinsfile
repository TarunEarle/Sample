#!groovy

import groovy.json.JsonSlurperClassic

node {
    def BUILD_NUMBER = env.BUILD_NUMBER
    def RUN_ARTIFACT_DIR = "tests/${BUILD_NUMBER}"
    def SFDC_USERNAME

    def HUB_ORG = env.HUB_ORG_DH
    def SFDC_HOST = env.SFDC_HOST_DH
    def JWT_KEY_CRED_ID = env.JWT_CRED_ID_DH
    def CONNECTED_APP_CONSUMER_KEY = '3MVG9pRzvMkjMb6lo8vCHgGoDZiG3_n5oNi.qmWkHF8WhPu3K3nnoum0Pf7F6yjNlAma7ZCTwCih2lTM66ymh'
    println 'KEY IS'
    println JWT_KEY_CRED_ID
    println HUB_ORG
    println SFDC_HOST
    println CONNECTED_APP_CONSUMER_KEY

    def toolbelt = tool 'toolbelt'

    stage('Checkout source') {
        checkout scm
    }

    withCredentials([file(credentialsId: JWT_KEY_CRED_ID, variable: 'jwt_key_file')]) {
        stage('Deploy Code') {
            if (isUnix()) {
                rc = sh returnStatus: true, script: "${toolbelt}/sfdx force:auth:jwt:grant --client-id ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG} --jwt-key-file ${jwt_key_file} --setdefaultdevhubusername --instanceurl ${SFDC_HOST}"
            } else {
                rc = bat returnStatus: true, script: "\"${toolbelt}/sfdx\" force:auth:jwt:grant --client-id ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG} --jwt-key-file \"${jwt_key_file}\" --setdefaultdevhubusername --instanceurl ${SFDC_HOST}"
            }
            
            if (rc != 0) { 
                error 'Hub org authorization failed' 
            }

            // Run Apex tests
            stage('Run Apex Tests') {
                steps {
                    script {
                        sh "sfdx force:apex:test:run -u ${HUB_ORG}"
                    }
                }
            }

            // Deploy source code
            def deployCommand = isUnix() ? "sfdx force:source:deploy --manifest manifest/package.xml -u ${HUB_ORG}" : "\"${toolbelt}/sfdx\" force:source:deploy --manifest manifest/package.xml -u ${HUB_ORG}"
            
            def deploymentResult = sh script: deployCommand, returnStatus: true

            if (deploymentResult != 0) {
                error 'Source code deployment failed'
            }

            println 'Source code deployed successfully!'
        }
    }
}
