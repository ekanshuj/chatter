import styled from 'styled-components';
import chat from '../assets/chat.svg';

const DIVISION = styled.div`
.gif {
  height: 91vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    aspect-ratio: 1;
    width: 30rem;
  }
  p {
    background: rgba(0,0,0,0.2);
    padding: 4px 9px;
    border-radius: 10px;
    font-weight: semi-bold;
    letter-spacing: 1px;
    font-size: 0.9rem;
  }
}
`;


const PreviewChannel = () => {
  return (
    <DIVISION>
      <div className="gif">
        <img src={chat} />
        <p>Select a chat to start messaging</p>
      </div>
    </DIVISION>
  )
}

export default PreviewChannel