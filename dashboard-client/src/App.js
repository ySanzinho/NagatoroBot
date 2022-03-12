import './App.css';
import { Routes, Route } from 'react-router-dom';
import { DashboardPage, LadingPage, MenuPage  } from './pages'


function App() {
  return (
    <Routes>
      <Route path='/' exact={ true } element={<LadingPage/>} />
      <Route path='/menu' exact={ true } element={<MenuPage/>} />
      <Route path='/dashboard/:id' exact={ true } element={<DashboardPage/>} />
    </Routes>
  );
}

export default App;
