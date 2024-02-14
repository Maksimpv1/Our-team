import { useEffect, useState } from "react"
import { Cards } from "./cards/cards"

import styles from "./main.module.scss"
import { getUsers, setNextPage } from "../../redux/reducers/teamReducer"
import { useAppDispatch, useAppSelectortype } from "../../redux/store/store"


interface IWindowSize {
    windowWidth: number;
  }

export const Main = () => {

    const dispatch = useAppDispatch()

    const users = useAppSelectortype((state)=> state.info.users)
    const page = useAppSelectortype((state)=> state.info.page)
    const perPage = useAppSelectortype((state) => state.info.perPage)

    
    const [windowSize, setWindowSize] = useState<IWindowSize>({
        windowWidth: window.innerWidth
      });

    const handleResize = () => {
        setWindowSize({ windowWidth: window.innerWidth });
    };

    useEffect(()=>{
        window.addEventListener('resize', handleResize); 
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[])

    useEffect(()=>{
        dispatch(getUsers({ page:page, perPage: perPage} ))
    },[page])


    const handleNextCards = () => {
        dispatch(setNextPage())
    }



    return(
        <div >
            <header className={styles.container}>
                <div className={styles.exit_container}>
                    {windowSize.windowWidth > 800 ? (
                        <button>Выход</button>
                        ) : (
                        <button >
                            <svg 
                            width="40" 
                            height="40" 
                            viewBox="0 0 40 40" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.79 24.29C19.18 24.68 19.81 24.68 20.2 24.29L23.79 20.7C23.8827 20.6075 23.9563 20.4976 24.0064 20.3766C24.0566 20.2557 24.0824 20.126 24.0824 19.995C24.0824 19.864 24.0566 19.7343 24.0064 19.6134C23.9563 19.4924 23.8827 19.3825 23.79 19.29L20.2 15.7C20.013 15.513 19.7594 15.408 19.495 15.408C19.2306 15.408 18.977 15.513 18.79 15.7C18.603 15.887 18.498 16.1406 18.498 16.405C18.498 16.6694 18.603 16.923 18.79 17.11L20.67 19H12C11.45 19 11 19.45 11 20C11 20.55 11.45 21 12 21H20.67L18.79 22.88C18.4 23.27 18.41 23.91 18.79 24.29ZM27 11H13C12.4696 11 11.9609 11.2107 11.5858 11.5858C11.2107 11.9609 11 12.4696 11 13V16C11 16.55 11.45 17 12 17C12.55 17 13 16.55 13 16V14C13 13.45 13.45 13 14 13H26C26.55 13 27 13.45 27 14V26C27 26.55 26.55 27 26 27H14C13.45 27 13 26.55 13 26V24C13 23.45 12.55 23 12 23C11.45 23 11 23.45 11 24V27C11 28.1 11.9 29 13 29H27C28.1 29 29 28.1 29 27V13C29 11.9 28.1 11 27 11Z" fill="#F8F8F8"/>
                            </svg>
                        </button>
                    )}
                </div>
                <h1>Наша команда</h1>
                <p>Это опытные специалисты, хорошо разбирающиеся во всех задачах,
                     которые ложатся на их плечи, и умеющие находить выход из любых,
                      даже самых сложных ситуаций. </p>
            </header>
            <div className={styles.cards_container}>
                {Array.isArray(users) && users.map((user ,index )=>(
                    <Cards key={index} user={user}/>
                ))}
            </div>
            <div className={styles.main_pagination}>
                <button onClick={handleNextCards} >Показать ещё
                    <svg width="18" 
                    height="10" 
                    viewBox="0 0 18 10" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.497 0.989027L8.99999 8.29703L1.50299 0.989027C1.36905 0.858193 1.18923 0.784947 1.00199 0.784947C0.814751 0.784947 0.634939 0.858193 0.500992 0.989027C0.436135 1.05257 0.384611 1.12842 0.349436 1.21213C0.314261 1.29584 0.296143 1.38573 0.296143 1.47653C0.296143 1.56733 0.314261 1.65721 0.349436 1.74092C0.384611 1.82463 0.436135 1.90048 0.500992 1.96403L8.47649 9.74003C8.61655 9.87655 8.8044 9.95295 8.99999 9.95295C9.19558 9.95295 9.38343 9.87655 9.52349 9.74003L17.499 1.96553C17.5643 1.90193 17.6162 1.8259 17.6517 1.74191C17.6871 1.65792 17.7054 1.56769 17.7054 1.47653C17.7054 1.38537 17.6871 1.29513 17.6517 1.21114C17.6162 1.12715 17.5643 1.05112 17.499 0.987526C17.365 0.856693 17.1852 0.783447 16.998 0.783447C16.8108 0.783447 16.6309 0.856693 16.497 0.987526V0.989027Z" 
                    fill="#151317"/>
                    </svg>
                </button>
            </div>

        </div>
    )
}