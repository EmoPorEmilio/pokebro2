'use client';
import Image from 'next/image';
import {
  //MdMenu,
  MdHome,
  MdVideogameAsset,
  MdAccountCircle,
  MdOutlineStar,
} from 'react-icons/md';
import { sen } from '@/app/fonts';
import { useGameState } from '../hooks/useGameState';
export const runtime = 'edge';

export default function Mobile() {
  const [gameState, setGameState] = useGameState();
  let currentScore = 80;
  let maxScore = 100;
  let scoreColor = () => {
    if (currentScore / maxScore < 0.3) {
      return 'text-danger-400';
    } else if (currentScore / maxScore < 0.7) {
      return 'text-warning-400';
    } else {
      return 'text-success-400';
    }
  };
  return (
    <div className='flex flex-col h-[100dvh] w-[100dvw] bg-bg-400 antialiased'>
      <nav className='h-14 w-full'>
        <div className='px-4 flex w-full mx-auto h-full items-center justify-between'>
          <div className=''>
            <Image src='/logo.png' width='41' height='41' alt='logo' />
          </div>
          <div className='flex justify-center'>
            <span className='block text-2xl text-accent-300 '>
              <span className={`${scoreColor()}`}>{currentScore}</span>/
              {maxScore}
            </span>
          </div>
        </div>
      </nav>
      <main className='flex flex-1 flex-col w-full bg-bg-100 rounded-xl border-y-2 border-accent-500'>
        <div className='flex flex-col w-full pt-10 pb-5  px-10  justify-center items-center'>
          <div className='flex flex-colw-full h-full items-center justify-center rounded-xl border border-primary-600 border-b-2 border-b-accent-500 bg-bg-300 '>
            <Image
              src='/resources/Bulbasaur.png'
              width='210'
              height='210'
              alt='bulbasaur sprite'
            />
          </div>
        </div>
        <div className='flex flex-col w-full h-full px-10 pb-10 justify-center items-center gap-3'>
          <div className='absolute left-10'>
            <MdOutlineStar color='#FFDD87' size='18px' />
          </div>
          <div className='absolute right-10'>
            <MdOutlineStar color='#FFDD87' size='18px' />
          </div>
          <div className='flex w-full flex-1 items-center justify-center rounded-md border-b border-primary-500 bg-primary-700 '>
            <span className={`${sen.className} text-2xl text-primary-300`}>
              Charmander
            </span>
          </div>
          <div className='flex w-full flex-1 items-center justify-center rounded-md border-b border-primary-500 bg-primary-700 '>
            <span className={`${sen.className} text-2xl text-primary-300`}>
              Charmander
            </span>
          </div>
          <div className='flex w-full flex-1 items-center justify-center rounded-md border-b border-primary-500 bg-primary-700 '>
            <span className={`${sen.className} text-2xl text-primary-300`}>
              Charmander
            </span>
          </div>
          <div className='flex w-full flex-1 items-center justify-center rounded-md border-b border-primary-500 bg-primary-700 '>
            <span className={`${sen.className} text-2xl text-primary-300`}>
              Charmander
            </span>
          </div>
          <div className='flex w-full flex-1 items-center justify-center rounded-md border-b border-primary-500 bg-primary-700 '>
            <span className={`${sen.className} text-2xl text-primary-300`}>
              Charizard
            </span>
          </div>
        </div>
      </main>
      <nav className='h-14 w-full'>
        <div className='flex w-full mx-auto h-full items-center justify-between px-8'>
          <MdHome color='#4C6477' size='36px' />
          <MdVideogameAsset color='#FFB2D7' size='36px' />
          <MdAccountCircle color='#4C6477' size='36px' />
        </div>
      </nav>
    </div>
  );
}
