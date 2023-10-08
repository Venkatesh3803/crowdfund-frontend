import ProjectPage from './pages/ProjectPage/ProjectPage';
import HomePage from './pages/homepage/HomePage';
import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import AddProject from './pages/addProject/AddProject';
import ProfilePage from './pages/profilePage/ProfilePage';
import { useSelector } from 'react-redux';
import About from './pages/aboutpage/About';


function App() {

  const user = useSelector(state => state.auth.user)
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/project/:id' element={<ProjectPage />} />
        <Route path='/login' element={user ? <Navigate to={"/"} /> : <LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/profile/:id' element={<ProfilePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/addproject' element={user ? <AddProject /> : <Navigate to={"/login"} />} />
      </Routes>
    </div>
  );
}

export default App;
