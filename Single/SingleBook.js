import React, { Fragment } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import {  Link } from "react-router-dom";
import 'react-circular-progressbar/dist/styles.css';


class SingleBook extends React.Component {


    constructor(props) {
        super(props);
        this.state = { book: [], active: false }
    }

    componentDidMount = async () => {

        const id_book = this.props.match.params.id;

        const req = await fetch(`https://www.googleapis.com/books/v1/volumes/${id_book}?key=AIzaSyAlN3r_xXHhgpuwYTYFcl4c3kKZJc6rXTY`)

        const res = await req.json();
        this.setState({book: res});


    }
    toggle = () => {
        this.setState({ active: !this.state.active })
    }

    render() {
        const book = this.state.book;
        const active = this.state.active

        return (

            <Fragment>
					{this.state.book.volumeInfo && 
					<Fragment>	
					
					<header id="book-header">
						<div className="l-container">
							<img src={book.volumeInfo.imageLinks.smallThumbnail} />
							<div className="book-info-head" >
								<h1>{this.state.book.volumeInfo.title}</h1>
								<p></p>
								<ul>
									<li className="item-rating-header">
									{this.state.book.volumeInfo.averageRating &&
										
										<span> {this.state.book.volumeInfo.averageRating}/5</span>
									
									}
									</li>
									<li className="item-header-content" onClick={this.toggle}><button> <i className={active ? 'icon icon-like-red' : 'icon icon-like'} ></i> Like</button></li>
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
									<Link to='/search-app'>
									 	Retour
									</Link>
								</li>
								<li>Price : {book.saleInfo.listPrice.amount} Euros</li>
								<li>Release Date: {book.volumeInfo.publishedDate}</li>
								<li>Genre : {book.volumeInfo.categories} </li>
								<li>Author : {book.volumeInfo.authors}</li>
							</ul>
								{this.state.book.volumeInfo.description}
							</div>
						</div>
					</Fragment>
					}

			</Fragment>

        );
    }
}

export default SingleBook;