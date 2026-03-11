import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  selectUser,
  selectIsAuthChecked
} from '../../services/slices/userSlice';

type TProtectedRouteProps = {
  isAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  isAuth = false,
  children
}) => {
  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (isAuth && user) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  if (!isAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
