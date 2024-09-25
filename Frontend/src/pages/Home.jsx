import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete, MdViewList, MdViewModule } from 'react-icons/md';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState('table'); // New state for view type

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Filter books based on search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='p-6 bg-[#f5f7fa] min-h-screen'>
      {/* Page header */}
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-4xl font-semibold text-gray-800'>Books List</h1>
        <Link to='/books/create' className='flex items-center'>
          <MdOutlineAddBox className='text-sky-800 text-4xl hover:text-sky-600 transition duration-200' />
          <span className='ml-2 text-sky-800 text-lg'>Add New Book</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className='mb-6'>
        <input
          type='text'
          placeholder='Search by title or author...'
          className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* View Toggle Buttons */}
      <div className='flex justify-end mb-4'>
        <button
          className={`p-2 mr-2 rounded ${viewType === 'table' ? 'bg-gray-300' : 'bg-white'} hover:bg-gray-200`}
          onClick={() => setViewType('table')}
        >
          <MdViewList className='text-2xl' />
        </button>
        <button
          className={`p-2 rounded ${viewType === 'card' ? 'bg-gray-300' : 'bg-white'} hover:bg-gray-200`}
          onClick={() => setViewType('card')}
        >
          <MdViewModule className='text-2xl' />
        </button>
      </div>

      {/* Spinner for loading state */}
      {loading ? (
        <Spinner />
      ) : viewType === 'table' ? (
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse shadow-md rounded-lg overflow-hidden bg-white'>
            <thead>
              <tr>
                <th className='border border-gray-300 px-4 py-2 bg-gray-200 text-gray-700'>#</th>
                <th className='border border-gray-300 px-4 py-2 bg-gray-200 text-gray-700'>Title</th>
                <th className='border border-gray-300 px-4 py-2 bg-gray-200 text-gray-700 max-md:hidden'>
                  Author
                </th>
                <th className='border border-gray-300 px-4 py-2 bg-gray-200 text-gray-700 max-md:hidden'>
                  Publish Year
                </th>
                <th className='border border-gray-300 px-4 py-2 bg-gray-200 text-gray-700'>Operations</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book, index) => (
                  <tr
                    key={book._id}
                    className={`h-12 hover:bg-gray-100 transition duration-150 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    <td className='border border-gray-300 px-4 py-2 text-center'>{index + 1}</td>
                    <td className='border border-gray-300 px-4 py-2 text-center'>{book.title}</td>
                    <td className='border border-gray-300 px-4 py-2 text-center max-md:hidden'>{book.author}</td>
                    <td className='border border-gray-300 px-4 py-2 text-center max-md:hidden'>{book.publishYear}</td>
                    <td className='border border-gray-300 px-4 py-2 text-center'>
                      <div className='flex justify-center gap-x-4'>
                        <Link to={`/books/details/${book._id}`}>
                          <BsInfoCircle className='text-2xl text-green-800 hover:text-green-600 transition duration-150' />
                        </Link>
                        <Link to={`/books/edit/${book._id}`}>
                          <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-yellow-400 transition duration-150' />
                        </Link>
                        <Link to={`/books/delete/${book._id}`}>
                          <MdOutlineDelete className='text-2xl text-red-600 hover:text-red-400 transition duration-150' />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='5' className='text-center p-4'>No books found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        // Card View
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book._id} className='border rounded-lg shadow-md overflow-hidden bg-white'>
                <div className='p-4'>
                  <h2 className='text-xl font-semibold'>{book.title}</h2>
                  <p className='text-gray-700'>Author: {book.author}</p>
                  <p className='text-gray-500'>Published: {book.publishYear}</p>
                </div>
                <div className='flex justify-between p-4 border-t'>
                  <Link to={`/books/details/${book._id}`} className='text-green-800 hover:text-green-600'>
                    <BsInfoCircle className='text-2xl' />
                  </Link>
                  <Link to={`/books/edit/${book._id}`} className='text-yellow-600 hover:text-yellow-400'>
                    <AiOutlineEdit className='text-2xl' />
                  </Link>
                  <Link to={`/books/delete/${book._id}`} className='text-red-600 hover:text-red-400'>
                    <MdOutlineDelete className='text-2xl' />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className='text-center col-span-3 p-4'>No books found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
