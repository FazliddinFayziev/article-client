import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    path: string;
    element: React.ReactNode;
    adminOnly: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, element, adminOnly }) => {
    const userProfile = useSelector((state) => state.profile);
    const isAdmin = userProfile.user.isAdmin;

    if (adminOnly && !isAdmin) {
        return <Navigate to="/home" />;
    }

    return <Route path={path} element={element} />;
};

export default PrivateRoute;
