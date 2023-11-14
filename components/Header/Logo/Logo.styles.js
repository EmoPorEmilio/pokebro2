import Image from 'next/image';

export const LogoContainer = ({ children, ...props }) => (
  <div className='relative p-1' {...props}>
    {children}
  </div>
);

export const LogoIMG = ({ children, ...props }) => (
  <Image
    alt={props.alt}
    width={0}
    height={0}
    sizes='50vw'
    style={{ width: '100%', height: '100%', maxHeight: '150px' }}
    {...props}>
    {children}
  </Image>
);
