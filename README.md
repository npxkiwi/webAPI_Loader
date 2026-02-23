# Web API

This is a basic and not realy great way of making a web api server for you cheat loader.

## Includes
* Supabase for database
* Auth system (Checks if the user exists and for ban)
* Middleware (Auth)
* Routes (Auth)

## Setup
* Install all packages with `npm i`
* Setup .env file
* Setup Supabase database

## How to use?
This is how you can use it in you web browser:
``http://localhost:8080/api/users/login?username=admin&password=test_123&hwid=test_hwid_id``  
Add this to your Supabase:
```sql
INSERT INTO "public"."users" ("id", "username", "password", "created_at", "hwid", "banned", "banned_reason") VALUES ('0b17f896-6d5c-4f6b-a367-aeb51991a0cc', 'admin', '$2b$10$S/U.PxSvg2zrd.aDdJcVteBSFqcue7mX665p564WNVw6ns1hKmp9O', '2026-02-22 14:25:09', 'test_hwid_id', 'false', 'Du er en lille taber :(');
```
This creates a user called admin where the password is test_123 and the hwid is test_hwid.
