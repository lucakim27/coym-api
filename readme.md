# COYM API

COYM API is the backend service for **COYM**, a platform for sharing comments and insights related to university majors. It allows users to create accounts, post comments and replies, like comments, and track popular majors.

---

## Features

- **User Authentication**
  - Sign up and sign in with a username and password or google account
  - Session validation via cookies

- **User Profile Management**
  - View and update user details including username, gender, school, country, major, social media, and profile URL
  - Fetch all users or specific user details

- **Comments & Replies**
  - Post, edit, and delete comments on majors
  - Post, edit, and delete replies to comments
  - Fetch recent comments and replies for each major

- **Likes**
  - Like and unlike comments
  - Track total likes and see which users liked specific comments

- **Requests**
  - Submit requests such as feedback or feature suggestions

- **Statistics & Insights**
  - Track total number of users, comments, replies, and likes
  - View popular majors based on comment activity
  - View user activity by major or module

- **Database Integration**
  - Uses **Google Cloud SQL** (MySQL) for storing accounts, comments, replies, likes, majors, and requests
  - Secure and structured database design to handle user interactions efficiently

---

## Tech Stack

- **Node.js** with TypeScript  
- **Express.js** for API routing  
- **MySQL** (Google Cloud SQL)  
- **Render** for deployment  
