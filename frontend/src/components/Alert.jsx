
import React from 'react';
import styles from './Alert.module.css';

const Alert = ({ type, message, onClose }) => {
  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      <p className={styles.message} >{message}</p>
      <button className={styles.closeButton} onClick={onClose}>x</button>
    </div>


  );
};

export default Alert;
