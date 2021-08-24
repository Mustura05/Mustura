pipeline {
  agent any
 
  options {
        timeout(time: 1, unit: 'HOURS')
    }
 
  stages {
    stage('Source') {
      steps {
        echo 'Pulling from GitHub'
      }
    }
   
    stage('Build') {
      steps {
        echo '********STARTING BUILD STAGE*******'
        echo '***********************************'
        sh '''
        cd auth
        docker build -t 7744149944/auth:01 .
        cd ../user
        docker build -t 7744149944/user:01 .
        cd ../task
        docker build -t 7744149944/task:01 .
        cd ../attendance
        docker build -t 7744149944/attendance:01 .
        cd ../delivery
        docker build -t 7744149944/delivery:01 .
        cd ../admin
        docker build -t 7744149944/admin:01 .
        '''
        echo '***** DOCKER HUB *****'
        withCredentials([usernamePassword(credentialsId: 'DockerHubC', passwordVariable: 'DHPASS', usernameVariable: 'DHUSER')]) {
          sh "docker login -u ${DHUSER} -p ${DHPASS}"
        }
        echo '***** PUSHING IMAGES TO DOCKER HUB *****'
        sh '''
        docker push 7744149944/auth:01
        docker push 7744149944/user:01
        docker push 7744149944/task:01
        docker push 7744149944/attendance:01
        docker push 7744149944/delivery:01
        docker push 7744149944/admin:01
        '''
      }
    }
   
    stage('Deploy_To_TestServer') {
      steps {
        echo '***** DEPLOYING TO TEST SERVER *****'
        withCredentials([string(credentialsId: 'SERVERPASS', variable: 'SERVERPASS')])    {
          sh "sshpass -p ${SERVERPASS} ssh -o StrictHostKeyChecking=no ubuntu@18.216.192.85 'docker-compose down && docker-compose up -d'"
        }
        echo '***** DEPLOYMENT IS DONE FOR TEST SERVER *****'
      }
    }
