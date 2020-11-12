import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePost } from '../../../store/actions/PostActions';
import Post from '../../../apis/Post';

class Row extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            likes: 0
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleLikes = this.handleLikes.bind(this);

    }

    componentDidMount() {
        this.setState({ likes: this.props.post.likes_counter });
    }

    handleLikes(e) {
        e.preventDefault();
        Post.add_likes(
            this.props.post.id,
            response => {
                this.setState((prevState) => ({
                    likes: response.data.data.likes_counter
                }));
            },
            err => {
                this.setState({
                    error_message: err.response.data.message,
                    errors: err.response.data.errors
                });
            }
        );
    }

    handleDelete(e) {
        e.preventDefault();

        if(confirm("Are you sure?")) {
            this.props.deletePost(this.props.post.id);
        }
    }

    render()
    {
        return (
            <div className="flex flex-col justify-center items-center">
                <article className="overflow-hidden rounded my-4 w-full sm:w-full lg:w-1/2 shadow-lg">
                    <div className="sm:flex sm:flex-wrap">
                        <div className="sm:w-1/2 h-56 sm:h-auto relative">
                            <img
                                className="w-full h-full absolute inset-0 object-cover"
                                src={this.props.post.image_url}
                                alt="image"
                            />
                        </div>
                        <div className="sm:w-1/2 p-6 pt-4 bg-white">
                            <h4 className="text-4xl font-semibold capitalize text-gray-800 mt-2">
                                <Link to={"/posts/" + this.props.post.id}>
                                    {this.props.post.title}
                                </Link>
                            </h4>
                            <p
                                className="text-gray-600 mt-4 line-clamp"
                                dangerouslySetInnerHTML={{
                                    __html: this.props.post.content
                                }}
                            ></p>
                            <div className=" mt-5 flex flex-row items-center">
                                <button
                                    onClick={this.handleLikes}
                                    className="bg-gray-300 hover:bg-gray-400 hover:text-gray-800 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mr-2"
                                >
                                    <span className="mr-3">
                                        {this.state.likes}
                                    </span>
                                    <i className="fa fa-thumbs-up"></i>
                                </button>
                                {this.props.post.user.id ==
                                localStorage.getItem("user.id") ? (
                                    <p>
                                        <Link
                                            to={
                                                "/posts/edit/" +
                                                this.props.post.id
                                            }
                                            className="btn-color hover:bg-gray-400 text-white hover:text-gray-400 font-bold py-3 px-4 mr-2 rounded inline-flex items-center"
                                        >
                                            <i className="fa fa-edit"></i>
                                        </Link>
                                        <a
                                            href="#"
                                            className="bg-red hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded inline-flex items-center"
                                            onClick={this.handleDelete}
                                        >
                                            <i className="fa fa-remove"></i>
                                        </a>
                                    </p>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="flex items-center mt-3">
                                <img
                                    className="h-10 w-10 object-cover rounded"
                                    src={
                                        this.props.post.user.image_url !== null
                                            ? this.props.post.user.image_url
                                            : "./assets/main/dist/img/avatar04.png"
                                    }
                                    alt="image"
                                />
                                <div className="pl-3 text-sm text-gray-600">
                                    <p className="truncate">
                                        {this.props.post.user.name}
                                    </p>
                                    <time>
                                        {this.props.post.date_formatted}
                                    </time>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deletePost: (id) => dispatch(deletePost(id))
    }
};

export default connect(null, mapDispatchToProps)(Row);
