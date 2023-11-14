export const HeaderContainer = ({ children, ...props }) => (
  <div
    className='bg-dark-background flex flex-row border-b-2 border-solid border-accent h-1/5'
    {...props}>
    {children}
  </div>
);
