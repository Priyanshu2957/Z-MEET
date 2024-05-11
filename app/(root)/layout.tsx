import StreamVideoProvider from '@/providers/StreamClientProvider'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'


export const metadata: Metadata = {
  title: "Z-MEET",
  description: "Video Conference App",
  icons:{
    icon: '/icons/logo-1.png'
  }
};
const RootLayout = ({children} : {children :ReactNode}) => {
  return (
    <main>
      <StreamVideoProvider>
      {children}
      </StreamVideoProvider>
        
    </main>
  )
}

export default RootLayout