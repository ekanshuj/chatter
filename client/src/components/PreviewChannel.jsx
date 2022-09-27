import styled from 'styled-components';
import welcome from '../assets/welcome.mp4';

const DIVISION = styled.div`
.gif {
  height: 91vh;
  display: grid;
  place-items: center;
}
`;


const PreviewChannel = () => {

  return (
    <DIVISION>
      <div className="gif">
        <video src={welcome} autoPlay loop></video>
      </div>
    </DIVISION>
  )
}

export default PreviewChannel