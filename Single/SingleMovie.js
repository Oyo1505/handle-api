import React, { Component, Fragment } from 'react';
import { Spring, animated, config } from 'react-spring/renderprops';
import HorizontalScroll from 'react-scroll-horizontal';
import moment from 'moment';
import VideosItems from '../Searching/VideosItems';
import Review from '../Searching/Review';
import CircularProgressbar from 'react-circular-progressbar';
import Header from '../../containers/Header';
import styled from 'styled-components';
import 'react-circular-progressbar/dist/styles.css';


class SingleMovie extends Component {

    constructor() {
        super();
        this.state = {
            show: null,
            video: null,
            casting: null,
            toggle: false,
            active:false,
        }

        this.getFormatMoney = this.getFormatMoney.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({ toggle: !this.state.toggle });

    }

    getFormatMoney(){
    	//TODO
    }
    displayVideos = () =>{
    	this.setState({ active : !this.state.active})
    }
    componentWillMount() {
        //console.log(window.location.pathname); //yields: "/js" (where snippets run)
         //yields: "https://stacksnippets.net/js"

         /*get the show info*/
        fetch(`https://api.themoviedb.org/3${this.props.match.url}?api_key=d62acee627fa0503830a6e257e522480&language=en-US`)
            .then(response => response.json())
            .then(json => this.setState({ show: json }));

        fetch(`https://api.themoviedb.org/3${this.props.match.url}/videos?api_key=d62acee627fa0503830a6e257e522480&language=en-US`)
            .then(response => response.json())
            .then(json => this.setState({ video: json }));

         /*Casting json*/   
        fetch(`https://api.themoviedb.org/3${this.props.match.url}/credits?api_key=d62acee627fa0503830a6e257e522480`)
            .then(response => response.json())
            .then(json => this.setState({ casting: json }));

    }
    render() {
        const { show, video, casting, toggle } = this.state;
        let actorsList;
        let crewList;
   		const child = { width: `400em`, height: `100%`,};
   		 const parent  = { width: `60em`, height: `100%`}
        //console.log(window.location.pathname); //yields: "/js" (where snippets run)
        //console.log(window.location.href);
        if (casting) {

            actorsList = casting.cast.map((actor, i) => {
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
            <Fragment>
						
							{show === undefined && 
								<Fragment>
								<Header />
									<p>Loading....</p>
								</Fragment>
							}
							{show !== null && video !== null &&
								<Fragment>
						
									
								<Header  background={show.backdrop_path} title={show.original_title} />
									<a className="btn btn-back" href="/search-app"> <i className="icon icon-back"></i> Retour </a>
								<div className='l-container'>
								<Spring
								config={config.stiff}
						        from={{ marginLeft: -90, opacity: 0 }}
     							to={{ marginLeft: 0, opacity: 1 }}
								>
								{props => (
									<Fragment>
										<section style={props} className="movie-detail">
										<div>
											<img className="poster" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${show.poster_path}`} width='300px' height="450px" />
											<div className="info-wrapper">
												<span> 
													<ul className="header-action">
														{video.results && show.homepage && show.vote_average &&
															<Fragment>
																<li id="circle-movie" ><CircularProgressbar  text={`${show.vote_average * 10 }% `}   percentage={show.vote_average * 10 } styles={{ path: {transition: 'stroke-dashoffset 0.3s ease 0s',}, background: { fill: '#000', }, color: '#000' }} strokeWidth="8"/></li>
																<li><a href={show.homepage}>Official Website</a></li>
																<li><a href={`https://www.youtube.com/watch?v=${video.results[0].key}`}><i className='icon icon-play'></i> Play trailer</a></li>
																<li className="item-header-content" onClick={this.toggle}><button> <i className={toggle ? 'icon icon-like-red' : 'icon icon-like'} ></i> Like</button></li>
																<li className="item-header-content"> <button><i className='icon icon-edit' ></i> Write </button></li>
															</Fragment>
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

									</Fragment>
								 )									
								}
								</Spring>
									<Review />
									<section className="section-video ">

										<h4 className="item-section-video">Suggestion video</h4> <button className='btn btn-video' onClick={this.displayVideos} style={{ transform: this.state.active ? 'rotate(0deg)' : 'rotate(-90deg)', transitionDuration: '0.50s'  }} ><i className="icon icon-double-arrow"></i>  </button><br />
										<Spring
										config={config.slow}
										from={{height: 0, opacity: 0}}
										to={{ height: this.state.active ? '200' : '0', opacity: this.state.active ? 1 : 0  }}
										>	
										{props => 
											<Fragment>
												<div style={props}  >
												<div style={parent}>
												<HorizontalScroll>
													
														<VideosItems style={child} video={video}  active={this.displayVideos} />
													
												</HorizontalScroll>
											</div>
											</div>		
											</Fragment>
											
										}
										</Spring>
									</section>
									</div>
									<aside id="social-media">
										
									</aside>
								</Fragment>

							 }
							
					</Fragment>
        )

    }

}

export default SingleMovie;
/*<VideosItems video={video}  active={this.displayVideos} />

<div className="box-i one"><div>1</div></div>
<div id="container-test" >
													<div  id="container2"  >
													</div>
												</div>
*/