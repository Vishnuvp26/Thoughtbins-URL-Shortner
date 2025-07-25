import type { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const navigate = useNavigate();
    const { accessToken } = useSelector((state: RootState) => state.user);

    const checkAuth = () => {
        if (!accessToken) {
            navigate('/login');
            return false;
        }
        return true;
    };

    return { checkAuth, isAuthenticated: !!accessToken };
};