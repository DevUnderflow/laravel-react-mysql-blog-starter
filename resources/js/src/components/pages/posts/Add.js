import React from 'react';
import { connect } from 'react-redux';

// style
import '../../../css/editor.css';
import PostForm from './PostForm';
import { handleFieldChange, addPost, setPostDefaults, resetFields } from '../../../store/actions/PostActions';


class Add extends React.Component
{
    constructor(props)
    {
        super(props);

        this.submitRef = React.createRef();

        this.handleFieldChange = this.handleFieldChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount()
    {
        this.props.setPostDefaults();

        this.props.resetFields();
    }

    handleFieldChange(e) {
      if(e.target.name == 'image') {
            this.props.handleFieldChange(e.target.name, e.target.files[0]);
        } else {
            this.props.handleFieldChange(e.target.name, e.target.value);
        }
    }

    handleCkeditorChange(editor) {
        this.props.handleFieldChange("content", editor.getData());
    }

    handleSubmit(e) {
        e.preventDefault();

        let self = this;
        this.props.addPost(this.props.post.post, function () {

            // reset fields
            self.props.resetFields();

            // redirect
            setTimeout(() => self.props.history.push('/'), 2000);
        });
    }

    handleSave(e) {
        e.preventDefault();

        setTimeout(() => this.submitRef.current.click(), 200);
    }

    render()
    {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Start new post
                    </h1>

                </section>

                <section className="content">
                    <div className="row">
                        <form method="post" role="form" onSubmit={this.handleSubmit}>

                            <PostForm post={this.props.post.post} create_update_spinner={this.props.post.create_update_spinner}
                                      success_message={this.props.post.success_message} error_message={this.props.post.error_message}
                                      handleFieldChange={this.handleFieldChange} handleCkeditorChange={(event, editor) => this.handleCkeditorChange(editor)}
                                      handleSave={this.handleSave} submitRef={this.submitRef}
                                      validation_errors={this.props.post.validation_errors}
                            />

                        </form>
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
      addPost: (payload, cb) => dispatch(addPost(payload, cb)),
      handleFieldChange: (field, value, checked = null) => dispatch(handleFieldChange(field, value, checked)),
      setPostDefaults: () => dispatch(setPostDefaults()),
      resetFields: () => dispatch(resetFields())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
