"use client";
import styles from "./page.module.css";
import { useState } from "react";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import Grafo from "@/components/Grafo";

export default function Home() {
  const [course, setCourse] = useState("EngenhariaAmbiental");
  const [quantity, setQuantity] = useState(5);

  return (
    <main className={styles.main}>
      <Menu
        course={course}
        setCourse={setCourse}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      <Grafo quantity={quantity}/>
      <Footer />
    </main>
  );
}
