// src/pages/SearchResults.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdLocalMovies } from "react-icons/md";

const SearchResults = ({ query }) => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query.length > 2) {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTdkOTZlMDg4Mzk2M2VlZWM4YTNlZjdjMjQ0OGFkOSIsInN1YiI6IjY2NjdkMGI5YzBhNzg1MTkyNzlhMTFjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ag-Z7XV_cPf-lw7smELllFq3cVM7yQ-rd4N4CzsYtwo'
          }
        };

        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1&query=${query}`,
            options
          );
          const data = await response.json();
          setResults(data.results);
          setTotalPages(data.total_pages);
        } catch (err) {
          console.error("Error fetching search results:", err);
        }
      } else {
        setResults([]);
      }
    };

    fetchSearchResults();
  }, [query]);

  useEffect(() => {
    if (page > 1) {
      const fetchMoreResults = async () => {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTdkOTZlMDg4Mzk2M2VlZWM4YTNlZjdjMjQ0OGFkOSIsInN1YiI6IjY2NjdkMGI5YzBhNzg1MTkyNzlhMTFjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ag-Z7XV_cPf-lw7smELllFq3cVM7yQ-rd4N4CzsYtwo'
          }
        };

        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=${page}&query=${query}`,
            options
          );
          const data = await response.json();
          setResults(prevResults => [...prevResults, ...data.results]);
        } catch (err) {
          console.error("Error fetching more results:", err);
        }
      };

      fetchMoreResults();
    }
  }, [page]);

  const loadMoreResults = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleItemClick = (item) => {
    if (item.media_type === 'movie') {
      navigate(`/movie/${item.id}`);
    } else if (item.media_type === 'tv') {
      navigate(`/tvseries/${item.id}`);
    }
  };

  return (
    <div>
      <div className="m-4 mr-1 md:ml-12 md:-mr-10 lg:ml-28 lg:mr-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {results.map(item => (
          <div key={item.id} className="relative cursor-pointer" onClick={() => handleItemClick(item)}>
            <img
              className="lg:mt-10 rounded-xl w-full opacity-80 hover:opacity-50 transition-opacity duration-300"
              src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
              alt={ item.name || item.title }
            />
            <div className="px-1 py-3">
              <div className="flex">
                <p className="text-xs md:text-sm pr-3 opacity-70">
                  {item.release_date ? item.release_date.substr(0, 4) : ''}
                  {item.first_air_date ? item.first_air_date.substr(0, 4) : ''}
                </p>
                <MdLocalMovies className="opacity-70 md:text-lg" />
                <p className="pb-2 pl-1 text-xs md:text-sm opacity-70">Movie</p>
              </div>
              <div className="text-xs lg:text-lg lg:mb-2 md:text-sm">{item.title || item.name}</div>
            </div>
          </div>
        ))}
      </div>
      {results.length > 0 && page < totalPages && (
        <button 
          className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={loadMoreResults}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default SearchResults;
