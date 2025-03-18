This project uses a React + Typescript + TailwindCSS frontend and a Python (Django) backend.

To setup the project, fork and clone the repository on your local machine. Set up a virtual environment based on your OS (Windows or Mac). Activate the virtual environment and make sure you have pip installed. 
Then run "pip install -r requirements.txt". This will install all the required requirements for the project.

Next, navigate to the front end directory by running "cd .\frontend\" and run "npm i" to install all the required packages.
Then start the front end by running "npm start"

Open a new terminal while the old one sitll runs and navigate into the backend by running "cd .\backend\". Run "python manage.py migrate" to provision a database.
Then run "python manage.py runserver" to run the backend server.

To create a user that you can log in with, head to http://127.0.0.1:8000/api/user/register/ and create a user with your username and password. 

Now you can use this user to log in through the front end.

To add import municipalities and then properties (yes, ensure that order), you need to create a superuser in django by running "python manage.py createsuperuser" and following the instructions in the terminal.

Then login to the admin dashboard on "http://localhost:8000/admin/" and head to the correct model you want to import. Then import municipalities and then properties by following the instructions. 

Now you're good to go and can do whatever you'd like!

In the file structure, there is a backend folder and a frontend folder. 

In the backend, there is an app for the user called "api" and an app for the property assessment called "property_assessment". These contain their respective serializers, views, models, etc.

In the frontend, /src contains all of the main code and there are specific pages.tsx files for each page. 

Key decisions and implementations
- JWT authentication to ensure secure user auth.
- For the municipal model:    
municipal_rate = models.DecimalField(max_digits=9, decimal_places=8)
education_rate = models.DecimalField(max_digits=9, decimal_places=8)
based on understanding the given data.
- For the property model:
assessment_value = models.IntegerField()
based on understanding the given data.
- No duplicate municipality names
- No duplicate assessment role number for properties
- If a property is linked to a municipality that doesn't exist, it generates an "Unknown" name municipality
- importing directly from csv into django db from admin dashboard
- associate properties with their correct municipality
- listing the details of municipalities
  + the properties that are associated with it
- listing the details of properties
  + the municipality it is associated with


