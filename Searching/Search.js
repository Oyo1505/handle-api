import React, {Fragment} from 'react';
import Header from '../../containers/Header';
import {Form, FormGroup, FormControl, Container, Row} from 'react-bootstrap';
import Grid from '../Animation/Grid'
import GoogleBooksItems from './GoogleBooksItems';
import MoviesItems from './MoviesItems';
import styled from 'styled-components';
import GoogleLogin from 'react-google-login';


 class Search extends React.Component {

	constructor(props){
		super(props)
		this.state = { 
			search : '', 
			books:[],
			movies:[],
			
			itemsLength: 0,
		}
	}

	handleChange = e => {
		e.preventDefault();
		
		this.setState({	search: e.target.value,	isFetching: true,});

		fetch(`https://www.googleapis.com/books/v1/volumes?q=${e.target.value}&key=AIzaSyAlN3r_xXHhgpuwYTYFcl4c3kKZJc6rXTY`)
		.then(response => response.json())
		.then(json => this.setState({books: json, isFetching: false,}));

		fetch(`https://api.themoviedb.org/3/search/movie?api_key=d62acee627fa0503830a6e257e522480&query=${e.target.value}`)
		.then(response => response.json())
		.then(json => this.setState({movies:json,isFetching: false,}));

	}

	handleSubmit = e =>{
		const form = event.currentTarget;

    if (form.checkValidity() === false) {
    	  event.preventDefault();
    	  event.stopPropagation();
    	}
    	this.setState({ validated: true });
	}
	render() {
		 const { validated } = this.state;

		let resultsSearches = 0 ;

		return (
			<Fragment>	
			<Header />  
				<Container>
						<div id="search-api">
							<Form>
								<FormGroup>
									<FormControl type="text" className="wrap-input2 validate-input" data-validate="Vous devez remplir le champs" name="search" data-name="name" onChange={this.handleChange} value={this.state.search} id="search-input" placeholder="Votre recherche d'une oeuvre"/> 
									
									

									
								</FormGroup>
							</Form>
						<br />
								
							<div id="books-results">
								<h2>Books </h2>

								<br />
								<Row>
								{!this.state.isFetching && this.state.search.length === 0 && this.state.books.trim === '' &&
									<p>Entrez le nom d'un oeuvre</p>
								}
								{this.state.isFetching &&
									<p>Loading...</p>
								}
								{ !this.state.isFetching && this.state.search.length !== 0 && this.state.books.items &&
									<GoogleBooksItems books={this.state.books.items} />
									
								}
								</Row>
							</div>	
								<br />
							<div  id="movies-results">
									<h2>Movies</h2>
									<br />
								<Row>
								{!this.state.isFetching && this.state.search.length === 0 && this.state.movies.trim === '' &&
									<p>Entrez le nom d'un oeuvre</p>
								}
								{this.state.isFetching &&
									<p>Loading...</p>
								}
								{ !this.state.isFetching && this.state.search.length !== 0 &&
									<MoviesItems movies={this.state.movies.results}   />	
									
								}
			     					
								</Row>	
							</div>	
						
							<br />
							<div  id="music-results">
										<h2>Music</h2>
										<br />
										<Row>
											
										</Row>
							</div>	
						</div>	
					
						
				</Container>
			</Fragment>	
		);
	}
}
export default Search;