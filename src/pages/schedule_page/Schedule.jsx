import styles from './schedule.module.css'
import React, {useEffect, useState} from "react";
import moment from 'moment';
import {Button, Tag} from "antd";
import {EditOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {getScheduleThunkCreator} from "../../store/scheduleReducer";
import {useParams} from "react-router-dom";

function Schedule () {
    const { id } = useParams();
    const scheduleData = useSelector((state) => state.schedulePage.schedule);
    const dispatch = useDispatch();
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentWeekDates, setCurrentWeekDates] = useState([]);
    const times = [
        {
            start: '8:45',
            end: '10:20',
            lessonNumber: 1
        },
        {
            start: '10:35',
            end: '12:10',
            lessonNumber: 2
        },
        {
            start: '12:25',
            end: '14:00',
            lessonNumber: 3
        },
        {
            start: '14:45',
            end: '16:20',
            lessonNumber: 4
        },
        {
            start: '16:35',
            end: '18:10',
            lessonNumber: 5
        },
        {
            start: '18:25',
            end: '20:00',
            lessonNumber: 6
        },
        {
            start: '20:15',
            end: '21:50',
            lessonNumber: 7
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
        let currentDay = moment(startOfWeek);
        while (currentDay.isSameOrBefore(endOfWeek)) {
            weekDates.push(currentDay.format('YYYY-MM-DD'));
            currentDay.add(1, 'day');
        }
        setCurrentWeekDates(weekDates);
        console.log(weekDates);
        console.log(currentWeekDates[0]);
        dispatch(getScheduleThunkCreator(id, weekDates[0], weekDates[5]));
        console.log(scheduleData);
    }, [dispatch, id]);

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

            dispatch(getScheduleThunkCreator('1c232119-97c7-11eb-812c-005056bc52bb', newWeekDates[0], newWeekDates[5]));

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
                    {times.map((lessonTime, index) => {
                        return (
                            <React.Fragment key={index}>
                                <div className={styles.timeCell}>
                                    <span>{lessonTime.start}</span>
                                    <span>{lessonTime.end}</span>
                                </div>
                                {scheduleData && scheduleData.map((scheduleColumn, index) => {
                                    return <div className={styles.emptyCell} key={scheduleColumn.date}>
                                        {
                                            scheduleColumn.lessons.filter(lesson => lesson.lessonNumber ===
                                                lessonTime.lessonNumber).map(lesson => {
                                                console.log(lesson);
                                                return lesson.type === "LESSON" ?

                                                    <Tag color="geekblue"
                                                         bordered
                                                         style={{width: '100%',
                                                             display:'flex', flexDirection:'column',
                                                             paddingTop:4, paddingBottom: 4,
                                                             whiteSpace: "pre-wrap",
                                                             overflowWrap: "break-word"}}>
                                                        <span style={{fontSize: 16,
                                                            fontWeight: 500}}>{lesson.title}</span>
                                                        <span style={{fontSize: 12}}>{lesson.audience.name}</span>
                                                        <span style={{fontSize: 13}}>{lesson.groups.map(group => group.name).join(", ")}</span>
                                                    </Tag> : null

                                                    /*<Tag
                                                        key={lesson.id}>
                                                        <span className={"lesson-title"}>{lesson.title}</span>
                                                        <span className={"lesson-auditory"}>{lesson.audience.name}</span>
                                                        <span className={"lesson-group"}>
                                                            {lesson.groups.map(group => group.name).join(", ")}</span>
                                                    </Tag> : null*/
                                            })
                                        }
                                    </div>
                                })}
                                {/*<div className={styles.emptyCell}>
                                    <div className="lesson">lesson</div>
                                </div>
                                <div className={styles.emptyCell}>
                                    <Tag color="geekblue"
                                         bordered
                                         style={{width: '100%', height: '100%',
                                         display:'flex', flexDirection:'column',
                                         paddingTop: 4, paddingBottom: 4}}>
                                        <span style={{fontSize: 16,
                                        fontWeight: 500}}>Name lesson</span>
                                        <span style={{fontSize: 12}}>Building</span>
                                        <span style={{fontSize: 13}}>Group</span>
                                    </Tag>
                                </div>
                                <div className={styles.emptyCell}></div>
                                <div className={styles.emptyCell}></div>
                                <div className={styles.emptyCell}></div>
                                <div className={styles.emptyCell}></div>*/}

                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </>
    )
}

export default Schedule;