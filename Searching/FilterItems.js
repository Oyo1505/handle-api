import React, { Fragment, useState} from 'react';
import FilterItem from './FilterItem';
 function FilterItems (props) {
	const [filters, setFilters] = useState(['books', 'movie', 'music'])
	function handleFilter (filter) {props.select(filter)}
	return (
	<>
		<ul>
		{filters.map(filter => {
		return <FilterItem key={filter} filter={filter} handle={handleFilter} />
		})}	
		</ul>
	</>
	);
}
export default FilterItems;