import ProjectPage from './pages/ProjectPage/ProjectPage';
import HomePage from './pages/homepage/HomePage';
import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import AddProject from './pages/addProject/AddProject';
import ProfilePage from './pages/profilePage/ProfilePage';


function App() {

  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/project/:id' element={<ProjectPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/profile/:id' element={<ProfilePage />} />
        <Route path='/addproject' element={user ? <AddProject /> : <Navigate to={"/login"} />} />
      </Routes>
    </div>
  );
}

export default App;
