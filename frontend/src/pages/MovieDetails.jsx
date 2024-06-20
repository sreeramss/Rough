// src/pages/MovieDetails.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTdkOTZlMDg4Mzk2M2VlZWM4YTNlZjdjMjQ0OGFkOSIsInN1YiI6IjY2NjdkMGI5YzBhNzg1MTkyNzlhMTFjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ag-Z7XV_cPf-lw7smELllFq3cVM7yQ-rd4N4CzsYtwo'
        }
      };

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          options
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Layout />
      <div className="p-4 mt-12 md:p-8 lg:p-12 max-w-6xl mx-auto bg-gradient-to-r  text-white rounded-lg">
        <div className="flex flex-col md:flex-row bg-opacity-80 rounded-lg overflow-hidden">
          <img
            className="w-full md:w-1/3 object-cover rounded-lg md:rounded-none"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="md:ml-8 p-4 md:p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl lg:text-5xl font-bold">{movie.title}</h1>
              <p className="mt-4 text-sm md:text-lg opacity-65">{movie.overview}</p>
            </div>
            <div className="mt-6 space-y-2">
              <p><strong>Release Date:</strong> <span className=" opacity-60"> {movie.release_date}</span></p>
              <p><strong>Rating:</strong> <span className=" opacity-60"> {movie.vote_average}</span> </p>
              <p><strong>Genres:</strong> <span className=" opacity-60"> {movie.genres.map((genre) => genre.name).join(", ")}</span> </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
