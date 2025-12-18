# Phonebook Backend

A simple Express.js REST API for managing a phonebook of contacts.

## Overview

This is a basic phonebook backend built with Node.js and Express. It provides CRUD operations for managing contacts with names and phone numbers. The API uses in-memory storage (data resets on server restart).

## Prerequisites

- Node.js v24 or higher
- npm (comes with Node.js)

## Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Server

**Development mode** (with auto-reload on file changes):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on port 3001 and log:
```
Express server listening on port 3001
```

## API Endpoints

### Get All Contacts
- **GET** `/api/persons`
- **Response:** Array of all contacts
- **Example:**
  ```bash
  curl https://your-domain:3001/api/persons
  ```

### Get Specific Contact
- **GET** `/api/persons/:id`
- **Response:** Single contact object or 404 if not found
- **Example:**
  ```bash
  curl https://your-domain:3001/api/persons/1
  ```

### Create New Contact
- **POST** `/api/persons`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "number": "555-1234"
  }
  ```
- **Response:** Created contact with auto-generated ID
- **Errors:**
  - 400 if `name` or `number` is missing
  - 400 if contact with same name already exists

### Delete Contact
- **DELETE** `/api/persons/:id`
- **Response:** 204 No Content on success
- **Example:**
  ```bash
  curl -X DELETE https://your-domain:3001/api/persons/1
  ```

### Get Phonebook Info
- **GET** `/info`
- **Response:** HTML page showing contact count and current timestamp

## Testing with Postman

### Setup

1. Open Postman
2. Create requests with the following base URL:
   ```
   https://bb85cb5f-27e0-4df3-b004-3279794bba40-00-1i21bkytk0gk1.worf.replit.dev:3001
   ```

### Example Requests

**Get all contacts:**
```
GET /api/persons
```

**Add a new contact:**
```
POST /api/persons
Content-Type: application/json

{
  "name": "Alice Johnson",
  "number": "555-9876"
}
```

**Get specific contact:**
```
GET /api/persons/1
```

**Delete a contact:**
```
DELETE /api/persons/1
```

## Project Structure

- `index.js` - Main application file with all API routes
- `package.json` - Dependencies and scripts
- `requests.rest` - REST client requests file

## Dependencies

- **express** - Web framework
- **cors** - Enable cross-origin requests
- **morgan** - HTTP request logger

## Middleware

- **CORS** - Allows requests from any origin
- **JSON Parser** - Automatically parses JSON request bodies
- **Custom Morgan Logger** - Logs HTTP requests with method, URL, status, response time, and request body

## Notes

- Contact data is stored in memory and resets when the server restarts
- IDs are generated randomly (1-99999)
- Contact names must be unique (case-insensitive)
- All responses use JSON format
