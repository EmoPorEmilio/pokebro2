import Image from 'next/image';

export const LogoContainer = ({ children, ...props }) => (
  <div className='flex flex-[2] m-5 align-center justify-center' {...props}>
    {...children}
  </div>
);

export const LogoIMG = ({ children, ...props }) => (
  <Image alt={props.alt} className='' {...props}>
    {...children}
  </Image>
);

/*
export const LogoIMG = styled.img`
  max-width: 100%;
`;*/
