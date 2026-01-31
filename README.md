# 🛡️ Custom Rate Limiter Middleware

A high-performance, distributed Rate Limiter Middleware for Node.js applications using Redis.
It implements the Sliding Window Log algorithm to ensure precise request limiting and handles high-concurrency scenarios effectively.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## 🚀 Key Features

- Algorithm: Sliding Window Log (more accurate than Fixed Window)
- Concurrency Safe: Redis atomic operations
- Dynamic Configuration: Rate limiting based on client IP
- Distributed: Works across multiple server instances
- Response Headers Support:
  - X-RateLimit-Limit
  - X-RateLimit-Remaining
  - X-RateLimit-Reset

---

## 🛠️ Tech Stack

- Runtime: Node.js
- Framework: Express.js
- Database: Redis
- Testing Tool: Postman

---

## ⚙️ How It Works

This middleware uses Redis Sorted Sets (ZSET) to implement the Sliding Window Log algorithm.

1. Incoming Request  
   - Middleware intercepts each HTTP request  
   - Client identified using IP Address  

2. Rule Determination  
   - Rate limits applied internally (example: 10 requests per minute)  
   - No external config file used  

3. Atomic Redis Operations  
   - Remove expired timestamps using ZREMRANGEBYSCORE  
   - Add current request timestamp using ZADD  
   - Count requests using ZCARD  

4. Decision  
   - Allow request if count <= limit  
   - Block request with 429 Too Many Requests if limit exceeded  

---

## 📂 Project Structure

```bash
rate-limiter-project/
│
├── src/
│   ├── config/
│   │   └── redisClient.js
│   │
│   ├── middleware/
│   │   ├── slidingWindowLimiter.middleware.js
│   │   └── working.middleware.js
│   │
│   ├── test/
│   │   └── testlimiter.test.js
│   │
│   ├── utils/
│   │   └── asyncHandler.js
│   │
│   └── index.js
│
├── .env
└── README.md
````

---

## 🔧 Installation & Setup

1. Prerequisites

   * Node.js v14 or higher
   * Redis Server (local or cloud)

2. Clone the Repository

```bash
git clone https://github.com/ashfak99/Rate-Limiter.git
cd Rate-Limiter
```

3. Install Dependencies

```bash
npm install
```

4. Environment Configuration

Create a `.env` file in the root directory:

```env
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
PORT=3000
```

5. Start the Server

```bash
npm run dev

```

---

## 🧪 Testing

You can test the rate limiter using the provided automated script or manually via Postman.

### Option 1: Automated Load Test (Recommended)
A dedicated test script is included to simulate high concurrency and verify the rate limiter's accuracy.

1.  Make sure the server is running (`npm start`).
2.  Open a new terminal and run the test script:
    ```bash
    node src/test/testlimiter.test.js
    ```
3.  **Observation:** The script will send multiple parallel requests and print the status (`200 OK` or `429 Too Many Requests`) to the console.

### Option 2: Manual Testing (Postman)
1.  **Send Request:** Open Postman and make a `GET` request to `http://localhost:8000/api/home` (or your configured route).
2.  **Check Headers:** Look at the response headers:
    * `X-RateLimit-Limit`: Total allowed requests.
    * `X-RateLimit-Remaining`: Requests left in the current window.
3.  **Exceed Limit:** Keep sending requests rapidly.
4.  **Result:** Once the limit is crossed, the server will return:
    ```json
    {
      "status": "error",
      "message": "Too many requests, please try again later."
    }
    ```

---

## 📜 License

MIT License

---

## ⭐ Author

Developed with ❤️ using Node.js and Redis
Feel free to fork, modify, and contribute