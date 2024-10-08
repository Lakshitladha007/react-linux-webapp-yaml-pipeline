#!groovy

pipeline {
  agent any
  environment {
    AZURE_RESOURCE_GROUP = 'react-webapp-rg'
    WEBAPP_NAME = "react-webapp"
    PACKAGE_NAME = "react-webapp-package.zip"
    REACT_APP_ENVIRONMENT = "Dev"
  }
    stages {
    stage('Workspace Cleanup') {
      steps {
        // Clean before build
        cleanWs()
        echo 'cleaning workspace...'
      }
    }
        stage('Checkout Git Branch') {
      steps {
        git branch: 'master', credentialsId: 'github-credentials', url: 'https://github.com/vprasadreddy/react-linux-webapp-yaml-pipeline.git'
      }
    }
        stage('Package Application') {
      steps {
        script {
            sh "npm install && npm run build --if-present"
          /* Zip all contents inside code folder, excluding the root folder(code folder itself).*/
          sh "cd build && zip -r ../${PACKAGE_NAME} ./*"
          // Print the contents of the current directory to verify the zip
          sh "zipinfo ${PACKAGE_NAME}"
        }
      }
    }
}
}