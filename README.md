# Personal Library Manager

A full-stack web application to track your personal book collection. Search and add books using the OpenLibrary API, organize them into shelves, and keep track of what you are reading.

---

## Features

- Search books by title using the OpenLibrary API — fetches real covers and metadata
- Organize books into three shelves: Currently Reading, Next Up, and Finished
- Add books to any shelf with a single click
- Remove books from your library
- Persistent storage with PostgreSQL — your library is saved across sessions
- Multi-user ready database schema — users and books stored in separate related tables

---

## Tech Stack

| Layer    | Technology                  |
|----------|-----------------------------|
| Backend  | Node.js, Express.js         |
| Database | PostgreSQL                  |
| Frontend | HTML, CSS, JavaScript       |
| API      | OpenLibrary API             |

---

## Database Schema

### users

| Column | Type    | Description |
|--------|---------|-------------|
| id     | integer | Primary key |
| name   | text    | User name   |

### books

| Column  | Type    | Description                            |
|---------|---------|----------------------------------------|
| id      | integer | Primary key                            |
| name    | text    | Book title                             |
| userid  | integer | Foreign key references users(id)       |
| coverid | text    | OpenLibrary cover ID for book cover    |
| status  | text    | current, next, or finished             |
| author  | text    | Author name                            |

---

## Getting Started

### Prerequisites

- Node.js installed
- PostgreSQL installed and running

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/yourusername/book-notes.git
cd book-notes
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up the database**

Open PostgreSQL and run the following:

```sql
CREATE DATABASE booknotes;

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

INSERT INTO users (name) VALUES ('Your Name');
```

**4. Update database credentials**

In your main server file, update the PostgreSQL connection with your local credentials.

**5. Start the server**

```bash
node index.js
```

**6. Open in browser**

```
http://localhost:3000
```

---

## Screenshots

### Bookshelves View
<img width="2557" height="1239" alt="image" src="https://github.com/user-attachments/assets/0389f16e-af8a-410f-9fbf-b342cfac8523" />

### Book Detail on Hover
<img width="2558" height="1236" alt="image" src="https://github.com/user-attachments/assets/2712972b-4669-413b-ba35-d4067b4ed6c1" />


---

## How It Works

1. Search for a book by title in the search bar
2. The app fetches matching results from the OpenLibrary API
3. Select the book and choose which shelf to add it to
4. The book is saved to PostgreSQL and appears on your shelf
5. Hover over a book to see details or delete it

---

## Future Improvements

- Full multi-user support with profile switching
- Search within your own library
- Reading progress tracker
- Book ratings and personal notes

---

## Author

**Md. Inzemam Khan**
B.Tech ECE, NIT Durgapur
kinzemam12@gmail.com
