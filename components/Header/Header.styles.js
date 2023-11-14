export const HeaderContainer = ({ children, ...props }) => (
  <div
    className='flex flex-row border-b-2 border-solid border-accent h-1/5'
    {...props}>
    {children}
  </div>
);
