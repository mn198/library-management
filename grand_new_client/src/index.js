import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import './assets/css/material-dashboard-react.css';

// core components
import Admin from './layouts/Admin';
import Landing from './pages/Landing/Landing';
import Login from './pages/SignIn/GrandNewLogin';
import ProfilePage from './pages/ProfilePage/ProfilePage';
// context
import AuthContextProvider from './contexts/AuthContext';
import UserContextProvider from './contexts/UserContext';
import ReaderContextProvider from './contexts/ReaderContext';
import BookContextProvider from './contexts/BookContext';
import LendingContextProvider from './contexts/LendingContext';
// helpers
import PrivateRoute from './helpers/PrivateRoute';
import setAuthToken from './helpers/setAuthToken';

const hist = createBrowserHistory();

// check access token
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
                                <PrivateRoute path='/profile' component={ProfilePage}/>
                                <Route path='/login' component={Login}/>
                            </Switch>
                        </Router>
                        </LendingContextProvider>
                </BookContextProvider>
            </ReaderContextProvider>
        </UserContextProvider>
    </AuthContextProvider>
    , document.getElementById('root'));

