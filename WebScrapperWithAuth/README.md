# Web Scraping for High Risk Lists Search App README

This document provides instructions on how to run, test, and deploy the application.

## How to Run the Flask App in Debug Mode

1. Ensure you have Python installed on your machine.
2. Install the required dependencies using the following command:
   ```
   pip install -r requirements.txt
   ```
3. Run the app in debug mode:
   ```
   flask run
   ```
   The app will be accessible at `http://127.0.0.1:5000/`.

## Testing the Flask App using Postman

1. Open Postman and create a new request.

2. proceed to do a POST request to http://127.0.0.1:5000/register with form data including your wanted username and password.

3. Go to Authorization, select Basic Auth and enter your newly created username and password.

4. Then, proceed to do a POST request to http://127.0.0.1:5000/login

5. Set the request method (GET) and enter the API endpoint for the web scraping operation, http://127.0.0.1:5000/get-scrape?entity=peru

6. Don't remember to set the entity to the wanted company name, country, or related leak; the previous example shows Peru as entity.

7. Click "Send" to make the request and view the response, that should be the count of entries and list of entries for the search.

## How to Disable Debug Mode

1. Open the `app.py` file.

2. Locate the line that sets the debug mode:

   ```python
   app.run(debug=True)
   ```

3. Change it to:

   ```python
   app.run(debug=False)
   ```

4. Save the file.

Now, the app will run without debug mode.

## How to Host the Flask App on AWS

2. Set up an EC2 instance with the necessary security groups and key pairs.

3. Connect to your EC2 instance using SSH.

4. Install required dependencies on the instance.

5. Transfer the application files to the instance.

6. Configure the web server (e.g., Nginx or Apache) to serve the Flask app.

7. Run the Flask app on the configured web server.

8. Access your Flask app using the public IP or domain associated with the AWS instance.
