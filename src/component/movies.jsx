import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from './listGroup';
import MoviesTable from "./moviesTable";
import {paginate} from '../utils/paginate';
import Pagination from "./pagination"
import _ from 'lodash'

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: {path: 'title', order: 'asc'}
  };

  componentDidMount(){
    const genres = [{_id: '',name: "All Generes"},...getGenres()]
    this.setState({movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const Movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: Movies });
  };


  handleLike = (movie) => {
    //console.log("Like Clicked",movie);
    const movies = [...this.state.movies]
    const index = movies.indexOf(movie)
    //console.log("Movie index",index);
    movies[index] = {...movies[index]};
    movies[index].liked = !movies[index].liked;
    this.setState({movies})
  }

  handlePageChange = page => {
    this.setState({currentPage: page});
  }
  
  handleGenreSelect = genre =>{
    this.setState({selectedGenre: genre,currentPage: 1});
  }

  handleSort = sortColumn =>{
      this.setState({sortColumn});
  }

  getPagedata = () => {
    const {
        pageSize,
        currentPage,
        movies: allMovies,
        selectedGenre,
        sortColumn
      } = this.state;

    const filtered = selectedGenre && selectedGenre._id
    ? allMovies.filter(m => m.genre._id === selectedGenre._id)
    : allMovies;

    const sorted = _.orderBy(filtered,[sortColumn.path],[sortColumn.order])
    const movies = paginate(sorted,currentPage,pageSize);
    return {totalCount: filtered.length, data:movies}

  } 

  render() {
    const { length } = this.state.movies;
    const {pageSize, currentPage, sortColumn} = this.state;

    if (length === 0) return <p>There are  no moives in our Database</p>;
    const {totalCount, data:movies} = this.getPagedata();

    return (
      <div className = 'row'>
        <div className="col-3">

          <ListGroup 
          items = {this.state.genres} 
          onItemSelect = {this.handleGenreSelect}
          selectedItem = {this.state.selectedGenre}
          />
        </div>

      <div className="col">
          <p>Showing {totalCount} movies in our DataBase.</p>

          <MoviesTable
           movies = {movies}
           sortColumn = {sortColumn}
          onLike = {this.handleLike}
          onDelete = {this.handleDelete}
          onSort = {this.handleSort}
          />

          <Pagination 
          itemsCount = {totalCount} 
          pageSize = {pageSize} 
          onPageChange = {this.handlePageChange}
          currentPage = {currentPage}
          />

        </div>
      </div>
    );
  }
}

export default Movies;
