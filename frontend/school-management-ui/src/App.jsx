import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Attendance from './pages/Attendance';
import Fees from './pages/Fees';
import Reports from './pages/Reports';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/login' element={<Login />} />
      <Route path='/students' element={<Students />} />
      <Route path='/teachers' element={<Teachers />} />
      <Route path='/attendance' element={<Attendance />} />
      <Route path='/fees' element={<Fees />} />
      <Route path='/reports' element={<Reports />} />
      <Route path='**' element={<NotFound />} />
    </Routes>
  );
}

export default App;
