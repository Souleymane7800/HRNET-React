import React from 'react';
import {
      BrowserRouter as Router,
      Route,
      Routes,
      Navigate,
      Outlet,
} from 'react-router-dom';
import CreateEmployee from './pages/CreateEmployee';
import EmployeeList from './pages/EmployeeList';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header';
import NotFound from './pages/NotFound';

const MainLayout: React.FC = () => (
      <>
            <Header />
            <Outlet />
      </>
);

const App: React.FC = () => {
      return (
            <Router>
                  <GlobalStyle />
                  <Routes>
                        <Route element={<MainLayout />}>
                              <Route path='/' element={<CreateEmployee />} />
                              <Route
                                    path='/employee-list'
                                    element={<EmployeeList />}
                              />
                        </Route>
                        <Route path='/404' element={<NotFound />} />
                        <Route
                              path='*'
                              element={<Navigate to='/404' replace />}
                        />
                  </Routes>
            </Router>
      );
};

export default App;
