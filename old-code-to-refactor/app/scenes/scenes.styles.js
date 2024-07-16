export const BodyContainer = ({ children, ...props }) => (
  <div className='flex flex-col' {...props}>
    {children}
  </div>
);
