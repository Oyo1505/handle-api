import React, { Component, Fragment } from 'react';
import Header from '../../containers/Header';
import styled from 'styled-components';



class SingleMovie extends Component  {

	constructor(){
		super();
		this.state = { 
			show: null,
			video: null,
			toggle:false,
		}
		this.toggle = this.toggle.bind(this)
	}

	toggle(){
		this.setState({toggle: !this.state.toggle});
		console.log(this.state.toggle)
	}
	componentWillMount(){
	
		fetch(`https://api.themoviedb.org/3${this.props.match.url}?api_key=d62acee627fa0503830a6e257e522480&language=en-US`)
		.then(response => response.json())
		.then(json => this.setState({show:json}));

		fetch(`https://api.themoviedb.org/3${this.props.match.url}/videos?api_key=d62acee627fa0503830a6e257e522480&language=en-US`)
		.then(response => response.json())
		.then(json => this.setState({video:json}));

	}
	render (){
		const {show, video} = this.state;
	console.log(video)
		return(
					<Fragment>
						
							{show === null && 
								<>
								<Header />
									<p>Loading....</p>
								</>
							}
							{show !== null && video !== null &&
															<>
									<Header background={show.backdrop_path} title={show.original_title} />
									<section className="movie-detail">
										<p>{show.original_title}</p>
									</section>
									<section className="section-video">
										<p>suggestion video</p> <button onClick={this.toggle}> afficher </button><br />
										{video.results.map(vid => (	
											<iframe width="560"
											 height="315" 
											 src={`https://www.youtube.com/embed/${vid.key}`} 
											 frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
											 allowfullscreen>
											</iframe>	))}
									</section>
								</>
							 }
					</Fragment>
			)
	
	}

}

export default SingleMovie;