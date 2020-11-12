import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic/build/ckeditor";
import { Link } from 'react-router-dom';

import Spinner from '../../partials/Spinner';
import SuccessAlert from '../../partials/SuccessAlert';
import ErrorAlert from '../../partials/ErrorAlert';

class Form extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div>
                <Spinner show={this.props.create_update_spinner} />
                <SuccessAlert msg={this.props.success_message} />
                <ErrorAlert msg={this.props.error_message} />

                <div className="col-md-8">
                    <div className="box box-primarynew">
                        <div className="box-header with-border">
                            <h3 className="box-title">
                                {this.props.post.id != ""
                                    ? "Edit post #" + this.props.post.id
                                    : "Add post"}
                            </h3>

                            <Link
                                to="/"
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center pull-right"
                            >
                                <i className="fa fa-arrow-left mr-3"></i> Return
                                back
                            </Link>
                        </div>
                        <div className="box-body">
                            <div
                                className={`form-group ${
                                    this.props.validation_errors.title
                                        ? "has-error"
                                        : ""
                                }`}
                            >
                                <label>Post title</label>
                                <input
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Post title"
                                    onChange={this.props.handleFieldChange}
                                    value={
                                        this.props.post.title
                                            ? this.props.post.title
                                            : ""
                                    }
                                    name="title"
                                />
                                {this.props.validation_errors.title != null ? (
                                    <div className="help-block">
                                        {this.props.validation_errors.title[0]}
                                    </div>
                                ) : null}
                            </div>
                            <div
                                className={`form-group ${
                                    this.props.validation_errors.content
                                        ? "has-error"
                                        : ""
                                }`}
                            >
                                <label>Content</label>
                                <CKEditor
                                    name="content"
                                    editor={ClassicEditor}
                                    data={
                                        this.props.post.content
                                            ? this.props.post.content
                                            : ""
                                    }
                                    onInit={editor => {
                                        editor.setData(
                                            this.props.post.content
                                                ? this.props.post.content
                                                : ""
                                        );
                                    }}
                                    onChange={this.props.handleCkeditorChange}
                                />
                                {this.props.validation_errors.content !=
                                null ? (
                                    <div className="help-block">
                                        {
                                            this.props.validation_errors
                                                .content[0]
                                        }
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="box box-primarynew">
                        <div className="box-body">
                            {this.props.post.image_url ? (
                                <img
                                    src={this.props.post.image_url}
                                    width="100"
                                    height="80"
                                />
                            ) : null}
                            <div
                                className={`form-group ${
                                    this.props.validation_errors.image
                                        ? "has-error"
                                        : ""
                                }`}
                            >
                                <label>Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    onChange={this.props.handleFieldChange}
                                    accept="image/*"
                                />
                                {this.props.validation_errors.image != null ? (
                                    <div className="help-block">
                                        {this.props.validation_errors.image[0]}
                                    </div>
                                ) : null}
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <input
                                        type="button"
                                        name="publish"
                                        value="Publish"
                                        onClick={this.props.handleSave}
                                        className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn-color"
                                    />
                                </div>
                                <input
                                    type="submit"
                                    ref={this.props.submitRef}
                                    style={{ display: "none" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form;
