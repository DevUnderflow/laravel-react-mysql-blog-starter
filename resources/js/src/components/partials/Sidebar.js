import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

const Sidebar = (props) => {

    return props.location.pathname != "/login" ? (
        <aside className="main-sidebar">
            <section className="sidebar">
                <div className="user-panel mt-8">
                    <div className="pull-left image">
                        <img
                            src={
                                localStorage.getItem("user.image_url") !== ""
                                    ? localStorage.getItem("user.image_url")
                                    : "./assets/main/dist/img/avatar04.png"
                            }
                            className="img-circle"
                            alt="User Image"
                        />
                    </div>
                    <div className="pull-left info">
                        <p>{localStorage.getItem("user.name")}</p>
                        <p className="text-muted">
                            {localStorage.getItem("user.email")}
                        </p>
                    </div>
                </div>
                <ul className="sidebar-menu mt-8" data-widget="tree">
                    <li
                        className={
                            props.location.pathname == "/" ? "active" : ""
                        }
                    >
                        <Link to="/">
                            <i className="fa fa-dashboard"></i>{" "}
                            <span>Feed</span>
                        </Link>
                    </li>
                    <li
                        className={
                            props.location.pathname == "/profile"
                                ? "active"
                                : ""
                        }
                    >
                        <Link to="/profile">
                            <i className="fa fa-users"></i> <span>Profile</span>
                        </Link>
                    </li>
                </ul>
            </section>
        </aside>
    ) : null;
};

export default withRouter(Sidebar);
