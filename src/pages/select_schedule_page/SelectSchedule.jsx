import styles from "../select_schedule_page/select_schedule.module.css";
import {Button, Card, Select} from "antd";
import {Link} from "react-router-dom";
import {useState} from "react";

function SelectSchedule() {
    const [groupId, setGroupId] = useState('1c232119-97c7-11eb-812c-005056bc52bb');

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

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
                        <Select
                            showSearch
                            placeholder="Выберите группу"
                            optionFilterProp="children"
                            filterOption={filterOption}
                            onChange={(value) => setGroupId(value)}
                            options={[
                                {
                                    value: '1c232119-97c7-11eb-812c-005056bc52bb',
                                    label: 'Группа 972101',
                                },
                                {
                                    value: 'e16bbdff-981c-11eb-812c-005056bc52bb',
                                    label: 'Группа 972102',
                                },
                                {
                                    value: '807a6d55-d3ef-11eb-812f-005056bc52bb',
                                    label: 'Группа 972103',
                                },
                            ]}
                        />
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
