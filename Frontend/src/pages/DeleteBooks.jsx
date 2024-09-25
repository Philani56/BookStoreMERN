import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBooks = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // New success message state
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        setSuccessMessage('Book deleted successfully!'); // Set success message
        setTimeout(() => {
          setSuccessMessage(''); // Clear message after 3 seconds
          navigate('/'); // Navigate after the message is shown
        }, 3000);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error deleting book:', error);
        alert('An error occurred. Please check the console.'); // Using alert for simplicity
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading && <Spinner />}
      {successMessage && (
        <div className='bg-green-500 text-white p-4 rounded-md mb-4 text-center'>
          {successMessage}
        </div>
      )}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h1 className='text-2xl'>Are you sure you want to delete this book?</h1>
        <button
          className='p-4 bg-red-600 text-white m-8 w-full rounded-md transition duration-200 hover:bg-red-500'
          onClick={handleDeleteBook}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default DeleteBooks;
