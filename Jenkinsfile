pipeline {
    agent any
    environment {
        NODE_ENV = 'test'
    }
    triggers {
        cron('H H/2 * * *')
    }
    tools {
        git '2.24.3'
        nodejs 'v23.7.0'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Prepare .env from credentials') {
            steps {
                withCredentials([file(credentialsId: 'ENV_FILE', variable: 'ENV_FILE_PATH')]) {
                    sh 'cp "$ENV_FILE_PATH" .env'
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Archive Results') {
            when {
                expression { fileExists('reports') }
            }
            steps {
                archiveArtifacts artifacts: 'reports/**/*.*', fingerprint: true
            }
        }
    }
    post {
        always {
            junit 'reports/**/*.xml'
            cleanWs()
        }
    }
}