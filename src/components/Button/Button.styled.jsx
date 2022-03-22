import styled from '@emotion/styled';

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
  margin-bottom: 25px;
`;

export const ButtonLoadMore = styled.button`
  width: 200px;
  height: 50px;
  border: 0;
  border-radius: 15px;
  font-size: 18px;
  cursor: pointer;
  color: #fff;
  background-color: #3f51b5;
  display: inline-block;
  display: inline-block;
  text-align: center;
  &:hover {
    background-color: #303f9f;
  }
  &:focus {
    background-color: #303f9f;
  }
`;
