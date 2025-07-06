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
