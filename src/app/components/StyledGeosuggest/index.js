import styled from 'styled-components';

import Geosuggest from 'react-geosuggest';

const StyledGeosuggest = styled(Geosuggest)`
& .geosuggest__suggests--hidden {
  max-height: 0;
  overflow: hidden;
  border-width: 0;
}
`;

export default StyledGeosuggest;
