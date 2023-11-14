export const Option = ({ children, ...props }) => (
  <div
    className={`${props.correct ? 'text-correct border-correct' : ''} 
    ${props.incorrect ? 'text-incorrect border-incorrect' : ''} 
    ${
      !props.validation
        ? 'hover:pointer hover:bg-accent hover:border-[#fff] text-cards-bg'
        : ''
    }
    flex justify-center align-center rounded-lg min-h-[50px] 
    m-2 w-full bg-cards-bg border-accent border-2 border-solid text-accent text-center font-normal text-2xl`}
    {...props}>
    {children}
  </div>
);

export const OptionLoader = ({ children, ...props }) => (
  <div
    className='flex animate-pulse rounded-lg h-12 m-2 w-full border-accent border-2 border-solid @keyframes shine {'
    {...props}>
    {children}
  </div>
);
/*
export const OptionLoader = styled.div`
  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }
  background: #000;
  background: linear-gradient(
    110deg,
    ${theme.cardsBackground} 8%,
    ${theme.cardsBackgroundLoad} 18%,
    ${theme.cardsBackground} 33%
  );
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;
`;*/

export const OptionsContainer = ({ children, ...props }) => (
  <div
    className='flex flex-col h-[39vh] w-[80vw] max-w-[] justify-center align-center'
    {...props}>
    {children}
  </div>
);
