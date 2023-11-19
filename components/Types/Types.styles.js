export const TypeCard = ({ children, ...props }) => (
  <div
    className={`flex flex-1 p-2 m-1 flex-col content-center justify-center ${props.color} border-accent text-background border-2 rounded-[50px] border-solid items-center`}
    {...props}>
    {children}
  </div>
);

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
