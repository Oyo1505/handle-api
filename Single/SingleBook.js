import React, {useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';
import Review from '../Searching/Review';

function SingleBook(props){
 const [book, setBook] = useState(null);
 const [active, setActive] = useState(false);

     useEffect(()=>{
		 const loadBooks = async () => {
			const id_book = props.match.params.id;
			console.log(props.match.params.id)
			await fetch(`https://www.googleapis.com/books/v1/volumes/${id_book}?key=${process.env.REACT_APP_GOOGLE_BOOK_API_KEY}`)
			.then(response => response.json())
			.then(json => setBook(json));
		}
		loadBooks();
	 },[])
   function toggle(){setActive(!active)}
        return (

            <>	
					{!book &&
					<p>Loading ....</p>
					}
					{book && 
					<>	
					
					<header id="book-header">
						<div className="l-container">
							<img src={book.volumeInfo.imageLinks.smallThumbnail} alt="thumbnail-book"/>
							<div className="book-info-head" >
								<h1>{book.volumeInfo.title}</h1>
								<p></p>
								<ul>
									<li className="item-rating-header">
									{book.volumeInfo.averageRating &&
										
										<span> {book.volumeInfo.averageRating}/5</span>
									
									}
									</li>
									<li className="item-header-content" onClick={toggle}><button> <i className={active ? 'icon icon-like-red' : 'icon icon-like'} ></i> Like</button></li>
									<li className="item-header-content"> <button><i className='icon icon-edit' ></i> Write </button></li>
								</ul>
							</div>
							<div className='clear'></div>
						</div>
						</header>
						<div className="l-container">

							
						<div id="book-content">
							<ul>
								<li>
									<Link to='/search-app' className="btn btn-back">
									  <i className="icon icon-back"></i>	Retour
									</Link>
								</li>
								<li>Price : {!book.saleInfo.listPrice &&

												<span>Info Non Disponible</span>
											}
											{book.saleInfo.listPrice &&
												<span>{book.saleInfo.listPrice.amount} Euros</span>
											} </li>
								<li>Release Date: {moment(book.volumeInfo.publishedDate).format('YYYY')}</li>
								<li>Genre : {book.volumeInfo.categories} </li>
								<li>Author : {book.volumeInfo.authors}</li>
							</ul>
								{book.volumeInfo.description}
							</div>

							<Review />
						</div>
						
					</>
					}

			</>

        );
    
}

export default SingleBook;