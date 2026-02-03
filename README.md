# CivicPulse 

**CivicPulse** is a modern civic engagement platform built to bridge the gap between citizens and local government. It allows residents to report infrastructure issues, track resolutions in real-time, and communicate directly with city administrators.

---

##  Features

* **User Authentication:** Secure Sign Up and Login for both **Citizens** and **Admins** using JWT and Bcrypt.
* **Interactive Reporting:** Pinpoint local issues (potholes, waste, lighting) with descriptions and image uploads.
* **Real-time Tracking:** Follow the lifecycle of a report from **Pending** to **Resolved**.
* **Direct Messaging:** A built-in communication channel between citizens and city officials for specific issues.
* **Impact Dashboard:** High-level analytics showing community progress and resolution rates.
* **Modern UI:** A clean, responsive interface built with **Tailwind CSS** and **Vite**.

---

##  Tech Stack

### Frontend

* **React.js** (Vite)
* **Tailwind CSS**
* **React Router DOM**
* **Lucide React** (Icons)

### Backend

* **Node.js** & **Express.js**
* **MongoDB** (via Mongoose)
* **Bcrypt.js** (Password Security)
* **CORS** & **Dotenv**

---

##  Installation

### 1. Clone the repository

```bash
git clone https://github.com/vaishaldsouza/CivicPulse.git
cd CivicPulse

```

### 2. Setup the Backend

```bash
cd server
npm install

```

Create a `.env` file in the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string

```

Start the server:

```bash
npm start

```

### 3. Setup the Frontend

Open a new terminal:

```bash
# From the root directory
npm install
npm run dev

```

---

##  Project Structure

```text
CivicPulse/
├── src/
│   ├── components/
│   │   ├── auth/         # Login, Signup
│   │   ├── Layout/       # Navbar, Footer
│   │   └── Impact.jsx    # Stats component
│   ├── context/          # AuthContext.jsx
│   ├── pages/            # LandingPage, Dashboard, Admin
│   └── App.jsx           # Routes configuration
├── server/
│   ├── config/           # Database connection
│   ├── models/           # User and Issue Schemas
│   ├── routes/           # Auth and Issue API routes
│   └── index.js          # Main entry point
└── package.json

```
