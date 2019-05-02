import React, { Component } from 'react';

import {Col} from 'react-bootstrap';

const MovieItem = (props) => {

  return (
    <div className="movie-item">

    	<img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${props.movie.poster_path}`} width="128px" height="207px" alt={props.movie.title}/>
    	<h6>{props.movie.title}</h6>
    	
    </div>
  )
}

export default MovieItem;