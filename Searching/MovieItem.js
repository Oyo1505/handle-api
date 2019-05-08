import React, { Component, Fragment } from 'react';


const MovieItem = (props) => {

    return (
        <Fragment>

    		<img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${props.movie.poster_path}`} width="128px" height="207px" alt={props.movie.title}/>
    		<div className="items-list-info">
    			<h5>{props.movie.title}</h5>
    			<p>
    				Sortie en {props.movie.release_date}
    			</p>
    		</div>
    	</Fragment>
    )
}

export default MovieItem;