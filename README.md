#  Hospital Patient Management System

##  Project Overview

This is a full-stack Hospital Patient Management System developed using HTML, CSS, JavaScript (Frontend) and Node.js, Express, MongoDB (Backend).

The system allows patients to:

 Register and login
 Book doctor appointments
 View, edit, and cancel appointments
 Check real-time slot availability
 Prevent booking when slots are full



##  Key Features

###  Authentication

 User registration & login
 Session-based authentication
 Logout functionality
 Navbar updates dynamically with username

###  Appointment System

 Book appointments with doctors
 Fixed time slots per doctor
 Prevent overbooking
 Dynamic slot availability
 Disable fully booked dates
 Edit & cancel appointments

###  Doctor Management

 Doctors stored in MongoDB
 Slots assigned per doctor
 Auto-seeded on server start

###  Other Features

 Contact form
 Google Maps integration (Birmingham, UK)
 Clean responsive UI



##  Technologies Used

### Frontend

 HTML5
 CSS3
 JavaScript (Vanilla JS)
 Fetch API

### Backend

 Node.js
 Express.js
 MongoDB
 Mongoose
 express-session
 CORS



##  Project Structure

```
project/
│── frontend/
│   │── index.html
│   │── login.html
│   │── register.html
│   │── appointment.html
│   │── myappointments.html
│   │── contact.html
│   │── style.css
│   │── script.js
│   │── images/
│
│── backend/
│   │── models/
│   │── controllers/
│   │── routes/
│   │── middleware/
│   │── server.js
│   │── package.json
│
│── README.md
```



##  How to Run the Project (Step-by-Step)

### 🔹 Step 1: Install Node.js

Download and install:
 https://nodejs.org



### 🔹 Step 2: Install MongoDB

Download MongoDB:
 https://www.mongodb.com/try/download/community

Start MongoDB server:

```
mongod
```



### 🔹 Step 3: Setup Backend

1. Open terminal in `backend` folder
2. Install dependencies:

```
npm install
```

3. Start server:

```
node server.js
```


 You should see:

```
MongoDB Connected
Server running on port 5000
```



### 🔹 Step 4: Run Frontend

#### Option A (Recommended)

 Open project in VS Code
 Install Live Server extension
 Right click `index.html`
 Click Open with Live Server



##  Important Configuration

Frontend runs on:

```
http://127.0.0.1:5500
```

Backend runs on:

```
http://127.0.0.1:5000
```

Make sure both are running simultaneously.



##  How the System Works

1. User logs in → session created
2. User selects doctor & date
3. Backend checks:

    Available slots
    Already booked appointments
4. Only free slots are shown
5. Booking is saved in MongoDB
6. Slots automatically update



##  Database Collections

 Users
 Doctors
 Appointments


Final structure:

```
project.zip
│── frontend/
│── backend/
│── README.md
```



##  Author

Developed by Anwar007



##  Final Note

This project demonstrates:

 Full-stack development
 API integration
 Session management
 Real-world booking system logic

 Ready for submission
