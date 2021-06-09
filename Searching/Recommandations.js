import React from 'react'
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

function Recommandations(props){
    const { list } = props;
    const history = useHistory();
    const goLogin = (id) => history.push(`/movie/${id}`);
  
    return(
        <>
        <section className=" panel recommandations">
		<h4 className="item-section-video">Recommandations</h4>
        <div className="recommandations-list">
		{list && 
		    list.results.map(movie =>{
			    return	<div key={movie.id} className='item-recommandation'>
                            <div className="movie-recommandation">
                            <Link to={`/movie/${movie.id}`}>
                                    <img loading="lazy" src={`https://image.tmdb.org/t/p/w250_and_h141_face${movie.poster_path}`} alt={`recommandation-film-${movie.original_title}`} />
                                    <div className='movie-title'><h5 style={{top:"34%", position :'relative'}}>{movie.original_title}</h5></div>
                            </Link > 
                            </div>
                        </div>
			})
			}
			{!list &&
			<p>Aucun Film dans cette section.</p>
			}
		</div>
        </section>	
        </>
    )
}

export default Recommandations