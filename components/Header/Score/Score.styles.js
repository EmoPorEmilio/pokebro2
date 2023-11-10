import Image from 'next/image';

export const BackArrow = ({ children, ...props }) => (
  <div className='flex flex-1 justify-center align-center' {...props}>
    {children}
  </div>
);

export const ArrowIcon = ({ children, ...props }) => (
  <svg className='' {...props}>
    {children}
  </svg>
);

/*
export const ArrowIcon = styled.svg`
  width: auto;
  height: 100%;
  fill: ${theme.accent};
  :hover {
    cursor: pointer;
    fill: ${theme.backgroundLight};
  }
`;*/

export const ScoreContainer = ({ children, ...props }) => (
  <div className='flex flex-1 m-5' {...props}>
    {children}
  </div>
);

export const HealthPoints = ({ children, ...props }) => (
  <div className='flex flex-1 justify-center align-center' {...props}>
    {children}
  </div>
);

export const ScorePoints = ({ children, ...props }) => (
  <div className='flex flex-1 justify-center align-center' {...props}>
    {children}
  </div>
);

/*
export const ScorePoints = styled.div`
  color: ${theme.accent};
  font-size: 10vw;
  @media screen and (min-width: 900px) {
    font-size: 100px;
  }
  font-weight: 300;
`;*/

export const HealthIcon = ({ children, ...props }) => (
  <Image className='' {...props}>
    {children}
  </Image>
);

/*
export const HealthIcon = styled.img`
  width: 5vw;
  max-width: 50px;
  ${(props) => (props.off ? 'opacity: 0.2' : '')}
`;*/

export const HealthContainer = ({ children, ...props }) => (
  <div className='flex flex-1 flex-col' {...props}>
    {children}
  </div>
);

export const Timer = ({ children, ...props }) => (
  <div className='flex flex-1 justify-center align-center' {...props}>
    {children}
  </div>
);

/*
export const Timer = styled.div`
  color: ${theme.accent};
  font-size: 5vw;
  @media screen and (min-width: 900px) {
    font-size: 50px;
  }
  font-weight: 300;
`;
*/
