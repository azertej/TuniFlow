import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
interface profileProps {
    img:string,
    title:string,
    href?:string
} 
const ProfileInfo = ({img,title,href}:profileProps) => {
  return (
    <div className='flex  gap-x-1'>
        <Image src={img} height={20} width={20} alt='icon' />
        {href ? (
            <Link href={href} target='_blank' className='text-blue-600 underline'>
                {title}
            </Link>
        ): (
            <span className='text-dark400_light700 '>{title} </span>
        )}
    </div>
  )
}

export default ProfileInfo