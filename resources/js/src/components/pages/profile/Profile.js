import React from 'react';
import SuccessAlert from '../../partials/SuccessAlert';
import ErrorAlert from '../../partials/ErrorAlert';
import User from '../../../apis/User';

class Profile extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            contact_no: "",
            image: {},
            image_url: "",
            location: "",
            success: "",
            error: "",
            validation_errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount()
    {
        let self = this;

        User.profile().then(response => {
            self.setState({
                name: response.data.data.name,
                email: response.data.data.email,
                contact_no: response.data.data.contact_no,
                location: response.data.data.location,
                image_url: response.data.data.image_url
            });
        });

           console.log(this.state.image_url);
    }

    handleChange(e) {
        let inputName = e.target.name;
        if (inputName === "image") {
            this.setState({
                [inputName]: e.target.files[0]
            }, () => { console.log('inside',this.state.image);});
        } else {
            this.setState({
                [inputName]: e.target.value
            });
        }
        console.log("ss", this.state.image);

    }

    handleSubmit(e) {
        e.preventDefault();

        let self = this;
        User.updateProfile({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            contact_no: this.state.contact_no,
            location: this.state.location,
            image: this.state.image
        })
            .then(response => {
                localStorage.removeItem("user.email");
                localStorage.removeItem("user.name");
                localStorage.removeItem("user.location");
                localStorage.removeItem("user.contact_no");
                localStorage.removeItem("user.image_url");

                for (let i in response.data.data) {
                    localStorage.setItem("user." + i, response.data.data[i]);
                }

                self.setState({
                    image_url: response.data.data.image_url,
                    success: response.data.message,
                    error: "",
                    validation_errors: {}
                });
            })
            .catch(error => {
                self.setState({
                    success: "",
                    error: error.response.data.message,
                    validation_errors: error.response.data.errors
                });
            });
    }

    render()
    {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>My profile</h1>
                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-md-3 ">
                            <div className="box box-primarynew shadow sm:rounded-md sm:overflow-hidden">
                                <div className="box-body box-profile">
                                    <img
                                        src={
                                            this.state.image_url !== ""
                                                ? this.state.image_url
                                                : "./assets/main/dist/img/avatar04.png"
                                        }
                                        className="profile-user-img img-responsive img-circle"
                                    />
                                    <h3 className="profile-username text-center">
                                        {localStorage.getItem("user.name")}
                                    </h3>
                                    <p className="text-muted text-center mt-2">
                                        Member since{" "}
                                        {new Date(
                                            localStorage.getItem(
                                                "user.created_at"
                                            )
                                        ).toDateString()}
                                    </p>
                                    <ul className="list-group list-group-unbordered mt-6">
                                        <li className="list-group-item">
                                            <b>Name</b>{" "}
                                            <a className="pull-right">
                                                {localStorage.getItem(
                                                    "user.name"
                                                )}
                                            </a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Email</b>{" "}
                                            <a className="pull-right">
                                                {localStorage.getItem(
                                                    "user.email"
                                                )}
                                            </a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Contact No</b>{" "}
                                            <a className="pull-right">
                                                {localStorage.getItem(
                                                    "user.contact_no"
                                                    ) !== null ? (
                                                    localStorage.getItem(
                                                        "user.contact_no"
                                                        )
                                                        ) : (
                                                    <p className="text-muted">
                                                        Please Update your
                                                        contact no!
                                                    </p>
                                                )}
                                            </a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Location</b>
                                            <a className="pull-right">
                                                {localStorage.getItem(
                                                    "user.location"
                                                ) != null ? (
                                                    localStorage.getItem(
                                                        "user.location"
                                                    )
                                                ) : (
                                                    <p className="text-muted">
                                                        Please Update your
                                                        location!
                                                    </p>
                                                )}
                                            </a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Created</b>{" "}
                                            <a className="pull-right">
                                                {new Date(
                                                    localStorage.getItem(
                                                        "user.created_at"
                                                    )
                                                ).toDateString()}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-9">
                            <SuccessAlert msg={this.state.success} />
                            <ErrorAlert msg={this.state.error} />
                            <form
                                className="form-horizontal bg-white shadow sm:rounded-md sm:overflow-hidden p-5"
                                onSubmit={this.handleSubmit}
                            >
                                <div
                                    className={`form-group ${
                                        this.state.validation_errors.name
                                            ? "has-error"
                                            : ""
                                    }`}
                                >
                                    <label className="col-sm-2 control-label">
                                        Name
                                    </label>

                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="name"
                                            placeholder="Name"
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    {this.state.validation_errors.name !=
                                    null ? (
                                        <div className="help-block">
                                            {
                                                this.state.validation_errors
                                                    .name[0]
                                            }
                                        </div>
                                    ) : null}
                                </div>
                                <div
                                    className={`form-group ${
                                        this.state.validation_errors.email
                                            ? "has-error"
                                            : ""
                                    }`}
                                >
                                    <label className="col-sm-2 control-label">
                                        Email
                                    </label>

                                    <div className="col-sm-10">
                                        <input
                                            type="email"
                                            className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="email"
                                            placeholder="Email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    {this.state.validation_errors.email !=
                                    null ? (
                                        <div className="help-block">
                                            {
                                                this.state.validation_errors
                                                    .email[0]
                                            }
                                        </div>
                                    ) : null}
                                </div>
                                <div
                                    className={`form-group ${
                                        this.state.validation_errors.password
                                            ? "has-error"
                                            : ""
                                    }`}
                                >
                                    <label className="col-sm-2 control-label">
                                        Password
                                    </label>

                                    <div className="col-sm-10">
                                        <input
                                            type="password"
                                            className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="password"
                                            placeholder="Password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    {this.state.validation_errors.password !=
                                    null ? (
                                        <div className="help-block">
                                            {
                                                this.state.validation_errors
                                                    .password[0]
                                            }
                                        </div>
                                    ) : null}
                                </div>
                                <div
                                    className={`form-group ${
                                        this.state.validation_errors.contact_no
                                            ? "has-error"
                                            : ""
                                    }`}
                                >
                                    <label className="col-sm-2 control-label">
                                        Contact No
                                    </label>

                                    <div className="col-sm-10">
                                        <input
                                            type="number"
                                            className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="contact_no"
                                            placeholder="Contact_no"
                                            value={this.state.contact_no}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    {this.state.validation_errors.contact_no !=
                                    null ? (
                                        <div className="help-block">
                                            {
                                                this.state.validation_errors
                                                    .contact_no[0]
                                            }
                                        </div>
                                    ) : null}
                                </div>
                                <div
                                    className={`form-group ${
                                        this.state.validation_errors.location
                                            ? "has-error"
                                            : ""
                                    }`}
                                >
                                    <label className="col-sm-2 control-label">
                                        Location
                                    </label>

                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="location"
                                            placeholder="Location"
                                            value={this.state.location}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    {this.state.validation_errors.contact_no !=
                                    null ? (
                                        <div className="help-block">
                                            {
                                                this.state.validation_errors
                                                    .location[0]
                                            }
                                        </div>
                                    ) : null}
                                </div>
                                <div className={`form-group`}>
                                    <label className="col-sm-2 control-label">
                                        Image
                                    </label>

                                    <div className="col-sm-10">
                                        <input
                                            type="file"
                                            name="image"
                                            id="image"
                                            className="bg-white shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            onChange={this.handleChange}
                                            accept="image/*"
                                        />
                                    </div>
                                    {/* {this.props.validation_errors.image != null ? (
                                    <div className="help-block">
                                        {this.props.validation_errors.image[0]}
                                    </div>
                                ) : null} */}
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-offset-2 col-sm-10">
                                        <button
                                            type="submit"
                                            className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn-color"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Profile;
