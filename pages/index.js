import Head from 'next/head'
import { useState } from 'react';

// components
import UploadImage from '../components/UploadImage';
import Uploading from '../components/Uploading';
import UploadSuccess from '../components/UploadSuccess';

export default function Home() {
  const [imageUrl, setImageUrl] = useState(false)

  return (
    <div >
      <Head>
        <title>Upload your image !</title>
        <meta name="image-uploader" content="upload images easily" />
        <link rel="icon" href="/devchallenges.png" />
      </Head>

      <main className='bg-slate-100 min-h-screen flex justify-center items-center'>
        
        {imageUrl === false && <UploadImage setImageUrl={setImageUrl}  />}

        {imageUrl === 'loading' && <Uploading /> }

        {(imageUrl !== false && imageUrl !== 'loading') && <UploadSuccess imageUrl={imageUrl} /> }

        <footer className='absolute bottom-0.5 text-[#A9A9A9]'>
          <p>created by <span className='font-bold' >teo</span> - devChallenges.io</p>
        </footer>
  
      </main>
    </div>
  )
}
