# 💬 Chat Broker

A smart marketplace platform that enables users to **buy, rent, or exchange products**, enhanced with an **AI-powered broker** and **real-time communication**.

---

## 🚀 Demo (Screenshots)

🔗 [https://drive.google.com/drive/folders/13t5rKCWWb5APM5JtLn1weNdKe9kyWBnt?usp=drive_link#](https://drive.google.com/drive/folders/13t5rKCWWb5APM5JtLn1weNdKe9kyWBnt?usp=drive_link#)

## 💻 Source Code

🔗 [https://github.com/AmrNasem/chatbroker](https://github.com/AmrNasem/chatbroker)

---

## 📖 About The Project

Chat Broker is a **multi-purpose marketplace platform** designed to simplify how users interact with products and each other.

Unlike traditional marketplaces, the platform introduces an **AI-powered broker (chatbot)** that helps users discover relevant products based on their needs, along with a **real-time chat system** to streamline communication between users.

This project was built to explore **scalable frontend architecture**, **real-time systems**, and **user-focused product design**.

---

## ✨ Features

- 🛒 List products for **sale, rent, or exchange**
- 📦 Full product management (create, update, delete)
- ❤️ Favorites system
- 🛍️ Shopping cart & checkout flow
- 🤖 AI-powered chatbot for product recommendations
- 💬 Real-time one-to-one chat using WebSockets
- 🔐 Authentication & protected routes
- 📊 Product owner dashboard with statistics

---

## 🧠 Key Concepts & Learnings

- Designing **flexible product schemas** (sale / rent / exchange)
- Managing **complex global state** using Redux Toolkit
- Implementing **real-time communication** with Socket.io
- Building **user-driven flows** instead of static filtering
- Structuring scalable frontend architecture

---

## 🧱 Tech Stack

### Frontend

- React
- Redux Toolkit
- CSS

### Communication

- Socket.io (Real-time events)

### Data & APIs

- REST API

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AmrNasem/chatbroker.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm start
```

---

## 🧩 Technical Decisions

### 🔹 Socket.io for Real-Time Communication

Used to enable instant messaging between users with support for reconnection and event-based updates.

### 🔹 AI Broker (Chatbot Layer)

Introduced to shift from traditional filtering to a **conversational product discovery experience**.

### 🔹 Redux Toolkit for State Management

Helps manage complex state across products, chat, cart, and user flows in a predictable way.

---

## ⚔️ Challenges & Solutions

### 1. Flexible Product System

**Challenge:** Supporting sale, rent, and exchange in one model
**Solution:** Designed a unified schema with conditional logic for each transaction type

### 2. Real-Time Message Synchronization

**Challenge:** Preventing duplicate or unordered messages
**Solution:** Used message IDs and timestamps for consistent ordering

### 3. Matching User Needs to Products

**Challenge:** Improving product discovery beyond filters
**Solution:** Implemented a chatbot-driven recommendation flow

---

## 🔮 Future Improvements

- 🔔 Push notifications for messages and activity
- 📎 Media/file sharing in chat
- 🧠 Advanced recommendation system (ML-based)
- 📱 Mobile-friendly or native app version

---

## 👤 Authors

**Amr Nasem**

- GitHub: [https://github.com/AmrNasem](https://github.com/AmrNasem)

**Mohammed Heggy**

- GitHub: [https://github.com/Mohammed0Heggy](https://github.com/Mohammed0Heggy)

---

## ⭐ Final Note

This project reflects my ability to go beyond basic CRUD applications and build **interactive, user-focused systems** that combine real-time communication with modern UI/UX patterns.