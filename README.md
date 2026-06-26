📚 Personal Library Manager

A full-stack web application to track your personal book collection. Search and add books using the OpenLibrary API, organize them into shelves, and keep track of what you're reading.

Features


🔍 Search books by title using the OpenLibrary API — fetches real covers and metadata
📖 Organize books into three shelves: Currently Reading, Next Up, and Finished
➕ Add books to any shelf with a single click
🗑️ Remove books from your library
💾 Persistent storage with PostgreSQL — your library is saved across sessions
👤 Multi-user ready database schema — users and books are stored in separate related tables


Tech Stack


Backend: Node.js, Express.js
Database: PostgreSQL
Frontend: HTML, CSS, JavaScript
External API: OpenLibrary API


Database Schema

users

ColumnTypeDescriptionidintegerPrimary keynametextUser's name

books

ColumnTypeDescriptionidintegerPrimary keynametextBook titleuseridintegerForeign key → users(id)coveridtextOpenLibrary cover ID for fetching cover imagestatustextcurrent, next, or finishedauthortextAuthor name

Getting Started

Prerequisites


Node.js installed
PostgreSQL installed and running


Installation


Clone the repository


bashgit clone https://github.com/yourusername/book-notes.git
cd book-notes


Install dependencies


bashnpm install


Set up the database


Open PostgreSQL and create the database and tables:

sqlCREATE DATABASE booknotes;

\c booknotes

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  userid INTEGER REFERENCES users(id),
  coverid TEXT,
  status TEXT,
  author TEXT
);

-- Insert a default user
INSERT INTO users (name) VALUES ('Your Name');


Update the database connection in your main server file with your PostgreSQL credentials
Run the app


bashnode index.js


Open your browser and go to


http://localhost:3000

Screenshots

Home — Bookshelves

<img width="2557" height="1239" alt="image" src="https://github.com/user-attachments/assets/0389f16e-af8a-410f-9fbf-b342cfac8523" />


Book Detail on Hover

<img width="2558" height="1236" alt="image" src="https://github.com/user-attachments/assets/2712972b-4669-413b-ba35-d4067b4ed6c1" />


API Used

This project uses the OpenLibrary Covers API to fetch book cover images using the cover ID stored in the database.

Example:

https://covers.openlibrary.org/b/id/{coverid}-M.jpg

Future Improvements


 Full multi-user support with profile switching
 Search within your own library
 Reading progress tracker
 Book ratings and personal notes


Author

Md. Inzemam Khan

B.Tech ECE, NIT Durgapur

GitHub • Email
