export const DamageContainer = ({ children, ...props }) => (
  <div
    className='flex justify-center align-center w-[80vw] text-accent max-w-[80%] text-center text-2xl xs:text-5xl'
    {...props}>
    {children}
  </div>
);

/*
export const DamageContainer = styled.div`
  width: 80vw;
  color: ${theme.accent};
  max-width: 80%;
  text-align: center;
  font-size: 25px;
  @media screen and (min-width: 350px) {
    font-size: 50px;
  }
`;*/
