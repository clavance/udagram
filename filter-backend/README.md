# Image Filtering Microservice

### Instructions

1. Clone this repo, then from terminal run `npm i` to install project dependencies.
2. Run the development server with `npm run dev`, server runs on `localhost:8082`.
3. Send a GET request to the URL with a publicly accessible valid image URL:
```bash
//try GET http://localhost:{{PORT}}/filteredimage?image_url={{VALID_IMAGE_URL}}
//eg. GET http://localhost:8082/filteredimage?image_url=https://s3.cointelegraph.com/storage/uploads/view/bad02e8b57a64d349aa5eec318298b4b.png
```
The service should return a filtered version of the original image.

### AWS Elastic Beanstalk

This microservice is hosted using AWS Elastic Beanstalk, at [this endpoint](http://image-filter-dev22.us-east-1.elasticbeanstalk.com/). Call it with the same steps as above, eg: [this link](http://image-filter-dev22.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://s3.cointelegraph.com/storage/uploads/view/bad02e8b57a64d349aa5eec318298b4b.png).


