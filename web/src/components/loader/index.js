import Loader from 'react-loaders';
import 'loaders.css';
import styled from 'styled-components';

const StyledLoader = styled(Loader)`
  .loader-inner {
    > div {
      background: #3f51b5;
    }
  }
`;

export default StyledLoader;
