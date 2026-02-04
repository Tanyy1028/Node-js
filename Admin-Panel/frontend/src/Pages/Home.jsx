import React from "react";
import { Link } from "react-router";

export default function Dashboard() {
  return (
    <div className="container-fluid">
      <div className="row min-vh-100">

        {/* ===== Sidebar ===== */}
        <div className="col-md-3 col-lg-2 bg-dark text-white p-4">
          <h4 className="fw-bold mb-4">SkillPanel</h4>

          <ul className="nav flex-column gap-2">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link text-white">
                📊 Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ProfilePage" className="nav-link text-white">
                👤 Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/skills" className="nav-link text-white">
                🧠 Skills
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/AboutPage" className="nav-link text-white">
                ℹ️ About
              </Link>
            </li>
            <li className="nav-item mt-3">
              <Link to="/" className="nav-link text-danger">
                🚪 Logout
              </Link>
            </li>
          </ul>
        </div>

        {/* ===== Main Content ===== */}
        <div className="col-md-9 col-lg-10 bg-light p-5">

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold">Dashboard</h2>
              <p className="text-muted mb-0">
                Skill Progress Overview
              </p>
            </div>
            <div className="fw-semibold">
              👋 Welcome, Admin
            </div>
          </div>

          {/* ===== Stats Cards ===== */}
          <div className="row g-4 mb-4">

            <div className="col-md-3">
              <div className="card border-0 shadow-sm rounded-4 p-3">
                <h6 className="text-muted">Total Users</h6>
                <h3 className="fw-bold">120</h3>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-0 shadow-sm rounded-4 p-3">
                <h6 className="text-muted">Total Skills</h6>
                <h3 className="fw-bold">48</h3>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-0 shadow-sm rounded-4 p-3">
                <h6 className="text-muted">Avg Progress</h6>
                <h3 className="fw-bold">72%</h3>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-0 shadow-sm rounded-4 p-3">
                <h6 className="text-muted">Active Learners</h6>
                <h3 className="fw-bold">89</h3>
              </div>
            </div>

          </div>

          {/* ===== Skill Progress Section ===== */}
          <div className="row g-4">

            <div className="col-md-6">
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-semibold mb-3">Top Skills Progress</h5>

                <p className="mb-1">React</p>
                <div className="progress mb-3">
                  <div className="progress-bar bg-success" style={{ width: "75%" }}>
                    75%
                  </div>
                </div>

                <p className="mb-1">JavaScript</p>
                <div className="progress mb-3">
                  <div className="progress-bar bg-primary" style={{ width: "85%" }}>
                    85%
                  </div>
                </div>

                <p className="mb-1">Node.js</p>
                <div className="progress">
                  <div className="progress-bar bg-warning" style={{ width: "60%" }}>
                    60%
                  </div>
                </div>
              </div>
            </div>

            {/* ===== Recent Activity ===== */}
            <div className="col-md-6">
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-semibold mb-3">Recent Activity</h5>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    ✔ React skill updated to 75%
                  </li>
                  <li className="list-group-item">
                    ✔ JavaScript marked as Advanced
                  </li>
                  <li className="list-group-item">
                    ✔ New user added
                  </li>
                  <li className="list-group-item">
                    ✔ Node.js progress increased
                  </li>
                </ul>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}