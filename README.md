🧠 Project: Social Feed App — Backend (NestJS + MongoDB)

✅ Features You’ve Implemented:
Authentication (Register, Login)

JWT AuthGuard for protecting routes

Follow / Unfollow Users

Create / Like / Unlike / Delete Posts

Get Your Posts

Timeline Feed (Posts from user + followed users)

MongoDB schema relations (User, Post)

Modular NestJS structure (auth, user, post, timeline)

Post likes + sorting + follower relationships

🛠️ Technologies Used
NestJS (TypeScript)

MongoDB with Mongoose

JWT for Authentication

bcrypt for password hashing

Thunder Client / Postman for testing

🚀 How to Run the Backend Locally
bash
Copy code
git clone https://github.com/AdityaTiwari-191223/social-feed-backend.git
cd social-feed-backend
npm install
npm run start:dev
Make sure MongoDB is running locally or update the URI in app.module.ts.

🔑 Sample API Endpoints
Route	Method	Auth Required	Description
/auth/register	POST	❌	Register new user
/auth/login	POST	❌	Login & get JWT token
/users/all	GET	❌	Get all users
/users/:id/follow	POST	✅	Follow a user
/users/:id/unfollow	POST	✅	Unfollow a user
/posts	POST	✅	Create a post
/posts/mine	GET	✅	Get your own posts
/posts/:id/like	POST	✅	Like or unlike a post
/posts/:id	DELETE	✅	Delete a post
/timeline	GET	✅	Get timeline posts

🔐 JWT Usage
Pass JWT in headers:

makefile
Copy code
Authorization: Bearer <token>

