import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import PrivateRoute from "./components/routing/PrivateRoute";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import Profile from './components/profile/Profile';
import Profiles from "./components/profiles/Profiles";
import Post from "./components/posts/Post";
import AddEducation from "./components/profile-forms/AddEducation";
// Redux
import { connect } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import PropTypes from 'prop-types';

//CSS
import "./App.css";



if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ auth: { isAuthenticated, loading } }) => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Fragment>
        <Navbar />
        <section className="container">
          <Alert />
        </section>
        <Routes>

          <Route path="/" element={<Landing />} />
          <Route
            path="/register"
            element={
              <section className="container">
                <Register />{" "}
              </section>
            }
          />
          <Route
            path="/login"
            element={
              <section className="container">
                <Login />{" "}
              </section>
            }
          />

          <Route
            path="/dashboard"
            element={
              <section className="container">
                <PrivateRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <Dashboard />
                </PrivateRoute>
              </section>
            }
          />

          <Route
            path="/profiles"
            element={
              <section className="container">
                <Profiles />
              </section>
            }
          />

          <Route
            path="/profile/:id"
            element={
              <section className="container">
                <Profile />
              </section>
            }
          />

          <Route
            path="/create-profile"
            element={
              <section className="container">
                <PrivateRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <CreateProfile />
                </PrivateRoute>
              </section>
            }
          />

          <Route
            path="/edit-profile"
            element={
              <section className="container">
                <PrivateRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <EditProfile />
                </PrivateRoute>
              </section>
            }
          />

          <Route
            path="/add-experience"
            element={
              <section className="container">
                <PrivateRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <AddExperience />
                </PrivateRoute>
              </section>
            }
          />

          <Route
            path="/add-education"
            element={
              <section className="container">
                <PrivateRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <AddEducation />
                </PrivateRoute>
              </section>
            }
          />

          <Route
            path="/posts"
            element={
              <section className="container">
                <PrivateRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <Post />
                </PrivateRoute>
              </section>
            }
          />

        </Routes>
      </Fragment>
    </Router>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(App);
