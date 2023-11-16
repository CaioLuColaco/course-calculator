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
                    <option value="ComputerScience">Ciências da Computação</option>
                    <option value="ComputerEngineering">Engenharia da Computação</option>
                    <option value="ADS">ADS</option>
                </select>

                <select value={quantity} onChange={ e => setQuantity(e.target.value)}>
                    <option value="1">1 Cadeira</option>
                    <option value="2">2 Cadeiras</option>
                    <option value="3">3 Cadeiras</option>
                    <option value="4">4 Cadeiras</option>
                    <option value="5">5 Cadeiras</option>
                    <option value="6">6 Cadeiras</option>
                    <option value="7">7 Cadeiras</option>
                    <option value="8">8 Cadeiras</option>
                    <option value="9">9 Cadeiras</option>
                    <option value="10">10 Cadeiras</option>
                    <option value="11">11 Cadeiras</option>
                    <option value="12">12 Cadeiras</option>
                </select>
            
            </div>
        </div>

    )
}