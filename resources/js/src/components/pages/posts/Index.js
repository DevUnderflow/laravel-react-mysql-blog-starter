import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// actions
import { listPosts, setPostDefaults } from '../../../store/actions/PostActions';

// partials
import Spinner from '../../partials/Spinner';
import Pagination from '../../partials/Pagination';
import SuccessAlert from '../../partials/SuccessAlert';
import ErrorAlert from '../../partials/ErrorAlert';
import Row from './Row';

class Index extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {
        this.props.setPostDefaults();
        this.props.listPosts(1);
    }

    render()
    {
        return (
            <div className="post-wrapper">
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box-body">
                                <SuccessAlert
                                    msg={this.props.post.success_message}
                                />
                                <ErrorAlert
                                    msg={this.props.post.error_message}
                                />
                                <div className="flex flex-col justify-center items-center">
                                    <Link
                                        to="/posts/add"
                                        className="flex flex-row justify-center items-center border-dashed border-2 p-5 hover:border-#72afd2 border-gray-600 text-gray-600 overflow-hidden rounded my-4 sm:w-full lg:w-1/2"
                                    >
                                        <i className="fa fa-edit px-3"></i>
                                        Start new post
                                    </Link>
                                </div>
                                <Spinner show={this.props.post.list_spinner} />
                                {this.props.post.posts.data
                                    ? this.props.post.posts.data.map(item => (
                                          <Row key={item.id} post={item} />
                                      ))
                                    : null}
                            </div>

                            <Pagination
                                data={this.props.post.posts}
                                onclick={this.props.listPosts.bind(this)}
                            />
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

  return {
      post: state.post
  };
};

const mapDispatchToProps = (dispatch) => {

    return {
       listPosts: (page) => dispatch(listPosts(page)),
        setPostDefaults: () => dispatch(setPostDefaults())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
