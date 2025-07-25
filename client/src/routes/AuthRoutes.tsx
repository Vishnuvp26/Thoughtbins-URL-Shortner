import { Route, Routes } from 'react-router-dom';
import LandingPage from '@/pages/landing/LandingPage';
import Login from '@/pages/auth/Login';
import Signup from '@/pages/auth/Signup';
import PublicRoute from './ProtectedRoutes';

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<LandingPage />} />
            <Route
                path="login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
            <Route
                path="sign-up"
                element={
                    <PublicRoute>
                        <Signup />
                    </PublicRoute>
                }
            />
        </Routes>
    );
};

export default AuthRoutes;