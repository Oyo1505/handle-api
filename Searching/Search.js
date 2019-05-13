import React, { Fragment } from 'react';
import Header from '../../containers/Header';
import FilterItems from './FilterItems';
import { Form, FormGroup, FormControl, Container, Row, Button } from 'react-bootstrap';
import Grid from '../Animation/Grid'
import GoogleBooksItems from './GoogleBooksItems';
import MoviesItems from './MoviesItems';
import styled from 'styled-components';
import GoogleLogin from 'react-google-login';


class Search extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            search: '',
            books: [],
            movies: [],
            select: null,
            itemsLength: 0,
            isFetching: false,
        }
    }

    handleChange = async (e) => {
        e.preventDefault();

        this.setState({ search: e.target.value, isFetching: true, });


        fetch(`https://www.googleapis.com/books/v1/volumes?q=${e.target.value}&key=AIzaSyAlN3r_xXHhgpuwYTYFcl4c3kKZJc6rXTY`)
            .then(response => response.json())
            .then(json => this.setState({ books: json, isFetching: false, }));


        fetch(`https://api.themoviedb.org/3/search/movie?api_key=d62acee627fa0503830a6e257e522480&query=${e.target.value}`)
            .then(response => response.json())
            .then(json => this.setState({ movies: json, isFetching: false, }));

    }
    componentDidMount =() =>{

    			const json_books = localStorage.getItem("books");
    			const json_movies = localStorage.getItem("movies");
    			if(json_books !== null && json_movies !== null){

    				const books = JSON.parse(json_books);
    				const movies = JSON.parse(json_movies)
    				this.setState({ books : books, movies: movies });
    				
    			}

    }
    componentDidUpdate = () => {
    	const books = JSON.stringify(this.state.books);
    	const movies = JSON.stringify(this.state.movies);
    	 localStorage.setItem("books", books);
    	 localStorage.setItem("movies", movies);
    	
    }
    handleSelect = value => {
        this.setState({select: value });
    }

    deleteFilter = (e) =>{
    	e.preventDefault();
    	this.setState({select: null})
    }


    render() {
        const { validated } = this.state;
        let resultsSearches = 0;
        
        return (
            <Fragment>	
			<Header />  
			<aside className="filters-search search-block">
				<h4>Filtres</h4>
				<FilterItems select={this.handleSelect} />
			</aside>
				<Container className="continer-api search-block">
						<div id="search-api">
							<Form>
								<FormGroup>
									<FormControl type="text" className="wrap-input2 validate-input" data-validate="Vous devez remplir le champs" name="search" data-name="name" onChange={this.handleChange} value={this.state.search} id="search-input" placeholder="Votre recherche d'une oeuvre"/> 		  
  								  </FormGroup>
							</Form>
						<br />
								{this.state.select && 
									<button className="btn-filter">{this.state.select} <span onClick={this.deleteFilter}>x</span> </button>
								}


								{!this.state.isFetching && this.state.search.length === 0 && this.state.books.trim === '' && this.state.books === null &&
									<p>Entrez le nom d'un oeuvre</p>
								}
								{this.state.isFetching &&
									<p>Loading...</p>
								}
								{  this.state.books.items && this.state.books.items !== undefined && this.state.books.length !== 0 &&
							
									<GoogleBooksItems select={this.state.select}  books={this.state.books.items} />
									
								}

							
								<br />
						
								
								{!this.state.isFetching && this.state.search.length === 0 && this.state.movies.trim === '' &&
									<p>Entrez le nom d'un oeuvre</p>
								}
								{this.state.isFetching &&
									<p>Loading...</p>
								}
								{  this.state.movies.results !== undefined &&  this.state.movies.length !== 0 &&	
									<MoviesItems select={this.state.select} movies={this.state.movies.results}   />	
								}
			     					
								
							</div>	
						
							<br />
							<div  id="music-results">
										<h2>Music</h2>
										<br />
										<Row>
											
										</Row>
							</div>	
						
					
			</Container>
			<div className="clear"></div>
			</Fragment>
        );
    }
}
export default Search;