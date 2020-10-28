pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([$class: 'GitSCM',
        branches: [[name: GIT_BUILD_REF]],
        userRemoteConfigs: [[
          url: GIT_REPO_URL,
          credentialsId: CREDENTIALS_ID
        ]]])
      }
    }
    stage('构建镜像并推送到 CODING Docker 制品库') {
      steps {
        script {
          docker.withRegistry(
            "${CCI_CURRENT_WEB_PROTOCOL}://${CODING_DOCKER_REG_HOST}",
            "${CODING_ARTIFACTS_CREDENTIALS_ID}"
          ) {
            def dockerImage = docker.build("${CODING_DOCKER_IMAGE_NAME}", "-f ${DOCKERFILE_PATH} ${DOCKER_BUILD_CONTEXT}")
            dockerImage.push("${DOCKER_IMAGE_VERSION}")
            dockerImage.push("latest")
          }
        }

      }
    }
    stage("部署镜像") {
      steps {
        script {
           sh "curl -d '{\"secret_key\":\"${DEPLOY_SECRET}\"}' -H \"Content-type: application/json\" -X POST ${DEPLOY_API}"
        }
      }
    }
  }
  environment {
    CODING_DOCKER_REG_HOST = "${CCI_CURRENT_TEAM}-docker.pkg.${CCI_CURRENT_DOMAIN}"
    CODING_DOCKER_IMAGE_NAME = "${PROJECT_NAME.toLowerCase()}/${DOCKER_REPO_NAME}/${DOCKER_IMAGE_NAME}"
    DEPLOY_API = "http://39.103.176.179:7070/console/custom/deploy/1762e9b04739b81b4a2095b28359c9f6"
    DEPLOY_SECRET = "gPj7L1nF"
  }
}
