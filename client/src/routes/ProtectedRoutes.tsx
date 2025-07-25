import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import type { JSX } from 'react';

const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;