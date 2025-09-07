# 🏠 Properties and Municipalities Management

A full-stack web application for managing property assessments, built using:

- **Frontend:** React + TypeScript + TailwindCSS  
- **Backend:** Python + Django REST Framework  
- **Authentication:** JWT

---

## Installation Instructions

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Immrudul/property-muni-management

2. Create and activate a venv
   ```bash
    python -m venv venv
   
   # On Windows:
   venv\Scripts\activate
   
   # On macOS/Linux:
   source venv/bin/activate

3. Install dependencies

   ```bash
   pip install -r requirements.txt

4. Setup and run backend

   ```bash
   cd backend

   #make migrations
   python manage.py migrate

   #run the backend
   python manage.py runserver

   #create superuser to access admin dashboard
   python manage.py createsuperuser

5. Setup and run frontend
   ```bash
   cd frontend
   npm install
   npm start

## Usage

Head to http://127.0.0.1:8000/api/user/register/ and create a user! You can then login using these credentials.

## Features

- Full-stack application with React frontend and Django backend
- JWT-based authentication for secure login and user management
- User registration and login functionality via API and frontend UI
- Admin dashboard with superuser access for data management
- Import municipalities and properties directly via Django admin using CSV
- Automatically associate properties with the correct municipality
- Create a default "Unknown" municipality for unmatched property imports
- Enforce unique municipality names and property roll numbers
- View municipality details and their associated properties in the frontend
- View property details and its linked municipality
- Cleanly structured frontend using TypeScript and TailwindCSS
- Backend organized into modular Django apps for `user` and `property_assessment`

## Contact

Feel free to contact me about anything!

suresh.mrudul@gmail.com<br>
mrudul.suresh@uwaterloo.ca

Would love to hear any feedback about the project as well!

Happy property managing!

