import styles from './schedule.module.css'
import React, {useEffect, useState} from "react";
import moment from 'moment';
import {Button} from "antd";
import {EditOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons";

function Schedule () {
    const [isAdmin, setIsAdmin] = useState(true);
    const [currentWeekDates, setCurrentWeekDates] = useState([]);
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
    ];
    const month = {
        '01' : 'янв.',
        '02' : 'февр.',
        '03' : 'март',
        '04' : 'апр.',
        '05' : 'май',
        '06' : 'июнь',
        '07' : 'июль',
        '08' : 'авг.',
        '09' : 'сент.',
        '10' : 'окт.',
        '11' : 'нояб.',
        '12' : 'дек.',
    };
    const weeks = {
        0 : 'ПН',
        1 : 'ВТ',
        2 : 'СР',
        3 : 'ЧТ',
        4 : 'ПТ',
        5 : 'СБ',
    }

    useEffect(() => {
        const currentDate = moment();
        const startOfWeek = currentDate.startOf('isoWeek').format('YYYY-MM-DD');
        const endOfWeek = currentDate.endOf('isoWeek').format('YYYY-MM-DD');
        const weekDates = [];
        // Создаем массив дат с начала до конца недели
        let currentDay = moment(startOfWeek);
        while (currentDay.isSameOrBefore(endOfWeek)) {
            weekDates.push(currentDay.format('YYYY-MM-DD'));
            currentDay.add(1, 'day');
        }
        setCurrentWeekDates(weekDates);
        console.log(weekDates);
    }, []);

    function updateWeekDates(weeksToAdd) {
        setCurrentWeekDates((prevWeekDates) => {
            const newStartOfWeek = moment(prevWeekDates[0]).add(weeksToAdd, 'weeks');
            const newEndOfWeek = moment(prevWeekDates[6]).add(weeksToAdd, 'weeks');
            const newWeekDates = [];

            let currentDay = moment(newStartOfWeek);
            while (currentDay.isSameOrBefore(newEndOfWeek)) {
                newWeekDates.push(currentDay.format('YYYY-MM-DD'));
                currentDay.add(1, 'day');
            }

            return newWeekDates;
        });
        console.log(currentWeekDates);
    }


    return(
        <>
            <div className={styles.mainContainer}>
                <div className={styles.panel}>
                    <div className={styles.panelGroupDate}>
                        <span className={styles.panelTitle}> Расписание для группы TestGroup </span>
                        <span>{`${currentWeekDates[0]} - ${currentWeekDates[5]}`}</span>
                    </div>
                    {isAdmin && <Button icon={<EditOutlined />}
                           className={styles.medBtnWrapper}>
                        <span className={styles.hideText}>Редактировать</span>
                    </Button>}
                    <div className={styles.btnWrapper}>
                        <Button block style={{marginRight: 10}}
                                onClick={() => updateWeekDates(-1)}
                                icon={<LeftOutlined />}>  <span className={styles.hideText}>Предыдущая неделя </span></Button>
                        <Button block onClick={() => updateWeekDates(1)}>
                            <span className={styles.hideText}>Следующая неделя </span><RightOutlined /></Button>
                    </div>
                </div>
                <div className={styles.schedule}>
                    <div className={styles.timeCell}>Время</div>
                    {currentWeekDates.slice(0, -1).map((date, index) => (
                        <div className={styles.dayCell} key={index}>
                            {weeks[index]}
                            {/*moment(date).format('dd')*/}
                            {/* Добавляем <span> с днем недели */}
                            <span>{`${moment(date).format('D')} ${month[moment(date).format('MM')]}`}</span>
                        </div>
                    ))}
                    {/*<div className={styles.dayCell}>
                        Пн
                        <span>bn</span>
                    </div>
                    <div className={styles.dayCell}>Вт</div>
                    <div className={styles.dayCell}>Ср</div>
                    <div className={styles.dayCell}>Чт</div>
                    <div className={styles.dayCell}>Пт</div>
                    <div className={styles.dayCell}>Сб</div>*/}
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