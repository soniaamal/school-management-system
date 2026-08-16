import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Classes from './pages/Classes';
import Students from './pages/Students';
import StudentDetails from './pages/StudentDetails';
import Teachers from './pages/Teachers';
import Attendance from './pages/Attendance';
import Fees from './pages/Fees';
import Reports from './pages/Reports';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>

      <Route path='/login' element={<Login />} />
      
      <Route path='/' element={<MainLayout />} >
      <Route index element={<Dashboard />} />
      <Route path='/classes' element={<Classes />} />
      <Route path='/students' element={<Students />} />
      <Route path='/students/:id' element={<StudentDetails />} />
      <Route path='/teachers' element={<Teachers />} />
      <Route path='/attendance' element={<Attendance />} />
      <Route path='/fees' element={<Fees />} />
      <Route path='/reports' element={<Reports />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>

    
  );
}

export default App;