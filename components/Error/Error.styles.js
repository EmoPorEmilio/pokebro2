export const ErrorCard = ({ children, ...props }) => (
  <div className='flex flex-col justify-center align-center p-5' {...props}>
    {...children}
  </div>
);

/*
export const ErrorCard = styled.div`
  background-color: ${theme.cardsBackground};
  border-color: ${theme.accent};
  border-width: 2px;
  border-radius: 20px;
  border-style: solid;
  width: 100%;
  margin: 50px;
  color: ${theme.accent};
  font-weight: 800;
  font-size: 20px;
`;*/

export const ErrorContainer = ({ children, ...props }) => (
  <div className='flex justify-center align-center' {...props}>
    {...children}
  </div>
);

/*
export const ErrorContainer = styled.div`
  height: 68%;
  max-width: 80%;
`;*/
