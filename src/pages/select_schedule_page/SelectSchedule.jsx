import styles from "../select_schedule_page/select_schedule.module.css";
import {Button, Card, Select} from "antd";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getGroupsThunkCreator} from "../../store/scheduleReducer";

function SelectSchedule() {
    const dispatch = useDispatch();
    const groups = useSelector((state) => state.schedulePage.groups);
    const [groupId, setGroupId] = useState('');

    const options = groups.map(({ id, name }) => ({
        value: id,
        label: name,
    }));

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    useEffect(() => {
        dispatch(getGroupsThunkCreator());
    }, []);

    return (
        <>
            <div className={styles.mainContainer}>
                <Card className={styles.cardSelect}>
                    <span style={{fontSize: 20, fontWeight: 'bold'}}> Расписание групп </span>
                    <div style={{
                        paddingTop:10
                    }}>
                        <Select
                            showSearch
                            placeholder="Выберите факультет"
                            optionFilterProp="children"
                            filterOption={filterOption}
                            options={[
                                {
                                    value: '1',
                                    label: 'Высшая IT-школа',
                                }
                            ]}
                        />
                    </div>
                    <div style={{
                        paddingTop:10
                    }}>
                        {groups && <Select
                            showSearch
                            placeholder="Выберите группу"
                            optionFilterProp="children"
                            filterOption={filterOption}
                            onChange={(value) => setGroupId(value)}
                            options={options}
                        />}
                    </div>
                    <Link to={`/schedule/${groupId}`} >
                        <Button style={{marginTop: 10}}
                                type="primary">
                            Показать расписание
                        </Button>
                    </Link>
                </Card>
            </div>
        </>
    )
}

export default SelectSchedule;
