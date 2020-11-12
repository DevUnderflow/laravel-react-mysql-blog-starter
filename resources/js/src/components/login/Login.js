import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Auth from "../../apis/Auth";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            cpassword: "",
            error_message: null,
            errors: null,
            activeRegis: false
        };

        document.body.classList.remove("skin-green");
        document.body.classList.add("login-page");

        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleInput = this.handleInput.bind(this);
        this.ActiveHandler = this.ActiveHandler.bind(this);
    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            error_message: null,
            errors: null
        });


        if (this.state.email == "" || this.state.password == "") {
            this.setState({
                error_message: "Please enter login credentials"
            });

            return false;
        }
        if (this.state.activeRegis) {
              if (this.state.password !== this.state.cpassword) {
                  this.setState({
                      error_message: "Password does not match!"
                  });
                  return false;
              }
            Auth.register(
                {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                },
                response => {
                    for (var i in response.data.user) {
                        localStorage.setItem(
                            "user." + i,
                            response.data.user[i]
                        );

                        setTimeout(() => {
                            this.props.history.push("/");
                        }, 500);
                    }
                },
                err => {
                    this.setState({
                        error_message: err.response.data.message,
                        errors: err.response.data.errors
                    });
                }
            );
        } else {
            Auth.login(
                { email: this.state.email, password: this.state.password },
                response => {
                    if (response.data.user.is_admin == 1) {
                        for (var i in response.data.user) {
                            localStorage.setItem(
                                "user." + i,
                                response.data.user[i]
                            );

                            setTimeout(() => {
                                this.props.history.push("/");
                            }, 500);
                        }
                    } else {
                        localStorage.clear();

                        this.setState({
                            error_message: "Unauthorized"
                        });
                    }
                },
                err => {
                    this.setState({
                        error_message: err.response.data.message,
                        errors: err.response.data.errors
                    });
                }
            );
        }
    }

    ActiveHandler(e) {
        e.preventDefault();
        console.log("Active :", this.state.activeRegis);
        this.setState(prevState => ({
            activeRegis: !this.state.activeRegis
        }));
    }

    render() {
        return (
            <div className="container">
                <div className="login-box">
                    <div className="login-logo">
                        <b>Refer</b>Route
                    </div>
                    <div className="login-box-body">
                        <p className="login-box-msg text-3xl">
                            {this.state.activeRegis ? "Register" : "Login"}
                        </p>

                        {this.state.error_message ? (
                            <div className="alert alert-danger">
                                {this.state.error_message}
                            </div>
                        ) : null}
                        <form
                            action="#"
                            method="post"
                            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                            onSubmit={this.handleSubmit}
                        >
                            {this.state.activeRegis ? (
                                <div
                                    className={`form-group has-feedback ${
                                        this.state.errors &&
                                        this.state.errors.name
                                            ? "has-error"
                                            : ""
                                    }`}
                                >
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Name"
                                        onChange={this.handleInput}
                                        value={this.state.name}
                                    />
                                    {this.state.errors &&
                                    this.state.errors.name ? (
                                        <div className="help-block">
                                            {this.state.errors.name[0]}
                                        </div>
                                    ) : null}
                                </div>
                            ) : (
                                ""
                            )}
                            <div
                                className={`form-group has-feedback ${
                                    this.state.errors && this.state.errors.email
                                        ? "has-error"
                                        : ""
                                }`}
                            >
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Email"
                                    onChange={this.handleInput}
                                    value={this.state.email}
                                />
                                {this.state.errors &&
                                this.state.errors.email ? (
                                    <div className="help-block">
                                        {this.state.errors.email[0]}
                                    </div>
                                ) : null}
                            </div>
                            <div
                                className={`form-group has-feedback ${
                                    this.state.errors &&
                                    this.state.errors.password
                                        ? "has-error"
                                        : ""
                                }`}
                            >
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Password"
                                    onChange={this.handleInput}
                                    value={this.state.password}
                                />
                                {this.state.errors &&
                                this.state.errors.password ? (
                                    <div className="help-block">
                                        {this.state.errors.password[0]}
                                    </div>
                                ) : null}
                            </div>
                            {this.state.activeRegis ? (
                                <div
                                    className={`form-group has-feedback ${this.state.errors &&
                                            this.state.errors.password
                                            ? "has-error"
                                            : ""
                                        }`}
                                >
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Confirm Password
                                </label>
                                    <input
                                        type="password"
                                        name="cpassword"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Confirm Password"
                                        onChange={this.handleInput}
                                        value={this.state.cpassword}
                                    />
                                    {this.state.errors &&
                                        this.state.errors.password ? (
                                            <div className="help-block">
                                                {this.state.errors.password[0]}
                                            </div>
                                        ) : null}
                                </div>) : null}
                            <div className="flex items-center justify-between mt-6">
                                <button
                                    type="submit"
                                    className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn-color"
                                >
                                    {this.state.activeRegis
                                        ? "Register"
                                        : "Login"}
                                </button>
                                <button
                                    type="button"
                                    onClick={this.ActiveHandler}
                                    className="inline-block align-baseline font-bold text-sm  hover:text-blue-800"
                                >
                                    {this.state.activeRegis
                                        ? "Already have a account?"
                                        : "Register Now"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
