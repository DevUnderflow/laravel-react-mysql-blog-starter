import React from 'react';
import PaginationItem from './PaginationItem';

const Pagination = (props) => {
    //props.data && props.data.total > props.data.per_page

    const num_pages = props.data.last_page;

    let pages = [];

    for (let page = 1; page <= num_pages; page++) {
        pages.push(<PaginationItem key={page} active={props.data.current_page==page} page={page} title={page} show={true} onclick={props.onclick} />);
    }

    return props.data && props.data.total > props.data.per_page?(
        <div className="box-footer clearfix">
            <ul className="pagination pagination-sm no-margin pull-right">
                <PaginationItem active={props.data.current_page==1} page="1" title="First" show={props.data.current_page > 1} onclick={props.onclick} />

                <PaginationItem active={false} title="«" page={props.data.current_page-1} show={props.data.current_page > 1} onclick={props.onclick} />

                {pages}

                <PaginationItem active={false} title="»" page={props.data.current_page+1} show={props.data.current_page < props.data.last_page} onclick={props.onclick} />

                <PaginationItem active={props.data.current_page==props.data.last_page} page={props.data.last_page} title="Last" show={props.data.current_page < props.data.last_page} onclick={props.onclick} />
            </ul>
        </div>
    ):null
};

export default Pagination;