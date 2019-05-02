import React from 'react';

import logoT from '../../images/tetris.jpg';

export default class GoogleBook extends React.Component {

	constructor(props) {
		super(props);
	
	}

	render() {
		return (
			<div>
				{this.props.volume.imageLinks &&

						<img src={this.props.volume.imageLinks.thumbnail} width="128px" height="207px" />
						
				}
				{!this.props.volume.imageLinks &&
					<img src={logoT} width="128px" height="207px" />

				}
				<h6>{this.props.volume.title}</h6>
			</div>
		);
	}
}
