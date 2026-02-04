import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_uri } from "../../utils/global-function.js";

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
    <div className="container-fluid bg-light min-vh-100 p-5">

      <h3 className="fw-bold mb-3">My Profile</h3>

      <div className="row g-4">

        {/* ===== Left Card ===== */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
            <img
              src={currentUser.image || "https://i.pravatar.cc/150"}
              className="rounded-circle mb-3"
              width="120"
              height="120"
              alt="profile"
            />

            <h5>{currentUser.name || "Your Name"}</h5>
            <p className="text-muted">{currentUser.role || "User"}</p>

            <button
              className="btn btn-primary w-100"
              onClick={handleUpdateProfile}
            >
              Update Profile
            </button>
          </div>
        </div>

        {/* ===== Right Section ===== */}
        <div className="col-md-8">
          <div className="card border-0 shadow-sm rounded-4 p-4">

            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentUser.name || ""}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      name: e.target.value
                    })
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={currentUser.email || ""}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentUser.phone || ""}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      phone: e.target.value
                    })
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Age</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentUser.age || ""}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      age: e.target.value
                    })
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Education</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentUser.education || ""}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      education: e.target.value
                    })
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Experience</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentUser.exp || ""}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      exp: e.target.value
                    })
                  }
                />
              </div>

              <div className="col-md-12">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentUser.address || ""}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      address: e.target.value
                    })
                  }
                />
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}