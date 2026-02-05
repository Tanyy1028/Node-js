import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_uri } from "../../utils/global-function.js";
import "./profile.css";

export default function Profile() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const res = await axios.get(
        `${base_uri}/admin/get-current-user`,
        { withCredentials: true }
      );
      if (res.data.status) {
        setCurrentUser(res.data.user);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await axios.put(
        `${base_uri}/admin/update-user`,
        currentUser,
        { withCredentials: true }
      );
      if (res.data.status) {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="profile-root">

      <h2 className="profile-title">My Profile</h2>

      <div className="profile-grid">

        {/* LEFT */}
        <div className="profile-card profile-left">
          <img
            src={currentUser.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBmo-0q9nYBx33IH-2TpX85tMugtj6va-spw&s"}
            alt="profile"
          />
          <h4>{currentUser.name || "Your Name"}</h4>
          <span>{currentUser.role || "User"}</span>

          <button onClick={handleUpdateProfile}>
            Update Profile
          </button>
        </div>

        {/* RIGHT */}
        <div className="profile-card">
          <div className="profile-form">

            <div className="field">
              <label>Name</label>
              <input
                type="text"
                value={currentUser.name || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, name: e.target.value })
                }
              />
            </div>

            <div className="field">
              <label>Email</label>
              <input
                type="email"
                value={currentUser.email || ""}
                readOnly
              />
            </div>

            <div className="field">
              <label>Phone</label>
              <input
                type="text"
                value={currentUser.phone || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, phone: e.target.value })
                }
              />
            </div>

            <div className="field">
              <label>Age</label>
              <input
                type="text"
                value={currentUser.age || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, age: e.target.value })
                }
              />
            </div>

            <div className="field">
              <label>Education</label>
              <input
                type="text"
                value={currentUser.education || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, education: e.target.value })
                }
              />
            </div>

            <div className="field">
              <label>Experience</label>
              <input
                type="text"
                value={currentUser.exp || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, exp: e.target.value })
                }
              />
            </div>

            <div className="field full">
              <label>Address</label>
              <input
                type="text"
                value={currentUser.address || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, address: e.target.value })
                }
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
