# 🚀 FilaZero PDV

<div align="center">

![FilaZero PDV](https://img.shields.io/badge/FilaZero-PDV-green)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Latest-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)

**Complete management system for restaurants and food establishments**

[Features](#-features) • [Technologies](#-technologies) • [Installation](#-installation) • [Structure](#-project-structure)

</div>

---

## 📋 About the Project

**FilaZero PDV** is a complete management system developed for restaurants, snack bars, and food establishments. The system allows digital order taking, manages the service flow, and controls all business operations in an integrated and efficient way.

### 🎯 Objective

Facilitate the management of food establishments through a modern, intuitive, and complete digital platform that integrates all business areas into a single system.

---

## ✨ Features

### 🏠 **Order System**
- Digital order taking
- Intuitive and responsive interface
- Real-time order status control

### 🍳 **Digital Kitchen**
- Real-time order receiving
- Organized view by status
- Dish preparation control

### 🚴 **Integrated Delivery**
- Own integrated delivery system
- Delivery control
- Order tracking

### 💰 **Financial Management**
- Cash control
- Payment methods management
- Financial reports

### 📦 **Inventory Control**
- Complete product management
- Complements control
- Low stock alerts

### 👥 **Customer Management**
- Complete customer registration
- Order history
- Contact and address data

### 👤 **User Management**
- Access control by profile
- Employee management
- Custom permissions

### 📱 **Digital Menu**
- Online menu for customers
- Internal digital menu
- Real-time updates

### 📊 **Reports and History**
- Complete order history
- Sales reports
- Performance analysis

---

## 🛠️ Technologies

### **Frontend**
- ⚛️ **React 19.2.0** - JavaScript library for building user interfaces
- ⚡ **Vite** - Ultra-fast build tool and dev server
- 🎨 **Tailwind CSS 4.1.17** - Utility-first CSS framework
- 🧭 **React Router DOM 7.10.0** - Routing for React applications
- 🎯 **Lucide React** - Modern icon library
- 📡 **Axios** - HTTP client for API requests

### **Backend**
- 🟢 **Node.js** - JavaScript runtime
- 🚀 **Express 5.2.1** - Web framework for Node.js
- 🗄️ **PostgreSQL** - Relational database
- 📦 **pg 8.16.3** - PostgreSQL client for Node.js
- 🔐 **bcryptjs 3.0.3** - Library for password hashing
- 🌐 **CORS** - Middleware for Cross-Origin Resource Sharing
- 🔑 **dotenv** - Environment variables management

### **Development Tools**
- 📦 **ESLint** - JavaScript linter
- 🎨 **Tailwind CSS Vite Plugin** - Tailwind integration with Vite

---

## 📁 Project Structure

```
FilaZeroPdv/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── buttons/    # Custom buttons
│   │   │   ├── cards/      # Cards and grids
│   │   │   ├── layouts/    # Layouts (Sidebar, Footer, Header)
│   │   │   ├── lists/      # List components
│   │   │   └── modals/     # Modals (Login, SignUp)
│   │   ├── pages/          # Application pages
│   │   │   ├── management/ # Management pages
│   │   │   └── ...         # Other pages
│   │   ├── routes/         # Route configuration
│   │   ├── services/       # Services (API)
│   │   └── contexts/       # React contexts
│   └── package.json
│
├── server/                  # Node.js Backend
│   ├── config/             # Configuration (database)
│   ├── controllers/        # Controllers
│   ├── models/             # Data models
│   ├── routes/             # API routes
│   ├── services/           # Backend services
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### Prerequisites

- Node.js (version 18 or higher)
- PostgreSQL
- npm or yarn

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/adoniasgoesw/FilaZeroPdv.git
cd FilaZeroPdv
```

2. **Install frontend dependencies**
```bash
cd client
npm install
```

3. **Install backend dependencies**
```bash
cd ../server
npm install
```

4. **Configure the database**
   - Create a PostgreSQL database
   - Configure environment variables in the server `.env` file

5. **Run the backend server**
```bash
cd server
npm run dev
```

6. **Run the frontend**
```bash
cd client
npm run dev
```

7. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3000` (or the configured port)

---

## 📱 Responsiveness

The system was developed with a focus on responsiveness, working perfectly on:
- 📱 **Mobile** - Small screens (up to 700px)
- 📱 **Tablet** - Medium screens (768px - 1024px)
- 💻 **Desktop** - Large screens (above 1024px)

---

## 🎨 Interface

The interface was developed with a focus on:
- ✨ Modern and clean design
- 🎯 Intuitive usability
- 📱 Mobile-first experience
- 🎨 Consistent color palette
- ⚡ Optimized performance

---

## 🔐 Security

- JWT authentication
- Data validation on frontend and backend
- Route protection
- Secure session management

---

## 📝 License

This project is under the MIT license. See the `LICENSE` file for more details.

---

## 👨‍💻 Developer

**Adonias Goes**

- GitHub: [@adoniasgoesw](https://github.com/adoniasgoesw)

---

## 🤝 Contributing

Contributions are always welcome! Feel free to open an issue or submit a pull request.

---

<div align="center">

**Developed with ❤️ to facilitate restaurant management**

⭐ If this project was useful to you, consider giving it a star!

</div>
