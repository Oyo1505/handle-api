import React from 'react';

 class SingleBook extends React.Component {


	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props)
		return (
			<div>hey</div>
		);
	}
}

export default SingleBook;