import Image from 'next/image';
import {
  MdMenu,
  MdHome,
  MdVideogameAsset,
  MdAccountCircle,
} from 'react-icons/md';

export const runtime = 'edge';

export default function Mobile() {
  return (
    <div className='flex flex-col h-[100dvh] w-[100dvw] bg-bg-400'>
      <nav className='h-14 w-full'>
        <div className='px-4 flex w-full mx-auto h-full items-center justify-between'>
          <div className=''>
            <Image src='/logo.png' width='41' height='41' alt='logo' />
          </div>
          <div className=''>
            <MdMenu color='#FFB2D7' size='36px' />
          </div>
        </div>
      </nav>
      <main className='flex flex-1 bg-bg-100 rounded-xl border-y-2 border-accent-500'></main>
      <nav className='h-14 w-full'>
        <div className='flex w-full mx-auto h-full items-center justify-between px-8'>
          <MdHome color='#FFB2D7' size='36px' />
          <MdVideogameAsset color='#FFB2D7' size='36px' />
          <MdAccountCircle color='#FFB2D7' size='36px' />
        </div>
      </nav>
    </div>
  );
}
