pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'NodeJS 18', type: 'nodejs'  // Ensure Jenkins has NodeJS set up
        PATH = "${NODE_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'develop', url: 'https://github.com/hanzel-sc/blog-frontend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    rm -rf ~/deployed-frontend/*
                    cp -r build/* ~/deployed-frontend/
                '''
            }
        }
    }
}
