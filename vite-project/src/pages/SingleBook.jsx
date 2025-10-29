import React, { useState } from 'react';
import { bookData } from '../../booksData';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, SquarePen } from 'lucide-react';

const SingleBook = () => {
  const param = useParams();
  const getLocalBooks = JSON.parse(localStorage.getItem("localBooks")) || [];
  const mergeBooks = [...bookData, ...getLocalBooks];
  const book = mergeBooks.find(book => String(book.id) === String(param.id));

  const [isEdit, setEdit] = useState(false);
  const [title, setTitle] = useState(book?.title || '');
  const [author, setAuthor] = useState(book?.author || '');
  const [description, setDescription] = useState(book?.description || '');
  const [img, setImg] = useState(book?.img || '');

  function toggleEdit() {
    setEdit(!isEdit);
  }

  function handleSave() {
    // Save logic if needed
    setEdit(false);
  }

  return (
    <div className="w-full mx-auto px-4 py-8 h-auto">
      <Link to="/" className="inline-block mb-4">
        <ArrowLeft />
      </Link>

      <div className="relative bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300 group">
        {isEdit ? (
          <div className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Title"
            />
            <input
              type="text"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Author"
            />
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Description"
            />
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        ) : (
          <>
            <img
              src={img || "https://via.placeholder.com/150x220?text=No+Image"}
              alt={title}
              className="w-full h-60 object-cover rounded-lg mb-4 border border-gray-200"
            />
            <h3 className="text-xl font-bold text-indigo-800 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold text-indigo-600">Author:</span> {author}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-indigo-600">Description:</span> {description}
            </p>
          </>
        )}

        <div onClick={toggleEdit} className="absolute top-4 text-amber-500 right-4 cursor-pointer">
        {!isEdit && <SquarePen />}
        </div>
      </div>
    </div>
  );
};

export default SingleBook;