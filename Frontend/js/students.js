const API = "http://localhost:5000/api";

function loadApplications() {
  const studentId = localStorage.getItem("userId");

  fetch(`${API}/applications/student/${studentId}`, {
    headers: {
      "Authorization": localStorage.getItem("token")
    }
  })
  .then(res => res.json())
  .then(applications => {
    const list = document.getElementById("applicationsList");
    list.innerHTML = "";

    applications.forEach(app => {
      list.innerHTML += `
        <div class="card">
          <h3>${app.jobId.title}</h3>
          <p><b>Company:</b> ${app.jobId.companyId.name}</p>
          <p><b>Status:</b> ${app.status}</p>
        </div>
      `;
    });
  });
}