// src/pages/Movies.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdLocalMovies } from "react-icons/md";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import Layout from "../components/Layout";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [hoveredBookmark, setHoveredBookmark] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTdkOTZlMDg4Mzk2M2VlZWM4YTNlZjdjMjQ0OGFkOSIsInN1YiI6IjY2NjdkMGI5YzBhNzg1MTkyNzlhMTFjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ag-Z7XV_cPf-lw7smELllFq3cVM7yQ-rd4N4CzsYtwo'
        }
      };

      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
          options
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();

        const modifiedMovies = data.results.map((movie) => ({
          ...movie,
          release_year1: movie.first_air_date ? movie.first_air_date.substr(0, 4) : '',
          release_year: movie.release_date ? movie.release_date.substr(0, 4) : '',
        }));

        setMovies(modifiedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleBookmarkEnter = (index) => {
    setHoveredBookmark(index);
  };

  const handleBookmarkLeave = () => {
    setHoveredBookmark(null);
  };

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div>
      <Layout />
      <h1 className="lg:text-3xl text-2xl m-6 mt-14 lg:mt-8 md:ml-12 lg:m-3 lg:mb-6 lg:ml-28 font-extralight">
        Movies
      </h1>
      <div className="m-4 mr-1 md:ml-12 md:-mr-10 lg:ml-28 lg:mr-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie, index) => (
          <div key={movie.id} className="relative cursor-pointer" onClick={() => handleMovieClick(movie.id)}>
            <img
              className=" rounded-xl w-full opacity-80 hover:opacity-50 transition-opacity duration-300"
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
            />
            <div className="px-1 py-3">
              <div className="flex">
                <p className="text-xs md:text-sm pr-3 opacity-70">
                  {movie.release_year || movie.release_year1}
                </p>
                <MdLocalMovies className="opacity-70 md:text-lg" />
                <p className="pb-2 pl-1 text-xs md:text-sm opacity-70">
                  Movie
                </p>
              </div>
              <div className="text-xs lg:text-lg lg:mb-2 md:text-sm">
                {movie.title}
              </div>
            </div>
            <div id={movie._id} className="bookmark-icon-container absolute top-0 right-0 mr-2 mt-2  lg:mr-6 lg:mt-4">
              {hoveredBookmark === index ? (
                <FaBookmark
                  className="bookmark-icon transition-transform duration-300 transform hover:scale-100"
                  onMouseLeave={handleBookmarkLeave}
                />
              ) : (
                <FaRegBookmark
                  className="bookmark-icon transition-transform duration-300 transform hover:scale-100"
                  onMouseEnter={() => handleBookmarkEnter(index)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
