export const DamageContainer = ({ children, ...props }) => (
  <div
    className='flex justify-center align-center w-[80vw] text-accent max-w-[80%] xxs:text-5xl text-center text-2xl xs:text-5xl'
    {...props}>
    {children}
  </div>
);
