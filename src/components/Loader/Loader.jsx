import { Grid } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderContainer>
      <Grid color="white" height={70} width={70} />
    </LoaderContainer>
  );
};

export default Loader;
