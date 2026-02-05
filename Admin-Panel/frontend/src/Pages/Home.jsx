import React from "react";
import { Link } from "react-router";
import "./home.css";

export default function Dashboard() {
  return (
    <div className="dash-root">

      {/* ===== SIDEBAR ===== */}
      <aside className="dash-sidebar">
        <h2 className="dash-logo">SkillPanel</h2>

        <nav className="dash-nav">
          <Link to="/dashboard" className="dash-link active">Dashboard</Link>
          <Link to="/ProfilePage" className="dash-link">Profile</Link>
          <Link to="/skills" className="dash-link">Skills</Link>
          <Link to="/AboutPage" className="dash-link">About</Link>
          <Link to="/" className="dash-link logout">Logout</Link>
        </nav>
      </aside>

      {/* ===== MAIN ===== */}
      <main className="dash-main">

        {/* Header */}
        <header className="dash-header">
          <div>
            <h1>Dashboard</h1>
            <p>Skill progress overview</p>
          </div>
          <span className="dash-user">Welcome, Admin</span>
        </header>

        {/* Stats */}
        <section className="dash-stats">
          <div className="stat-card">
            <span>Total Users</span>
            <h3>120</h3>
          </div>
          <div className="stat-card">
            <span>Total Skills</span>
            <h3>48</h3>
          </div>
          <div className="stat-card">
            <span>Avg Progress</span>
            <h3>72%</h3>
          </div>
          <div className="stat-card">
            <span>Active Learners</span>
            <h3>89</h3>
          </div>
        </section>

        {/* Content */}
        <section className="dash-grid">

          {/* Skills */}
          <div className="dash-card">
            <h4>Top Skills</h4>

            <div className="skill">
              <span>React</span>
              <div className="skill-bar">
                <div style={{ width: "75%" }} />
              </div>
            </div>

            <div className="skill">
              <span>JavaScript</span>
              <div className="skill-bar">
                <div style={{ width: "85%" }} />
              </div>
            </div>

            <div className="skill">
              <span>Node.js</span>
              <div className="skill-bar">
                <div style={{ width: "60%" }} />
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="dash-card">
            <h4>Recent Activity</h4>
            <ul className="activity">
              <li>React skill updated to 75%</li>
              <li>JavaScript marked Advanced</li>
              <li>New user registered</li>
              <li>Node.js progress increased</li>
            </ul>
          </div>

        </section>
      </main>
    </div>
  );
}
