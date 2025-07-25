# 🔗 Rate-Limited URL Shortener

A scalable and secure URL shortener built for high throughput with user-specific rate limits, expiry logic, JWT-based authentication, and optional analytics.

## 🚀 Features

- ✅ **Shorten URLs** to unique short codes
- ⏳ **Expiration** after 30 days from creation
- 📈 **Rate-limited**: Max 100 URLs per user per day
- 🔐 **JWT Authentication** (access + refresh tokens)
- ⚙️ **High throughput**: Designed to handle 10,000 requests/minute
- 📊 **[Bonus] Analytics Dashboard**:
  - Track total clicks
  - Geo-distribution by IP
  - Clicks over time

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT & Refresh Tokens
- **Rate Limiting**: Token Bucket / Redis-based limiter
- **Optional Analytics**: Chart.js or Recharts

---

## 🧠 System Design Highlights

- **Short code generation** using nanoid
- **TTL index on URLs** for automatic expiry after 30 days
- **Rate limiting**
- **Authentication flow**:
  - Login → Get JWT + Refresh Token
  - Refresh Token API to renew access token

---

## 📦 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/Vishnuvp26/Thoughtbins-URL-Shortner.git