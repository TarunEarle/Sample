pipeline {
    agent any
    
    environment {
        HUB_ORG = credentials('YourCredentialIdHere')
        SFDC_HOST = 'your-salesforce-instance-url'
        CONNECTED_APP_CONSUMER_KEY = 'your-connected-app-consumer-key'
    }

    stages {
        stage('Checkout Source') {
            steps {
                checkout scm
            }
        }

        stage('Authenticate with Dev Hub') {
            steps {
                script {
                    def authResult = sh(script: "sfdx force:auth:jwt:grant --clientid ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG_USR} --jwtkeyfile path/to/your/server.key --setdefaultdevhubusername --instanceurl ${SFDC_HOST}", returnStatus: true)
                    if (authResult != 0) {
                        error 'Dev Hub authorization failed'
                    }
                }
            }
        }

        stage('Deploy Code') {
            steps {
                script {
                    def deployResult = sh(script: 'sfdx force:source:deploy -p force-app/main/default -u ${HUB_ORG_USR}', returnStatus: true)
                    if (deployResult != 0) {
                        error 'Code deployment failed'
                    }
                }
            }
        }

        stage('Run Apex Tests') {
            steps {
                script {
                    def testResult = sh(script: 'sfdx force:apex:test:run -u ${HUB_ORG_USR}', returnStatus: true)
                    if (testResult != 0) {
                        error 'Apex tests failed'
                    }
                }
            }
        }
    }
}
