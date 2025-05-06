{
  "family": "rapmap-task",
  "networkMode": "awsvpc",
  "executionRoleArn": "arn:aws:iam::723326838091:role/rapmap-execution-role",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "rapmap",
      "image": "723326838091.dkr.ecr.us-east-1.amazonaws.com/rapmap-cloud-ecr:__VERSION__",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 80,
          "hostPort": 80
        }
      ]
    }
  ]
}