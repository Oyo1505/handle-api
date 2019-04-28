import React from 'react';
import {Col} from 'react-bootstrap';
import logoT from '../../images/tetris.jpg';

export default class GoogleBook extends React.Component {

	constructor(props) {
		super(props);
	
	}

	componentWillmount(){

	}
	render() {
	
		return (
			<Col>
				{this.props.volume.imageLinks &&

						<img src={this.props.volume.imageLinks.thumbnail} width="128px" height="207px" />
						
				}
				{!this.props.volume.imageLinks &&
					<img src={logoT} width="128px" height="207px" />

				}
				<p>{this.props.volume.title}</p>
			</Col>
		);
	}
}
