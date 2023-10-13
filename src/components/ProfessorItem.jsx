import {Button, Card, Input, message, Modal, Popconfirm} from "antd";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {
    addProfessorsThunkCreator,
    deleteProfessorsThunkCreator,
    editProfessorsThunkCreator,
    getProfessorsThunkCreator
} from "../store/editReducer";
import {authAPI} from "../api/authAPI";
import {useNavigate} from "react-router-dom";

function ProfessorItem(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openEdit, setOpenEdit] = useState(false);
    const [fullName, setFullName] = useState("");
    const [shortName, setShortName] = useState("");
    const [messageApi, contextHolder] = message.useMessage();

    const handleOkEdit = () => {
        let object = JSON.parse (localStorage.getItem ("data"));
        if(fullName !== '' && shortName !== '') {
            dispatch(editProfessorsThunkCreator(props.id, fullName, shortName, object.accessToken)).then(() => {
                success("Преподаватель изменен");
                dispatch(getProfessorsThunkCreator());
                setOpenEdit(false);
            }).catch(() => {
                authAPI.refresh(object.refreshToken).then((data) => {
                    if(data.status === 200) {
                        navigate(0);
                        dispatch(editProfessorsThunkCreator(props.id, fullName, shortName, object.accessToken)).then(() => {
                            success("Преподаватель изменен");
                            dispatch(getProfessorsThunkCreator());
                            setOpenEdit(false);
                        })
                    }
                })
            });
            setOpenEdit(false);
        } else {
            warning("Пустое поле");
        }
    };

    const deleteProfessor = () => {
        let object = JSON.parse (localStorage.getItem ("data"));
        dispatch(deleteProfessorsThunkCreator(props.id, object.accessToken)).then(() => {
            success("Преподаватель удален");
            dispatch(getProfessorsThunkCreator());
        }).catch(() => {
            authAPI.refresh(object.refreshToken).then((data) => {
                if(data.status === 200) {
                    dispatch(deleteProfessorsThunkCreator(props.id, object.accessToken)).then(() => {
                        success("Преподаватель удален");
                        dispatch(getProfessorsThunkCreator());
                    })
                }
            })
        });
    };

    const handleCancelEdit = () => {
        setFullName("");
        setShortName("");
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
                            {props.fullName}
                        </span>
                        {props.shortName}
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Button type="primary" style={{marginRight: "10px", backgroundColor:"#ffba00"}}
                                onClick={() => {setOpenEdit(true); setFullName(props.fullName);  setShortName(props.shortName)}}>Редактировать</Button>
                        <Popconfirm
                            title="Вы хотите удалить преподавателя?"
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
                title="Редактирование преподавателя"
                centered
                open={openEdit}
                onOk={handleOkEdit}
                onCancel={handleCancelEdit}
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

        </>
    );
}

export default ProfessorItem;