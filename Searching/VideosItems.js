import React, {Component} from 'react';
import { Trail, animated, config } from 'react-spring/renderprops';
class VideosItems extends Component {

	constructor(props){
		super(props)

	}
	

	componentWillMunt = () => {
		 fetch(`https://api.themoviedb.org/3${this.props.match.url}/videos?api_key=d62acee627fa0503830a6e257e522480&language=en-US`)
            .then(response => response.json())
            .then(json => this.setState({ video: json }));
	}
	render(){



	const video = this.props.video
    return (
        <div>
	    	
	    	{!video.results &&
				<p>Pas de video disponible pour ce film</p>
			}
			{video.results.map(vid => (	
				<iframe 
				  className="video-single-movie"
				  width="280"
				  height="157" 
				  src={`https://www.youtube.com/embed/${vid.key}`} 
				  frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
				  allowFullScreen>
				</iframe>))
			}

    </div>
    )
}
}

export default VideosItems;