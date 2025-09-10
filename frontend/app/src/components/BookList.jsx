import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Alert } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function BookList() {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState(""); // ✅ message text
  const [showAlert, setShowAlert] = useState(false); // ✅ alert visibility
  const BASE_URL = "https://bookstore-backend.onrender.com"; // same URL

  const location = useLocation();

  useEffect(() => {
    fetchBooks();

    // ✅ Check if there's a success message passed from navigation
    if (location.state?.message) {
      setMessage(location.state.message);
      setShowAlert(true);
      // Clear the state so message doesn't stay forever if you reload
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/books`);

      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return console.error("Invalid ID");
    try {
      await axios.delete(`${BASE_URL}/books/${id}`);
      setBooks(books.filter((book) => book._id !== id));
      setMessage("Book deleted successfully!");
      setShowAlert(true);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <h2>Book List</h2>

      {showAlert && (
        <Alert variant="success" dismissible onClose={handleClose}>
          {message}
        </Alert>
      )}

      <Link to="/add">
        <Button variant="primary" className="mb-3">
          Add New Book
        </Button>
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Year</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No books found.
              </td>
            </tr>
          ) : (
            books.map((book, index) => (
              <tr key={book._id}>
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.price}</td>
                <td>{book.publishedYear}</td>
                <td>{book.description}</td>
                <td>
                  <Link to={`/edit/${book._id}`}>
                    <Button variant="warning" size="sm" className="me-2">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default BookList;
