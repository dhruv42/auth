# Auth Service
A service to authenticate and authorize users.

## Getting Started
Clone this repository and create _**config.json**_ file inside config folder and add the following content.
```json
{
    "dev":{
        "port":3004,
        "tokenSecret":"my-secret-token",
        "database":{
            "url":"mongodb://localhost/auth"
        }
    }
}
```
Install the dependencies
> npm install

We are all set to run our project, type the below command
> npm start

# REST APIS

## 1. Sign up
User registration

**Request:**
```json
POST /api/auth/signup
Content-Type: application/json
{
    "email": "john@gmail.com",
    "password": "12345",
    "name": "John",
    "address": [],
    "contact":"8789929512",
    "gender": "Male",
    "country": "India"
}
```

**Successful Response:**
```json
HTTP/1.0 201 CREATED
```

## 2. Login
User login

**Request:**
```json
POST /api/auth/login
Content-Type: application/json
Headers:{
"authorization":"eyJhbGciOeeweiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGUxNTJkNjY5NmQ5ODYzNDM5MDlhZjkiLCJpYXQiOjE2MjUzODUwMzksImV4cCI6MTYyNTM4ODYzOX0.cqYOtpNpF96HuUCf8kGMOtgIcYCyeOK1SjStu4"
}

Body:{
    "email": "john@gmail.com",
    "password": "12345",
}
```

**Successful Response:**
```json
HTTP/1.1 200 OK
{
    "id": "60e152d6696d986343909af9",
    "token": "eyJhbGciOeeweiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGUxNTJkNjY5NmQ5ODYzNDM5MDlhZjkiLCJpYXQiOjE2MjUzODUwMzksImV4cCI6MTYyNTM4ODYzOX0.cqYOtpNpF96HuUCf8kGMOtgIcYCyeOK1SjStu4"
}
```

## 3. Logout
User logout

**Request:**
```json
POST /api/auth/logout
Content-Type: application/json
Headers
{
"authorization":"eyJhbGciOeeweiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGUxNTJkNjY5NmQ5ODYzNDM5MDlhZjkiLCJpYXQiOjE2MjUzODUwMzksImV4cCI6MTYyNTM4ODYzOX0.cqYOtpNpF96HuUCf8kGMOtgIcYCyeOK1SjStu4"
}

**Successful Response:**
```json
HTTP/1.1 200 OK
{
    "message": "Successfully logged out!"
}
```


## 4. Search user
Search users based on name or contact

**Request:**
```json
POST /api/search?search=keyword
Headers
{
"authorization":"eyJhbGciOeeweiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGUxNTJkNjY5NmQ5ODYzNDM5MDlhZjkiLCJpYXQiOjE2MjUzODUwMzksImV4cCI6MTYyNTM4ODYzOX0.cqYOtpNpF96HuUCf8kGMOtgIcYCyeOK1SjStu4"
}
```

**Successful Response:**
```json
HTTP/1.1 200 OK
[
  {
    "name":"John",
    "contact":"9876543210"
  },
  {
    "name":"John kennedy",
    "contact":"9876543210"
  }
]
```