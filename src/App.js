import './App.css';
import {Button, DatePicker, Input, Layout, message, Modal, Select, Tabs} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';
import Schedule from "./pages/schedule_page/Schedule";
import SelectSchedule from "./pages/select_schedule_page/SelectSchedule";
import React, {useEffect, useState} from "react";
import TabPane from "antd/es/tabs/TabPane";
import {KeyOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import {authAPI} from "./api/authAPI";
import Editing from "./pages/editing_page/Editing";
import Booking from "./pages/booking_page/Booking";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [activeTab, setActiveTab] = useState('1');
    const [isAdmin, setIsAdmin] = useState(false);

    function isValidPassword(password) {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return passwordPattern.test(password);
    }

    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }

    const handleOk = () => {
        if(!isValidEmail(email)) {
            messageApi.warning("Неккоректный email");
        } else {
            console.log(password);
            console.log(isValidPassword(password));
            if(!isValidPassword(password)) {
                messageApi.warning("Пароль должен быть минимум 6 символов, один не буквенно-цифровой символ, одна строчная буква и одна заглавная буква");
            } else {
                if (activeTab === '1') {
                    if(email === '' || password === '') {
                        messageApi.warning("Введите данные");
                    }
                    authAPI.login(email, password).then(
                        (data) => {
                            if(data.status === 200) {
                                localStorage.setItem("data", JSON.stringify(data.tokens));
                                setIsLoggedIn(true);
                                if(data.tokens[0] === 'Editor')
                                    setIsAdmin(true);
                                window.location.reload();
                            } else {
                                messageApi.warning("Возникла ошибка");
                            }
                        })
                    // Вызовите функцию для вкладки "Войти"
                    console.log('login');
                    setOpen(false);
                } else if (activeTab === '2') {
                    if(email === '' || password === '' || username === '') {
                        messageApi.warning("Введите данные");
                    }
                    authAPI.registration(email, password, username).then(
                        (data) => {
                            if(data.status === 200) {
                                localStorage.setItem("data", JSON.stringify(data.tokens));
                                setIsLoggedIn(true);
                                window.location.reload();
                            } else {
                                if(data.status === 409)
                                    messageApi.warning("Пользователь с таким email уже существует");
                                messageApi.warning("Возникла ошибка");
                            }
                        })
                    // В
                    // Вызовите функцию для вкладки "Зарегистрироваться"
                    setOpen(false);
                    console.log('registrations');
                }
            }
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        let object = JSON.parse (localStorage.getItem ("data"));
        if(object !== null && object !== '' && object !== {}) {
            setIsLoggedIn(true);
            if(object.role[0] === 'Editor')
                setIsAdmin(true);
        }
    }, []);

  return (
      <Router>
          <Layout>
              <Header style={{
                  background: '#0072bc',
                  position: 'sticky',
                  top: 0,
                  zIndex: 1,
                  color: '#FFFFFF',
                  display: 'flex',
                  justifyContent: 'space-between'
              }}>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 20}}><path d="M10.5717 21.5561V9.38483H16.5635V21.946C16.5635 23.8163 17.79 25.7371 20.2158 25.7371C22.6119 25.7371 23.8398 23.8163 23.8398 21.946V9.38483H29.83V21.5263C29.83 26.3781 26.7914 31.1487 20.2158 31.1487C13.6403 31.1487 10.5717 26.3781 10.5717 21.5561Z" fill="white"></path><path d="M35.7137 2.02211H32.7731L30.8185 2.56057V3.26023H24.4104V2.52086L22.4473 1.76182H20.8566L20.5242 1.58057C20.5352 1.5472 20.5453 1.51313 20.5453 1.47615C20.5453 1.33514 20.457 1.21569 20.3333 1.1669V0H20.0865V1.16725C19.9637 1.21705 19.8773 1.33581 19.8773 1.47615C19.8773 1.51243 19.887 1.54615 19.8978 1.57885L19.5617 1.76182H17.8964L16.0271 2.54859V3.26023H9.57668V2.56261L7.6225 2.02211H4.68148L2.72729 2.56296V5.3657V22.6884C2.72729 32.2341 10.4933 40 20.0389 40H20.363C29.9087 40 37.6744 32.2341 37.6744 22.6884V3.62442H37.6683V2.56552L35.7137 2.02211ZM35.1794 22.6884C35.1794 30.8582 28.5326 37.5046 20.363 37.5046H20.0389C11.869 37.5046 5.22264 30.8582 5.22264 22.6884V5.64296H35.1794V22.6884H35.1794Z" fill="white"></path></svg>
                      <Link to="/" style={{
                          color: 'white'
                      }}>Выбрать расписание</Link>
                      {isAdmin && <Link to="/edit" style={{
                          color: 'white',
                          paddingLeft: 10
                      }}>Редактирование</Link>}
                      {isAdmin && <Link to="/booking" style={{
                          color: 'white',
                          paddingLeft: 10
                      }}>Заявки на бронирование</Link>}
                  </div>
                  {!isLoggedIn && <div>
                      <Button onClick={() => setOpen(true)}>
                          Авторизация</Button>
                  </div>}
                  {isLoggedIn && <div>
                      <Button onClick={() => {setIsAdmin(false); setIsLoggedIn(false); localStorage.removeItem("data")}}>
                          Выйти</Button>
                  </div>}
              </Header>
              <Content>
                  {contextHolder}
                  <Routes>
                      <Route path='/schedule/:id' element={<Schedule />} />
                      <Route path='/' element={<SelectSchedule />} />
                      <Route path='/edit' element={<Editing /> } />
                      <Route path='/booking' element={<Booking /> } />
                  </Routes>
                  <Modal
                      centered
                      open={open}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      width={700}
                      okText={'Авторизоваться'}
                      cancelText={'Отмена'}
                  >
                      <Tabs defaultActiveKey={activeTab} centered onChange={(key) => setActiveTab(key)}>
                          <TabPane tab="Войти" key="1">
                              <Input prefix={<MailOutlined />} placeholder="Введите email" style={{marginTop: 10}}
                                     value={email}
                                     onChange={(event) => setEmail(event.target.value)}/>
                              <Input prefix={<KeyOutlined />} placeholder="Введите пароль" style={{marginTop: 10}}
                                     value={password}
                                     onChange={(event) => setPassword(event.target.value)}/>
                          </TabPane>
                          <TabPane tab="Зарегистрироваться" key="2">
                              <Input prefix={<UserOutlined />} placeholder="Введите имя пользователя"
                                     value={username}
                                     onChange={(event) => setUsername(event.target.value)}/>
                              <Input prefix={<MailOutlined />} placeholder="Введите email" style={{marginTop: 10}}
                                     value={email}
                                     onChange={(event) => setEmail(event.target.value)}/>
                              <Input prefix={<KeyOutlined />} placeholder="Введите пароль" style={{marginTop: 10}}
                                     value={password}
                                     onChange={(event) => setPassword(event.target.value)}/>
                          </TabPane>
                      </Tabs>
                  </Modal>
              </Content>
          </Layout>
      </Router>
  );
}

export default App;
