import { AiFillStar } from 'solid-icons/ai';

export default function Mobile() {
  //const [gameState, setGameState] = useGameState();
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
  const navBorderColor = () => {
    return `
    bg-accent-500
animate-gradient-x`;
  };
  return (
    <div class='flex flex-col h-[100dvh] w-[100dvw] bg-bg-400 antialiased'>
      <nav class='h-14 w-full'>
        <div class='px-4 flex w-full mx-auto h-full items-center justify-between'>
          <img src='/logo.svg' class='w-[41px] h-[41px]' alt='logo' />
          <div class='flex justify-center'>
            <span class='block text-2xl text-accent-300 '>
              <span class={`${scoreColor()}`}>{currentScore}</span>/{maxScore}
            </span>
          </div>
        </div>
      </nav>
      <main
        class={`flex flex-1 flex-col w-full ${navBorderColor()} rounded-xl py-[2px]`}>
        <div class='flex flex-1 flex-col w-full bg-bg-100 rounded-xl'>
          <div class='flex flex-col w-full py-10 px-10  justify-center items-center'>
            <div class='flex flex-col w-full h-full items-center justify-center rounded-xl border border-primary-600 border-b-2 border-b-accent-500 bg-bg-300 '>
              <img
                src='/resources/Bulbasaur.png'
                width='210'
                height='210'
                alt='bulbasaur sprite'
              />
            </div>
          </div>
          <div class='flex flex-col w-full h-full px-10 pb-10 justify-center items-center gap-3'>
            <div class='absolute left-10'>
              <AiFillStar
                style='animate-star-victory opacity-0'
                color='#FFDD87'
                size='18px'
              />
            </div>
            <div class='absolute left-7'>
              <AiFillStar
                style='animate-star-victory opacity-0'
                color='#FFDD87'
                size='18px'
              />
            </div>
            <div class='absolute left-0'>
              <AiFillStar
                style='animate-star-victory opacity-0'
                color='#FFDD87'
                size='18px'
              />
            </div>
            <div class='absolute right-10'>
              <AiFillStar
                style='animate-star-victory opacity-0'
                color='#FFDD87'
                size='18px'
              />
            </div>

            <div class='flex w-full flex-1 items-center justify-center rounded-md border-b border-primary-500 bg-primary-700 '>
              <span class={`sen-text text-2xl text-primary-300`}>
                Charmander
              </span>
            </div>
            <div class='flex w-full flex-1 items-center justify-center rounded-md border-b border-primary-500 bg-primary-700 '>
              <span class={`sen-text text-2xl text-primary-300`}>
                Charmander
              </span>
            </div>
            <div class='flex w-full flex-1 items-center justify-center rounded-md border-b border-primary-500 bg-primary-700 '>
              <span class={`sen-text text-2xl text-primary-300`}>
                Charmander
              </span>
            </div>
            <div class='flex w-full flex-1 items-center justify-center rounded-md border-b border-primary-500 bg-primary-700 '>
              <span class={`sen-text text-2xl text-primary-300`}>
                Charmander
              </span>
            </div>
            <div class='flex w-full flex-1 items-center justify-center rounded-md border-b border-primary-500 bg-primary-700 '>
              <span class={`sen-text text-2xl text-primary-300`}>
                Charizard
              </span>
            </div>
          </div>
        </div>
      </main>
      <nav class='h-14 w-full'>
        <div class='flex w-full mx-auto h-full items-center justify-between px-8'>
          {/*}
          <MdHome color='#4C6477' size='36px' />
          <MdVideogameAsset color='#B8DFFF' size='36px' />
          <MdAccountCircle color='#4C6477' size='36px' />*/}
        </div>
      </nav>
    </div>
  );
}
