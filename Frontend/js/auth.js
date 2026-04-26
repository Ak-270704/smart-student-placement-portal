const API = "http://localhost:5000/api";

function registerStudent() {
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    course: document.getElementById("course").value,
    skills: document.getElementById("skills").value.split(",")
  };

  fetch(`${API}/students/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    window.location.href = "student-login.html";
  });
}

function loginStudent() {
  const data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  fetch(`${API}/students/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.student._id);
      localStorage.setItem("role", "student");
      window.location.href = "student-dashboard.html";
    } else {
      alert(data.message);
    }
  });
}

function registerCompany() {
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    location: document.getElementById("location").value
  };

  fetch(`${API}/companies/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    window.location.href = "company-login.html";
  });
}

function loginCompany() {
  const data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  fetch(`${API}/companies/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.company._id);
      localStorage.setItem("role", "company");
      window.location.href = "company-dashboard.html";
    } else {
      alert(data.message);
    }
  });
}

function logout() {
  localStorage.clear();
}