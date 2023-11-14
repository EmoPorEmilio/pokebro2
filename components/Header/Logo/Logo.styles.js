import Image from 'next/image';

export const LogoContainer = ({ children, ...props }) => (
  <div
    className='flex flex-1 justify-center items-center p-2 box-border'
    {...props}>
    {children}
  </div>
);

export const LogoIMG = ({ children, ...props }) => (
  <Image
    alt={props.alt}
    width={0}
    height={0}
    sizes={'50vw'}
    style={{
      width: '40vw',
      maxWidth: '300px',
      height: '100%',
      borderRadius: '8px',
      objectFit: 'cover',
    }}
    {...props}>
    {children}
  </Image>
);
