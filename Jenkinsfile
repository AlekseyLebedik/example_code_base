// vim: set syntax=groovy expandtab shiftwidth=4 tabstop=4 softtabstop=4 autoindent smartindent:

def vaultAddr = "https://vault.las.demonware.net:8200"
def vaultCredentialId = "vault-jenkins-approle"
def vaultConfiguration = [engineVersion: 2, vaultUrl: vaultAddr, vaultCredentialId: vaultCredentialId ]

// define the Vault secret path and configure secrets to be assigned to env vars
def vaultSecrets = [
    [
        path: 'secrets/shared/devzone/jenkins', secretValues: [
            [envVar: 'AG_GRID_LICENCE', vaultKey: 'jenkins_ag_grid_licence_key']
        ]
    ]
]

Boolean slackNotificationSent = false
String teamSlackChannel = '#products-devzone-ext'
Boolean deploymentTriggered = false
branchesToNotifyOn = ['master', 'release/*', 'hotfix/*']

pipeline {
    agent { label 'centos7' }
    options {
        buildDiscarder(logRotator(numToKeepStr: '150'))
        timeout(time: 2, unit: 'HOURS')
        timestamps()
    }
    environment {
        DOCKER_TAG = sh(script:'git describe --match "[0-9]*.[0-9]*.r[0-9]*"', returnStdout: true).trim()
    }
    stages {

        stage('Build Base Image') {
            steps {
                sh 'make -f Makefile.testdev image-builder DOCKER_TAG=$DOCKER_TAG'
            }
        }
        stage('Install devzone-core'){
            steps {
                sh 'make -f Makefile.testdev install-devzone-core'
            }
        }
        stage('Static Analysis') {
            parallel {
                stage("linting") {
                    steps {sh 'make -f Makefile.testdev lint'}
                }
                stage( "check-style" ) {
                    steps{sh 'make -f Makefile.testdev check-style'}
                }
                stage('Test Devzone Core') {
                    steps {
                        sh 'make -f Makefile.testdev lint-devzone-core'
                        sh 'make -f Makefile.testdev test-devzone-core'
                    }
                }
                stage('Unit Tests') {
                    steps {
                        sh 'make -f Makefile.testdev test'
                    }
                    post {
                        always {
                            junit 'jest-test-results.xml'
                            publishHTML target: [
                                allowMissing: true,
                                alwaysLinkToLastBuild: false,
                                keepAll: true,
                                reportDir: 'coverage/lcov-report',
                                reportFiles: 'index.html',
                                reportName: 'Code Coverage'
                            ]
                        }
                    }
                }
            }
        }

        stage('Build DZ Frontend Image') {
            steps {
                withVault([configuration: vaultConfiguration, vaultSecrets: vaultSecrets]) {
                    sh "sed -i \"s/process.env.REACT_APP_AG_GRID_LICENSE_KEY/${AG_GRID_LICENCE}/g\" packages/devzone-core/src/config/index.js"
                }
                withVault([configuration: vaultConfiguration, vaultSecrets: vaultSecrets]) {
                    sh 'make -f Makefile.testdev docker AUTH_CLIENT=react DOCKER_TAG=$DOCKER_TAG'
                }
            }
        }

        stage('Publish Image'){
            when {
                anyOf {
                    branch 'master'
                    branch 'release/*'
                    branch 'hotfix/*'
                }
            }
            steps {
                sh 'echo "On ${BRANCH_NAME}, pushing new image."'
                sh 'make -f Makefile.testdev docker-push DOCKER_TAG=$DOCKER_TAG'
            }
        }

        stage('Deploy Frontend QA'){
            when {
                branch 'master'
            }
            steps {
                build(
                    job: 'Devzone/Devzone Deploy/master',
                    propagate: true,
                    parameters: [
                        string(name: 'CLUSTER', value: 'i1.kube.demonware.net'),
                        string(name: 'RELEASE', value: 'devzone-qa'),
                        string(name: 'DEPLOY', value: 'YES'),
                        string(name: 'COMPONENT', value: 'frontend'),
                        string(name: 'TAG', value: env.DOCKER_TAG),
                        string(name: 'NOTIFY_EXTERNAL', value: 'NO')
                    ]
                )
            }
        }
    }

    post {
        success {
            script {
                if (env.BRANCH_NAME == 'master' || env.BRANCH_NAME ==~ /release.*/) {
                    // This is a hack
                    // If the build of the master branch is a success, replace the `currentBuild.description` section
                    // of the Jenkins UI with a `release` button.
                    currentBuild.description = """<b><i>${DOCKER_TAG}</i></b><br/><form method="post" name="parameters" action="/job/Devzone/job/Devzone%20Deploy/job/master/build?delay=0sec">
    <div name="parameter">
      <input name="name" value="CLUSTER" type="hidden">
      <input name="value" value="s1.kube.demonware.net" type="hidden">
    </div>
    <div name="parameter">
      <input name="name" value="RELEASE" type="hidden">
      <input name="value" value="devzone" type="hidden">
    </div>
    <div name="parameter">
      <input name="name" value="DEPLOY" type="hidden">
      <input name="value" value="YES" type="hidden">
    </div>
    <div name="parameter">
      <input name="name" value="COMPONENT" type="hidden">
      <input name="value" value="frontend" type="hidden">
    </div>
    <div name="parameter">
      <input name="name" value="TAG" type="hidden">
      <input name="value" value="${DOCKER_TAG}" type="hidden">
    </div>
    <div name="parameter">
      <input name="name" value="NOTIFY_EXTERNAL" type="hidden">
      <input name="value" value="YES" type="hidden">
    </div>
    <input name="statusCode" value="303" type="hidden">
    <button><b>Release to Prod (frontend)</b></button>
</form>"""
                } else {
                    currentBuild.description = """${DOCKER_TAG}"""
                }
            }
        }
        changed {
            slackBuildReport(teamSlackChannel, ['branches': branchesToNotifyOn])
            script { slackNotificationSent = true }
        }
        unsuccessful {
            script {
                if (!slackNotificationSent) {
                    slackBuildReport(teamSlackChannel, ['branches': branchesToNotifyOn])
                }
            }
        }
        cleanup {
            cleanupAgent()
        }
    }
}
