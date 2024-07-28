# Daily Expenses Sharing Application

## Overview

The **Daily Expenses Sharing Application** is a RESTful API built with Node.js and MongoDB. It allows users to manage and share expenses among participants using different methods, including equal, exact, and percentage splits. The application provides features for user registration, authentication, and generating balance sheets.

## Features

- **User Management**:
  - Register new users with email, name, and password.
  - User authentication with Passport.js and JWT.
- **Expense Management**:
  - Add new expenses with detailed information.
  - Split expenses equally, by exact amounts, or by percentage.
  - Retrieve user-specific and overall expenses.
  - Download balance sheets.

## Installation

### Prerequisites

- Node.js
- MongoDB
- NPM

### Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mannbajpai/daily-expense-sharing-api
   cd daily-expense-sharing-api
   ```

2. **Install dependencies**:

   ```bash
    npm install
   ```

3. **Environment Variables**

   Create a .env file in the root directory and add the following variables:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run Server**
   ```bash
   npm start
   ```

## API Documentation

### Authentication

##### Register a New User

- Endpoint: POST `/api/auth/register`
- Description: Registers a new user with email, name, and password.
- Request Body

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123",
    "mobileNumber": "97853357"
  }
  ```

- Response Body

  ```json
  {
    "message": "User registered successfully",
    "user": {
      "_id": "60b8f9f7f8d9b53a1b8d2e29",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

#### User Login

- Endpoint: POST `/api/auth/login`
- Description: Authenticates a user and returns a JWT token.
- Request Body

  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```

- Response Body
  ```json
  {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### User Logout

- Endpoint: POST `/api/auth/logout`
- Description: Logs out the user.
- Request Headers:
  - `Authorization`: `Bearer token`
- Response Body
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

### Expenses

##### Add a New Expense

- Endpoint: POST `/api/expenses`
- Description: Adds a new expense and splits it among participants.
- Request Headers:
  - `Authorization`: `Bearer token`
- Request Body

  ```json
  {
    "description": "Dinner at Restaurant",
    "amount": 1000,
    "splitMethod": "equal",
    "participants": [
      { "userId": "60b8f9f7f8d9b53a1b8d2e29" },
      { "userId": "60b8f9f7f8d9b53a1b8d2e30" }
    ]
  }
  ```

- Response Body

  ```json
  {
    "message": "Expense added successfully",
    "expense": {
      "_id": "60b8fa2ef8d9b53a1b8d2e32",
      "description": "Dinner at Restaurant",
      "amount": 1000,
      "splitMethod": "equal",
      "participants": [
        { "userId": "60b8f9f7f8d9b53a1b8d2e29", "amount": 500 },
        { "userId": "60b8f9f7f8d9b53a1b8d2e30", "amount": 500 }
      ]
    }
  }
  ```

#### Get User Expenses

- Endpoint: GET `/api/expenses/user`
- Description: Retrieves all expenses for the authenticated user.
- Request Headers:
  - `Authorization`: `Bearer token`
- Response

  ```json
  [
    {
      "_id": "60b8fa2ef8d9b53a1b8d2e32",
      "description": "Dinner at Restaurant",
      "amount": 1000,
      "splitMethod": "equal",
      "participants": [
        { "userId": "60b8f9f7f8d9b53a1b8d2e29", "amount": 500 },
        { "userId": "60b8f9f7f8d9b53a1b8d2e30", "amount": 500 }
      ]
    }
  ]
  ```

#### Get Overall Expenses

- Endpoint: GET `/api/expenses`
- Description: Retrieves all expenses for all users.
- Request Headers:
  - `Authorization`: `Bearer <token>`
- Response Body

  ```json
  [
    {
      "_id": "60b8fa2ef8d9b53a1b8d2e32",
      "description": "Dinner at Restaurant",
      "amount": 1000,
      "splitMethod": "equal",
      "participants": [
        { "userId": "60b8f9f7f8d9b53a1b8d2e29", "amount": 500 },
        { "userId": "60b8f9f7f8d9b53a1b8d2e30", "amount": 500 }
      ]
    }
  ]
  ```

#### Download Balance Sheet

- Endpoint: GET `/api/expenses/balance-sheet`
- Description: Downloads the balance sheet for the authenticated user.
- Request Headers:
  - `Authorization`: `Bearer token`
- Response: Returns a PDF file containing the balance sheet.

### User

#### Get User Details

- Endpoint: GET `/api/users/me`
- Description: Retrieves details of a specific user.
- Request Headers:
  - `Authorization`: `Bearer <token>`
- Response Body

  ```json
  {
    "_id": "60b8f9f7f8d9b53a1b8d2e29",
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

## Error Handling

All API endpoints return appropriate HTTP status codes and error messages in case of invalid requests or server errors. Please refer to the error response body for specific error details.

## Contributing

Contributions are welcome! Please follow the standard GitHub workflow:

- Fork the repository.
- Create a new branch for your feature or bugfix.
- Commit your changes and push them to your fork.
- Open a pull request with a detailed description of your changes.

## License

This project is licensed under the ISC License. See the LICENSE file for details.

## Acknowledgements

Thanks to the creators of Node.js, Express, MongoDB, and other open-source projects that made this application possible.
Special thanks to the contributors who have helped improve this project.

## Contact

For any questions or feedback, please reach out at [github.com/mannbajpai]
