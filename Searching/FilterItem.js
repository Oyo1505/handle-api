import React from 'react';

export default class FilterItem extends React.Component {


    filterSearching = e => {
        let value = e.target.dataset.filter;
        this.props.handle(value);	

    }

    render() {
        const { filter } = this.props;
        return (
            <li onClick={this.filterSearching} data-filter={filter} >{filter.toUpperCase()}</li>
        );
    }
}