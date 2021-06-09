import React, {useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';
import Review from '../Searching/Review';
import HeaderBook from '../Searching/HeaderBook';
import Header from '../Searching/Header';

function SingleBook(props){
 const [book, setBook] = useState(null);

useEffect(()=>{
 const loadBooks = async () => {
	const id_book = props.match.params.id;
	await fetch(`https://www.googleapis.com/books/v1/volumes/${id_book}?key=${process.env.REACT_APP_GOOGLE_BOOK_API_KEY}`)
			.then(response => response.json())
			.then(json => setBook(json));
		}
		loadBooks();
	 },[])
if(book){
	var htmlString =book.volumeInfo.description;
	var plainString = getText(htmlString)
}
function getText(html){
    var divContainer= document.createElement("div");
    divContainer.innerHTML = html;
    return divContainer.textContent || divContainer.innerText || "";
}

        return (
            <>	
				<div className="single-page-search"> 
					{!book &&
					<p>Loading ....</p>
					}
					{book && 
					<>	
					{console.log(book.volumeInfo)}
						<HeaderBook authors={book.volumeInfo.authors} cover={book.volumeInfo.imageLinks.thumbnail} backgroundImage={book.volumeInfo.imageLinks.large} bookInfo={book.volumeInfo} genres={book.volumeInfo.categories} title={book.volumeInfo.title} release={book.volumeInfo.publishedDate}/>
						<div className="main-section-single-movie">
						<div id="column-movie-information">
							<div>
							<div className="column-movie-information">
							<div className="wrapped_content">
							<ul style={{display: 'flex', flexDirection : 'row', alignItems:'center'}}>
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
							</ul>
							{plainString}
							<Review />
							</div>
							</div>
							</div>
							</div>
						</div>
						
					</>
					}
			</div>
			</>

        );
    
}

export default SingleBook;


/*
			<header id="header-content">
						<div className="custom_b">
						<div className="single_column">

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
						
						</div>
						</div>				
						</header>
*/