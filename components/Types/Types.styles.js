export const TypeCard = ({ children, ...props }) => (
  <div
    className={`flex flex-1 p-2 m-1 flex-col content-center justify-center`}
    {...props}>
    {children}
  </div>
);
/*
export const TypeCard = styled.div`
  flex: 1;
  padding: 10px;
  margin: 5px;
  background-color: ${(props) => props.color};
  border-color: ${theme.accent};
  color: ${theme.background};
  border-width: 2px;
  border-radius: 50px;
  border-style: solid;
  align-items: center;
`;*/

export const TypesContainer = ({ children, ...props }) => (
  <div
    className='flex h-2/5 align-center justify-center items-center'
    {...props}>
    {children}
  </div>
);

export const TypeContainer = ({ children, ...props }) => (
  <div className='' {...props}>
    {children}
  </div>
);

export const VSTitle = ({ children, ...props }) => (
  <span className='text-accent text-lg' {...props}>
    {children}
  </span>
);
