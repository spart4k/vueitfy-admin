// pipeline {
//     agent any
//     environment {
//         COMPOSE_PROJECT_NAME = crm-front
//     }
//     stage('Get code from GitHub') { 
//       // Get code from a GitHub repository
//       git 'http://10.63.1.177/front/crm-front.git'
//    }
//     stage('Deploy Images with Docker-Compose') {
//         build 'EventDrivenPlatform-Dev-Deploy'
//    }
//     post {
//         always {
//             sh "docker-compose down -v"
//         }
//     }
// }
pipeline {{
    agent any
 
    options {{
        skipDefaultCheckout(true)(true)
    }}
 
    // stages {{
    //     stage('Checkout SCM') {('Checkout SCM') {
    //         steps {{
    //             echo '> Checking out the source control ...''> Checking out the source control ...'
    //             checkout scm
    //         }}
    //     }}
        stage('CD') {('cd') {
            steps {{
                echo '> cd /home/god/crm-front'
                sh 'cd /home/god/crm-front'
            }}
        }}
        stage('Git Pull') {('Git Pull') {
            steps {{
                echo '> Pulling the code from GitHub repository ...''> Pulling the code from GitHub repository ...'
                sh 'git pull'
            }}
        }}
        stage('Docker Up') {('Docker Up') {
            steps {{
                echo '> Building the docker containers ...''> Building the docker containers ...'
                sh 'docker compose up --build'
            }}
        }}
        // stage('Composer Install') {('Composer Install') {
        //     steps {{
        //         echo '> Building the application within the container ...''> Building the application within the container ...'
        //         sh 'cd docker && cd ci && make composer''cd docker && cd ci && make composer'
        //     }}
        // }}
        // stage('Test') {('Test') {
        //     steps {{
        //         echo '> Running the application tests ...''> Running the application tests ...'
        //         sh 'cd docker && cd ci && make test''cd docker && cd ci && make test'
        //     }}
        }}
    }}
}