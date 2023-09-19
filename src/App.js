import './App.css';
import {Layout} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Schedule from "./pages/schedule_page/Schedule";

function App() {
  return (
      <Router>
          <Layout>
              <Header style={{
                  background: '#0072bc',
                  position: 'sticky',
                  top: 0,
                  zIndex: 1,
                  color: '#FFFFFF'
              }}>Header</Header>
              <Content>
                  <Routes>
                      <Route path='/' element={<Schedule />} />
                  </Routes>
              </Content>
          </Layout>
      </Router>
  );
}

export default App;
