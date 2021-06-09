import React, {useState } from 'react';
import { Spring, animated, config } from 'react-spring'
import MovieItem from './MovieItem';
import { Link } from 'react-router-dom';
function MoviesItems (props){
    const [name, setName] = useState('movie');
    const { movies, select } = props;
    console.log(select)
        return (
            <>
             <div  id="movies-results">
                { select === name  && 
                 <>   
                    <h2>Movies</h2>
                     <br />
                    { movies.map(movie => (
                        <>
                        <animated.div
                         className="items-results"
                         >
                        <Link to={`/movie/${movie.id}`}>
                            <MovieItem key={movie.id} movie={movie}  />
                        </Link>
                    </animated.div>
                     </>
                    ))}
                 </>    
                }
               
        </div>        
    </>
    )
}
export default MoviesItems;

/*

        { select === null &&
                <> 
                <h2>Movies</h2>
                <br />
        <Spring native config={config.stiff}from={{ opacity: 0 }}  to={{ opacity: 1 }} delay= '500'>
        {props => (
        movies.map(movie => (
        <>
         <animated.div className="items-results" style={props}>
         <Link to={`/movie/${movie.id}`}>
         <MovieItem key={movie.id} movie={movie}  />
          </Link>
          </animated.div>
           
            </>
            ))
        )}
        </Spring>
        </>        
         }
*/