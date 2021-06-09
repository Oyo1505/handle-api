import React, {useEffect, useState } from 'react';
import moment from 'moment';
import Header from '../Searching/Header';
import Recommandations from '../Searching/Recommandations';
import AsideMovie from '../Searching/AsideMovie'
import MediaMovie from '../Searching/MediaMovie';
import 'react-circular-progressbar/dist/styles.css';


function SingleMovie (props){
	const [casting, setCasting] = useState(null);
	const [show, setShow] = useState(null);
	const [video, setVideo] = useState(null);
	const [recommandations, setRecommandations] = useState(null);
    const [images, setImages]= useState(null)
	useEffect(()=>{
		fetch(`https://api.themoviedb.org/3${props.match.url}?api_key=${process.env.REACT_APP_MOVIESDB_API_KEY}&language=fr-FR`)
            .then(response => response.json())
            .then(json => setShow( json ));
		/*Video json*/   
        fetch(`https://api.themoviedb.org/3/${props.match.url}/videos?api_key=${process.env.REACT_APP_MOVIESDB_API_KEY}&language=fr-FR`)
            .then(response => response.json())
            .then(json => setVideo(json));

         /*Casting json*/   
        fetch(`https://api.themoviedb.org/3${props.match.url}/credits?api_key=${process.env.REACT_APP_MOVIESDB_API_KEY}&language=fr-FR`)
            .then(response => response.json())
            .then(json => setCasting(json));

		 /*Recommandations json*/   
        fetch(`https://api.themoviedb.org/3${props.match.url}/recommendations?api_key=${process.env.REACT_APP_MOVIESDB_API_KEY}&language=fr-FR`)
            .then(response => response.json())
            .then(json => setRecommandations(json));
	
		/*Images json*/   
		 fetch(`https://api.themoviedb.org/3${props.match.url}/images?api_key=${process.env.REACT_APP_MOVIESDB_API_KEY}&language=en-US`)
			.then(response => response.json())
			.then(json => setImages(json));

	
	},[])
        let actorsList;
       if (casting) {
            actorsList = casting.cast.map((actor) => {
                if (actor.order <= 10) {
                    return (
                    	<li key={actor.name}>
                    		<img className="actor-face" src={`https://image.tmdb.org/t/p/w138_and_h175_face/${actor.profile_path}`} alt={actor.name} width="100%"  />
                    		<p className="actor-name">{actor.name} </p>
                    		<p className="character" >{actor.character}</p>
                    	</li>
                    	);
                }
            })
			var crewCasting = casting.crew
        }
		
        	return (
        <>

			<div className='single-page-search'>
			{show === undefined &&  show === null && 
			<>
				<p>Loading....</p>
			</>
			}
			{show !== null && video !== null &&
			<>			
			{show.backdrop_path &&
				<Header  backgroundImage={show.backdrop_path} title={show.original_title} show={show}  video={video} crew={crewCasting}/>
			}
			{!show.backdrop_path && 
				<Header   title={show.original_title} />
			}
			<section className="main-section-single-movie">
			<div className="column-movie-information">
				<div>
					<div className="wrapped_content">
					<a className="btn btn-back" href="/search-app"> <i className="icon icon-back"></i> Retour </a>	
					<section className="panel ">
						<h3>Top Billed Cast</h3>
						<ul className="actors scroller">
							{actorsList}				
						</ul>	
					</section>		
					<MediaMovie video={video} images={images}/>
					<Recommandations list={recommandations} />				
					
					</div>
				</div>
				<AsideMovie url={props.match.url} show={show}/>
				
			</div>
			</section>			
				</>
				}
					
			</div>	
			
			
		</>
     )
}

export default SingleMovie;
