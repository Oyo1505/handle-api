import React, { Fragment } from 'react';

class SingleBook extends React.Component {


    constructor(props) {
        super(props);
        this.state = { book: [], active: false }
    }

    componentWillMount = () => {
        fetch(`https://www.googleapis.com/books/v1/volumes/${this.props.match.params.id}?key=AIzaSyAlN3r_xXHhgpuwYTYFcl4c3kKZJc6rXTY`)
            .then(response => response.json())
            .then(json => this.setState({ book: json, }));
    }

    toggle = () => {
    	this.setState({active : !this.state.active})
    }

    render() {
        const book = this.state.book;
        const active = this.state.active	
        console.log(active)
        return (

            <Fragment>
					{this.state.book.volumeInfo && 
					<Fragment>	
					
					<header id="book-header">
						<div className="l-container">
							<img src={book.volumeInfo.imageLinks.smallThumbnail} />
							<div className="book-info-head" >
								<h1>{this.state.book.volumeInfo.title}</h1>
								<ul>
									<li>NOTE</li>
									<li onClick={this.toggle}><button> <i className={active ? 'icon icon-like-red' : 'icon icon-like'} ></i>LIKE</button></li>
									<li>Write </li>
								</ul>
							</div>
							<div className='clear'></div>
						</div>
						</header>
						<div className="l-container">
							<div className="book-content">
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