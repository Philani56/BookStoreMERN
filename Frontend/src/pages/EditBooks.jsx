import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';

const EditBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // New success message state
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
    .then((response) => {
      setAuthor(response.data.author)
      setPublishYear(response.data.publishYear)
      setTitle(response.data.title)
      setLoading(false);
    })
    .catch((error) => {
      alert('An error occurred. Please check the console for details.');
      console.log(error);
    });
  }, [])

  const handleEditBook = () => {
    if (!title || !author || !publishYear) {
      setError('All fields are required.');
      return;
    }
    setError('');
    setSuccessMessage(''); // Reset success message when saving starts

    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);

    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        setSuccessMessage('Book edited successfully!'); // Set success message

        // Clear input fields
        setTitle('');
        setAuthor('');
        setPublishYear('');

        setTimeout(() => {
          navigate('/'); // Redirect to home after a short delay
        }, 2000); // Redirect after 2 seconds
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console for details.');
        console.log(error);
      });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Back Button positioned on the left */}
      <div className="w-full max-w-lg flex justify-start mb-6">
        <BackButton />
      </div>

      <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Book</h1>

        {loading && (
          <div className="flex justify-center">
            <Spinner />
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
            <p>{successMessage}</p>
          </div>
        )}

        <div className="flex flex-col space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the book title"
            />
          </div>

          {/* Author Input */}
          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the author's name"
            />
          </div>

          {/* Publish Year Input */}
          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2">Publish Year</label>
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the publish year"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleEditBook}
            disabled={loading}
            className={`w-full py-3 text-white rounded-lg ${loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'} transition-colors duration-300 font-semibold`}
          >
            {loading ? 'Saving...' : 'Save Book'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBooks;
