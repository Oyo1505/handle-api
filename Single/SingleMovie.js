import React, { Component, Fragment } from 'react';
import { Spring, animated, config } from 'react-spring/renderprops';
import Header from '../../containers/Header';
import styled from 'styled-components';



class SingleMovie extends Component {

    constructor() {
        super();
        this.state = {
            show: null,
            video: null,
            toggle: false,
        }

    }

    toggle() {
        this.setState({ toggle: !this.state.toggle });

    }
    componentWillMount() {
        //console.log(window.location.pathname); //yields: "/js" (where snippets run)
       // console.log(window.location.href); //yields: "https://stacksnippets.net/js"
        fetch(`https://api.themoviedb.org/3${this.props.match.url}?api_key=d62acee627fa0503830a6e257e522480&language=en-US`)
            .then(response => response.json())
            .then(json => this.setState({ show: json }));

        fetch(`https://api.themoviedb.org/3${this.props.match.url}/videos?api_key=d62acee627fa0503830a6e257e522480&language=en-US`)
            .then(response => response.json())
            .then(json => this.setState({ video: json }));

    }
    render() {
        const { show, video } = this.state;
        console.log(show);
        console.log(video);
        //console.log(window.location.pathname); //yields: "/js" (where snippets run)
        //console.log(window.location.href);
        return (
            <Fragment>
						
							{show === undefined && 
								<>
								<Header />
									<p>Loading....</p>
								</>
							}
							{show !== null && video !== null &&
								<>
						
									
								<Header  background={show.backdrop_path} title={show.original_title} />

								<div className='l-container'>
								<Spring
								config={config.molasses}
						        from={{ marginLeft: -90, opacity: 0 }}
     							to={{ marginLeft: 0, opacity: 1 }}
								>
								{props => (
									<>
										<section style={props} className="movie-detail">
										<div>
											<img className="poster" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${show.poster_path}`} width='300px' height="450px" />
											<div className="info-wrapper">
												<span> 
													<ul>
														<li>note</li>
														<li>site</li>
														<li>trailer</li>
													</ul>
												</span>
												<div className="overview">
													<h5>Overview</h5>
													<p>{show.overview}</p>
													
												</div>
												<h3>Featured Crew</h3>
													<div className="team-technic">
														<ul>
															<li>kjigkgbjhk</li>
														</ul>
													</div>
												<h3>Infos</h3>
													<div className="info-technic">
														<ul>
															<li>budget</li>
															<li>budget</li>
															<li>budget</li>
															<li>budget</li>
															<li>budget</li>
															<li>budget</li>
															<li>budget</li>
															<li>budget</li>
														</ul>
													</div>
											</div>		
											<div className="clear"></div>
										</div>	
										<div className="casting">
											actor
										</div>
										</section>
									</>
								 )									
								}
								</Spring>
									<section className="section-video">
										<p>suggestion video</p> <button onClick={this.toggle}> afficher </button><br />
										{video.results.map(vid => (	
											<iframe width="280"
											 height="157" 
											 src={`https://www.youtube.com/embed/${vid.key}`} 
											 frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
											 allowFullScreen>
											</iframe>	))}
									</section>
									</div>
									<aside>social media</aside>
								</>

							 }
							
					</Fragment>
        )

    }

}

export default SingleMovie;

/*<Header style={props} background={show.backdrop_path} title={show.original_title} />*/