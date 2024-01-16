export const runtime = 'edge';

export default function Mobile() {
  return (
    <div className='flex flex-col h-[100dvh] w-[100dvw] bg-bg-400'>
      <nav className='h-10 w-full'></nav>
      <main className='flex flex-1 bg-bg-100 rounded-xl border-y-2 border-accent-500'></main>
      <nav className='h-10 w-full'></nav>
    </div>
  );
}
