# 🚀 Web API

A simple and lightweight Web API example designed for a cheat loader. This project demonstrates a basic authentication flow, middleware, and Supabase integration. It is intended as a starting point and **not production-ready**.

---

## 📦 Features

* 🔐 **Authentication system**

  * Validates user credentials
  * Checks if the user exists
  * Handles banned users

* 🗄 **Supabase database integration**

* 🧩 **Middleware**

  * Authentication and request validation

* 🛣 **Auth routes**

  * Login endpoint

---

## ⚙️ Setup

Follow these steps to get started:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create and configure your `.env` file.

3. Set up your Supabase project and database.

---

## 🧪 Usage

You can test the login & signup endpoint in your browser:

```
http://localhost:8080/api/users/login?username=admin&password=test_123&hwid=test_hwid_id
```
```
http://localhost:8080/api/users/signup?username=test&password=123
```
```
npm run dev
```
```
npm run start
```

---

## 🗃 Example Database Entry

Add the following user to your Supabase database:

```sql
INSERT INTO "public"."users"
("id", "username", "password", "created_at", "hwid", "banned", "banned_reason")
VALUES
('0b17f896-6d5c-4f6b-a367-aeb51991a0cc',
 'admin',
 '$2b$10$S/U.PxSvg2zrd.aDdJcVteBSFqcue7mX665p564WNVw6ns1hKmp9O',
 '2026-02-22 14:25:09',
 'test_hwid_id',
 false,
 'Example ban reason');
```

This creates a user:

* **Username:** `admin`
* **Password:** `test_123`
* **HWID:** `test_hwid_id`

---

## ✏️ Contributing & Customization

Feel free to make any changes to this code to fit your own needs.
This project is meant to be flexible and easy to modify, so you can:

* Add new routes or endpoints
* Improve security and validation
* Expand the authentication system
* Integrate additional features
* Adapt it for your own projects

Pull requests, forks, and personal modifications are welcome.

---

## ⚠️ Disclaimer

This project is for educational purposes only.
It lacks proper security, validation, and scalability required for production environments.

---

## 📬 Contact

Discord: `._.notepad`
