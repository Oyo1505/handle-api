import React, {useEffect, useState } from 'react';
import FilterItems from './FilterItems';
import { Modal } from 'react-responsive-modal';
import GoogleBooksItems from './GoogleBooksItems';
import MoviesItems from './MoviesItems';

function Search (props) {
    const [search, setSearch] = useState('');
    const [isFetching, setFecthing] = useState(false);
    const [movies, setMovies] = useState([]);
    const [books, setBooks] = useState([]);
    const [music, setMusic] = useState([]);
    const [select, setSelect] = useState(null);
    const [itemsLength, setItemsLength] = useState(0);

    async function handleChange(e){
        e.preventDefault();
        var value = e.target.value.replace(/\s/g, "+");
        setSearch(e.target.value);
        setFecthing(true);

        fetch(`https://www.googleapis.com/books/v1/volumes?q=${value}&key=${process.env.REACT_APP_GOOGLE_BOOK_API_KEY}`)
            .then(response => response.json())
            .then(json =>{
                setBooks(json);
                setFecthing(false);
            });


        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIESDB_API_KEY}&query=${value}`)
            .then(response => response.json())
            .then(json =>{
                setMovies(json);
                setFecthing(false);
            });

    }
    /*useEffect(()=>{
        const json_books = localStorage.getItem("books");
        const json_movies = localStorage.getItem("movies");
        if (json_books !== null && json_movies !== null) {
            const booksParsed = JSON.parse(json_books);
            const moviesParsed = JSON.parse(json_movies)
            setBooks(booksParsed);
            setMovies(moviesParsed);
        }
    })*/
   
    useEffect(()=>{
        const booksLocalStorage = JSON.stringify(books);
        const moviesLocalStorage = JSON.stringify(movies);
        localStorage.setItem("books", booksLocalStorage);
        localStorage.setItem("movies", moviesLocalStorage);
     }, [movies, books])
    /*componentDidMount = () => {

        const json_books = localStorage.getItem("books");
        const json_movies = localStorage.getItem("movies");
        if (json_books !== null && json_movies !== null) {

            const books = JSON.parse(json_books);
            const movies = JSON.parse(json_movies)
            setState({ books: books, movies: movies });
        }
    }
    componentDidUpdate = () => {
        const books = JSON.stringify(books);
        const movies = JSON.stringify(movies);
        localStorage.setItem("books", books);
        localStorage.setItem("movies", movies);

    }*/
 function handleSelect (value) {
        setSelect(value);
    }
    function deleteFilter(e){
        e.preventDefault();
        setSelect(null);
    }

        return (
            <>	
            <div className="search-app-container">
			<aside className="filters-search search-block">
				<h4>Filtres</h4>
				<FilterItems select={handleSelect} />
			</aside>
				<div className="container-api search-block">
						<div id="search-api">
							<form>
								<label>
									<input type="text" className="wrap-input2 validate-input" data-validate="Vous devez remplir le champs" name="search" data-name="name" onChange={handleChange} value={search} id="search-input" placeholder="Votre recherche d'une oeuvre"/> 		  
  								  </label>
							</form>
						<br />
								{select && 
									<button className="btn-filter">{select} <span onClick={deleteFilter}>x</span> </button>
								}
								{!isFetching && search.length === 0 && books.trim === '' && books === null &&
									<p>Entrez le nom d'un oeuvre</p>
								}
								{isFetching &&
									<p>Loading...</p>
								}
								{  books.items && books.items !== undefined && books.length !== 0 &&
							
									<GoogleBooksItems select={select}  books={books.items} />	
								}						
								<br />	
								{!isFetching && search.length === 0 && movies.trim === '' &&
									<p>Entrez le nom d'un oeuvre</p>
								}
								{isFetching &&
									<p>Loading...</p>
								}
								{  movies.results !== undefined &&  movies.length !== 0 &&	
									<MoviesItems select={select} movies={movies.results}   />	
								}			     					
							</div>	
							<br />
							<div  id="music-results">	
								<br />
								
							</div>	
			</div>
			
            </div>
			</>
        );
}
export default Search;