# ![Ship Wheel Icon](frontend/public/vite.svg) Streamify 


**[🔗 View Live Project](https://streamify-3h6x.onrender.com)**


---

## 🚀 About the Project

**Streamify** is a full-stack, real-time social media platform built to connect people through seamless communication. It enables users to discover new friends, manage friend requests, engage in private messaging, and enjoy high-quality video calls — all within an interactive and responsive user interface.

### ✨ Key Features

- 🔍 **User Discovery** – Search and find users across the platform to connect with.
- 🤝 **Friend Requests** – Send, receive, and manage friend requests in real-time.
- 💬 **Private Messaging** – Chat one-on-one with friends using a fast and responsive chat interface.
- 📹 **Video Calling** – Conduct high-quality video calls powered by integrated streaming technologies.
- 🔒 **Authentication & Authorization** – Secure sessions with JWT-based authentication.
- 🎨 **Theme Support** – Personalize your experience with DaisyUI's theme system.
- ⚡ **Real-time Interactions** – Instant updates for chats, requests, and notifications.
- 📱 **Responsive Design** – Optimized for all devices, from desktops to mobile.
- 🔧 **Modular Codebase** – Easy to maintain and extend.
- 🌐 **API-First Architecture** – Clean separation between frontend and backend.

---

## 🛠️ Tech Stack

Streamify is built with a modern web stack to ensure performance, scalability, and a rich user experience.

### 🖥️ Frontend

- ⚛️ **React** with **TypeScript**
- 🧠 **Redux** for global state management
- 🎨 **Tailwind CSS** & 🌈 **DaisyUI** for UI design and theming
- 🔄 **TanStack Query (React Query)** for server-state synchronization

### ☁️ Backend

- 🟩 **Node.js** with **Express**
- ⛑️ **TypeScript** for static type checking
- 📡 **Stream API** for real-time messaging and video features
- 🔐 **JWT** for secure authentication and session management

### ⚙️ Other Tools

- 🧰 **JavaScript**
- 📦 **npm** / 🧶 **Yarn** for dependency management
- 🧪 **ESLint**, **Prettier** for linting and formatting
- 🗃️ **.env** for environment variables

---

## 💻 Getting Started

Follow these instructions to run the project locally.

### ✅ Prerequisites

Make sure you have the following installed:

- **Node.js** (LTS version recommended)
- **npm** or **Yarn**

### 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/PranavTrip/Streamify.git
   cd Streamify

    ```

2.  **Install Backend Dependencies:**

    Navigate into the `backend` directory and install the required packages:

    ```bash
    cd backend
    npm install # or yarn install
    ```

3.  **Install Frontend Dependencies:**

    Navigate into the `frontend` directory and install the required packages:

    ```bash
    cd ../frontend
    npm install # or yarn install
    ```

4.  **Environment Variables:**

    Create a `.env` file in both the `backend` and `frontend` directories based on the `.env.example` files (if provided) and fill in the necessary environment variables (e.g., database connection strings, JWT secret keys, API endpoints).

    * **`backend/.env` example:**
        ```
       PORT = 5001

        MONGO_URI = your_mongo_uri

        STREAM_API_KEY = api_key

        STREAM_SECRET_KEY = secret_key

        JWT_SECRET = jwt_secret

        NODE_ENV = "development"
        ```
    * **`frontend/.env` example:**
        ```
        VITE_STREAM_API_KEY = api_key

        ```

---

## ▶️ Usage

Once both the backend and frontend are set up, you can run the application.

1.  **Start the Backend Server:**

    From the `backend` directory:

    ```bash
    npm start 
    ```
    The backend server will typically run on `http://localhost:5001` (or the port specified in your `.env` file).

2.  **Start the Frontend Application:**

    From the `frontend` directory:

    ```bash
    npm start 
    ```
    The frontend application will usually open in your web browser at `http://localhost:5173`.

### Interacting with Streamify

* **Registration/Login:** Create an account or log in using your credentials.
* **Discover Users:** Navigate to the "Home" section to find other users.
* **Send Friend Requests:** Send requests to users you wish to connect with.
* **Manage Requests:** Check your "Pending," "Sent," and "Incoming" requests to accept or decline.
* **Chat with Friends:** Once connected, initiate a private chat from your friends list.
* **Video Call:** Start a video call directly from a chat or friend's profile.
* **Change Theme:** Explore different visual themes available through DaisyUI settings (if implemented in the UI).

---
