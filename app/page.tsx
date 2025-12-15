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
import { useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';

export const runtime = 'edge';
const queryClient = new QueryClient();

export default function Game() {
  /*
    const mutation = useMutation(async()=>{

    }, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('todos')
    },
  })*/

  const [currentScore, setCurrentScore] = useState('000');
  const [maxScore, setMaxScore] = useState('000');
  let scoreColor = useMemo(() => {
    if (parseInt(currentScore) / parseInt(maxScore) < 0.3) {
      return 'text-danger-400';
    } else if (parseInt(currentScore) / parseInt(maxScore) < 0.7) {
      return 'text-warning-400';
    } else {
      return 'text-success-400';
    }
  }, [currentScore, maxScore]);

  const navBorderColor = () => {
    return `bg-accent-500 animate-gradient-x`;
  };
  return (
    <QueryClientProvider client={queryClient}>
      <div className='flex flex-col h-[100dvh] w-[100dvw] bg-bg-400 antialiased'>
        <nav className='h-14 w-full'>
          <div className='px-4 flex w-full mx-auto h-full items-center justify-between'>
            <img src='/logo.svg' className='w-[41px] h-[41px]' alt='logo' />
            <div className='flex justify-center'>
              <span className='block text-2xl text-accent-300 '>
                <span className={`${scoreColor}`}>{currentScore}</span>/
                {maxScore}
              </span>
            </div>
          </div>
        </nav>
        <main
          className={`flex flex-1 flex-col w-full ${navBorderColor()} rounded-xl py-[2px]`}>
          <div className='flex flex-1 flex-col w-full bg-bg-100 rounded-xl'>
            <div className='flex flex-col w-full py-10 px-10  justify-center items-center'>
              <div className='flex flex-col w-full h-full items-center justify-center rounded-xl border border-primary-600 border-b-2 border-b-accent-500 bg-bg-300 '>
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
                <MdOutlineStar
                  className='animate-star-victory opacity-0'
                  color='#FFDD87'
                  size='18px'
                />
              </div>
              <div className='absolute left-7'>
                <MdOutlineStar
                  className='animate-star-victory opacity-0'
                  color='#FFDD87'
                  size='18px'
                />
              </div>
              <div className='absolute left-0'>
                <MdOutlineStar
                  className='animate-star-victory opacity-0'
                  color='#FFDD87'
                  size='18px'
                />
              </div>
              <div className='absolute right-10'>
                <MdOutlineStar
                  className='animate-star-victory opacity-0'
                  color='#FFDD87'
                  size='18px'
                />
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
          </div>
        </main>
        <nav className='h-14 w-full'>
          <div className='flex w-full mx-auto h-full items-center justify-between px-8'>
            <MdHome color='#4C6477' size='36px' />
            <MdVideogameAsset color='#B8DFFF' size='36px' />
            <MdAccountCircle color='#4C6477' size='36px' />
          </div>
        </nav>
      </div>
    </QueryClientProvider>
  );
}
