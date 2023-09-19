import styles from './schedule.module.css'
import React from "react";

function Schedule () {
    const times = [
        {
            start: '8:45',
            end: '10:20'
        },
        {
            start: '10:35',
            end: '12:10'
        },
        {
            start: '12:25',
            end: '14:00'
        },
        {
            start: '14:45',
            end: '16:20'
        },
        {
            start: '16:35',
            end: '18:10'
        },
        {
            start: '18:25',
            end: '20:00'
        },
        {
            start: '20:15',
            end: '21:50'
        }
    ]

    return(
        <>
            <div className={styles.mainContainer}>
                <div className={styles.schedule}>
                    <div className={styles.timeCell}>Время</div>
                    <div className={styles.dayCell}>Пн</div>
                    <div className={styles.dayCell}>Вт</div>
                    <div className={styles.dayCell}>Ср</div>
                    <div className={styles.dayCell}>Чт</div>
                    <div className={styles.dayCell}>Пт</div>
                    <div className={styles.dayCell}>Сб</div>
                    {times.map((lessonTime, index) => {
                        return (
                            <React.Fragment key={index}>
                                <div className={styles.timeCell}>
                                    <span>{lessonTime.start}</span>
                                    <span>{lessonTime.end}</span>
                                </div>
                                <div className={styles.emptyCell}>
                                    <div className="lesson">lesson</div>
                                </div>
                                <div className={styles.emptyCell}></div>
                                <div className={styles.emptyCell}></div>
                                <div className={styles.emptyCell}></div>
                                <div className={styles.emptyCell}></div>
                                <div className={styles.emptyCell}></div>
                            </React.Fragment>
                        );
                    })}

                </div>
            </div>
        </>
    )
}

export default Schedule;