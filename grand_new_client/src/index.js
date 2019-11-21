import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import './assets/css/material-dashboard-react.css';

// core components
import Admin from './layouts/Admin';
import Landing from './pages/Landing/Landing';
import SignIn from './pages/SignIn/NewSignIn';
// context
import AuthContextProvider from './contexts/AuthContext';
import UserContextProvider from './contexts/UserContext';
import ReaderContextProvider from './contexts/ReaderContext';
import BookContextProvider from './contexts/BookContext';
import LendingContextProvider from './contexts/LendingContext';
// helpers
import PrivateRoute from './helpers/PrivateRoute';

const hist = createBrowserHistory();

// check access token
import setAuthToken from './helpers/setAuthToken';
if(localStorage.jwtToken){
    const token = localStorage.jwtToken;
    setAuthToken(token);
}

ReactDOM.render(
    <AuthContextProvider>
        <UserContextProvider>
            <ReaderContextProvider>
                <BookContextProvider>
                    <LendingContextProvider>
                        <Router history={hist}>
                            <Switch>
                                <Route exact path='/' component={Landing}/>
                                <PrivateRoute path='/admin' component={Admin}/>
                                <Route path='/login' component={SignIn}/>
                            </Switch>
                        </Router>
                        </LendingContextProvider>
                </BookContextProvider>
            </ReaderContextProvider>
        </UserContextProvider>
    </AuthContextProvider>
    , document.getElementById('root'));

