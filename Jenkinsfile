#!groovy

pipeline {
  agent any
  environment {
    AZURE_RESOURCE_GROUP = 'react-webapp-rg'
    WEBAPP_NAME = "react-webapp"
    PACKAGE_NAME = "react-webapp-package.zip"
    REACT_APP_ENVIRONMENT = "Test"
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
        stage('Deploy Build Package') {
      steps {
        script {
          withCredentials([azureServicePrincipal('jenkins-pipeline-sp')]) {
            sh 'az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET -t $AZURE_TENANT_ID'
            // sh 'az account show'
            sh '''
            az webapp deploy --resource-group ${AZURE_RESOURCE_GROUP} \
            --name ${WEBAPP_NAME} --src-path "${WORKSPACE}/${PACKAGE_NAME}"
            '''
            sh '''
            az webapp config set --resource-group ${AZURE_RESOURCE_GROUP} \
            --name ${WEBAPP_NAME} \
            --startup-file "pm2 serve /home/site/wwwroot/ --no-daemon --spa"
            '''
          }
        }
        // azureCLI commands: [[exportVariablesString: '', script: 'az account show']], principalCredentialId: 'jenkins-pipeline-sp'
      }
    }
}
}