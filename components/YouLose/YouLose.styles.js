import Image from 'next/image';

export const YouLoseCard = ({ children, ...props }) => (
  <div className='flex flex-col justify-center content-center ' {...props}>
    {...children}
  </div>
);

/*
export const YouLoseCard = styled.div`
  padding: 20px;
  background-color: ${theme.cardsBackground};
  border-color: ${theme.accent};
  border-width: 2px;
  border-radius: 20px;
  border-style: solid;
  width: 100%;
  margin: 50px;
`;
*/

export const YouLoseContainer = ({ children, ...props }) => (
  <div className='flex flex-col' {...props}>
    {...children}
  </div>
);

/*
export const YouLoseContainer = styled.div`
  height: 68%;
  max-width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.accent};
`;*/

export const YouLoseIMG = ({ children, ...props }) => (
  <Image className='' {...props}>
    {...children}
  </Image>
);

/*
export const YouLoseIMG = styled.img`
  position: absolute;
  max-width: 100%;
`;*/

export const CanvasToExport = ({ children, ...props }) => (
  <canvas className='' {...props}>
    {...children}
  </canvas>
);
/*
export const CanvasToExport = styled.canvas`
  position: absolute;
  display: none;
`;*/

export const UIButtons = ({ children, ...props }) => (
  <div className='flex' {...props}>
    {...children}
  </div>
);

export const UIButton = ({ children, ...props }) => (
  <div className='flex' {...props}>
    {...children}
  </div>
);

/*
export const UIButton = styled.div`
  cursor: pointer;
  margin: 10px;
  padding: 10px;
  color: ${theme.accent};
  border-radius: 20px;
  border-width: 2px;
  border-radius: 20px;
  border-style: solid;
  font-size: 25px;
  background-color: ${theme.cardsBackground};
  :hover {
    background-color: ${theme.accent};
    color: ${theme.cardsBackground};
  }
`;*/
