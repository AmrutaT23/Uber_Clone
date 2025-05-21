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

### Success

- **Status:** `200 OK`
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

### Invalid Credentials

- **Status:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "error": "Invalid email or password"
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

---

# User Profile API Documentation

## Endpoint

`GET /users/profile`

---

## Description

Retrieves the authenticated user's profile information.  
Requires a valid JWT token in the `Authorization` header or as a cookie.

---

## Request Headers

- `Authorization: Bearer <jwt_token>` (if not using cookie)

---

## Responses

### Success

- **Status:** `200 OK`
- **Body:**
  ```json
  {
    "_id": "<user_id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // ...other user fields
  }
  ```

### Unauthorized

- **Status:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "error": "Authentication required"
  }
  ```

---

## Example Request (cURL)

```bash
curl -X GET http://localhost:PORT/users/profile \
  -H "Authorization: Bearer <jwt_token>"
```

---

## Notes

- Requires authentication.
- Returns the current user's profile data.

---

# User Logout API Documentation

## Endpoint

`GET /users/logout`

---

## Description

Logs out the authenticated user by blacklisting the JWT token and clearing the authentication cookie.

---

## Request Headers

- `Authorization: Bearer <jwt_token>` (if not using cookie)

---

## Response

## Example Request (cURL)

```bash
curl -X GET http://localhost:PORT/users/logout \
  -H "Authorization: Bearer <jwt_token>"
```

---

## Notes

- Requires authentication.
- JWT token is blacklisted for 24 hours and cannot be reused.
- Authentication cookie is cleared on logout.

---

# Captain Registration API Documentation

## Endpoint

`POST /captains/register`

---

## Description

Registers a new captain (driver) in the system.  
Validates the input, hashes the password, and stores vehicle details.

---

## Request Body

Send a JSON object in the following format:

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": "4",
    "vehicleType": "car"
  }
}
```

### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.
- `vehicle.color` (string, required): Minimum 3 characters.
- `vehicle.plate` (string, required): Minimum 3 characters.
- `vehicle.capacity` (string, required): At least 1.
- `vehicle.vehicleType` (string, required): Must be one of `"car"`, `"motorcycle"`, or `"auto"`.

---

## Response

## Example Request (cURL)

```bash
curl -X POST http://localhost:PORT/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane.smith@example.com",
    "password": "yourpassword",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": "4",
      "vehicleType": "car"
    }
  }'
```

---

## Notes

- All fields are required.
- Email must be unique.
- Password is securely hashed before storage.
- Vehicle type must be one of: `"car"`, `"motorcycle"`, `"auto"`.

---

# Captain Login API Documentation

## Endpoint

`POST /captains/login`

---

## Description

Authenticates an existing captain using email and password.  
Returns a JWT token and captain details upon successful login.

---

## Request Body

Send a JSON object in the following format:

```json
{
  "email": "jane.smith@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

---

## Response

## Example Request (cURL)

```bash
curl -X POST http://localhost:PORT/captains/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.smith@example.com",
    "password": "yourpassword"
  }'
```

---

## Notes

- Both fields are required.
- Returns a JWT token for authenticated requests.

---

# Captain Profile API Documentation

## Endpoint

`GET /captains/profile`

---

## Description

Retrieves the authenticated captain's profile information.  
Requires a valid JWT token in the `Authorization` header or as a cookie.

---

## Request Headers

- `Authorization: Bearer <jwt_token>` (if not using cookie)

---

## Response

## Example Request (cURL)

```bash
curl -X GET http://localhost:PORT/captains/profile \
  -H "Authorization: Bearer <jwt_token>"
```

---

## Notes

- Requires authentication.
- Returns the current captain's profile data.

---

# Captain Logout API Documentation

## Endpoint

`GET /captains/logout`

---

## Description

Logs out the authenticated captain by blacklisting the JWT token and clearing the authentication cookie.

---

## Request Headers

- `Authorization: Bearer <jwt_token>` (if not using cookie)

---

## Response

## Example Request (cURL)

```bash
curl -X GET http://localhost:PORT/captains/logout \
  -H "Authorization: Bearer <jwt_token>"
```

---

## Notes

- Requires authentication.
- JWT token is blacklisted for 24 hours and cannot be reused.
- Authentication cookie is cleared on logout.
