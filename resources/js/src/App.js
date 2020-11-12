import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router,
    Link,
    Route,
    Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from './store/reducers/RootReducer';
import Header from './components/partials/Header';
import Sidebar from './components/partials/Sidebar';
import Footer from './components/partials/Footer';
import Routes from './Routes';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                        <div className="wrapper">
                            <Header/>
                            <Sidebar/>
                            <Routes/>
                            <Footer/>
                        </div>
                </Router>
            </Provider>
        );
    }
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
