const API = "http://localhost:5000/api";

function loadJobs() {
  fetch(`${API}/jobs`)
  .then(res => res.json())
  .then(jobs => {
    const jobsList = document.getElementById("jobsList");
    jobsList.innerHTML = "";

    jobs.forEach(job => {
      jobsList.innerHTML += `
        <div class="card">
          <h3>${job.title}</h3>
          <p>${job.description}</p>
          <p><b>Skills:</b> ${job.skillsRequired.join(", ")}</p>
          <p><b>Salary:</b> ₹${job.salary}</p>
          <p><b>Company:</b> ${job.companyId.name}</p>
          <button onclick="applyJob('${job._id}')">Apply</button>
        </div>
      `;
    });
  });
}

function applyJob(jobId) {
  const studentId = localStorage.getItem("userId");

  if (!studentId) {
    alert("Please login as student first");
    return;
  }

  fetch(`${API}/applications/apply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token")
    },
    body: JSON.stringify({
      jobId: jobId,
      studentId: studentId
    })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
  });
}