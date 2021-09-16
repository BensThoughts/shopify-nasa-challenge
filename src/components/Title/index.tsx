import styled from '@emotion/styled';

const Title = styled.h1`
  font-family: 'Orbitron', sans-serif;
  color: rgb(var(--color-text-primary));
  font-style: oblique;
  text-shadow: 2px 2px 2px #5c5f72;;
  letter-spacing: 10px;
  font-size: 2rem;
  @media (min-width: 640px) {
    font-size: 3rem;
    line-height: 3.5rem;
  }
  @media (min-width: 768px) {
    font-size: 4rem;
    line-height: 4.5rem;
  }
`;

export default Title;
