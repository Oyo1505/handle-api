import React from 'react';

function VideosItems (props) {
    const {video} = props
    return (
        <>	
		tedst
	    {!video.results &&
		<p>Pas de video disponible pour ce film</p>
		}
		{video.results.map(vid => (	
			<div  className="item-video"  key={vid.key} >
			<embed 
			className='testH'			 
		    src={`https://www.youtube.com/embed/${vid.key}`} 
		    allowFullScreen />
			</div>
			))
		}
    </>
 )    
}

export default VideosItems;