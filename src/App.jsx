import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Layout from "./components/Layout.jsx";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import PatientRegistry from './pages/PatientRegistry';
import PatientSearch from "./pages/PatientSearch.jsx";
import PatientProfile from "./pages/PatientProfile.jsx"

// Old function before the shared Outlet Layout.jsx
//function App() {
//    return (
//        <BrowserRouter>
//            <Routes>
//                <Route path="/" element={<Navigate to="/login" replace/>}/>
//                {/* Add links/routes here */}
//                <Route path="/login" element={<Login/>}/>
//                <Route path="/dashboard" element={<Dashboard/>}/>
//                <Route path="/settings" element={<Settings/>}/>
//                <Route path="/registry" element={<PatientRegistry/>}/>
//            </Routes>
//        </BrowserRouter>
//    );
//}

// New function for shared Layout.jsx
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace/>}/>

                {/* STANDALONE PAGES (No Sidebar) */}
                <Route path="/login" element={<Login/>}/>

                {/* MASTER LAYOUT PAGES (With Sidebar) */}
                <Route element={<Layout/>}> {/* Add links/routes here */}
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/registry" element={<PatientRegistry/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="/search" element={<PatientSearch/>}/>
                    <Route path="/patient/:id" element={<PatientProfile/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;