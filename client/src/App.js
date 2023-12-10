import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './styles/global.css'


import ITP from "./pages/Teacher/ITP";
import Login from "./pages/Login";
import StudentForm from "./pages/Student/StudentForm";
import Navbar from "./components/Layout/Navbar";
import PrismSummary from "./pages/Teacher/PrismSummary";
import TeacherLanding from "./pages/Teacher/TeacherLanding"
import ITPSummary from "./pages/Teacher/ITPSummary";
import Prism from "./pages/Teacher/Prism";
import ViewAllStudents from "./pages/Teacher/ViewAllStudents";

function App() {
  const [users, setUsers] = useState(null);


  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const response = await fetch(
  //       "http://localhost:5000/api/user/getAllUsers"
  //     );
  //     const json = await response.json();

  //     if (response.ok) {
  //       console.log(json);
  //     }
  //   };
  //   fetchUsers();
  // });

  return (
    // <div className="App">
    //   <BrowserRouter>
    //     <div>
    //       <Navbar />
    //       <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route path="itp" element={<Itp />} />
    //         <Route path="itpsummary" element={<ITPSummary/>} />
    //         <Route path="prismsummary" element={<PrismSummary/>} />
    //         <Route path="teacherlanding" element={<TeacherLanding/>} />
    //       </Routes>
    //     </div>
    //   </BrowserRouter>
    //   <p>
    <div className="">
      <Router>
        <Navbar />
        <Routes>
          {/* DECLARE ALL PAGE LINKS HERE */}
          <Route path='/' element={<Login />} />
          <Route path="/teacher/itp" element={<ITP />} />
          <Route path="studentform" element={<StudentForm />} />
          <Route path="/teacher/itpsummary" element={<ITPSummary />} />
          <Route path="/teacher/prismsummary" element={<PrismSummary />} />
          <Route path="teacherlanding" element={<TeacherLanding />} />
          <Route path="/teacher/prism" element={<Prism />} />
          <Route path="/teacher/viewallstudents" element={<ViewAllStudents />} />
        </Routes>

        {/* SO IF YOU SOMETHING TO APPEAR ON ALL PAGE, PUT OUTSIDE THE <Routes> */}
      </Router>
      {/* <p>
        <i>
          <strong>Please add your links using route</strong>
        </i>
      </p> */}
    </div>
  );
}

export default App;
