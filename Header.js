import React, { Component } from 'react';
import Nav from "../components/Nav"
import code from '../images/code.jpg'

class Header extends Component {



	render(){

		const { title, background } = this.props;
		return(
				<header>

						
							
						 	{!background && 
						 		<>
						 		<div className='carousel-box'>
						 			<div className='pixel-overlay'></div>
									<h1>Henri-Pierre RIGOULET <br /> Intégrateur - Développeur Web</h1>
						 			<img  margin={0} className='image-fixed' alt="1920x750" src={code}  />
						 		</div>	
						 		<Nav />	
						 		</>
						 	}
						 	{background && 
						 		<>
						 		<div className='carousel-box'>
						 			<div className='pixel-opacity'></div>
						 			<h1>{title}</h1>
						 			<img  margin={0} className='image-fixed' alt="1920x750" src={`https://image.tmdb.org/t/p/w1400_and_h450_face${background}`}  />
						 		</div>
						 		</>
						 	}
						 	
						
						
						
				</header>

			);
	}
}

export default Header
/*
{background && 
						 		<>
						 		<div className='carousel-box'>
						 			<h1>{title}</h1>
						 			<img  margin={0} className='image-fixed' alt="1920x750" src={`https://image.tmdb.org/t/p/w1400_and_h450_face${background}`}  />
						 		</div>
						 		</>
						 	}

*/