import React, {Component} from 'react';
import { Spring, animated, config } from 'react-spring/renderprops'
import MovieItem from './MovieItem';

import { Link } from 'react-router-dom';


class MoviesItems extends Component {

constructor(props) {
		super(props);
	 this.state = { toggle: true};
	 this.toggle = this.toggle.bind(this);
}


  toggle () {
  	console.log(this.state.toggle)
  	this.setState({ toggle: !this.state.toggle })

  }

render(){
  const { toggle } = this.state;
  const { movies } = this.props

	if(movies){
				/*movies = this.props.movies.results.map(function(movie,{ x, opacity } ){
		
			})*/
			/*return (

			  	)*/
			
	}

	 return (
				        
			          <Spring
			          native
			          config={config.molasses}
			          from={{ opacity: 0 }} 
			          to={{ opacity: 1 }} delay= '500'
			          >
						{props => (
			      			movies.map(movie => (
					            <animated.div
					             	className="box"
					             	style={props}
					            >
				            		<Link to={`/movie/${movie.id}`}>
				            			<MovieItem key={movie.id} movie={movie}  />
				            		</Link>
				           	 </animated.div>
				            ))
				          )}
					</Spring>
			 )
	}
  
}
export default MoviesItems;

