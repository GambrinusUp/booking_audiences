import styles from './schedule.module.css'
import React, {useEffect, useState} from "react";
import moment from 'moment';
import {Button, Modal, Popconfirm, Select, Tag, DatePicker, message, Input} from "antd";
import {DeleteOutlined, EditOutlined, LeftOutlined, PlusOutlined, RightOutlined, TagOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    addLessonThunkCreator, deleteLessonThunkCreator,
    getAudiencesThunkCreator,
    getGroupsThunkCreator,
    getScheduleThunkCreator
} from "../../store/scheduleReducer";
import {useNavigate, useParams} from "react-router-dom";
import { lessonColors, times, month, weeks } from '../constants';
import {
    addProfessorsThunkCreator,
    getAudiences1ThunkCreator,
    getProfessorsThunkCreator,
    getSubjectsThunkCreator
} from "../../store/editReducer";
import {authAPI} from "../../api/authAPI";
import {addBookThunkCreator} from "../../store/bookingReducer";

const { RangePicker } = DatePicker;

function Schedule () {
    const { id } = useParams();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const scheduleData = useSelector((state) => state.schedulePage.schedule);
    //const audiences = useSelector((state) => state.schedulePage.audiences);
    const professors = useSelector((state) => state.editPage.professors);
    const subjects = useSelector((state) => state.editPage.subjects);
    const audiences = useSelector((state) => state.editPage.audiences);
    const groups = useSelector((state) => state.schedulePage.groups);
    const dispatch = useDispatch();
    const [isStudent, setStudent] = useState(false);
    const [isAdmin, setAdmin] = useState(false);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [currentWeekDates, setCurrentWeekDates] = useState([]);
    const [date, setDate] = useState('');
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [day, setDay] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [audience, setAudience] = useState('');
    const [typeLesson, setTypeLesson] = useState('');
    const [subject, setSubject] = useState('');
    const [professor, setProfessor] = useState('');

    const [bookDate, setBookDate] = useState('');
    const [description, setDescription] = useState('');





    const [selectedDateRange, setSelectedDateRange] = useState([]);

    const handleDateChange = (dates) => {
        setSelectedDateRange(dates);
    };

    const options = audiences.map(({ id, name }) => ({
        value: id,
        label: name,
    }));

    const subjectOptions = subjects.map(({ id, name }) => ({
        value: id,
        label: name,
    }));

    const groupsOptions = groups.map(({ id, name }) => ({
        value: id,
        label: name,
    }));

    const professorOptions = professors.map(({ id, fullName }) => ({
        value: id,
        label: fullName,
    }));

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const warning = (error) => {
        messageApi.open({
            type: 'warning',
            content: error,
        });
    };

    const success = (message) => {
        messageApi.open({
            type: 'success',
            content: message,
        });
    };

    function deleteLesson (idLesson) {
        console.log(idLesson);
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


        let object = JSON.parse (localStorage.getItem ("data"));
        dispatch(deleteLessonThunkCreator(idLesson, object.accessToken)).then(() => {
            success('Занятие уадлено');
            dispatch(getScheduleThunkCreator(id, weekDates[0]));
        }).catch((status) => {
            console.log(status);
            if(status === 401) {
                authAPI.refresh(object.refreshToken).then((data) => {
                    if(data.status === 200) {
                        navigate(0);
                    }
                })
            }
        });
    }

    const addBook = () => {
        let object = JSON.parse (localStorage.getItem ("data"));
        console.log(bookDate.format('YYYY-MM-DD'), selectedGroups, timeSlot, audience, description);
        if(bookDate !== '' && selectedGroups !== [] && timeSlot !== '' && audience !== '' && description !== '') {
            dispatch(addBookThunkCreator(bookDate.format('YYYY-MM-DD'), timeSlot, audience, selectedGroups,
                description, object.accessToken)).then(() => {
                success('Аудитория забронирована');
            }).catch((status) => {
                console.log(status);
                if(status === 401) {
                    authAPI.refresh(object.refreshToken).then((data) => {
                        if(data.status === 200) {
                            navigate(0);
                        }
                    })
                } else {
                    warning('Ошибка');
                }
            });
        } else {
            warning('Пустые поля')
        }
    }

    const handleOk = () => {
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


        let object = JSON.parse (localStorage.getItem ("data"));
        dispatch(addLessonThunkCreator(day, selectedDateRange[0].format('YYYY-MM-DD'),
            selectedDateRange[1].format('YYYY-MM-DD'), timeSlot, audience, typeLesson, subject,
            professor, selectedGroups,  object.accessToken)).then(() => {
                success('Занятие создано');
                dispatch(getScheduleThunkCreator(id, weekDates[0]));
        }).catch((status) => {
                console.log(status);
                if(status === 409) {
                    warning('Занятие создано');
                }
                if(status === 401) {
                    authAPI.refresh(object.refreshToken).then((data) => {
                        if(data.status === 200) {
                            navigate(0);
                        }
                    })
                }
        });
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        let object = JSON.parse (localStorage.getItem ("data"));
        console.log(object);
        if (object !== null) {
            if(object.role[0] === 'Editor')
                setAdmin(true);
            if(object.role[0] === 'Student')
                setStudent(true);
        }

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
        dispatch(getScheduleThunkCreator(id, weekDates[0]));
        console.log(scheduleData);
        dispatch(getAudiences1ThunkCreator());
        dispatch(getGroupsThunkCreator());
        dispatch(getSubjectsThunkCreator());
        dispatch(getProfessorsThunkCreator());
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
            dispatch(getScheduleThunkCreator(id, newWeekDates[0]));
            return newWeekDates;
        });
        console.log(currentWeekDates);
    }

    return(
        <>
            <div className={styles.mainContainer}>
                {contextHolder}
                <div className={styles.panel}>
                    <div className={styles.panelGroupDate}>
                        {groups && <span className={styles.panelTitle}> Расписание для группы {groups && groups.find(group => group.id === id)?.name} </span>}
                        <span>{`${currentWeekDates[0]} - ${currentWeekDates[5]}`}</span>
                    </div>
                    {isAdmin && <Button icon={<EditOutlined />}
                           className={styles.medBtnWrapper} onClick={() => setOpenEdit(true)}>
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
                                            scheduleColumn.timeslots.filter(lesson => lesson.lessonNumber ===
                                                lessonTime.lessonNumber).map(lesson => {
                                                if (lesson.type === "Lesson") {
                                                        return(
                                                            <Tag color={lessonColors[lesson.lesson.lessonType]}
                                                                 key={lesson.lesson.lessonId}
                                                                 bordered
                                                                 style={{width: '100%',
                                                                     display:'flex', flexDirection:'column',
                                                                     paddingTop:4, paddingBottom: 4,
                                                                     whiteSpace: "pre-wrap",
                                                                     overflowWrap: "break-word"}}>
                                                        <span style={{fontSize: 16,
                                                            fontWeight: 500}}>{lesson.lesson.subject.name}</span>
                                                                <span style={{fontSize: 12}}>{lesson.lesson.audience.name}</span>
                                                                <span style={{fontSize: 13}}>{lesson.lesson.groups.map(group => group.name).join(", ")}</span>
                                                                {isAdmin && <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                                                                    <Popconfirm
                                                                        title="Вы хотите удалить занятие?"
                                                                        onConfirm={() => deleteLesson(lesson.lesson.id)}
                                                                        okText="Да"
                                                                        cancelText="Нет">
                                                                        <DeleteOutlined style={{fontSize: 14}}/>
                                                                    </Popconfirm>
                                                                </div>}
                                                            </Tag>
                                                        )
                                                } else if (lesson.type === "Booked") {
                                                    return (
                                                        <Tag color={lessonColors[lesson.type]}
                                                             key={lesson.bookedLesson.id}
                                                             bordered
                                                             style={{width: '100%',
                                                                 display:'flex', flexDirection:'column',
                                                                 paddingTop:4, paddingBottom: 4,
                                                                 whiteSpace: "pre-wrap",
                                                                 overflowWrap: "break-word"}}>
                                                        <span style={{fontSize: 16,
                                                            fontWeight: 500}}>{lesson.bookedLesson.description}</span>
                                                            <span style={{fontSize: 12}}>{lesson.bookedLesson.audience.name}</span>
                                                            <span style={{fontSize: 13}}>{lesson.bookedLesson.groups.map(group => group.name).join(", ")}</span>
                                                        </Tag>
                                                        )
                                                } else {
                                                    return null
                                                }
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
                onOk={addBook}
                onCancel={() => setOpen(false)}
                width={700}
            >
                Выберите день
                <div>
                    <DatePicker
                        value={bookDate}
                        onChange={(value) => setBookDate(value)}
                        format="YYYY-MM-DD"
                    />
                </div>
                Выберите пару
                <div>
                    <Select
                        placeholder="Выберите пару"
                        style={{width: '100%'}}
                        onChange={(value) => setTimeSlot(value)}
                        value={timeSlot}
                        options={[
                            {
                                value: 1,
                                label: '1 пара',
                            } ,
                            {
                                value: 2,
                                label: '2 пара',
                            },
                            {
                                value: 3,
                                label: '3 пара',
                            },
                            {
                                value: 4,
                                label: '4 пара',
                            },
                            {
                                value: 5,
                                label: '5 пара',
                            },
                            {
                                value: 6,
                                label: '6 пара',
                            },
                            {
                                value: 7,
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
                        value={audience}
                        onChange={(value) => setAudience(value)}
                        style={{width: '100%'}}
                    />
                </div>
                Выберите группы
                <div>
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="Выберите группы"
                        onChange={(value) => setSelectedGroups(value)}
                        options={groupsOptions}
                        value={selectedGroups}
                        style={{width: '100%'}}
                    />
                </div>
                Описание
                <div>
                    <Input
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </div>
            </Modal>
            <Modal
                title="Создание занятия"
                centered
                open={openEdit}
                onOk={handleOk}
                onCancel={() => setOpenEdit(false)}
                width={700}
            >
                Выберите день
                <div>
                    <Select
                        style={{width: '100%'}}
                        placeholder="Выберите день"
                        onChange={(value) => setDay(value)}
                        value={day}
                        options={[
                            {
                                value: 'Monday',
                                label: 'Понедельник',
                            } ,
                            {
                                value: 'Tuesday',
                                label: 'Вторник',
                            },
                            {
                                value: 'Wednesday',
                                label: 'Среда',
                            },
                            {
                                value: 'Thursday',
                                label: 'Четверг',
                            },
                            {
                                value: 'Friday',
                                label: 'Пятница',
                            },
                            {
                                value: 'Saturday',
                                label: 'Суббота',
                            }
                        ]}
                    />
                </div>
                Выберите дату
                <div>
                    {/*<DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        filterDate={isWeekday}
                        dateFormat="yyyy-MM-dd"
                    />*/}
                    <RangePicker
                        value={selectedDateRange}
                        onChange={handleDateChange}
                        format="YYYY-MM-DD"
                    />
                </div>
                Выберите пару
                <div>
                    <Select
                        style={{width: '100%'}}
                        placeholder="Выберите пару"
                        onChange={(value) => setTimeSlot(value)}
                        value={timeSlot}
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
                        value={audience}
                        onChange={(value) => setAudience(value)}
                        style={{width: '100%'}}
                    />
                </div>
                Выберите тип занятия
                <div>
                    <Select
                        style={{width: '100%'}}
                        placeholder="Выберите тип занятия"
                        value={typeLesson}
                        onChange={(value) => setTypeLesson(value)}
                        options={[
                            {
                                value: 'Lecture',
                                label: 'Лекция',
                            } ,
                            {
                                value: 'Practice',
                                label: 'Практика',
                            },
                            {
                                value: 'Laboratory',
                                label: 'Лабораторная',
                            },
                            {
                                value: 'Seminar',
                                label: 'Семинар',
                            },
                            {
                                value: 'Individual',
                                label: 'Индивидуальная работа',
                            },
                            {
                                value: 'ControlPoint',
                                label: 'Контрольная точка',
                            },
                            {
                                value: 'Other',
                                label: 'Другое',
                            }
                        ]}
                    />
                </div>
                Выберите предмет
                <div>
                    <Select
                        showSearch
                        placeholder="Выберите предмет"
                        optionFilterProp="children"
                        filterOption={filterOption}
                        options={subjectOptions}
                        value={subject}
                        onChange={(value) => setSubject(value)}
                        style={{width: '100%'}}
                    />
                </div>
                Выберите преподавателя
                <div>
                    <Select
                        value={professor}
                        onChange={(value) => setProfessor(value)}
                        showSearch
                        placeholder="Выберите преподавателя"
                        optionFilterProp="children"
                        filterOption={filterOption}
                        options={professorOptions}
                        style={{width: '100%'}}
                    />
                </div>
                Выберите группы
                <div>
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="Выберите группы"
                        onChange={(value) => setSelectedGroups(value)}
                        options={groupsOptions}
                        value={selectedGroups}
                        style={{width: '100%'}}
                    />
                </div>
            </Modal>
        </>
    )
}

export default Schedule;