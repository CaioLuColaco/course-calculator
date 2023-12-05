import styles from "./menu.module.css"
import Image from 'next/image'

export default function Menu({course, setCourse, quantity, setQuantity}) {

    return(
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
                <select value={course} onChange={ e => setCourse(e.target.value)}>
                    <option value="EngenhariaAmbiental">Engenharia Ambiental</option>
                </select>

                <select value={quantity} onChange={ e => setQuantity(e.target.value)}>
                    <option value="3">3 Cadeiras</option>
                    <option value="4">4 Cadeiras</option>
                    <option value="5">5 Cadeiras</option>
                    <option value="6">6 Cadeiras</option>
                    <option value="7">7 Cadeiras</option>
                    <option value="8">8 Cadeiras</option>
                    <option value="9">9 Cadeiras</option>
                    <option value="10">10 Cadeiras</option>
                </select>
            
            </div>
        </div>

    )
}