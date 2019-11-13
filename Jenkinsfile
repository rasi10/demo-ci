pipeline{
    agent any
    stages{
        stage('Checkout'){
            steps{
                checkout scm
            }
        }          
        //Building the web-app
        stage('Build web-app'){
            steps{
                sh 'mvn -f /home/robot/.jenkins/workspace/demo-ci/hoteljsf clean install'
            }
        }
         //Building the web-service
        stage('Build web-service'){
            steps{
                sh 'mvn -f /home/robot/.jenkins/workspace/demo-ci/hotel-restfull clean install'
            }
        }
        //Deploy the artifacts on glassfish
        stage('Deploy artifacts'){
            steps{
                sh 'asadmin deploy --force=true /home/robot/.jenkins/workspace/demo-ci/hotel-restfull/target/hotel-rest.war'
                sh 'asadmin deploy --force=true /home/robot/.jenkins/workspace/demo-ci/hoteljsf/target/hotel.war'
            }
        }
	    
        //Clean database
        stage('Clean database'){
            steps{
               sh 'psql -h localhost -U postgres hotel -f /home/robot/.jenkins/workspace/demo-ci/hoteljsf/database-backup.sql'
            }
        }
        
        //Run frontent tests 
        stage('Run front-end tests'){
            steps{
               sh 'cd /home/robot/.jenkins/workspace/demo-ci/lecture-frontend/ && npm install && npm run cypress:run' 
            }
        }
        
        //Run backend tests 
        stage('Run Backend tests'){
            steps{
               sh 'cd /home/robot/.jenkins/workspace/demo-ci/lecture-backend/ && npm install && npm run cypress:run' 
            }
        }
    } 
    
    //post actions
    post { 
        always { 
                //Saving the artifacts
		archiveArtifacts '**/**.war'
                archiveArtifacts '**/**.mp4'
		
		publishHTML([allowMissing: false, 
                    alwaysLinkToLastBuild: false, 
                    keepAll: false, 
                    reportDir: '/home/robot/.jenkins/workspace/demo-ci/lecture-frontend/mochawesome-report', 
                    reportFiles: 'mochawesome.html', 
                    reportName: 'Front-end tests report', 
                    reportTitles: ''
                ])
		
		publishHTML([allowMissing: false, 
                    alwaysLinkToLastBuild: false, 
                    keepAll: false, 
                    reportDir: '/home/robot/.jenkins/workspace/demo-ci/lecture-backend/mochawesome-report', 
                    reportFiles: 'mochawesome.html', 
                    reportName: 'Backend tests report', 
                    reportTitles: ''
                ])
	}           
    }   
    
}
