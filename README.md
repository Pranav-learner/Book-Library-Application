# Book Library Application

The Book Library Application is a React-based web application that allows users to search for books, view details, and manage their personal library. It integrates with the Google Books API to fetch book data and provides features like a wishlist and categorized book management.

## Features

- **Search Books**: Search for books by title, author, or genre using the Google Books API.
- **Book Details**: View detailed information about a book, including its description, authors, categories, and ratings.
- **Personal Library**: Organize books into categories such as "To Read," "Reading," and "Completed."
- **Wishlist**: Add books to a wishlist for future reference.
- **Responsive Design**: Fully responsive UI for seamless usage across devices.

## Technologies Used

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Google Books API
- **Build Tool**: Vite
- **State Management**: Context API
- **Styling**: Tailwind CSS

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/book-library-application.git
   ```
2. Navigate to the project directory:
   ```bash
   cd book-library-application
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint to check for code issues.

## Folder Structure

```
src/
├── components/       # Reusable React components
├── context/          # Context API for state management
├── pages/            # Application pages (e.g., Search, Wishlist, BookDetails)
├── App.jsx           # Main application component
├── main.jsx          # Entry point for the React app
├── index.css         # Global styles
```

## API Integration

The application uses the [Google Books API](https://developers.google.com/books) to fetch book data. Ensure you have a valid API key and update the `API_URL` in the `main.js` file if needed.
