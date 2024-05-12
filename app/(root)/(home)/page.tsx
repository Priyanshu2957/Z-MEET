import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react'
import { Sedgwick_Ave_Display } from 'next/font/google';
const ds = Sedgwick_Ave_Display({
  weight: '400',
  subsets : ['latin'],
})      
const Home = () => {
  const curr = new Date();
  const timeNow = curr.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',timeZone: 'Asia/Kolkata',hour12:false});
  const time = curr.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',timeZone: 'Asia/Kolkata'});
  const date = curr.toLocaleDateString('en-US',{dateStyle:'full',timeZone: 'Asia/Kolkata'});
  const greeting = timeNow >= '5' && timeNow < '12'
    ? "Good Morning"
    : timeNow >= '12' && timeNow < "18"
    ? "Good Afternoon"
    : "Good Evening";
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 md:p-9 lg:p-11'>
          <h1 className='glassmorphism max-w-[170px] rounded py-2 text-center text-xl font-normal'><span className={ds.className}>{greeting}</span></h1>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold md:text-5xl lg:text-7xl'>
                {time}
            </h1>
            <p className='text-lg font-medium text-sky-100 md:text-xl lg:text-2xl'>
              {date}
            </p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  )
}

export default Home
