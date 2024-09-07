import React from 'react'

const Layout = ({children}: {children : React.ReactNode}) => {
  return (
    <main className='min-h-screen w-full flex justify-center items-center'>
        {children}
    </main>
  )
}

export default Layout