import styled from '@emotion/styled';

export const ImageGalleryItemContainer = styled.li`
  border-radius: 2px;
  list-style: none;
  cursor: zoom-in;

  width: 400px;
  heigth: 300px;
  transition: 400ms;
  transform: scale(1);
  margin: 20px;
  &:hover {
    transition: 400ms;
    transform: scale(1.03);

    &:before,
    &:after {
      content: '';
      position: absolute;
      left: -2px;
      top: -2px;
      background: linear-gradient(
        45deg,
        #fb0094,
        #0000ff,
        #00ff00,
        #ffff00,
        #ff0000,
        #fb0094,
        #0000ff,
        #00ff00,
        #ffff00,
        #ff0000
      );
      background-size: 400%;
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      z-index: -1;
      animation: steam 20s linear infinite;
    }

    @keyframes steam {
      0% {
        background-position: 0 0;
      }
      50% {
        background-position: 400% 0;
      }
      100% {
        background-position: 0 0;
      }
    }

    &:after {
      filter: blur(20px);
    }
  }
`;
