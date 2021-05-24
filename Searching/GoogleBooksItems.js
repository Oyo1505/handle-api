import React, { Fragment, useState } from 'react';
import { Spring, animated, config } from 'react-spring';
import GoogleBook from './GoogleBook';
import { Link } from 'react-router-dom';

 function  GoogleBooksItems(props) {
	const [name, setName] = useState('books')
	const [id, setId] = useState(null)
    const { books, select } = props
     return (
            <>
			{ select === name  && 
        	<div id="books-results">
		        <h2>Books </h2>
		        <br />
				{books.map(book => (
					<>
					<div  className="items-results">
					<Link to={`/book/${book.id}`}>	
						<GoogleBook key={book.id} volume={book.volumeInfo}  />
					</Link>	
					</div>
					 </>
					))}
					
				</div>
        		}
        		{select === null &&
        		<div id="books-results">
		        	<h2>Books </h2>
		        <br />
		        <Spring
				native
				config={config.stiff}
				from={{ opacity: 0 }} 
				to={{ opacity: 1 }}
				delay= '500'>
				{props => (
				books.map(book => (
					<>
					<animated.div style={props} className="items-results">
					<Link to={{pathname:`/book/${book.id}`, state : { id: book.id  } }}>	
						<GoogleBook key={`${book.id}`} volume={book.volumeInfo}  />
					</Link>	
					</animated.div>
					</>
					))
				)}
				</Spring>
			</div>
        }    
		</> 
	)
}

export default GoogleBooksItems;