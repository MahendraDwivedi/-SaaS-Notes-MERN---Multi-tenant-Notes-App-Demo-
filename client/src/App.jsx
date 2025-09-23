// import React from 'react';
// import { Outlet } from 'react-router-dom';
// export default function App() {
//   return (
//     <div style={{ fontFamily: 'system-ui, Arial', padding: 20 }}>
//       <h1>SaaS Notes (MERN demo)</h1>
//       <Outlet />
//     </div>
//   );
// }

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import NotesPage from "./pages/NotesPage";
import NoteDetail from "./pages/NoteDetail";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/notes/:id" element={<NoteDetail />} />
      </Routes>
    
  );
}
