import React, {Fragment} from 'react';
import {Form, FormGroup, FormControl, Container, Row} from 'react-bootstrap';
import GoogleBook from './GoogleBook';
import styled from 'styled-components';
import GoogleLogin from 'react-google-login';


export default class Search extends React.Component {

	constructor(props){
		super(props)
		this.state = { 
			search : '', 
			books:[],
			music:[]
		}
	}

	handleChange = e => {
		e.preventDefault();
		this.setState({	search: e.target.value,	isFetching: true,});

		fetch(`https://www.googleapis.com/books/v1/volumes?q=${e.target.value}&key=AIzaSyAlN3r_xXHhgpuwYTYFcl4c3kKZJc6rXTY`)
		.then(response => response.json())
		.then(json => this.setState({books: json, isFetching: false,}));

		fetch(`https://api.deezer.com/album/302127`)
		.then(response => response.json())
		.then(json => this.setState({music: json, isFetching: false,}));
		console.log(this.state.music);
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
		let books;
		
			
		if(this.state.books.items){
			books = this.state.books.items.map(function(book){
					
					return <GoogleBook  key={book.id}   volume={book.volumeInfo}/>
			})
		}
		return (

			<div className="l-container">
					<div id="search-api">
						<Form>
							<FormGroup>
								<FormControl type="text" className="wrap-input2 validate-input" data-validate="Vous devez remplir le champs" name="search" data-name="name" onChange={this.handleChange} value={this.state.search} id="search-input" placeholder="Votre recherche d'une oeuvre"/>
							</FormGroup>
						</Form>
					<br />
							<Row>
							{!this.state.isFetching && this.state.search.lenght === 0 && this.state.books.trim === '' &&
								<p>Entrez le nom d'un oeuvre</p>
							}
							{this.state.isFetching &&
								<p>Loading...</p>
							}
							{ !this.state.isFetching && this.state.search.length !== 0 &&
								books
							}
							</Row>
				
					</div>
			</div>

		);
	}
}
