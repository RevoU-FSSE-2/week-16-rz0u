# Week 16

## api/

This API is designed to manage authors and their books, providing a digital solution for digital books and books publisher. Below, you will find short details about the available endpoints and their functionality.

## Endpoints (User)

### User Registration

- **Endpoint:** `api/user/register`
- **Method:** POST
- **Description:** Register a new user.
- **Request Body:** User registration information.
  ```
  {
    'username' : '_____'
    'email'    : '_____'
    'password' : '_____'
    'role'     : '_____'
  }
  ```
- **Responses:**
  - `201`: New user successfully registered.
  - `400`: Bad request.
  - `500`: Server error.

### User Login

- **Endpoint:** `/api/user/login`
- **Method:** POST
- **Description:** Authenticate and log in as a registered user.
- **Request Body:** User login credentials.
  ```
  {
    'username' : '_____'
    'password' : '_____'
  }
  ```
- **Responses:**
  - `200`: Successfully logged in.
  - `400`: Bad request.
  - `500`: Server error.

### User Login (Session)

- **Endpoint:** `/api/user/login_session`
- **Method:** POST
- **Description:** Authenticate and log in as a registered user (with cookies).
- **Request Body:** User login credentials.
  ```
  {
    'username' : '_____'
    'password' : '_____'
  }
  ```
- **Responses:**
  - `200`: Successfully logged in.
  - `400`: Bad request.
  - `500`: Server error.

### User Logout

- **Endpoint:** `/api/user/logout_session`
- **Method:** POST
- **Description:** Logout fron current session.
- **Responses:**
  - `200`: Successfully logged out.
  - `400`: Bad request.
  - `500`: Server error.

### Password Reset (Request)

- **Endpoint:** `/api/user/password_reset_request`
- **Method:** POST
- **Description:** Request for password reset.
- **Request Body:** User email.
  ```
  {
    'email' : '_____'
  }
  ```
- **Responses:**
  - `200`: Successfully gained key.
  - `400`: Bad request.
  - `500`: Server error.

### Password Reset

- **Endpoint:** `/api/user/password_reset`
- **Method:** POST
- **Description:** Validation for password reset.
- **Request Body:** User new password.
  ```
  {
    'password' : '_____'
  }
  ```
- **Responses:**
  - `200`: Successfully change password.
  - `400`: Bad request.
  - `500`: Server error.

## Endpoints (Books)

### Get Patients

- **Endpoint:** `/api/books`
- **Method:** GET
- **Description:** Retrieve information about the books published.
- **Responses:**
  - `200`: All books retrieved.
  - `500`: Server error.

