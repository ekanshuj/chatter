import React, { useState } from 'react';
import styled from 'styled-components';
import { CgMoreVertical } from 'react-icons/cg';
import { GiBalaclava } from 'react-icons/gi';
import { ChatChannelInput } from './';


const DIVISION = styled.div`
height: 91vh;
width: 100%;
/* background: #000000; */
`;

const USER = styled.header`
background: #ffffff;
box-shadow: 0px 7px 7px -1px rgba(0,0,0,0.4);
-webkit-box-shadow: 0px 7px 7px -1px rgba(0,0,0,0.4);
-moz-box-shadow: 0px 7px 7px -1px rgba(0,0,0,0.4);
margin-inline: 11px;
padding: 17px 9px;
border-radius: 0px 0px 4px 4px;
/* margin: 0px 2px 5px 2px; */
/* background: #e0e0e0; */
display: flex;
align-items: center;
justify-content: space-between;
.user__info {
  position: relative;
  span {
    cursor: pointer;
  }
  .show__user__info-template {
    display: block;
    background: #ffffff;
    box-shadow: 0px 7px 7px -1px rgba(0,0,0,0.4);
    -webkit-box-shadow: 0px 7px 7px -1px rgba(0,0,0,0.4);
    -moz-box-shadow: 0px 7px 7px -1px rgba(0,0,0,0.4);
    border-radius: 0px 0px 4px 4px;
    padding: 11px 7px;
    margin-top: 7px;
    position: absolute;
    right: 0%;
    width: 278px;
    p {
      font-size: 1.3rem;
      padding: 3px 0px;
    }
  }
}
`;

const MESSAGES = styled.section`
height: 77vh;
width: 100%;
padding: 9px 17px;
`;

const ChatChannel = ({ currentUserChat: { name, number, username } }) => {
  const [toggle, setToggle] = useState(false);

  const toggleHandle = () => {
    setToggle((prev) => !prev);
  }

  return (
    <DIVISION>
      <USER>
        <div className="user__name">
          <h1>{name}</h1>
        </div>
        <div className="user__info">
          <span onClick={toggleHandle}>
            <CgMoreVertical size={"1.75rem"} />
          </span>
          <template className={`${toggle === true && 'show__user__info-template'}`}>
            <p>{name}</p>
            <p>{username}</p>
            <p>{number}</p>
            <GiBalaclava />
          </template>
        </div>
      </USER>
      <MESSAGES>
        <h1>Users</h1>
      </MESSAGES>
      <ChatChannelInput />
    </DIVISION>
  )
}

export default ChatChannel

