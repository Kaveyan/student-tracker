import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Create from "./components/Create";
import Login from "./components/Login";
import OAuthSuccess from "./components/OAuthSuccess";
import Facultycreate from "./components/Facultycreate";
import Parentcreate from "./components/Parentcreate";
import Admincreate from "./components/Admincreate";
import Studentcreate from "./components/Studentcreate";
import Upload from "./components/Upload";
import Uploadachivement from "./components/Uploadachivement";
import Uploadcertifiate from "./components/Uploadcertifiate";
import Uploadclanguage from "./components/Uploadclanguage";
import Uploadproject from "./components/Uploadproject";
import Uploadplanguage from "./components/Uploadplanguage";
import AdminHome from "./components/Adminhome";
import FacultyHome from "./components/Facultyhome";
import StudentHome from "./components/Studenhome";
import ProtectedRoute from './components/ProtectedRoute';
import Event from "./components/Event";
import Detail from "./components/Detail";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/faculty" element={<Facultycreate />} />
          <Route path="/parent" element={<Parentcreate />} />
          <Route path="/student" element={<Studentcreate />} />
          <Route path="/admin" element={<Admincreate />} />
          <Route path="/event" element={<Event />} />
          {/* Define protected routes */}
          <Route 
            path="/adminhome" 
            element={
              <ProtectedRoute>
                <AdminHome />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/facultyhome" 
            element={
              <ProtectedRoute>
                <FacultyHome />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/studenthome" 
            element={
              <ProtectedRoute>
                <StudentHome />
              </ProtectedRoute>
            } 
          />
          
          {/* Other routes */}
          <Route 
            path="/upload" 
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/up-ach" 
            element={
              <ProtectedRoute>
                <Uploadachivement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/up-cer" 
            element={
              <ProtectedRoute>
                <Uploadcertifiate />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/up-pro" 
            element={
              <ProtectedRoute>
                <Uploadproject />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/up-planguage" 
            element={
              <ProtectedRoute>
                <Uploadplanguage />
              </ProtectedRoute>
            } 
          />
           <Route 
            path="/detail" 
            element={
              <ProtectedRoute>
                <Detail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/up-clanguage" 
            element={
              <ProtectedRoute>
                <Uploadclanguage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
