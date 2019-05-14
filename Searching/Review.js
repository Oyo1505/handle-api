import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

class Review extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            fakeUser: [{
                id: null,
                name: '',
                review: [{
                    title: '',
                    text: '',
                }],

            }]
        }
    }
    componentWillMount = () => {
        this.setState({
            fakeUser: [{           
                    id: 1234,
                    name: '0y0',
                    review: [{
                        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum soda',
                        text: "Morbi elementum velit ut magna porta commodo. In ac tellus efficitur dui facilisis lacinia. Etiam velit risus, blandit eu ex maximus, aliquet interdum elit. Morbi "
                    }],

                }]

        })
    }
    render() {
        const user = this.state.fakeUser;
 
        return (
            <section id="reviews">
					<div>	
					<h3>Reviews</h3>
						{this.state.fakeUser.review &&
							<Fragment>
								<h2>{user.review.title}</h2>
								<p>{user.review.text}</p>
							</Fragment>
						}
							
					</div>

			</section>
        );
    }
}

export default Review;


Review.propTypes = {
    fakeUser: PropTypes.object,
    name: PropTypes.string,
    review: PropTypes.object,

}