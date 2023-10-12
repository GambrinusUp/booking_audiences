import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./editing.module.css"
import {Button, Input, message, Modal, Tabs} from "antd";
import TabPane from "antd/es/tabs/TabPane";
import {KeyOutlined, MailOutlined, PlusOutlined, UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    addAudienceThunkCreator,
    addProfessorsThunkCreator,
    addSubjectThunkCreator, getAudiences1ThunkCreator, getAudiencesThunkCreator,
    getProfessorsThunkCreator,
    getSubjectsThunkCreator
} from "../../store/editReducer";
import ProfessorItem from "../../components/ProfessorItem";
import {authAPI} from "../../api/authAPI";
import SubjectItem from "../../components/SubjectItem";
import AudienceItem from "../../components/AudienceItem";

function Editing() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [nameSubject, setNameSubject] = useState("");
    const [nameAudience, setNameAudience] = useState("");
    const [shortName, setShortName] = useState("");
    const [activeTab, setActiveTab] = useState('1');
    const [openAdd, setOpenAdd] = useState(false);
    const [openAddSubject, setOpenAddSubject] = useState(false);
    const [openAddAudience, setOpenAddAudience] = useState(false);
    const professors = useSelector((state) => state.editPage.professors);
    const subjects = useSelector((state) => state.editPage.subjects);
    const audiences = useSelector((state) => state.editPage.audiences);
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    const handleAddEdit = () => {
        let object = JSON.parse (localStorage.getItem ("data"));
        if(fullName !== '' && shortName !== '') {
            dispatch(addProfessorsThunkCreator(fullName, shortName, object.accessToken)).then(() => {
                success("Преподаватель добавлен");
                dispatch(getProfessorsThunkCreator());
                setOpenAdd(false);
            }).catch(() => {
                authAPI.refresh(object.refreshToken).then((data) => {
                    if(data.status === 200) {
                        navigate(0);
                        dispatch(addProfessorsThunkCreator(fullName, shortName, object.accessToken)).then(() => {
                            success("Преподаватель добавлен");
                            dispatch(getProfessorsThunkCreator());
                            setOpenAdd(false);
                        })
                    }
                })
            });
        } else {
            warning("Пустое поле");
        }
    }

    const handleAddSubject = () => {
        let object = JSON.parse (localStorage.getItem ("data"));
        const isDuplicate = subjects.some(subject => subject.name.toLowerCase() === nameSubject.toLowerCase());
        if(nameSubject !== '') {
            if (isDuplicate) {
                warning('Такой предмет уже существует');
            } else {
                dispatch(addSubjectThunkCreator(nameSubject, object.accessToken)).then(() => {
                    success("Предмет добавлен");
                    dispatch(getSubjectsThunkCreator());
                    setOpenAddSubject(false);
                }).catch(() => {
                    authAPI.refresh(object.refreshToken).then((data) => {
                        if(data.status === 200) {
                            navigate(0);
                            dispatch(addSubjectThunkCreator(nameSubject, object.accessToken)).then(() => {
                                success("Предмет добавлен");
                                dispatch(getSubjectsThunkCreator());
                                setOpenAddSubject(false);
                            })
                        }
                    })
                });
            }
        } else {
            warning("Пустое поле");
        }
    }

    const handleAddAudience = () => {
        let object = JSON.parse (localStorage.getItem ("data"));
        const isDuplicate = audiences.some(audience => audience.name.toLowerCase() === nameAudience.toLowerCase());
        if(nameAudience !== '') {
            if (isDuplicate) {
                warning('Такая аудитория уже существует');
            } else {
                dispatch(addAudienceThunkCreator(nameAudience, object.accessToken)).then(() => {
                    success("Аудитория добавлена");
                    dispatch(getAudiences1ThunkCreator());
                    setOpenAddAudience(false);
                }).catch(() => {
                    authAPI.refresh(object.refreshToken).then((data) => {
                        if(data.status === 200) {
                            navigate(0);
                            dispatch(addAudienceThunkCreator(nameAudience, object.accessToken)).then(() => {
                                success("Аудитория добавлена");
                                dispatch(getAudiences1ThunkCreator());
                                setOpenAddAudience(false);
                            })
                        }
                    })
                });
            }
        } else {
            warning("Пустое поле");
        }
    }

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

    useEffect(() => {
        dispatch(getProfessorsThunkCreator());
        dispatch(getSubjectsThunkCreator());
        dispatch(getAudiences1ThunkCreator());
        let object = JSON.parse (localStorage.getItem ("data"));
        console.log(object);
        if(object.role[0] !== 'Editor')
            navigate('/', {replace: true});
    }, []);

    return (
        <>
            <div className={styles.mainContainer}>
                {contextHolder}
                <div className={styles.panel}>
                    <Tabs defaultActiveKey={activeTab} centered onChange={(key) => setActiveTab(key)}>
                        <TabPane tab="Редактирование преподавателей" key="1">
                           <Button icon={<PlusOutlined />} style={{marginBottom: 14}} onClick={() => setOpenAdd(true)}>
                               Добавить преподавателя
                           </Button>
                            {professors && professors.map((value) => (
                                <ProfessorItem fullName={value.fullName} shortName={value.shortName} key={value.id} id={value.id}/>
                            ))}
                        </TabPane>
                        <TabPane tab="Редактирование предметов" key="2">
                            <Button icon={<PlusOutlined />} style={{marginBottom: 14}} onClick={() => setOpenAddSubject(true)}>
                                Добавить предмет
                            </Button>
                            {subjects && subjects.map((value) => (
                                <SubjectItem name={value.name} key={value.id} id={value.id}/>
                            ))}
                        </TabPane>
                        <TabPane tab="Редактирование аудиторий" key="3">
                            <Button icon={<PlusOutlined />} style={{marginBottom: 14}} onClick={() => setOpenAddAudience(true)}>
                                Добавить аудиторию
                            </Button>
                            {audiences && audiences.map((value) => (
                                <AudienceItem name={value.name} key={value.id} id={value.id} />
                            ))}
                        </TabPane>
                    </Tabs>
                </div>
                <Modal
                    title="Добавление преподавателя"
                    centered
                    open={openAdd}
                    onOk={handleAddEdit}
                    onCancel={() => setOpenAdd(false)}
                    width={700}
                >
                    Полное имя
                    <Input
                        style={{marginBottom: 10}}
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                    />
                    Сокращенное имя
                    <Input
                        value={shortName}
                        onChange={(event) => setShortName(event.target.value)}
                    />
                </Modal>
                <Modal
                    title="Добавление предмета"
                    centered
                    open={openAddSubject}
                    onOk={handleAddSubject}
                    onCancel={() => setOpenAddSubject(false)}
                    width={700}
                >
                    Название предмета
                    <Input
                        style={{marginBottom: 10}}
                        value={nameSubject}
                        onChange={(event) => setNameSubject(event.target.value)}
                    />
                </Modal>
                <Modal
                    title="Добавление аудитории"
                    centered
                    open={openAddAudience}
                    onOk={handleAddAudience}
                    onCancel={() => setOpenAddAudience(false)}
                    width={700}
                >
                    Название аудитории
                    <Input
                        style={{marginBottom: 10}}
                        value={nameAudience}
                        onChange={(event) => setNameAudience(event.target.value)}
                    />
                </Modal>
            </div>
        </>
    )
}

export default Editing;