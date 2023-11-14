import Image from 'next/image';

export const PokemonCard = ({ children, ...props }) => (
  <div
    className='relative flex-col content-center items-center justify-center flex-1 w-[200px] h-[200px] bg-cards-bg border-accent rounded-2xl border-solid '
    {...props}>
    {children}
  </div>
);

export const PokemonContainer = ({ children, ...props }) => (
  <div className='flex justify-center h-2/5' {...props}>
    {children}
  </div>
);

export const LoadingCard = ({ children, ...props }) => (
  <div
    className='w-full h-full rounded-2xl animate-pulse bg-bg-light'
    {...props}>
    {children}
  </div>
);

/*
export const LoadingCard = styled.div`
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

export const PokemonIMG = ({ children, ...props }) => (
  <Image fill={true} alt={'pokemon-img'} className='w-full' {...props}>
    {children}
  </Image>
);
