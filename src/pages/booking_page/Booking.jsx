import styles from "../booking_page/booking.module.css";
import {Badge, Button, message, Tag} from "antd";
import React, {useEffect} from "react";
import {getAudiences1ThunkCreator, getProfessorsThunkCreator, getSubjectsThunkCreator} from "../../store/editReducer";
import {getGroupsThunkCreator} from "../../store/scheduleReducer";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    approveBookThunkCreator,
    getBookingRequestsThunkCreator,
    rejectBookThunkCreator
} from "../../store/bookingReducer";
import SubjectItem from "../../components/SubjectItem";
import {authAPI} from "../../api/authAPI";

function Booking() {
    const bookStatus = {
        "New": "green",
        "Approved": "blue",
        "Rejected": "red",
        "Canceled": "gray",
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const requests = useSelector((state) => state.bookingPage.bookingRequests);
    const [messageApi, contextHolder] = message.useMessage();

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

    const approve = (id) => {
        let object = JSON.parse (localStorage.getItem ("data"));
        dispatch(approveBookThunkCreator(id, object.accessToken)).then(() => {
            success('Заявка одобрена');
            dispatch(getBookingRequestsThunkCreator(object.accessToken));
        }).catch((status) => {
            if(status === 401) {
                authAPI.refresh(object.refreshToken).then((data) => {
                    if (data.status === 200) {
                        navigate(0);
                    }
                })
            }
        })
    }

    const reject = (id) => {
        let object = JSON.parse (localStorage.getItem ("data"));
        dispatch(rejectBookThunkCreator(id, object.accessToken)).then(() => {
            success('Заявка отколнена')
            dispatch(getBookingRequestsThunkCreator(object.accessToken));
        }).catch((status) => {
            if(status === 401) {
                authAPI.refresh(object.refreshToken).then((data) => {
                    if (data.status === 200) {
                        navigate(0);
                    }
                })
            }
        })
    }

    useEffect(() => {
        let object = JSON.parse (localStorage.getItem ("data"));
        console.log(object);
        if(object === null)
            navigate('/');
        else {
            if(object.role[0] !== 'Editor')
                navigate('/', {replace: true});
            dispatch(getBookingRequestsThunkCreator(object.accessToken)).catch(() => {
                authAPI.refresh(object.refreshToken).then((data) => {
                    if (data.status === 200) {
                        navigate(0);
                    }
                })
            });
        }
    }, []);

    return (
        <>
            <div className={styles.mainContainer}>
                {contextHolder}
                <div className={styles.panel}>
                    <div style={{fontSize: 20}}>
                        Заявки на бронирование
                    </div>
                    <div style={{width: '100%'}}>
                        {requests && requests.map((value) => (
                            <Tag key={value.id} style={{marginTop: 10, width: '100%'}}>
                                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <div style={{display: "flex", flexDirection: "column"}}>
                                        <span>
                                            <Badge color={bookStatus[value.status]}
                                                text={value.status} />
                                        </span>
                                        <span>
                                            {value.description}
                                        </span>
                                        <span>
                                            Пара: {value.timeslot}
                                        </span>
                                        <span>
                                            {value.date}
                                        </span>
                                        <span>
                                            {value.audience.name}
                                        </span>
                                        <span>
                                            Группы: {value.groups.map(group => (
                                            <span key={group.id}>{group.name}, </span>
                                        ))}
                                        </span>
                                    </div>
                                    <div>
                                        <Button style={{marginRight: 10}}
                                        onClick={() => approve(value.id)}>
                                            Принять
                                        </Button>
                                        <Button
                                            onClick={() => reject(value.id)}>
                                            Отклонить
                                        </Button>
                                    </div>
                                </div>
                            </Tag>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Booking;