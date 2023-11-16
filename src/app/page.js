"use client";
import styles from './page.module.css'
import { useState } from 'react'
import Menu from '@/components/Menu';
import Footer from '@/components/Footer';

export default function Home() {
  const [course, setCourse] = useState("ComputerScience")
  const [quantity, setQuantity] = useState("5")

  return (
    <main className={styles.main}>
      <Menu course={course} setCourse={setCourse} quantity={quantity} setQuantity={setQuantity}/>
      <Footer />
    </main>
  )
}
