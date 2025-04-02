import React from "react";
import AuthScreen from "./components/auth/auth-screen";

const App: React.FC = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <AuthScreen />
    </main>
  );
};

export default App;
