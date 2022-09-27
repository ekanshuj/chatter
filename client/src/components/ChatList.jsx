import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import menu from '../assets/menu.png';
import { ChatSearch } from './';

const DIVISION = styled.div`
background : rgb(255, 255, 255);
width : 25rem;
height : 91vh;
font-weight : bold;
font-size : 1.355rem;
box-shadow : 7px 9px 5px -1px #edd1d1;
.hello__section {
  height: inherit;
  position: absolute;
  top: 87px;
  left: 0;
  z-index: 99;
  width: 5rem;
  display: none;
  background : rgb(255, 255, 255);
  align-items: flex-start;
  justify-content: center;
  padding: 11px 0px;
  button {
    background: transparent;
    border: none;
    margin: 17px 12px;
    cursor: pointer;
    :hover {
      text-decoration: underline red solid 3px;
      transform: scale(1.1) translateY(-7px);
      transition: 0.3s;
    }}}
.blocker {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  content: ' ';
  background: rgba(0,0,0,0.2);
  z-index: 99;
}
.navigation {
  display : flex;
  align-items : center;
  justify-content : center;
  padding : 7px;
  position: fixed;
  left: 0px;
  top: 87px;
  width: inherit;
  background: rgb(255, 255, 255);
  z-index: 9;
}
.menu {
  background : url(${menu}) no-repeat center center/cover;
  aspect-ratio: 1;
  width: 25px;
  cursor : pointer;
  margin: 0px 9px;
  z-index: 999;
}`;

const ASIDE = styled.div`
  padding : 9px;
  position: fixed;
  top: 135px;
  left: 0px;
  bottom: 0px;
  overflow-y: scroll;
  width: inherit;
  cursor: pointer;
  -ms-overflow-style: none;
  scrollbar-width: none;
   ::-webkit-scrollbar {
    /* width: 10px; */
    display: none;
  }
  /*
  ::-webkit-scrollbar-track {
    background: #dddddd;
  }
  ::-webkit-scrollbar-thumb {
    background: #db1d5c;
  } */
  .column {
    margin : 9px 3px;
    padding : 7px;
    font-size : 1rem;
    border: 1px solid #ddd;
    box-shadow: 4px 6px #888888;
    display: flex;
    align-items: center;
    .avatar {
      font-size: 1.5rem;
      border: 2px solid black;
      border-radius: 50%;
      padding: 7px;
      aspect-ratio: 1;
      width: 3.315rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    div {
      margin-inline: 3px;
      h3 {
        font-weight: 500;
      }
    }
  }
  .selected {
    box-shadow: 4px 6px #000000;
    div {
      h3 {
        text-transform: uppercase;
        font-weight: bold;
      }
    }
  }`;

const toggle = () => {
  const helloSection = document.querySelector('.hello__section');
  const blocker = document.querySelector('.blocker');
  helloSection.style.display = 'flex';
  blocker.style.display = 'block';
}

const hide = () => {
  const helloSection = document.querySelector('.hello__section');
  const blocker = document.querySelector('.blocker');
  helloSection.style.display = 'none';
  blocker.style.display = 'none';
}

const ChatList = ({ currentUserData, userDetails }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(undefined);

  const toggleSelected = (i, name, number, _id) => {
    setSelected(i);
    userDetails({ name, number, _id });
  }

  const logout = () => {
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
      <DIVISION>
        <div className="blocker" onClick={hide}></div>
        <div className="hello__section">
          <button onClick={logout} className="material-symbols-outlined">Logout</button>
        </div>
        <div className='navigation'>
          <div className='menu' onClick={toggle}></div>
          <ChatSearch />
        </div>
        <ASIDE>
          {
            currentUserData?.map(({ name, _id, number }, i) => {
              return (
                <div className={`column ${i === selected ? 'selected' : ''}`} key={_id} onClick={() => toggleSelected(i, name, number, _id)}>
                  <div className='avatar'>{name.charAt(0)}</div>
                  <div>
                    <h3>{name}</h3>
                  </div>
                </div>
              )
            })
          }
        </ASIDE>
      </DIVISION >
    </>
  )
}

export default ChatList






// const Division = styled.div`
//   display : flex;
//   align-items : center;
//   justify-content : center;
//   flex : 1;
//   padding : 7px 3px;
// `;

// const Input = styled.input.attrs(props => ({
//   type: "search",
// }))`
// flex : 1;
// padding : 9px;

// ::placeholder,
// ::-webkit-input-placeholder {
//   color : rgb(61, 60, 60);
//   font-size : 1rem;
// }

// &:focus  {
// background : rgb(255, 255, 255);
// }

// background : #e7e7e7;
// border: none;
// border-radius : 3px;
// `;

// const HelloSearch = () => {

//   const [value, setValue] = useState('');
//   const toggleChange = (elem) => {
//     elem.preventDefault();
//     setValue(elem.target.value);
//   }

//   return (
//     <Division>
//       <Input placeholder="search"
//         name="search"
//         id="search"
//         value={value}
//         onChange={toggleChange} />
//     </Division>
//   )
// }
