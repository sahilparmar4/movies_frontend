// src/routes/AppRoutes.tsx
import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import AddUpdateMovie from "../pages/movies/AddUpdateMovie";

// lazy-loaded pages
const Login = lazy(() => import("../pages/auth/Login"));
const Movies = lazy(() => import("../pages/movies/MovieList"));
const MovieDetails = lazy(() => import("../pages/movies/AddUpdateMovie"));
const MovieAdd = lazy(() => import("../pages/movies/AddUpdateMovie"));
const MovieUpdate = lazy(() => import("../pages/movies/AddUpdateMovie"));

// auth check function (replace with your real auth logic)
const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};

// Public wrapper
const PublicRoute = () => {
    return !isAuthenticated() ? (
        <PublicLayout>
            <Outlet />
        </PublicLayout>
    ) : (
        <Navigate to="/movies" />
    );
};

// Private wrapper
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
            { path: "/movies/:id", element: <AddUpdateMovie title="Movie Details" action="view"  /> },
            { path: "/movies/add", element: <AddUpdateMovie title="Create a new movie" action="add" /> },
            { path: "/movies/update/:id", element: <AddUpdateMovie title="Edit" action="update"  /> },
        ],
    },
];
