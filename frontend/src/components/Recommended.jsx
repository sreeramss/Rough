

// // src/pages/Recommended.js
// import { useEffect, useState } from "react";
// import { MdLocalMovies } from "react-icons/md";
// import { FaBookmark, FaRegBookmark } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';

// export default function Recommended() {
//   const [movies, setMovies] = useState([]);
//   const [hoveredBookmark, setHoveredBookmark] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMovies = async () => {
//       const options = {
//         method: "GET",
//         headers: {
//           accept: "application/json",
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTdkOTZlMDg4Mzk2M2VlZWM4YTNlZjdjMjQ0OGFkOSIsInN1YiI6IjY2NjdkMGI5YzBhNzg1MTkyNzlhMTFjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ag-Z7XV_cPf-lw7smELllFq3cVM7yQ-rd4N4CzsYtwo",
//         },
//       };

//       try {
//         const response = await fetch(
//           "https://api.themoviedb.org/3/movie/315635/recommendations?language=en-US&page=1",
//           options
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch movies");
//         }
//         const data = await response.json();

//         // Add release_year1 and release_year properties
//         const modifiedMovies = data.results.map((movie) => ({
//           ...movie,
//           release_year1: movie.first_air_date ? movie.first_air_date.substr(0, 4) : '',
//           release_year: movie.release_date ? movie.release_date.substr(0, 4) : '',
//         }));

//         setMovies(modifiedMovies);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       }
//     };

//     fetchMovies();
//   }, []);

//   const handleBookmarkEnter = (index) => {
//     setHoveredBookmark(index);
//   };

//   const handleBookmarkLeave = () => {
//     setHoveredBookmark(null);
//   };

//   const handleItemClick = (movie) => {
//     navigate(`/movie/${movie.id}`);
//   };

//   return (
//     <div className="">
//       <h1 className="lg:text-3xl text-2xl m-6 md:ml-12 lg:m-3 lg:mb-6 lg:ml-28 font-extralight">
//         Recommended for you
//       </h1>
//       <div className=" m-4 mr-1 md:ml-12 md:-mr-10 lg:ml-28 lg:mr-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
//         {movies.map((movie, index) => (
//           <div key={movie.id} className="relative" onClick={() => handleItemClick(movie)}>
//             <img
//               className=" rounded-xl w-full opacity-80 hover:opacity-50 transition-opacity duration-300"
//               src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
//               alt={movie.title}
//             />
//             <div className="px-1 py-3">
//               <div className="flex">
//                 <p className="text-xs md:text-sm pr-3 opacity-70">
//                   {movie.release_year || movie.release_year1}
//                 </p>
//                 <MdLocalMovies className="opacity-70 md:text-lg" />
//                 <p className="pb-2 pl-1 text-xs md:text-sm opacity-70">Movie</p>
//               </div>
//               <div className="text-xs lg:text-lg lg:mb-2 md:text-sm">{movie.title}</div>
//             </div>
//             <div id={movie._id} className="bookmark-icon-container absolute top-0 right-0 mr-2 mt-2 lg:mr-6 lg:mt-4">
//               {hoveredBookmark === index ? (
//                 <FaBookmark
//                   className="bookmark-icon transition-transform duration-300 transform hover:scale-100"
//                   onMouseLeave={handleBookmarkLeave}
//                 />
//               ) : (
//                 <FaRegBookmark
//                   className="bookmark-icon transition-transform duration-300 transform hover:scale-100"
//                   onMouseEnter={() => handleBookmarkEnter(index)}
//                 />
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }








import {useEffect, useState} from "react";
import {MdLocalMovies} from "react-icons/md";
import {FaBookmark, FaRegBookmark} from "react-icons/fa";
import {addBookmark, deleteBookmark, fetchBookmarks} from "../api";
import {useNavigate} from 'react-router-dom';

export default function Recommended() {
    const [movies, setMovies] = useState([]);
    const [hoveredBookmark, setHoveredBookmark] = useState(null);
    const [bookmarks, setBookmarks] = useState([]);
    const [userId] = useState("user123"); // Replace with actual user ID from authentication
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTdkOTZlMDg4Mzk2M2VlZWM4YTNlZjdjMjQ0OGFkOSIsInN1YiI6IjY2NjdkMGI5YzBhNzg1MTkyNzlhMTFjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ag-Z7XV_cPf-lw7smELllFq3cVM7yQ-rd4N4CzsYtwo",
                },
            };

            try {
                const response = await fetch(
                    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
                    options
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch movies");
                }
                const data = await response.json();

                // Add release_year1 and release_year properties
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

    useEffect(() => {
        const getBookmarks = async () => {
            try {
                const {data} = await fetchBookmarks(userId);
                setBookmarks(data);
            } catch (error) {
                console.error("Error fetching bookmarks:", error);
            }
        };

        getBookmarks();
    }, [userId]);

    const handleBookmarkEnter = (index) => {
        setHoveredBookmark(index);
    };

    const handleBookmarkLeave = () => {
        setHoveredBookmark(null);
    };

    const handleBookmark = async (event, movie) => {
        event.stopPropagation();

        const bookmark = {
            userId,
            movieId: movie.id,
            title: movie.title,
            backdropPath: movie.backdrop_path,
            releaseYear: movie.release_year || movie.release_year1,
        };

        try {
            const {data} = await addBookmark(bookmark);
            setBookmarks([...bookmarks, data]);
        } catch (error) {
            console.error("Error adding bookmark:", error);
        }
    };

    const handleRemoveBookmark = async (event, id) => {
        event.stopPropagation();

        try {
            await deleteBookmark(id);
            setBookmarks(bookmarks.filter(bookmark => bookmark._id !== id));
        } catch (error) {
            console.error("Error removing bookmark:", error);
        }
    };

    const isBookmarked = (movieId) => {
        return bookmarks.some(bookmark => bookmark.movieId == movieId);
    };

    const handleMovieClick = (movie) => {
        navigate(`/movie/${movie.id}`);
    };

    return (
        <div className="">
            <h1 className="lg:text-3xl text-2xl m-6 md:ml-12 lg:m-3 lg:mb-6 lg:ml-28 font-extralight">
                Recommended for you
            </h1>
            <div
                className=" m-4 mr-1 md:ml-12 md:-mr-10 lg:ml-28 lg:mr-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
                {movies.map((movie, index) => (
                    <div key={movie.id} className="relative" onClick={() => handleMovieClick(movie)}>
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
                                <MdLocalMovies className="opacity-70 md:text-lg"/>
                                <p className="pb-2 pl-1 text-xs md:text-sm opacity-70">Movie</p>
                            </div>
                            <div className="text-xs lg:text-lg lg:mb-2 md:text-sm">{movie.title}</div>
                        </div>
                        <div id={movie._id} className="absolute top-0 right-0 mr-2 mt-2 lg:mr-6 lg:mt-4">
                            {isBookmarked(movie.id) ? (
                                <FaBookmark
                                    className="bookmark-icon transition-transform duration-300 transform hover:scale-100"
                                    onClick={(event) => handleRemoveBookmark(event, movie.id)}
                                    onMouseEnter={() => handleBookmarkEnter(index)}
                                    onMouseLeave={handleBookmarkLeave}
                                />
                            ) : (
                                <div className={"bookmark-container"}>
                                    <div className={"bookmark-icon-un-filled"}>
                                        <FaRegBookmark onClick={(event) => handleBookmark(event, movie)}/>
                                    </div>
                                    <div className={"bookmark-icon-filled"}>
                                        <FaBookmark onClick={(event) => handleRemoveBookmark(event, movie.id)}/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
