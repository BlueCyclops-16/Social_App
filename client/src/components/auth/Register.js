import React, { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { setAlert } from "../../actions/alert";
import { register } from '../../actions/auth'
import PropTypes from 'prop-types'


export const Register = ({ setAlert, register, isAuthenticated }) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;


  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const onSubmit = async e => {
    e.preventDefault();

    if (password !== password2) {
      await setAlert("Passwords don't match.", 'danger');
    } else {
      // console.log("SUCCESS");

      register({ name, email, password });

      // Below code will happen in redux this was just for demo
      // const newUser = {
      //   name, email, password
      // }

      // try {

      //   const config = {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       method: "POST"
      //     }
      //   }

      //   const body = JSON.stringify(newUser);

      //   const res = await axios.post('/api/users', body, config);

      //   console.log(res.data);

      // } catch (err) {
      //   console.log(err.response.data);
      // }

    }
  }

  // Navigate id registered successfully
  if(isAuthenticated){
    return <Navigate to='dashboard' />
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>

      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={e => handleChange(e)} required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => handleChange(e)} required />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="5"
            value={password}
            onChange={e => handleChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="5"
            value={password2}
            onChange={e => handleChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { setAlert, register })(Register);