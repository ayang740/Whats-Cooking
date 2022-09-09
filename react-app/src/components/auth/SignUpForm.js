import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './auth.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
      const data = await dispatch(signUp(username, name, email, password, repeatPassword));
      if (data) {
        setErrors(data)
      }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateName = (e) => {
    setName(e.target.value);
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-page-wrapper'>
      <div className='login-page-title'>Signup for an account</div>
      <form className='signup-page-form' onSubmit={onSignUp}>
        <div className='login-page-form-errors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='login-page-form-info'>
          <label className='login-page-form-label'>User Name</label>
          <input
            className='login-page-form-input'
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className='login-page-form-info'>
          <label className='login-page-form-label'>Name</label>
          <input
            className='login-page-form-input'
            type='text'
            name='name'
            onChange={updateName}
            value={name}
          ></input>
        </div>
        <div className='login-page-form-info'>
          <label className='login-page-form-label'>Email</label>
          <input
            className='login-page-form-input'
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div className='login-page-form-info'>
          <label className='login-page-form-label'>Password</label>
          <input
            className='login-page-form-input'
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className='login-page-form-info'>
          <label className='login-page-form-label'>Confirm Password</label>
          <input
            className='login-page-form-input'
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
          ></input>
        </div>
        <div className='signup-page-form-button-container'>
          <button className='login-page-form-button' type='submit'>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
