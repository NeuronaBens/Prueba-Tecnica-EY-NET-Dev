# ASP .NET Core Web API Deployment Guide

1. **Prepare the ASP.NET Core API:**
   - Ensure the ASP.NET Core API is ready for deployment.

2. **Set Up AWS Elastic Beanstalk:**
   - Create a new Elastic Beanstalk application for the API.
   - Establish an environment within Elastic Beanstalk to host the API.
     - If you are using the AWS Visual Studio integration just click publish on the project options and set the configurations (Profile, Region, Secret Credentials, Enviroment, Url, Instance type based on application requirements).
     - Finally, click deploy, and there you have it.
     - You can access the AWS Console to view health checks, running version, platform, event logs, etc. 

3. **Deploy the API:**
   - Use commands to package and deploy the API to Elastic Beanstalk.

4. **Access the API:**
   - Once deployed, you can use the provided Elastic Beanstalk URL to access the API.

# Angular SPA Deployment Guide

1. **Build the Angular SPA:**
   - Build the Angular Single Page Application (SPA) for deployment.

2. **Set Up AWS S3 Bucket:**
   - Create an S3 bucket on AWS to host the SPA.
   - Copy the Angular SPA files to the S3 bucket.

3. **Configure S3 for Hosting:**
   - Configure the S3 bucket to host the SPA as a website.

4. **Access the Angular SPA:**
   - Access the Angular SPA by navigating to the provided S3 bucket website endpoint.
  
[Step-by-Step Guide: Hosting Your Angular Application on AWS S3](https://aws.plainenglish.io/step-by-step-guide-hosting-your-angular-application-on-aws-s3-673414dd00ef)
