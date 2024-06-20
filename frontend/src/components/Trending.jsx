// src/pages/Trending.js
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { MdLocalMovies } from "react-icons/md";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Trending() {
  const [movies, setMovies] = useState([]);
  const [hoveredBookmark, setHoveredBookmark] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTdkOTZlMDg4Mzk2M2VlZWM4YTNlZjdjMjQ0OGFkOSIsInN1YiI6IjY2NjdkMGI5YzBhNzg1MTkyNzlhMTFjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ag-Z7XV_cPf-lw7smELllFq3cVM7yQ-rd4N4CzsYtwo'
      }
    };
    
    fetch('https://api.themoviedb.org/3/trending/all/week?language=en-US', options)
      .then(response => response.json())
      .then(response => setMovies(response.results.map(movie => ({
        ...movie,
        release_year1: movie.first_air_date ? movie.first_air_date.substr(0, 4) : '',
        release_year: movie.release_date ? movie.release_date.substr(0, 4) : ''      
      }))))
      .catch(err => console.error(err));
  }, []);

  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        }
      },
      {
        breakpoint: 1163,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          arrows: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          arrows: false,
          variableWidth: false,
          adaptiveHeight: true,
        }
      }
    ]
  };

  const handleBookmarkEnter = (index) => {
    setHoveredBookmark(index);
  };

  const handleBookmarkLeave = () => {
    setHoveredBookmark(null);
  };

  const handleItemClick = (item) => {
    if (item.media_type === 'movie') {
      navigate(`/movie/${item.id}`);
    } else if (item.media_type === 'tv') {
      navigate(`/tvseries/${item.id}`);
    }
  };

  return (
    <div className="relative App container mx-auto py-8 lg:pl-2 outline-none md:ml-20 lg:ml-36 lg:-mt-8">
      <h1 className="lg:text-3xl text-2xl m-6 lg:m-3 md:-ml-8 lg:mb-6 lg:-ml-9 font-extralight">Trending</h1>
      {movies.length > 0 ? (
        <div className="carousel-container mx-auto md:-ml-8">
          <Slider {...settings}>
            {movies.map((movie, index) => (
              <div key={movie.id} className="px-2 relative" onClick={() => handleItemClick(movie)}>
                <a href="#">
                  <img
                    className="rounded-lg shadow-lg mx-auto opacity-70 hover:opacity-50 transition-opacity duration-300"
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={movie.title || movie.name}
                    style={{ maxWidth: '100%' }} 
                  />
                  <div>
                    <p className='absolute bottom-0 left-0 text-xs p-4 pb-8 lg:p-8 lg:pb-11 opacity-80'>{movie.release_year}{movie.release_year1}</p>
                    <p className='absolute bottom-0 left-0 text-sm p-8 pl-12 lg:p-11 lg:pl-16 opacity-80 '>{movie.media_type === 'movie' ? <MdLocalMovies /> : <AiOutlinePlayCircle />}</p>
                    <div id={movie._id} className="bookmark-icon-container">
                      {hoveredBookmark === index ? (
                        <FaBookmark className='absolute top-0 right-0 mr-6 mt-2 bookmark-icon transition-transform duration-300 transform hover:scale-100' onMouseLeave={handleBookmarkLeave}/>
                      ) : (
                        <FaRegBookmark className='absolute top-0 right-0 mr-6 mt-2 bookmark-icon transition-transform duration-300 transform hover:scale-100' onMouseEnter={() => handleBookmarkEnter(index)}/>
                      )}
                    </div>
                  </div>
                  <p className="absolute bottom-0 left-0 w-full lg:text-lg p-2 pl-4 lg:p-4 lg:pl-8 ">{movie.title || movie.name}</p>
                </a>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
}

export default Trending;
