import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import BookForm from './components/BookForm'
import BookList from './components/BookList'

function App() {
  return (
    <Router>
      <Container >
        <h1 className="my-4 text-center">Book App Store</h1>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<BookForm />} />
          <Route path="/edit/:id" element={<BookForm />} />

          {/* Add more routes here if needed */}
        </Routes>
      </Container>
    </Router>
  )
}

export default App
