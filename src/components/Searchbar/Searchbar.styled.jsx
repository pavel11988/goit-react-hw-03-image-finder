import styled from '@emotion/styled';

export const SearchbarContainer = styled.header`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 34px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  background: rgb(0, 153, 210);
  background: radial-gradient(
    circle,
    rgba(0, 153, 210, 1) 0%,
    rgba(0, 9, 28, 1) 100%
  );
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
  border-radius: 10px;
`;
export const SearchButton = styled.button`
  width: 100px;
  height: 38px;
  margin: 2px 5px;
  cursor: pointer;
  outline: none;
  border: 0;
  background-color: #2b2ba1;
  border-radius: 10px;
  transition: 400ms;
  &:hover {
    transition: 400ms;
    background-color: #0000ff;
  }
`;

export const ButtonLabel = styled.span`
  color: white;
  font-weight: 700;
  font-size: 15px;
`;

export const SearchInput = styled.input`
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: 20px;
  border: none;
  outline: none;
  padding-left: 10px;
  padding-right: 10px;
  &::placeholder {
    font: inherit;
    font-size: 18px;
  }
`;
