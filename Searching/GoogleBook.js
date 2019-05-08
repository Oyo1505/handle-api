import React, { Fragment } from 'react';

import logoT from '../../images/tetris.jpg';

export default class GoogleBook extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Fragment>
				{this.props.volume.imageLinks &&

					<img src={this.props.volume.imageLinks.thumbnail} width="128px" height="207px" />
						
				}
				{!this.props.volume.imageLinks &&
					<img src={logoT} width="128px" height="207px" />

				}
				<div className="items-list-info">
					<h5>{this.props.volume.title}</h5>
					<p>
						Auteur: {this.props.volume.authors}<br/>
						Editeur: {this.props.volume.publisher}<br/>
						Genre: {this.props.volume.categories}<br/>
						<span>publié en {this.props.volume.publishedDate} </span><br/>
					</p>


				</div>
				<div className="clear"></div>
			</Fragment>
        );
    }
}