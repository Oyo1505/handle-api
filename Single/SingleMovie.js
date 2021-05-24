import React, {useEffect, useState } from 'react';
import { Spring, config } from 'react-spring';
import { Modal } from 'react-responsive-modal';
import ReactPlayer from 'react-player';
import imageDefault from '../../images/film-default.png';
import HorizontalScroll from 'react-scroll-horizontal';
import moment from 'moment';
import VideosItems from '../Searching/VideosItems';
import Review from '../Searching/Review';
import CircularProgressbar from 'react-circular-progressbar';
import Header from '../../containers/Header';
import 'react-circular-progressbar/dist/styles.css';


function SingleMovie (props){
	const [toggle, setToggle] = useState(false);
	const [active, setActive] = useState(false);
	const [trailer, setTrailer] = useState(false);
	const [casting, setCasting] = useState(null);
	const [show, setShow] = useState(null);
	const [video, setVideo] = useState(null);

   function toggleFunc(){setToggle(!toggle)}

   function displayVideos(){setActive(!active)}
	useEffect(()=>{
		fetch(`https://api.themoviedb.org/3${props.match.url}?api_key=${process.env.REACT_APP_MOVIESDB_API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(json => setShow( json ));

        fetch(`https://api.themoviedb.org/3/${props.match.url}/videos?api_key=${process.env.REACT_APP_MOVIESDB_API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(json => setVideo(json));

         /*Casting json*/   
        fetch(`https://api.themoviedb.org/3${props.match.url}/credits?api_key=${process.env.REACT_APP_MOVIESDB_API_KEY}`)
            .then(response => response.json())
            .then(json => setCasting(json));
	
	},[])

	function  showTrailerMovie  () {setTrailer(!trailer)}
	function handleCloseModal () {setTrailer(!trailer)}
   
       
        let actorsList;
        let crewList;
   		const child = { width: `400em`, height: `100%`,};
        if (casting) {
            actorsList = casting.cast.map((actor) => {
                if (actor.order <= 4) {
                    return (
                    	<li>
                    		<img className="actor-face" src={`https://image.tmdb.org/t/p/w138_and_h175_face/${actor.profile_path}`} alt={actor.name} width="100%"  />
                    		<p className="actor-name">{actor.name} </p>
                    		<p className="character" >{actor.character}</p>
                    	</li>
                    	);
                }
            })
           crewList = casting.crew.map((team, i) => {
              if (i <= 4) {
                    return (
                    <li  className="profile-movie"> 
                    	<p className="crew-name" >{team.name}</p>
                    	<p className="crew-job">{team.job}</p>
                    </li>);
               }
            })
        }

        return (
            <>	
			{show === undefined &&  show === null && 
			<>
				<p>Loading....</p>
			</>
			}
			{show !== null && video !== null &&
			<>			
			{show.backdrop_path &&
				<Header  background={show.backdrop_path} title={show.original_title} />
			}
			{!show.backdrop_path && 
				<Header   title={show.original_title} />
			}
								
				<a className="btn btn-back" href="/search-app"> <i className="icon icon-back"></i> Retour </a>
				<div className='l-container'>
				<Spring
				config={config.stiff}
				from={{ marginLeft: -90, opacity: 0 }}
     			to={{ marginLeft: 0, opacity: 1 }}
				>
				{props => (
					<>
					<section style={props} className="movie-detail">
					<div>
						{show.poster_path &&
							<img className="poster" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${show.poster_path}`} alt="poster movie" width='300px' height="450px" />
						}
						{!show.poster_path &&
							<img className="poster" src={imageDefault} width='300px' height="450px" alt="poster default"/>
						}					
						<div className="info-wrapper">
							<span> 
							<ul className="header-action">
							{video.results && show.homepage && show.vote_average &&
							<>
							<li id="circle-movie" ><CircularProgressbar  text={`${show.vote_average * 10 }% `}   percentage={show.vote_average * 10 } styles={{ path: {transition: 'stroke-dashoffset 0.3s ease 0s',}, background: { fill: '#000', }, color: '#000' }} strokeWidth="8"/></li>
							<li><a href={show.homepage}>Official Website</a></li>
							{video.results[0] &&
							<>
								<li onClick={showTrailerMovie}><i className='icon icon-play'></i> Play trailer</li>
								{trailer &&
									                                    <Modal  
									                                    size="xl"  
									                                    aria-labelledby="contained-modal-title-vcenter"
									                                    centered 
									                                    onHide={handleCloseModal}
																		   show={trailer}
																		   className="modal-content-djyoutube"
									                                    >
									                                    <Modal.Title className="title-modal-djyoutube"> {show.original_title}</Modal.Title>
									                                     <Modal.Body className="modal-body-djyoutube">
									                                        <ReactPlayer 
															                url={`https://www.youtube.com/watch?v=${video.results[0].key}`}
															                width='100%'
															                config={{  youtube: {
															                     playerVars: { 'showinfo': 1, 'enablejsapi' : 1 }
															                 }, }}
															             
															           		 />
									                                     </Modal.Body>
									                                     </Modal>
									                                     }
								                                     </>
																}	
																<li className="item-header-content" onClick={toggleFunc}><button> <i className={toggle ? 'icon icon-like-red' : 'icon icon-like'} ></i> Like</button></li>
																<li className="item-header-content"> <button><i className='icon icon-edit' ></i> Write </button></li>
															</>
														}														
													</ul>
											
												</span>
												<div className="overview">
													<h5>Overview</h5>
													<p>{show.overview}</p>
												</div>
												<h3>Featured Crew</h3>
													<div className="team-technic">
														<ul className="crew-list">
															{crewList}
															<div className="clear"></div>
														</ul>
													</div>
												<h3>Infos</h3>
													<div className="info-technic">
														<ul>
															<li>Budget : {show.budget === 0 && <span> Nothing to show</span>}{show.budget > 0 && show.budget } $ </li>
															<li>Release : {moment(show.release_date).format('YYYY')}</li>
															<li>Genre : {show.genres.map(genre => (
																	 <span> {genre.name } </span> 
																))}
															</li>
															<div className="clear"></div>
														</ul>
													</div>
											</div>		
											<div className="clear"></div>
										</div>	
										<div className="casting">
											<h3>Top Billed Cast</h3>
												<ul className="actors">
													{actorsList}
													<div className="clear"></div>
												</ul>	
										</div>
										</section>

									</>
								 )									
								}
								</Spring>
								<Review />
									<section className="section-video ">
									<h4 className="item-section-video">Suggestion video</h4> <button className='btn btn-video' onClick={displayVideos} style={{ transform: active ? 'rotate(0deg)' : 'rotate(-90deg)', transitionDuration: '0.50s'  }} ><i className="icon icon-double-arrow"></i>  </button><br />
										<Spring
										config={config.slow}
										from={{height: 0, opacity: 0}}
										to={{ height: active ? '200' : '0', opacity: active ? 1 : 0  }}
										>	
										{props => 
											<>
											<div style={props} >
											<HorizontalScroll className="idée">	<VideosItems style={child}  video={video}  active={displayVideos} /></HorizontalScroll>
											</div>		
											</>
										}
										</Spring>
									</section>
									</div>
								</>
							}
							
		</>
     )
}

export default SingleMovie;
/*<a href={`https://www.youtube.com/watch?v=${video.results[0].key}`}></a>*/