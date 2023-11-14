import Image from 'next/image'
import styles from './page.module.css'
import { ExpandMore } from '@mui/icons-material'
export default function Home() {
  return (
    <main className={styles.main}>

      <div className={styles.menu}>

        <div className={styles.boxLogo}>
          <Image
            className={styles.logo}
            src="/logo.svg"
            alt="Course calculator Logo"
            width={40}
            height={40}
            priority
          />
          <h2>Course Calculator</h2>
        </div>

        <div className={styles.menuButtons}>
          <button>
            Curso 
            <ExpandMore color="white"/>
          </button>

          <button>
            Quantidade 
            <ExpandMore color="white"/>
          </button>
        </div>
      </div>


    </main>
  )
}
