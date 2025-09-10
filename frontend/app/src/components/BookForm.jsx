import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function BookForm() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
    publishedYear: "",
  });

  const { id } = useParams(); // Check if editing
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchBookById(id);
    }
  }, [id]);
  const BASE_URL = "https://bookstore-backend.onrender.com"; // your Render backend URL

  const fetchBookById = async (bookId) => {
    try {
      const res = await axios.get(`${BASE_URL}/books/${bookId}`);
      setBook(res.data);
    } catch (err) {
      console.error("Error fetching book:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await axios.put(`${BASE_URL}/books/${id}`, book);

        navigate("/", { state: { message: "Book updated successfully!" } });
      } else {
        await axios.post(`${BASE_URL}/books`, book);

        navigate("/", { state: { message: "Book added successfully!" } });
      }
    } catch (error) {
      console.error("Error submitting book:", error);
    }
  };

  return (
    <Card>
      <Card.Body>
        <h2 className="mb-4 text-center">{id ? "Edit Book" : "Add Book"}</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={book.price}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Published Year</Form.Label>
            <Form.Control
              type="number"
              name="publishedYear"
              value={book.publishedYear}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={book.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="success" type="submit">
            {id ? "Update Book" : "Add Book"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default BookForm;
