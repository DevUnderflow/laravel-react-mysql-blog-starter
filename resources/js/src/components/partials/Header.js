import React from 'react';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Auth from '../../apis/Auth';

class Header extends React.Component {

    constructor(props)
    {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e) {
        e.preventDefault();

        Auth.logout((response) => {
            this.props.history.push("/login");
        }, (err) => {
            alert(err.response.data.message);
        });
    }

    componentDidMount()
    {
        const checkauth = setInterval(() => {
            Auth.checkAuth(
                response => {},
                err => {
                    clearInterval(checkauth);

                    localStorage.clear();

                    this.props.history.push("/login");
                }
            );
        }, 300000);
    }

    render() {
        return this.props.location.pathname != "/login" ? (
            <header className="main-header">
                <a href="#" className="logo">
                    <span className="logo-mini">
                        <b>R</b>R
                    </span>
                    <span className="logo-lg">
                        <b>Refer</b>route
                    </span>
                </a>
                <nav className="navbar navbar-static-top">
                    <a
                        href="#"
                        className="sidebar-toggle"
                        data-toggle="push-menu"
                        role="button"
                    >
                        <span className="sr-only">Toggle navigation</span>
                    </a>

                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <li className="dropdown user user-menu">
                                <a
                                    href="#"
                                    className="dropdown-toggle"
                                    data-toggle="dropdown"
                                >
                                    <img
                                        src={
                                            localStorage.getItem(
                                                "user.image_url"
                                            ) !== ""
                                                ? localStorage.getItem(
                                                      "user.image_url"
                                                  )
                                                : "./assets/main/dist/img/avatar04.png"
                                        }
                                        className="user-image"
                                        alt="User Image"
                                    />
                                    <span className="hidden-xs">
                                        {localStorage.getItem("user.name")}
                                    </span>
                                </a>
                                <ul className="dropdown-menu bg-white shadow sm:rounded-md sm:overflow-hidden p-5">
                                    <li className="user-header flex flex-col justify-center items-center">
                                        <img
                                            src={
                                                localStorage.getItem(
                                                    "user.image_url"
                                                ) !== ""
                                                    ? localStorage.getItem(
                                                          "user.image_url"
                                                      )
                                                    : "./assets/main/dist/img/avatar04.png"
                                            }
                                            className="img-circle"
                                            alt="User Image"
                                        />

                                        <p>
                                            {localStorage.getItem("user.name")}
                                            <small>
                                                Member since{" "}
                                                {new Date(
                                                    localStorage.getItem(
                                                        "user.created_at"
                                                    )
                                                ).toDateString()}
                                            </small>
                                        </p>
                                    </li>
                                    <li className="user-footer">
                                        <div className="pull-left">
                                            <Link
                                                to="/profile"
                                                className="btn hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn-color"
                                            >
                                                Profile
                                            </Link>
                                        </div>
                                        <div className="pull-right">
                                            <a
                                                href="#"
                                                onClick={this.handleLogout}
                                                className="btn btn-default bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                                            >
                                                Sign out
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        ) : null;
    }
}

export default withRouter(Header)
