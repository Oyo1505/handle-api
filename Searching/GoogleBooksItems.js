import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { Spring, animated, config } from 'react-spring/renderprops';
import GoogleBook from './GoogleBook';
import { Link } from 'react-router-dom';



export default class GoogleBooksItems extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { books } = this.props
        console.log(books)
        return (
            <Spring
			          native
			          config={config.molasses}
			          from={{ opacity: 0 }} 
			          to={{ opacity: 1 }}
			          delay= '500'
			          >
						{props => (
			      			books.map(book => (
			      				<>
					            <animated.div style={props} className="items-results">
				            		<Link to={`/book/${book.id}`}>	
				            			<GoogleBook key={book.id} volume={book.volumeInfo}  />
				            		</Link>	
				            	
				           	 </animated.div>
				           	 
				           	 </>
				            ))
				          )}
			</Spring>

        )
    }
}