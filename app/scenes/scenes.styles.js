export const BodyContainer = ({ children, ...props }) => (
  <div className='flex flex-col w-[80vw] max-w-[500px]' {...props}>
    {children}
  </div>
);
