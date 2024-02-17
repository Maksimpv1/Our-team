import { NavLink } from "react-router-dom"
import styles from "./notFoundPage.module.scss"

export const NotFoundPage = () => {
    return(        
        <div className={styles.container}>
            <p>404 Not found</p>
            <NavLink className={styles.link} to="/">Страница не найдена, вернутся на гравную</NavLink>
        </div>
    )
}