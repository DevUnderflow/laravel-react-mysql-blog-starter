import React, { Component } from 'react';
import ListPosts from "./posts/Index";

class Dashboard extends Component
{
    constructor(props)
    {
       super(props);

        document.body.classList.remove("login-page");
        document.body.classList.remove("register-page");
        document.body.classList.add("skin-green");
    }

    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Feed
                        <small>Home</small>
                    </h1>
                    <ListPosts />
                </section>
            </div>
        )
    }
}

export default Dashboard;
