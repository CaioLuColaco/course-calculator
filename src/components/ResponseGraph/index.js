import styles from "./responseGraph.module.css"
import curriculumData from "../../services/courseCurriculum.json"

export default function ResponseGraph({semestres}) {
    console.log("Courses Response Graph:")
    console.log(semestres)
    return (
        <div className={styles.responseContainer}>
            <h1>Grade Curricular</h1>
            <div className={styles.semestresContainer}>
                {semestres.map((courses, index) => {
                    return (
                        <div key={index} className={styles.coursesContainer}>
                            <p>Semestre {index + 1}:</p>
                            {courses.map((course, index) => {
                                return (
                                    <p key={course}>{curriculumData.disciplines[course].label}</p>
                                )
                            })}
                        </div>
                    )
                })}

            </div>

        </div>
    )
}