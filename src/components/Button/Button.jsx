import { ButtonLoadMore, ButtonContainer } from './Button.styled';

const Button = ({ loadMore }) => {
  return (
    <ButtonContainer>
      <ButtonLoadMore type="submit" onClick={loadMore}>
        Load more
      </ButtonLoadMore>
    </ButtonContainer>
  );
};

export default Button;
