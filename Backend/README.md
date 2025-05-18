# User Registration API Documentation

## Endpoint

`POST /users/register`

---

## Description

Registers a new user in the system.  
Validates the input, hashes the password, and returns a JWT token upon successful registration.

---

## Request Body

Send a JSON object in the following format:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, required): Minimum 3 characters.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

---

## Responses

### Success

- **Status:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<jwt_token>",
    "user": {
      "_id": "<user_id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // ...other user fields
    }
  }
  ```

### Validation Error

- **Status:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      }
      // ...other validation errors
    ]
  }
  ```

### Email Already Registered

- **Status:** `400 Bad Request`
- **Body:**
  ```json
  {
    "error": "Email already registered"
  }
  ```

### Internal Server Error

- **Status:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

---

## Example Request (cURL)

```bash
curl -X POST http://localhost:PORT/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```

---

## Notes

- All fields are required.
- Email must be unique.
- Password is securely hashed before storage.

---

# User Login API Documentation

## Endpoint

`POST /users/login`

---

## Description

Authenticates an existing user using email and password.  
Returns a JWT token and user details upon successful login.

---

## Request Body

Send a JSON object in the following format:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

---

## Responses

### Invalid Credentials

- **Status:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "error": "Invalid email or password"
  }
  ```

## Example Request (cURL)

```bash
curl -X POST http://localhost:PORT/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```

---

## Notes

- Both fields are required.
- Returns a JWT token for authenticated requests.
