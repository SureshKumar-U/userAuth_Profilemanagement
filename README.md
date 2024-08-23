# User Authentication and Profile Management System
This project is a complete user authentication and profile management system built with React, Node.js, Express, and MySQL. It provides a secure way for users to register, log in, and manage their profile information.


![React.js](https://img.shields.io/badge/React.js-v18.3.1-blue.svg)
![Mysql](https://img.shields.io/badge/Mysql-v8.0.39-green.svg)

## Features
- **User Authentication**: Secure registration and login with password hashing by using JWT library.
- **Profile Management**: View and update user profile information.Securely handle profile updates with authenticated access.
- 
## Technologies Used
-  **Front end**: Reactjs
-  **Back end**: Nodejs.Express
-  **Database**: Mysql


### Install Dependencies (frontend & backend)

```
cd frontend
npm install
cd backend
npm install

```

### `.env` File

  Add following environment variables in ".env" file (backend/.env)

- DB_USERNAME=your_mysql_username
- DB_PASSWORD=your_mysql_password
- DB_NAME=your_dbname
- DB_HOST=127.0.0.1
- SECRET =your_secret_key



### Run

```
# Run frontend 
cd frontend
npm run dev

# Run backend
cd backend
npm run server
```

