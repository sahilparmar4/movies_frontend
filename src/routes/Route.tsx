import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";

const Login = lazy(() => import("../pages/auth/Login"));
const Movies = lazy(() => import("../pages/movies/MovieList"));
const AddUpdateMovie = lazy(() => import("../pages/movies/AddUpdateMovie"))

const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

const PublicRoute = () => {
    return !isAuthenticated() ? (
        <PublicLayout>
            <Outlet />
        </PublicLayout>
    ) : (
        <Navigate to="/movies" />
    );
};

const PrivateRoute = () => {
    return isAuthenticated() ? (
        <PrivateLayout>
            <Outlet />
        </PrivateLayout>
    ) : (
        <Navigate to="/login" />
    );
};

export const routes = [
    {
        path: "/",
        element: isAuthenticated() ? <Navigate to="/movies" replace /> : <Navigate to="/login" replace />,
    },
    {
        element: <PublicRoute />,
        children: [
            { path: "/login", element: <Login /> },
        ],
    },
    {
        element: <PrivateRoute />,
        children: [
            { path: "/movies", element: <Movies /> },
            { path: "/movies/:id", element: <AddUpdateMovie title="Movie Details" action="view" /> },
            { path: "/movies/add", element: <AddUpdateMovie title="Create a new movie" action="add" /> },
            { path: "/movies/update/:id", element: <AddUpdateMovie title="Edit" action="update" /> },
        ],
    },
];
