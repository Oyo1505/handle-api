import React from 'react';
import moment from 'moment';
import logoT from '../../images/tetris.jpg';

function GoogleBook(props){
 return (
    <>
		{props.volume.imageLinks &&<img src={props.volume.imageLinks.thumbnail} width="128px" height="207px" alt="thumbnail book " />}
		{!props.volume.imageLinks &&<img src={logoT} width="128px" height="207px" alt="logo default book" />}
		<div className="items-list-info">
		<h5>{props.volume.title}</h5>
		<p>
			Auteur: {props.volume.authors}<br/>
			Editeur: {props.volume.publisher}<br/>
			Genre: {props.volume.categories}<br/>
			<span>Publié en {moment(props.volume.publishedDate).format('YYYY')} </span><br/>
		</p>
		{props.volume.averageRating}/5
		</div>
		<div className="clear"></div>
	</>
    );
}
export default GoogleBook