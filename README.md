🧶 Encanto de Arte - Handcrafted Products E-Commerce

![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-in%20progress-yellow)
![Made with](https://img.shields.io/badge/Made%20with-MERN-blue)

**Encanto de Arte** is a full-stack e-commerce application for selling handmade and artisanal products. It includes user authentication, admin dashboard, product management, shopping cart, and order tracking.


## 📌 MVP (Technical Requirements)
Your full-stack application must meet the following technical requirements:

- ✅ Have a SPA frontend, built with React, consisting of multiple views and implementing all CRUD actions.
- ✅ Have a REST API backend built with ExpressJS, MongoDB and Mongoose, that your React app will communicate with.
- ✅ Have a REST API backend with routes that perform all CRUD actions for at least one model (excluding the user model).
- ✅ Have 3 database models or more. Having one model for users is the first step. The other two (or more) models should represent the main functionality of your app.
- ✅ Include sign-up, log-in and log-out functionality with encrypted passwords (or social login) and authorization (logged-in users can do additional things).
- ✅ Have two separate repos on GitHub. One repo is for your frontend React application and the other is for your backend REST API.
- ✅ Have a backend validation and centralized error handling in your REST API.
- ✅ Be deployed online, allowing anyone to access and use your app.
- ✅ As a final step, check all the features outlined in points 1 - 5 and ensure they are implemented and working ahead of delivery.



 
🚀 Tech Stack

- **Frontend**: React.js / Vite  
- **Backend**: Node.js, Express.js  
- **Database**: Atlas Mongo  
- **Authentication**: JWT / OAuth 2.0  
- **Styling**: CSS
- **Deployment**: Render 
- **Version Control**: Git + GitHub


✨ Features

🛍 Public

- Browse products with images, categories, and prices
- Add/remove items from the cart
- Update quantity in the cart
- View cart total and checkout form
- Responsive UI

👤 User

- Register & login with JWT
- View order history (/orders/me)
- Profile shortcut with name in navbar

🔐 Admin

- View all users (/admin/users)
- View all orders (/admin/orders)
- Create/edit/delete products (/admin/products)
- Image upload with preview
- Stock control and category selection

🖼 Image Handling

- Product images are uploaded via form using multipart/form-data
- Images are served from the /uploads folder

🧭 Navigation

/ – Home (product listing)

/about – About page

/login, /signup – Authentication

/cart – Shopping cart

/profile – User profile

/orders/me – User orders

/admin/orders, /admin/users – Admin panels

/admin/product/new – Create product

/admin/product/:id – Edit product

# ⚙️ Getting Started

## Prerequisites

- Node.js

- MongoDB (local or cloud)

## Setup

1 - Clone the repository:

git clone https://github.com/yourusername/encanto-de-arte.git

cd encanto-de-arte

2 - Install dependencies:

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

3 - Create a .env file with the following:

PORT=5005
MONGODB_URI=mongodb://localhost:27017/encanto
TOKEN_SECRET=your_jwt_secret

4. Run the backend

node serve.js

5. Run frontend

npm run build && npm run start



## 👨‍💻 Developers
| Name | Role | GitHub |
| :---         |     :---:      |          ---: |
| Richard Nixon   | Fullstack Developer     | [@richardnixondev](https://github.com/richardnixondev)    |