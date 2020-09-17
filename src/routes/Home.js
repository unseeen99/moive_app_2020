import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };
  getMovies = async () => {
   const {
     data: {
       data: { movies },
      },
    } = await axios.get("http://yts-proxy.now.sh/list_movies.json?sort_by=rating");
   this.setState({movies, isLoading: false });
  }
  
  componentDidMount() {
    //영화 데이터 로딩!!!!!
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
    <section className="container">
      {isLoading ? (
        <div className="loader">
          <span className="loader__text">Loading...</span>
        </div> 
      ) : (
        <div className="movies">
          {
            movies.map(movie => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
        </div>
      )}
    </section>
    );
    //isLoading을 삼항 연산자에 활용했는데... 삼항연산자는 isLoading이 true이면 : 왼쪽의 문장을 false이면 : 오르쪽의 문장을 반환

  }
}

export default Home;