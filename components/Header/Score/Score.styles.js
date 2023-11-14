import Image from 'next/image';

export const BackArrow = ({ children, ...props }) => (
  <div className='flex flex-1 justify-center align-center' {...props}>
    {children}
  </div>
);

export const ArrowIcon = ({ children, ...props }) => (
  <svg
    className='w-auto h-full fill-accent hover:cursor-pointer hover:fill-bg-light'
    {...props}>
    {children}
  </svg>
);

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
  <div
    className='flex flex-1 justify-center align-center text-[10vw] md:text-[100px] font-light text-accent'
    {...props}>
    {children}
  </div>
);

export const HealthIcon = ({ children, ...props }) => (
  <div className='relative w-[5vw] max-w-[50px]' {...props}>
    {children}
  </div>
);

export const HealthIconImg = ({ children, ...props }) => (
  <Image
    alt='health-icon'
    fill={true}
    className={`w-[5vw] max-w[50px] ${props.off ? 'opacity-20' : ''}}`}
    {...props}>
    {children}
  </Image>
);

export const HealthContainer = ({ children, ...props }) => (
  <div className='flex flex-1 flex-col' {...props}>
    {children}
  </div>
);

export const Timer = ({ children, ...props }) => (
  <div
    className='flex flex-1 justify-center align-center text-accent text-[5vw] md:text-5xl font-light'
    {...props}>
    {children}
  </div>
);
