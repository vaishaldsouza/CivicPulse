# CivicPulse
> A civic-tech platform for transparent, location-based issue reporting and resolution.

**CivicPulse** is a modern, community-driven platform designed to empower citizens to report, track, and resolve civic issues in their neighborhoods. By bridging the gap between the community and local authorities, CivicPulse ensures transparency and real-time action on infrastructure and public amenity concerns.

## Why CivicPulse?

Many civic issues go unreported or unresolved due to lack of visibility and accountability.  
CivicPulse provides a transparent, map-based platform that empowers citizens and enables authorities to act efficiently on real community problems.




## Key Features 

*   **Real-time Dashboard:** Visualize community issues on an interactive map and activity feed.
*   **Report Issues:** Users can pin exact locations on a map to report problems like potholes, streetlights, or sanitation issues.
*   **Location Specificity:** Automatically fetches and displays precise addresses using Reverse Geocoding.
*   **Admin Console:** Authorities can view, prioritize, and update the status of reported issues (Open -> In Progress -> Resolved).
*   **Live Updates:** Status changes are reflected instantly across the platform.

## Technology Stack

*   **Frontend:** React (Vite), Tailwind CSS, React Leaflet (Maps)
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (Mongoose ODM)
*   **API:** RESTful Architecture, OpenStreetMap Nominatim (Geocoding)

## Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas


## Installation & Setup

Follow these steps to get the project running locally.

### Prerequisites
*   Node.js (v16+)
*   MongoDB Atlas URI (or local MongoDB)

### 1. Backend Setup (Server)

Navigate to the `server` directory and install dependencies:

```bash
cd server
npm install
```



Start the backend server:
```bash
npm run dev
```


### 2. Frontend Setup (Client)

Open a new terminal, navigate to the root directory (if not already there), and install dependencies:

```bash
cd ..
npm install
```

Start the frontend development server:
```bash
npm run dev
```


## Verification Criteria

To verify the application functionalities:

### 1. Reporting an Issue
*   Go to "Report Issue".
*   Click anywhere on the map.
*   **Verify:** The "Location" field updates with a specific address (e.g., "Main St, Mangaluru") instead of just coordinates.
*   Fill in details and submit.

### 2. Community Dashboard
*   Go to the Home/Dashboard page.
*   **Verify:** The new issue appears on the Map as a pin.
*   **Verify:** The issue appears in "What's Happening Now?" with the correct **Date** (e.g., Oct 24, 2026) and **Time**.

### 3. Admin Management
*   Navigate to the Admin Dashboard (Login required if auth enabled).
*   Change the status of an issue (e.g., Open -> Resolved).
*   **Verify:** The status persists after refreshing the page.
*   **Verify:** The status update is reflected on the Community details.

## Default Credentials 

*   **Admin Email:** `admin@civicpulse.com`
*   **Password:** `admin123`

## Screenshots
![Login](/public/assets/login.png)
![Report Issues](/public/assets/reportissues.png)
![Community](/public/assets/community.png)
![Home](/public/assets/homepage.png)
![Authentication](/public/assets/authentication.png)

## Live Demo

- Frontend:https://civic-pulse-7xb6.vercel.app/
- Backend API: https://civicpulse-nneb.onrender.com

## Team 
Solo (Minora Dias - Student @SJEC)
