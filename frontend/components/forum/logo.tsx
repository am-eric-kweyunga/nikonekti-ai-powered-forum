import React from 'react'
import Image from 'next/image'

const Logo: React.FC = () => {
    return (
      <div className="flex items-center justify-center h-auto gap-2 text-lg font-bold px-4 text-white">
        <Image
          src="/images/nikonekti/face.svg"
          width={45}
          height={45}
          alt="Nikonekti"
          className="rounded-full"
        />
        <Image
          src="/images/nikonekti/nikonekti.svg"
          width={150}
          height={50}
          alt="Nikonekti"
          className="hidden md:block"
        />
      </div>
    )
}

export default Logo