import styled from '@emotion/styled';

const AnimatedBorder = styled.div`
  --app-border-opacity: 0.8;
  position: relative;
  padding: 8px;

  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border: 2px solid;
    border-radius: 7px;
    border-color: rgba(var(--color-app-secondary), 0.3);
    transform: scale(1);
    transition: transform 300ms;
  }

   &:hover::after {
    transform: scale(1.2);
  }
  /*
  &:hover {
    transform: scale(1.1);
  }
  */
  &:focus::after {
    transform: scale(1);
    transition: transform 200ms;
  }

  &:active::after {
    transform: scale(1);
    transition: transform 200ms;
  }
`;

type AnimatedIconProps = {
  children: React.ReactNode,
  className?: string,
}

export default function AnimatedIcon({
  children,
  className,
}: AnimatedIconProps) {
  return (
    <AnimatedBorder className={className}>
      {children}
    </AnimatedBorder>
  );
}
