import React from "react";
import { useState, useEffect } from "react";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import Navbar from "../../Components/Navbar/Navbar";
import { getAllMovies } from "../../api/movies";
import img1 from "../../assets/1.avif";
import img2 from "../../assets/2.avif";
import img3 from "../../assets/3.avif";
import img4 from "../../assets/4.avif";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader.jsx";
import "./Home.css";

function Home() {
  const [allmovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const images = [img1, img2, img3, img4];

  useEffect(() => {
    setLoading(true);
    getAllMovies()
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          setMovies(data);
          setAllMovies(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const filterMoviesBySearch = (searchText) => {
    const filteredMovies = allmovies.filter((movie) => {
      return movie.name.toLowerCase().includes(searchText.toLowerCase());
    });
    setMovies(filteredMovies);
  };

  const handleGotoDetailPage = (movieId) => {
    navigate(`/movie-detail/${movieId}`);
  };

  return (
    <>
      <div>
        <Navbar filterMoviesBySearch={filterMoviesBySearch} showSearch={true} />
      </div>
      <div className="container-fluid mt-1">
        <CCarousel controls>
          {images.map((image, key) => {
            return (
              <CCarouselItem>
                <CImage
                  className="d-block w-100"
                  src={image}
                  alt={`slide${key + 1}`}
                />
              </CCarouselItem>
            );
          })}
        </CCarousel>
      </div>
      <div className="container main-section">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="row  ">
            {movies.map((movie) => {
              return (
                <div
                  className="col-lg-3 col-md-4 col-sm-6 movie-tile bg-dark text-light"
                  onClick={() => {
                    handleGotoDetailPage(movie._id);
                  }}
                >
                  <img
                    src={movie.posterUrl}
                    alt="poster"
                    className="image-tile"
                  />
                  <h3>{movie.name}</h3>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
