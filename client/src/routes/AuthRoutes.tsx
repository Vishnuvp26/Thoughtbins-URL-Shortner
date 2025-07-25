import LandingPage from '@/pages/landing/LandingPage';
import Login from '@/pages/auth/Login';
import { Route, Routes } from 'react-router-dom';
import Signup from '@/pages/auth/Signup';

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<Signup />} />
        </Routes>
    );
}

export default AuthRoutes