export const HeaderContainer = ({ children, ...props }) => (
  <div className='flex' {...props}>
    {children}
  </div>
);

/*
export const HeaderContainer = styled.div`
  flex-direction: row;
  border-bottom: 2px solid ${theme.accent};
  height: 20%;
`;*/
