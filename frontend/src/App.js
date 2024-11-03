import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/Dashboard/SendMoney";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/dashboard" element={<SendMoney />} />
                    <Route path="/send" element={<SendMoney />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
