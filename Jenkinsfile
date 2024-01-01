pipeline {
    agent any

    environment {
        HUB_ORG = env.HUB_ORG_DH
        CONNECTED_APP_CONSUMER_KEY = '3MVG9pRzvMkjMb6lo8vCHgGoDZiG3_n5oNi.qmWkHF8WhPu3K3nnoum0Pf7F6yjNlAma7ZCTwCih2lTM66ymh'
        SFDC_HOST = env.SFDC_HOST_DH
        TOOLBELT = tool 'toolbelt'
    }

    stages {
        stage('Checkout Source') {
            steps {
                checkout scm
            }
        }

        stage('Authorize Hub Org') {
            steps {
                script {
                    sh '''
                        ${TOOLBELT}/sfdx force:auth:jwt:grant
                        --clientid ${CONNECTED_APP_CONSUMER_KEY}
                        --username assignment@vamritech.com
                        --jwtkeyfile ${HUB_ORG}
                        --setdefaultdevhubusername
                        --instanceurl ${SFDC_HOST}
                    '''
                }
            }
        }
        
        stage('Run Apex Tests') {
            steps {
                script {
                    sh "${TOOLBELT}/sfdx force:apex:test:run -u ${HUB_ORG_USR}"
                }
            }
        }
        
        stage('Deploy Code') {
            steps {
                script {
                    sh "${TOOLBELT}/sfdx force:source:deploy --manifest manifest/package.xml -u ${HUB_ORG_USR}"
                }
            }
        }

        
    }
}
