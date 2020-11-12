import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Post from '../../../apis/Post';
import { showPost, setPostDefaults } from "../../../store/actions/PostActions";

class View extends React.Component {
    constructor(props) {
        super(props);
         this.state = {
             likes: 0
         };
        this.handleLikes = this.handleLikes.bind(this);
    }

    componentDidMount() {
        this.props.setPostDefaults();
        this.props.showPost(this.props.match.params.id);
        Post.get_post_by_callback(this.props.match.params.id, response => {
            this.setState({
                likes: response.data.data.likes_counter
            });
        }, err => {
            this.setState({
                error_message: err.response.data.message,
                errors: err.response.data.errors
            });
        });
    }
    handleLikes(e) {
        e.preventDefault();
        Post.add_likes(
            this.props.post.post.id,
            response => {
                this.setState((prevState) => ({
                    likes: prevState.likes + 1
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

    render() {
        return (
            <div className="content-wrapper">
                <section className="content">
                    <div className="container w-full mx-auto p-0 sm:p-2 lg:p-4 ">
                        <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
                            <Link
                                to="/"
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                            >
                                <i className="fa fa-arrow-left mr-3"></i> Return
                                back
                            </Link>
                            <div className="font-sans bg-white mt-10 w-full font-sans px-12 py-6 rounded-md overflow-hidden shadow-lg">
                                <img
                                    className="lg:w-1/4 sm:w-full w-full h-1/4 rounded-full bg-gray-300 img_fit"
                                    src={
                                        this.props.post.post &&
                                        this.props.post.post.image_url !== null
                                            ? this.props.post.post.image_url
                                            : ""
                                    }
                                />
                                <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-4xl md:text-4xl">
                                    {this.props.post.post.title}
                                </h1>
                                <p className="text-sm md:text-base font-normal text-gray-600">
                                    {this.props.post.post.date_formatted}
                                </p>
                                <div className="mt-2 flex w-full items-center py-2">
                                    <img
                                        className="w-20 h-20 rounded-full mr-4"
                                        src={
                                            this.props.post.post.user &&
                                            this.props.post.post.user
                                                .image_url !== null
                                                ? this.props.post.post.user
                                                      .image_url
                                                : "./assets/main/dist/img/avatar04.png"
                                        }
                                        alt="Author"
                                    />
                                    <div className="flex-1 px-2">
                                        <span className="uppercase tracking-wide inline-block px-2 rounded-full text-xs bg-gray-300 text-gray-600">
                                            Author
                                        </span>
                                        <p className="text-base font-bold text-xl md:text-3xl leading-none">
                                            {this.props.post.post.user &&
                                                this.props.post.post.user.name}
                                        </p>
                                        <p className="text-gray-600 text-lg md:text-xl">
                                            {this.props.post.post.user &&
                                                this.props.post.post.user.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="m-2 mt-5 flex flex-col items-start sm:flex-row lg:flex-row sm:items-center">
                                    <button
                                        onClick={this.handleLikes}
                                        className="btn-color hover:bg-gray-400 text-white hover:text-gray-400 font-bold py-3 px-4 mr-2 rounded inline-flex items-center"
                                    >
                                        <span className="mr-3">
                                            {this.state.likes}
                                        </span>
                                        <i className="fa fa-thumbs-up"></i>
                                    </button>
                                    {this.props.post.post.user &&
                                    this.props.post.post.user.id ==
                                        localStorage.getItem("user.id") ? (
                                        <p className="mt-2 sm:ml-2 sm:mt-0">
                                            <Link
                                                to={
                                                    "/posts/edit/" +
                                                    this.props.post.post.id
                                                }
                                                className="bg-gray-300 hover:bg-gray-400 hover:text-gray-800 text-gray-800 font-bold py-3 px-4 rounded inline-flex items-center"
                                            >
                                                <i className="fa fa-edit mr-3"></i>{" "}
                                                Edit Post
                                            </Link>
                                            <a
                                                href="#"
                                                className="sm:ml-2 text-red hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded inline-flex items-center"
                                                // onClick={this.handleDelete}
                                            >
                                                <i className="fa fa-remove mr-3"></i>{" "}
                                                Delete Post
                                            </a>
                                        </p>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <p
                                    className="text-gray-600 mt-12 text-2xl"
                                    dangerouslySetInnerHTML={{
                                        __html: this.props.post.post.content
                                    }}
                                ></p>
                            </div>
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

const mapDispatchToProps = dispatch => {
    return {
        showPost: id => dispatch(showPost(id)),
        setPostDefaults: () => dispatch(setPostDefaults()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
