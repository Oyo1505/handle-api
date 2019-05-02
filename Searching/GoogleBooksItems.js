import React from 'react';
import PropTypes from 'prop-types';
import {Col} from 'react-bootstrap';
import { Spring, animated, config } from 'react-spring/renderprops'
import GoogleBook from './GoogleBook';



export default class GoogleBooksItems extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		  const { books } = this.props
		  console.log(books.items)
		 return (
		
			        
			          <Spring
			          native
			          config={config.molasses}
			          from={{ opacity: 0 }} 
			          to={{ opacity: 1 }} delay= '500'
			          >
						{props => (
			      			books.map(book => (
					            <animated.div className="box"	style={props}  >
				            	
				            			<GoogleBook key={book.id} volume={book.volumeInfo}  />
				            	
				           	 </animated.div>
				            ))
				          )}
					</Spring>

			 )
	}
}
