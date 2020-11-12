import React from 'react';
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Login from "./components/login/Login";
import AuthenticatedRoute from './AuthenticatedRoute';
import Dashboard from "./components/pages/Dashboard";
import AddPosts from "./components/pages/posts/Add";
import EditPosts from "./components/pages/posts/Edit";
import ViewPosts from "./components/pages/posts/View";
import Profile from "./components/pages/profile/Profile";

class Routes extends React.Component
{
    render()
    {
        return (
            <Switch>
                <Route exact path="/login" component={Login} />
                <AuthenticatedRoute exact path="/" component={Dashboard} />
                <AuthenticatedRoute exact path="/posts" component={Dashboard} />
                <AuthenticatedRoute path="/posts/add" component={AddPosts} />
                <AuthenticatedRoute path="/posts/edit/:id" component={EditPosts} />
                <AuthenticatedRoute path="/posts/:id" component={ViewPosts} />
                <AuthenticatedRoute path="/profile" component={Profile} />
            </Switch>
        );
    }
}

export default Routes;
