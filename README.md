# FAQ API

A simple RESTful API for managing frequently asked questions (FAQs) with support for multiple languages, caching, and CRUD operations.

## Features
- Create FAQs with **automatic translations** (Hindi, Bengali, Spanish)
- Retrieve all FAQs with **Redis caching** for improved performance
- Fetch a single FAQ with **optional language translation**
- Update FAQs with **cache invalidation**
- Delete FAQs

---

## Installation
### 1️⃣ Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v14 or later)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Redis](https://redis.io/download)

### 2️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/faq-api.git
cd faq-api
```

### 3️⃣ Install Dependencies
```sh
npm install
```

### 4️⃣ Configure Environment Variables
Create a `.env` file in the project root:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/faqdb
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 5️⃣ Start the Server
```sh
npm start
```
> The server will run on `http://localhost:5000`

---

## API Endpoints

### 🔹 Create an FAQ
**POST** `/api/faqs`
#### Request Body
```json
{
  "question": "What is Node.js?",
  "answer": "Node.js is a JavaScript runtime built on Chrome's V8 engine."
}
```
#### Response
```json
{
  "success": true,
  "data": {
    "_id": "650a1e2a9c62a7b9f0e4c123",
    "question": "What is Node.js?",
    "answer": "Node.js is a JavaScript runtime built on Chrome's V8 engine.",
    "translations": { ... }
  }
}
```

---

### 🔹 Get All FAQs
**GET** `/api/faqs`
#### Optional Query Parameters
- `?lang=hi` → Fetch FAQs in Hindi

#### Example Response
```json
[
  {
    "_id": "650a1e2a9c62a7b9f0e4c123",
    "question": "What is Node.js?",
    "answer": "Node.js is a JavaScript runtime built on Chrome's V8 engine."
  }
]
```

---

### 🔹 Get a Single FAQ
**GET** `/api/faqs/:id`
#### Example
`GET /api/faqs/650a1e2a9c62a7b9f0e4c123?lang=bn`

---

### 🔹 Update an FAQ
**PUT** `/api/faqs/:id`
#### Request Body
```json
{
  "question": "What is Express.js?",
  "answer": "Express.js is a web framework for Node.js."
}
```

---

### 🔹 Delete an FAQ
**DELETE** `/api/faqs/:id`

---

## Contributing
We welcome contributions! 🚀 Follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m 'Added a new feature'`)
4. Push to your branch (`git push origin feature-name`)
5. Create a pull request

---

## License
This project is licensed under the [MIT License](LICENSE).

