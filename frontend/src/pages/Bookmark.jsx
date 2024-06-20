import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { fetchBookmarks, deleteBookmark } from '../api'; // Assuming you have an api.js file with fetchBookmarks and deleteBookmark functions
import { MdLocalMovies } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [userId] = useState('user123'); // Replace with actual user ID from authentication

  useEffect(() => {
    const getBookmarks = async () => {
      try {
        const { data } = await fetchBookmarks(userId);
        setBookmarks(data);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };

    getBookmarks();
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      await deleteBookmark(id);
      setBookmarks(bookmarks.filter(bookmark => bookmark._id !== id));
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };

  return (
    <div>
      <Layout />
      <h1 className="lg:text-3xl text-2xl m-6 md:ml-12 lg:m-3 lg:mb-6 lg:ml-28 font-extralight">
        Your Bookmarks
      </h1>
      <div className="m-4 mr-1 md:ml-12 md:-mr-10 lg:ml-28 lg:mr-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {bookmarks.map((bookmark) => (
          <div key={bookmark._id} className="relative">
            <img
              className="rounded-xl w-full opacity-80 hover:opacity-50 transition-opacity duration-300"
              src={`https://image.tmdb.org/t/p/w500${bookmark.backdropPath}`}
              alt={bookmark.title}
            />
            <div className="px-1 py-3">
              <div className="flex">
                <p className="text-xs md:text-sm pr-3 opacity-70">
                  {bookmark.releaseYear}
                </p>
                <MdLocalMovies className="opacity-70 md:text-lg" />
                <p className="pb-2 pl-1 text-xs md:text-sm opacity-70">Movie</p>
              </div>
              <div className="text-xs lg:text-lg lg:mb-2 md:text-sm">{bookmark.title}</div>
            </div>
            <button
              className="absolute top-0 right-0 mt-2 mr-2 p-2 bg-red-500 rounded-full text-white"
              onClick={() => handleDelete(bookmark._id)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmark;

