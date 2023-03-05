import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';

const DIVISION = styled.div`
  display : flex;
  align-items : center;
  justify-content : center;
  flex : 1;
  padding : 7px 3px;
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

const ChatSearch = ({ textVal, clear }) => {
  const inputRef = useRef('');
  useEffect(() => {
    if (clear === true) inputRef.current.value = "";
  }, [clear]);

  return (
    <DIVISION>
      <INPUT
        ref={inputRef}
        placeholder="Search"
        name="search"
        id="search"
        onChange={(e) => textVal(e.target.value)} />
    </DIVISION >
  )
}

export default ChatSearch