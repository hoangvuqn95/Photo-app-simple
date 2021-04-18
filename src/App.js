import { unwrapResult } from '@reduxjs/toolkit';
import { getMe } from 'app/userSlice';
import Footer from 'components/Footer';
import Header from 'components/Header';
import NotFound from 'components/NotFound';
import firebase from 'firebase';
import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

const Photo = React.lazy(() => import('./features/Photo'));
const SignIn = React.lazy(() => import('./features/Auth/SignIn'));

function App() {
  // FIREBASE - USER
  const dispatch = useDispatch();
  // Configure Firebase
  const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  // Handle firebase auth changed
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        // user logs out, handle something here
        console.log('User is not logged in');
        return;
      }

      try {
        // Get me when signed in
        const action = getMe();
        const actionResult = await dispatch(action);
        const currentUser = unwrapResult(actionResult);
        // unwrapResult se tra ra action.payload - dong thoi se catch neu bat duoc loi~ neu co
        console.log('Logged in user(from App.jsx)', currentUser);
        // test send name user to Auth Feature
      } catch (error) {
        console.log('Failed to login ', error.message);
      }
    });

    return () => unregisterAuthObserver();
    // Make sure we un-register firebase observers when the component unmount.
  }, []);

  return (
    <div className="App">
      <Suspense fallback={<div>LOADING...</div>}>
        <BrowserRouter>
          <Header />

          <Switch>
            <Redirect exact from="/" to="/photos" />

            <Route path="/photos" component={Photo} />

            <Route path="/sign-in" component={SignIn} />

            <Route component={NotFound} />
          </Switch>

          <Footer />
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
