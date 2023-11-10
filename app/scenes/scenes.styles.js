export const BodyContainer = ({ children, ...props }) => (
  <div className='flex flex-col w-[80vw]' {...props}>
    {children}
  </div>
);

/*
export const BodyContainer = styled.div`
  max-width: 500px;
`;*/
