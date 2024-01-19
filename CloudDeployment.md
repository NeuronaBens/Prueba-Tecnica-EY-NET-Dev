# ASP .NET Core Web API Deployment Guide

1. Build the ASP.NET Core API:

```bash
dotnet publish -c Release
```

2. Create an AWS Elastic Beanstalk Application:

```bash
aws elasticbeanstalk create-application --application-name SupplirDueDilligenceAPI
```

3. Create an Elastic Beanstalk Environment:

```bash
aws elasticbeanstalk create-environment --application-name SupplirDueDilligenceAPI --environment-name SupplirDueDilligenceAPI-env --solution-stack-name "64bit Amazon Linux 2 v5.7.0"
```

4. Deploy the ASP.NET Core API to Elastic Beanstalk:

```bash
cd bin/Release/netcoreapp3.1/publish
zip -r SupplirDueDilligenceAPI.zip .
aws elasticbeanstalk create-application-version --application-name SupplirDueDilligenceAPI --version-label v1 --source-bundle S3Bucket=your-s3-bucket-name,S3Key=SupplirDueDilligenceAPI.zip
```

5. Update the Elastic Beanstalk Environment:

```bash
aws elasticbeanstalk update-environment --environment-name SupplirDueDilligenceAPI-env --version-label v1
```

6. Monitor Deployment:

Monitor the deployment progress using the Elastic Beanstalk console or AWS CLI until the environment status is `Ready`.

7. Access the API:

Once the deployment is complete, access the API using the Elastic Beanstalk environment URL provided in the AWS Management Console.


# Angular SPA Deployment Guide
1. Build the Angular SPA:

```bash
ng build --prod
```

2. Create an AWS S3 Bucket for Hosting:

```bash
aws s3api create-bucket --bucket supplir-due-dilligence-spa-bucket --region your-preferred-region
```

3. Copy the Angular SPA files to S3:

```bash
aws s3 cp dist/SupplirDueDilligenceSPA s3://supplir-due-dilligence-spa-bucket/ --recursive
```

4. Configure S3 Bucket for Website Hosting:

```bash
aws s3 website s3://supplir-due-dilligence-spa-bucket/ --index-document index.html --error-document index.html
```

5. Create an AWS CloudFront Distribution:

```bash
aws cloudfront create-distribution --origin-domain-name supplir-due-dilligence-spa-bucket.s3.amazonaws.com
```

6. Monitor CloudFront Distribution:

Monitor the CloudFront distribution creation using the AWS Management Console or AWS CLI until the distribution status is `Deployed`.

7. Access the Angular SPA:

Once the CloudFront distribution is deployed, access the Angular SPA using the provided CloudFront URL.
