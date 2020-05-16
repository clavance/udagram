export const config = {
  "dev": {
    "username": process.env.AWS_PGUSERNAME,
    "password": process.env.AWS_PGPASSWORD,
    "database": process.env.AWS_PGDATABASE,
    "host": process.env.AWS_PGHOST,
    "dialect": "postgres",
    "aws_region": "us-east-1",
    "aws_profile": "default",
    "aws_media_bucket": process.env.AWS_MEDIA_BUCKET
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}
