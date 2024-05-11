import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils';
interface HomeProps{
    color : string;
    img:string;
    title:string;
    desc : string;
    click : () =>void;
}
const HomeCard = ({color,img,desc,title ,click}: HomeProps) => {
  return (
    <div className={cn ( 'px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer',color)} onClick={click}>
            <div className='flex-center glassmorphism size-12 rounded-[12px]'>
                <Image
                    src={img}
                    alt="hgsdf"
                    width={27} height={27}
                />
            </div>
            <div className='flex flex-col gap-3'>
                <h1 className='text-2xl font-bold '>{title}</h1>
                <p className=' text-lg font-normal'>{desc}</p>
            </div>
        </div>
  )
}

export default HomeCard