export const ErrorCard = ({ children, ...props }) => (
  <div
    className='w-full m-[50px] text-accent font-extrabold text-xl border-solid flex flex-col justify-center align-center p-5 bg-cards-bg border-accent border-2 rounded-2xl '
    {...props}>
    {children}
  </div>
);

export const ErrorContainer = ({ children, ...props }) => (
  <div
    className='flex justify-center align-center h-4/6 max-w-[80%]'
    {...props}>
    {children}
  </div>
);
