const API = "http://localhost:5000/api";

function postJob() {
  const companyId = localStorage.getItem("userId");

  const data = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    skillsRequired: document.getElementById("skills").value.split(","),
    salary: document.getElementById("salary").value,
    companyId: companyId
  };

  fetch(`${API}/jobs/add`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token")
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
  });
}