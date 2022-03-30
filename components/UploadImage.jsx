import React, { useRef } from 'react'
import styles from './UploadImage.module.css'



const UploadImage = ({setImageUrl}) => {
  const fileInputRef = useRef(null);

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = async () => {
    const file = fileInputRef.current.files[0];
    handleSubmit(file)
  };

  const handleSubmit = async (file) => {
    setImageUrl('loading');
    // get secure url from server
    const response = await fetch(`/api/upload-url?file=${file.name}`)
    var { url } = await response.json();
    // post image to S3 bucket
    fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: file
    }).then(() => setImageUrl(url.split('?')[0]))
  }


  const handleOndragOver = event => {
    event.preventDefault();
  }
  const handleOndrop = event => {
      //prevent the browser from opening the image
      event.preventDefault(); 
      event.stopPropagation();
      //let's grab the image file
      let file = event.dataTransfer.files[0];
      handleSubmit(file)
  }

  return (
    <div className={styles.container}>
      <div className='text-center'>
        <p className={styles.title}>Upload your image</p> 
        <p className={styles.title2}>File should be Jpeg, Png,...</p> 
      </div>

      <div 
        onDragOver = {handleOndragOver}
        onDrop = {handleOndrop}
        className={styles.dragAndDropArea}>
        <img className={styles.img} src="/image.svg" alt="An SVG backgournd" />
        <p className={styles.title3}>Drag & Drop your image here</p>
      </div>

      <div className='text-center'>
        <p className={styles.title4}>Or</p>
        <button 
        onClick={onClickHandler} 
        className={styles.button}>Choose a file
        </button>
      </div>
      <input
        name='file'
        onChange={onChangeHandler}
        ref={fileInputRef}
        style={{ display: 'none' }}
        type="file"
      />
    </div>
  )
}

export default UploadImage