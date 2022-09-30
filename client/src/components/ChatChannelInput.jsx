import React, { useState } from 'react'
import styled from 'styled-components';
import { BsFillEmojiWinkFill } from 'react-icons/bs';
import { GrSend } from 'react-icons/gr';
import EmojiPicker from 'emoji-picker-react';

const DIVISION = styled.div`
width: 100%;
padding: 3px 7px;
background: rgb(255, 255, 255);
border-top: 2px solid rgba(0,0,0,0.5);
display: flex;
justify-content: center;
align-items: center;
position: relative;
.selector {
  position: absolute;
  bottom: 72px;
  left: 9px;
  display: none;
}
.toggle__selector {
  display: block;
}
.picker {
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    background: none;
    border: none;
    padding: 1px 5px;
    margin-inline: 7px;
    cursor: pointer;
  }}`;

const FORM = styled.form`
display: flex;
align-items: center;
justify-content: center;
flex: 1;
  button {
    background: none;
    border: none;
    padding: 1px 5px;
    margin-inline: 7px;
    cursor: pointer;
  }
`;

const INPUT = styled.input`
height: 5.5vh;
width: 100%;
outline: none;
font-size: 1.55rem;
border: none;
border: 2px solid rgba(0,0,0,0.2);
padding: 0rem 0.5rem;
  ::placeholder {
    font-size: 1.1rem;
  }
`;

const ChatChannelInput = ({ toggleTexts }) => {
  const [togglePicker, SetTogglePicker] = useState(false);
  const [text, setText] = useState('');

  const handleToggle = () => {
    SetTogglePicker(prev => !prev);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.length > 0) {
      toggleTexts(text);
      setText('');
    }
  }

  return (
    <DIVISION>
      <div className={`selector ${togglePicker === true && 'toggle__selector'}`}>
        <EmojiPicker />
      </div>
      <div className="picker">
        <button onClick={handleToggle}>
          <BsFillEmojiWinkFill size={'1.85rem'} />
        </button>
      </div>
      <FORM className="input" onSubmit={(event) => handleSubmit(event)}>
        <INPUT type="text" placeholder='Type to Send Message...' onChange={(event) => setText(event.target.value)} value={text} />
        <button onClick={(event) => handleSubmit(event)}>
          <GrSend size={'2rem'} />
        </button>
      </FORM>
    </DIVISION>
  )
}

export default ChatChannelInput