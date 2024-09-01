# Goal Setter Project

This is a full-stack MERN application with features like user registration, login, and goal management. Users can create, view, and delete their goals.

## Project Structure

- **Backend**: Node.js, Express.js, MongoDB
  - Routes: User and Goal routes
  - Controllers: Logic for handling routes
  - Middleware: Authentication and error handling
  - Models: MongoDB models for User and Goal
  - Config: Database configuration

- **Frontend**: React.js, Redux Toolkit, Vite, TailwindCSS
  - State Management: Redux Toolkit
  - Styling: TailwindCSS

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Redux/Redux Toolkit
- JWT

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Pranav03Nair/Goal-Setter.git
   cd Goal-Setter
   ```
2. Install dependencies for both frontend and backend:
   ```bash
     npm install
     cd frontend
     npm install
   ```
3. Create a .env file in the root directory with your environment variables
4. `npm run dev` in root

## Features
- User registration and login
- Create, view, and delete goals
- JWT Authentication and authorization

## License
This project is licensed under the MIT License.
