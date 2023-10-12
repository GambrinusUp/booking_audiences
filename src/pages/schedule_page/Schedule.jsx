import styles from './schedule.module.css'
import React, {useEffect, useState} from "react";
import moment from 'moment';
import {Button, DatePicker, Modal, Popconfirm, Select, Tag} from "antd";
import {DeleteOutlined, EditOutlined, LeftOutlined, PlusOutlined, RightOutlined, TagOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {getAudiencesThunkCreator, getScheduleThunkCreator} from "../../store/scheduleReducer";
import {useParams} from "react-router-dom";

function Schedule () {
    const { id } = useParams();
    const scheduleData = useSelector((state) => state.schedulePage.schedule);
    const audiences = useSelector((state) => state.schedulePage.audiences);
    const dispatch = useDispatch();
    const [isStudent, setStudent] = useState(false);
    const [isAdmin, setAdmin] = useState(false);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [currentWeekDates, setCurrentWeekDates] = useState([]);
    const [date, setDate] = useState('');
    const lessonColors = {
            "LECTURE": "red",
            "SEMINAR": "orange",
            "PRACTICE": "geekblue",
            "LABORATORY": "blue",
            "INDIVIDUAL": "cyan",
            "OTHER": "green",
            "CONTROL_POINT": "purple",
            "EXAM": "purple",
            "CREDIT": "purple",
            "DIFFERENTIAL_CREDIT": "purple",
            "CONSULTATION": "pink",
            "BOOKING":"default"
    }
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
    const options = audiences.map(({ id, name }) => ({
        value: id,
        label: name,
    }));
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        let object = JSON.parse (localStorage.getItem ("data"));
        console.log(object);
        if(object.role[0] === 'Editor')
            setAdmin(true);
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
        dispatch(getAudiencesThunkCreator());
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
                    {isStudent && <Button icon={<TagOutlined />}
                        onClick={() => setOpen(true)}>
                        <span className={styles.hideText}>Забронировать аудиторию</span>
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
                                                return lesson.type === "LESSON" ?
                                                    <Tag color={lessonColors[lesson.lessonType]}
                                                         key={lesson.id}
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
                                                        {isAdmin && <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                                                            <EditOutlined style={{fontSize: 14, paddingRight: 5}}
                                                                onClick={() => setOpenEdit(true)}/>
                                                            <Popconfirm
                                                                title="Вы хотите удалить занятие?"
                                                                //onConfirm={deleteCourse}
                                                                okText="Да"
                                                                cancelText="Нет">
                                                                <DeleteOutlined style={{fontSize: 14}}/>
                                                            </Popconfirm>
                                                        </div>}
                                                    </Tag> : null
                                            })
                                        }
                                    </div>
                                })}
                             </React.Fragment>
                        );
                    })}
                </div>
            </div>
            <Modal
                title="Бронирование аудитории"
                centered
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
            >
                Выберите день
                <div>
                    <DatePicker format={'YYYY-MM-DD'}
                                onChange={(value) => setDate(value)}
                                placeholder={'Выберите дату'}/>
                </div>
                Выберите пару
                <div>
                    <Select
                        placeholder="Выберите пару"
                        onChange={(value) => console.log(value)}
                        options={[
                            {
                                value: '1',
                                label: '1 пара',
                            } ,
                            {
                                value: '2',
                                label: '2 пара',
                            },
                            {
                                value: '3',
                                label: '3 пара',
                            },
                            {
                                value: '4',
                                label: '4 пара',
                            },
                            {
                                value: '5',
                                label: '5 пара',
                            },
                            {
                                value: '6',
                                label: '6 пара',
                            },
                            {
                                value: '7',
                                label: '7 пара',
                            }
                        ]}
                    />
                </div>
                Выберите аудиторию
                <div>
                    <Select
                        showSearch
                        placeholder="Выберите аудиторию"
                        optionFilterProp="children"
                        filterOption={filterOption}
                        options={options}
                        style={{width: '100%'}}
                    />
                </div>
            </Modal>
            <Modal
                title="Редактирование занятия"
                centered
                open={openEdit}
                //onOk={handleOk}
                onCancel={() => setOpenEdit(false)}
                width={700}
            >

            </Modal>
        </>
    )
}

export default Schedule;