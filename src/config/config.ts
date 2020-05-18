export const config = {
  "dev": {
    "username": process.env.AWS_PGUSERNAME,
    "password": process.env.AWS_PGPASSWORD,
    "database": process.env.AWS_PGDATABASE,
    "host": process.env.AWS_PGHOST,
    "dialect": "postgres",
    "aws_region": process.env.AWS_REGION,
    "aws_profile": "default",
    "aws_media_bucket": process.env.AWS_MEDIA_BUCKET,
    "jwt_secret": "hello"
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}
