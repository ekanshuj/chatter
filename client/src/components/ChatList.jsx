import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiLogoutCircleLine } from 'react-icons/ri';
import styled from 'styled-components';

import menu from '../assets/menu.png';
import logout from '../assets/logout.svg';
import useDebounce from '../hooks/useDebounce';


const ASIDE = styled.div`
background : #1C1C25;
color: #ffff;
width : 21rem;
height: 100vh;
font-weight : bold;
font-size : 1.355rem;
.navigate {
  height: 100vh;
  position: absolute;
  top: 0px;
  left: 0;
  z-index: 99;
  width: 5rem;
  display: none;
  background : rgba(0,0,0,0.8);
  align-items: flex-start;
  justify-content: center;
  padding-top: 20px;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img {
    aspect-ratio: 1;
    filter: invert(100);
    width: 18px;
    margin: 5px 12px;
    cursor : pointer;
  }
  p {
    color : red;
    font-size: 0.9rem;
  }
  }
}
.blocker {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  content: ' ';
  background: rgba(0,0,0,0.5);
  z-index: 99;
}
`;

const SECTION = styled.div`
  display: grid;
  grid-template-rows: 8.1% 83.9% 8%;
  width: inherit;
  height: inherit;
  .navigation {
  display : flex;
  align-items : center;
  justify-content : center;
  padding : 3px 7px;
  width: inherit;
  z-index: 9;
  border-right: 1px solid #505055;
  .menu {
    background : url(${menu}) no-repeat center center/cover;
    filter: invert(100);
    aspect-ratio: 1;
    width: 25px;
    cursor : pointer;
    margin: 0px 9px;
    z-index: 999;
  }
  .input {
    display : flex;
    align-items : center;
    justify-content : center;
    flex : 1;
    padding : 7px 3px;
  }
}
  .users {
  border-right: 1px solid #505055;
  width: inherit;
  z-index : 9;
  overflow-y: scroll;
  cursor: pointer;
  -ms-overflow-style: none;
  scrollbar-width: none;
   ::-webkit-scrollbar {
    width: 10px;
    display: none;
  }
  .column {
    padding : 5px 7px;
    font-size : 0.9rem;
    letter-spacing : 1px;
    display: flex;
    align-items: center;
    margin: 5px 0px;
    .avatar {
      font-size: 1rem;
      border: 2px solid #999B9F;
      color: #999B9F;
      border-radius: 50%;
      aspect-ratio: 1;
      width: 2.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    div {
      margin-inline: 3px;
      h3 {
        font-weight: 500;
        color: #999B9F;
      }
    }
  }
  .selected {
    background : #3F3F5D;
    .avatar {
      border: 2px solid #ffff;
      color: #ffff;
    }
    div {
      h3 {
        font-weight: bold;
        color: #ffff;
      }
    }
  }}
  .profile {
    border-right: 1px solid #505055;
    width: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    div {
      width: inherit;
      margin-inline: 3px;
      text-align: center;
      background: black;
      color: #CCD1D1;
      padding: 9px 0px;
      border-radius: 3px;
      span {
        font-size: 1.5rem;
        font-weight: 500;
        letter-spacing: 2.1px;
      }
    }
  }
  `;

const INPUT = styled.input.attrs({
  type: "search",
})`
flex : 1;
padding : 9px;
::placeholder,
::-webkit-input-placeholder {
  color : rgb(61, 60, 60);
  font-size : 0.9rem;
  letter-spacing : 1px;
}
&:focus  {
outline: 1px solid blue;
}
background : #e7e7e7;
border: none;
border-radius : 3px;
`;

const toggle = () => {
  const helloSection = document.querySelector('.navigate');
  const blocker = document.querySelector('.blocker');
  helloSection.style.display = 'flex';
  blocker.style.display = 'block';
}
const hide = () => {
  const helloSection = document.querySelector('.navigate');
  const blocker = document.querySelector('.blocker');
  helloSection.style.display = 'none';
  blocker.style.display = 'none';
}


const ChatList = ({ currentUserData, userDetails, currentUser }) => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [selected, setSelected] = useState(undefined);
  const [searchedChat, setSearchedChat] = useState('');

  const debounceTerm = useDebounce(searchedChat, 300);
  const filteredChat = debounceTerm.length > 0 && currentUserData?.filter(currentUserData => currentUserData?.name.toLowerCase().includes(debounceTerm.toLowerCase()));

  const toggleSelected = (name, _id, username) => {
    setSelected(_id);
    inputRef.current.value = "";
    setSearchedChat("");
    userDetails({ name, _id, username });
  };

  const handleLogout = () => {
    if (localStorage.getItem(import.meta.env.VITE_USER_CREDENTIALS)) {
      localStorage.removeItem(import.meta.env.VITE_USER_CREDENTIALS);
      navigate("/");
    }
    else {
      navigate("/");
    }
  };

  return (
    <>
      <ASIDE>
        <div className="blocker" onClick={hide}></div>
        <div className="navigate">
          <div>
            <img onClick={handleLogout} src={logout} />
            <p>Log Out</p>
          </div>
        </div>
        <SECTION>
          <div className='navigation'>
            <div className='menu' onClick={toggle}></div>
            <div className="input">
              <INPUT
                ref={inputRef}
                placeholder="Search"
                name="search"
                id="search"
                onChange={(e) => setSearchedChat(e.target.value)} />
            </div>
          </div>
          <div className='users'>
            {
              debounceTerm.length > 0 ?
                filteredChat?.map(({ name, _id, username }, i) => {
                  return (
                    <div className={`column ${_id === selected ? 'selected' : ''}`} key={_id} onClick={() => toggleSelected(name, _id, username)}>
                      <div className='avatar'>{name.charAt(0)}</div>
                      <div>
                        <h3>{name.split(" ")[0]}</h3>
                      </div>
                    </div>
                  )
                })
                :
                currentUserData?.filter(user => user.username !== (JSON.parse(localStorage.getItem(import.meta.env.VITE_USER_CREDENTIALS))).username)?.map(({ name, _id, username }, i) => {
                  return (
                    <div className={`column ${_id === selected ? 'selected' : ''}`} key={_id} onClick={() => toggleSelected(name, _id, username)}>
                      <div className='avatar'>{name.charAt(0)}</div>
                      <div>
                        <h3>{name.split(" ")[0]}</h3>
                      </div>
                    </div>
                  )
                })
            }
          </div>
          <div className='profile'>
            <div>
              <span>{currentUser?.name} | @{currentUser?.username}</span>
            </div>
          </div>
        </SECTION>
      </ASIDE >
    </>
  )
}

export default ChatList
