import Image from 'next/image';
import {
  MdMenu,
  MdHome,
  MdVideogameAsset,
  MdAccountCircle,
} from 'react-icons/md';
import { sen } from '@/app/fonts';
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
      <main className='flex flex-1 flex-col w-full bg-bg-100 rounded-xl border-y-2 border-accent-500'>
        <div className='flex flex-col w-full pt-10 pb-5 justify-center items-center'>
          <div className='flex flex-col w-[210px] h-[210px] items-center justify-center rounded-xl border border-primary-600 border-b-2 border-b-accent-500 bg-bg-300 '>
            <Image
              src='/resources/Bulbasaur.png'
              width='210'
              height='210'
              alt='bulbasaur sprite'
            />
          </div>
        </div>
        <div className='flex flex-col w-full h-full px-10 pb-10 justify-center items-center gap-3'>
          <div className='flex w-full flex-1 items-center justify-center rounded-md border-b border-primary-50 bg-primary-700 '>
            <span className={`${sen.className} text-lg text-primary-300`}>
              Charmander
            </span>
          </div>
          <div className='flex w-full flex-1 items-center justify-center rounded-md border-b border-primary-50 bg-primary-700 '>
            <span className={`${sen.className} text-lg text-primary-300`}>
              Charmander
            </span>
          </div>
          <div className='flex w-full flex-1 items-center justify-center rounded-md border-b border-primary-50 bg-primary-700 '>
            <span className={`${sen.className} text-lg text-primary-300`}>
              Charmander
            </span>
          </div>
          <div className='flex w-full flex-1 items-center justify-center rounded-md border-b border-primary-50 bg-primary-700 '>
            <span className={`${sen.className} text-lg text-primary-300`}>
              Charmander
            </span>
          </div>
          <div className='flex w-full flex-1 items-center justify-center rounded-md border-b border-primary-50 bg-primary-700 '>
            <span className={`${sen.className} text-lg text-primary-300`}>
              Charmander
            </span>
          </div>
        </div>
      </main>
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
