import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateEmployee from './pages/CreateEmployee';
import EmployeeList from './pages/EmployeeList';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header';

const App: React.FC = () => {
      return (
            <Router>
                  <GlobalStyle />
                  <Header />
                  <Routes>
                        <Route path='/' element={<CreateEmployee />} />
                        <Route
                              path='/employee-list'
                              element={<EmployeeList />}
                        />
                  </Routes>
            </Router>
      );
};

export default App;
