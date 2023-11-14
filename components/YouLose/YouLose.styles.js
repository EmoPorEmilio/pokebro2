import Image from 'next/image';

export const YouLoseCard = ({ children, ...props }) => (
  <div
    className='flex flex-col m-12 w-[100%] justify-center content-center p-5 bg-cards-bg border-2 rounded-2xl border-solid border-accent '
    {...props}>
    {children}
  </div>
);

export const YouLoseContainer = ({ children, ...props }) => (
  <div
    className='flex flex-col max-w-[80%] h-[68%] justify-center items-center text-accent'
    {...props}>
    {children}
  </div>
);

export const YouLoseIMG = ({ children, ...props }) => (
  <Image
    fill={true}
    alt='you lose pikachu'
    className='m-w-full hidden'
    {...props}>
    {children}
  </Image>
);

export const CanvasToExport = ({ children, ...props }) => (
  <canvas className='absolute hidden' {...props}>
    {children}
  </canvas>
);

export const UIButtons = ({ children, ...props }) => (
  <div className='flex' {...props}>
    {children}
  </div>
);

export const UIButton = ({ children, ...props }) => (
  <div
    className='flex cursor-pointer m-2 p-2 text-accent text-2xl border-accent border-solid rounded-2xl border-2  hover:bg-accent hover:text-cards-bg'
    {...props}>
    {children}
  </div>
);
