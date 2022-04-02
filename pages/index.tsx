import type { NextPage } from 'next';
import Image from 'next/image';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.main}>
      <section className={styles.container}>
        <section className={styles['image-container']}>
        </section>
        <section className={styles['tool-container']}>
        </section>
      </section>
    </div>
  )
}

export default Home;
