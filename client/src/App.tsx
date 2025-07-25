import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BarLoader from "./components/ui/Loader";
import { Toaster } from "sonner";

const AuthRoutes = React.lazy(() => import('@/routes/AuthRoutes'));

const App = () => {
    return (
        <>
            <Toaster theme="system"/>
            <Router>
                <Suspense fallback={<BarLoader />}>
                    <Routes>
                        <Route path="/*" element={<AuthRoutes />} />
                    </Routes>
                </Suspense>
            </Router>
        </>
    );
}

export default App;