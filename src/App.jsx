import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { Dashboard, Auth } from "@/layouts";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    console.log("Login successful, setting isAuthenticated to true");
    setIsAuthenticated(true);
  };

  return (
    <Routes>
      <Route 
        path="/dashboard/*" 
        element={isAuthenticated ? <Dashboard logout={() => setIsAuthenticated(false)} /> : <Navigate to="/auth/sign-in" replace />} 
      />
      <Route path="/auth/*" element={<Auth login={login} />} />
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
}

export default App;
