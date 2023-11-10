import Image from 'next/image';

export const PokemonCard = ({ children, ...props }) => (
  <div className='flex flex-col content-center justify-center' {...props}>
    {children}
  </div>
);

/*
export const PokemonCard = styled.div`
  flex: 1;
  width: 200px;
  height: 200px;
  background-color: ${theme.cardsBackground};
  border-color: ${theme.accent};
  border-width: 2px;
  border-radius: 20px;
  border-style: solid;
  align-items: center;
`;*/

export const PokemonContainer = ({ children, ...props }) => (
  <div className='flex justify-center' {...props}>
    {children}
  </div>
);

/*
export const PokemonContainer = styled.div`
  height: 40%;
`;*/

export const LoadingCard = ({ children, ...props }) => (
  <div className='' {...props}>
    {children}
  </div>
);

/*
export const LoadingCard = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
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
  background-size: 200% 500%;
  animation: 1.5s shine linear infinite;
`;*/

/*
export const PokemonIMG = styled.img`
  width: 100%;
`;*/

export const PokemonIMG = ({ children, ...props }) => (
  <Image fill={true} alt={'pokemon-img'} className='w' {...props}>
    {children}
  </Image>
);
