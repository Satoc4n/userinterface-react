import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import PatientRegistry from './pages/PatientRegistry';



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace/>}/>
                {/* Add links/routes here */}
                <Route path="/login" element={<Login/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/registry" element={<PatientRegistry/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;