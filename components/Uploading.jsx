import React from 'react'
import styles from './Uploading.module.css'

const Uploading = () => {
  return (
    <div className={styles.container}>
        <p className={styles.title}>Uploading...</p>
        <div className={styles.loadingBar}>
          <div className={styles.uploadProgress}></div>
        </div>
    </div>
  )
}

export default Uploading