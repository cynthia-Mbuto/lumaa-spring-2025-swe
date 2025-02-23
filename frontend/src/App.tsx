import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './pages/Dashboard';
import CreateTask from './pages/CreateTask';
import UpdateTask from './pages/UpdateTask';
import DeleteTask from './pages/DeleteTask';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/register" />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/create-task" element={<CreateTask />} />
                    <Route path="/update-task/:id" element={<UpdateTask />} />
                    <Route path="/delete-task/:id" element={<DeleteTask />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
