import React, { Component } from "react";
import PropTypes from 'prop-types';
import _ from "lodash";

const Pagination = ({itemsCount, pageSize, currentPage, onPageChange} ) => {
    //console.log(currentPage)
    //const pageSize = 4
    //const {onPageChange,currentPage} = props;
    //console.log(itemsCount);
    //console.log(pageSize);

    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;

    //console.log(pagesCount)

    const pages = _.range(1,pagesCount + 1)

    //console.log(pages);


    return ( 
        <div className="container">      
          <ul className="pagination">
              {pages.map(page => 
              <li key = {page} className = {page === currentPage ? 'page-item active' : 'page-item'}>
                  <a className = "page-link" onClick = {() => onPageChange(page)}> {page} </a>
              </li> )
              }
          </ul>
          
        </div>
        
          );
 }

 Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired   
 }
 


export default Pagination;
