import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import Axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DIVISION = styled.div`
  display: grid;
  place-items: center;
  place-content: center;
  height: 100vh;
  width: 100vw;
  background: rgb(250, 250, 250);

  .bottom {
  margin: 10px 0px;
  padding: 15px 10px;

  span {
  font-size: 1.255rem;
  }
  button {
  border: none;
  background: none;
  font-size: 1.235rem;
  margin-inline: 7px;
  font-weight: bold;

  :hover {
  text-decoration: underline;
  }}}
`
const Container = styled.div`
  padding: 20px;
  background: rgb(255, 255, 255);
  width: 500px;
  box-shadow: 7px 9px 5px -1px #edd1d1;
  border-radius: 7px;

  .head {
    padding: 25px 20px;
    font-weight: bold;  
  }

`
const FORM = styled.form.attrs(props => ({
  action: "#"
}))`
.name,
.username,
.number,
.password,
.confirmPassword {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px 20px;
}

.span {
  margin: 5px 0px;
  font-size: 0.755rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bolder;
  color: rgb(191, 191, 191);
}

.inputs {
  padding: 16px 15px;
  width: 100%;
  font-size: 15px;
  border-radius: 5px;
  outline-color: gray;
  border: 1px solid rgb(191, 191, 191);

  ::placeholder {
  color: rgb(191, 191, 191);
  }

}
`
const CONTROL = styled.div`
  padding: 25px 20px;

button {
  width: 100%;
  padding: 10px 0px;
  border: 2px solid #09363f;
  background: transparent;
  font-size: 1.05rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  border-radius: 7px;
  cursor: pointer;

  :hover {
  background: #09363f;
  color: ghostwhite;
  }
}
`

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    username: '',
    number: '',
    password: '',
    confirmPassword: ''
  });

  const toggleHandle = (elem) => {
    setForm({ ...form, [elem.target.name]: elem.target.value })
  }

  useEffect(() => {
    (localStorage.getItem(import.meta.env.VITE_USER_CREDENTIALS)) && navigate("/chat");
  }, []);

  const TOAST = {
    position: "top-right",
    autoclose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };

  const handleValidate = () => {
    const { name, username, number, password, confirmPassword } = form;
    if (password !== confirmPassword) {
      toast.error("Passwords does not match.", TOAST)
      return false;
    }
    else if (username.length > 17 || username.length < 5) {
      toast.error("Username should be 5 to 17 characters long.", TOAST)
      return false;
    }
    else if (password.length < 7) {
      toast.error("Password must be 7 characters long.", TOAST)
      return false;
    }
    else if (name === '') {
      toast.error("Name is required", TOAST)
      return false;
    }
    else if (number === '' || number.length !== 10) {
      toast.error("Invalid Number", TOAST)
      return false;
    }
    return true;
  }

  const handleSubmit = async (elem) => {
    elem.preventDefault();
    if (handleValidate()) {
      const { username, name, number, password } = form;
      const URL = 'http://localhost:5000/api/v1/users';

      const { data } = await Axios.post(`${URL}/signup`, { username, name, number, password });
      if (data.status === true) {
        localStorage.setItem(import.meta.env.VITE_USER_CREDENTIALS, JSON.stringify(data.User));
        navigate("/chat");
      };
    }
  };

  return (
    <>
      <DIVISION>
        <Container>
          <div className="head">
            <h1>
              Sign Up
            </h1>
          </div>
          <FORM onSubmit={handleSubmit}>
            <div className="name">
              <span className='span'>Name</span>
              <input
                type="text"
                placeholder='john wick'
                name='name'
                className='inputs'
                onChange={toggleHandle} required />
            </div>
            <div className="username">
              <span className='span'>Username</span>
              <input
                type="text"
                placeholder='@username'
                name='username'
                className='inputs'
                onChange={toggleHandle} required />
            </div>
            <div className="number">
              <span className='span'>Number</span>
              <input
                type="number"
                placeholder='+123456789'
                name='number'
                className='inputs'
                onChange={toggleHandle} required />
            </div>
            <div className="password">
              <span className='span'>Password</span>
              <input
                type="password"
                placeholder='Password'
                name='password'
                className='inputs'
                onChange={toggleHandle} required />
            </div>
            <div className="confirmPassword">
              <span className='span'>Confirm Password</span>
              <input
                type="password"
                placeholder='Confirm your password'
                name='confirmPassword'
                className='inputs'
                onChange={toggleHandle} required />
            </div>
            <CONTROL>
              <button type="submit">get started</button>
            </CONTROL>
          </FORM>
        </Container>
        <div className="bottom">
          <span>Already have an account !</span>
          <Link to="/login">
            <button>Sign In</button>
          </Link>
        </div>
      </DIVISION>
      <ToastContainer />
    </>
  )
}

export default Signup