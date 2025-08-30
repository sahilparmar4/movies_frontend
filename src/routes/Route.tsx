// src/routes/AppRoutes.tsx
import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";

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
            { path: "/movies/:id", element: <MovieDetails /> },
            { path: "/movies/add", element: <MovieAdd /> },
            { path: "/movies/update/:id", element: <MovieUpdate /> },
        ],
    },
];
