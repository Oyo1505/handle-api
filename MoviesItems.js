import React from 'react';
import MovieItem from './MovieItem';

const MoviesItems = (props) => {

	

	let movies;

	if(props.movies.results){
		//console.log(props.movies.results)
		movies = props.movies.results.map(function(movie){
	
			return <MovieItem movie={movie} key={movie.id} />
		})
	}

  return (
  		<div>
    	{movies}
  	</div>
  )
}

export default MoviesItems;