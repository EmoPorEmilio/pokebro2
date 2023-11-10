import Image from 'next/image';

export const LogoContainer = ({ children, ...props }) => (
  <div className='relative max-w-full max-h-full m-5' {...props}>
    {children}
  </div>
);

export const LogoIMG = ({ children, ...props }) => (
  <Image alt={props.alt} fill={true} {...props}>
    {children}
  </Image>
);
