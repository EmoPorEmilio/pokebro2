import Image from 'next/image';

export const LogoContainer = ({ children, ...props }) => (
  <div className='relative  h-[204px] w-[677px] m-5' {...props}>
    {children}
  </div>
);

export const LogoIMG = ({ children, ...props }) => (
  <Image alt={props.alt} fill={true} {...props}>
    {children}
  </Image>
);
