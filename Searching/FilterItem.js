import React, { useState } from 'react';

function FilterItem (props) {
   const [toggle, setToggle]= useState(false);
   function filterSearching (e){
        let value = e.target.dataset.filter;
        props.handle(value);	
        setToggle(!toggle)
    }    
    const { filter } = props;
     return (<li onClick={filterSearching}  data-filter={filter} className="search-item-filters" style={{ color : toggle  ? "#32D482"  :  "black" }} >{filter.toUpperCase()}</li>);
}

export default FilterItem;