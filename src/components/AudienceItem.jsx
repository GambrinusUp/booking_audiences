import {Button, Card, Input, message, Modal, Popconfirm} from "antd";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addProfessorsThunkCreator, deleteAudienceThunkCreator,
    deleteProfessorsThunkCreator, deleteSubjectThunkCreator, editAudienceThunkCreator,
    editProfessorsThunkCreator, editSubjectThunkCreator, getAudiences1ThunkCreator,
    getProfessorsThunkCreator, getSubjectsThunkCreator
} from "../store/editReducer";
import {authAPI} from "../api/authAPI";
import {useNavigate} from "react-router-dom";

function AudienceItem(props) {
    const audiences = useSelector((state) => state.editPage.audiences);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openEdit, setOpenEdit] = useState(false);
    const [name, setName] = useState("");
    const [messageApi, contextHolder] = message.useMessage();

    const handleOkEdit = () => {
        let object = JSON.parse (localStorage.getItem ("data"));
        const isDuplicate = audiences.some(audience => audience.name.toLowerCase() === name.toLowerCase());
        if(name !== '') {
            if (isDuplicate) {
                warning('Такая аудитория уже существует');
            } else {
                dispatch(editAudienceThunkCreator(props.id, name, object.accessToken)).then(() => {
                    success("Аудитория изменена");
                    dispatch(getAudiences1ThunkCreator());
                    setOpenEdit(false);
                }).catch(() => {
                    authAPI.refresh(object.refreshToken).then((data) => {
                        if(data.status === 200) {
                            navigate(0);
                            dispatch(editAudienceThunkCreator(props.id, name, object.accessToken)).then(() => {
                                success("Аудитория изменена");
                                dispatch(getAudiences1ThunkCreator());
                                setOpenEdit(false);
                            })
                        }
                    })
                });
                setOpenEdit(false);
            }
        } else {
            warning("Пустое поле");
        }
    };

    const deleteProfessor = () => {
        let object = JSON.parse (localStorage.getItem ("data"));
        dispatch(deleteAudienceThunkCreator(props.id, object.accessToken)).then(() => {
            success("Аудитория удалена");
            dispatch(getAudiences1ThunkCreator());
        }).catch(() => {
            authAPI.refresh(object.refreshToken).then((data) => {
                if(data.status === 200) {
                    navigate(0);
                    dispatch(deleteAudienceThunkCreator(props.id, object.accessToken)).then(() => {
                        success("Аудитория удалена");
                        dispatch(getAudiences1ThunkCreator());
                    })
                }
            })
        });
    };

    const handleCancelEdit = () => {
        setName("");
        setOpenEdit(false);
    };

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

    return(
        <>
            {contextHolder}
            <Card style={{margin: "auto 0", marginBottom: "15px", display: "flex"}}
                  id={props.id}>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", minWidth: 600, width: "50vw"}}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <span style={{fontSize: "20px"}}>
                            {props.name}
                        </span>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Button type="primary" style={{marginRight: "10px", backgroundColor:"#ffba00"}}
                                onClick={() => {setOpenEdit(true); setName(props.name)}}>Редактировать</Button>
                        <Popconfirm
                            title="Вы хотите удалить аудиторию?"
                            onConfirm={deleteProfessor}
                            okText="Да"
                            cancelText="Нет"
                        >
                            <Button type="primary" danger>Удалить</Button>
                        </Popconfirm>
                    </div>
                </div>
            </Card>
            <Modal
                title="Редактирование аудитории"
                centered
                open={openEdit}
                onOk={handleOkEdit}
                onCancel={handleCancelEdit}
                width={700}
            >
                Название
                <Input
                    style={{marginBottom: 10}}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </Modal>

        </>
    );
}

export default AudienceItem;