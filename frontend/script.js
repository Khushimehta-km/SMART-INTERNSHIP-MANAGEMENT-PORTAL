function registerUser() {
 const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  if (name === "" || email === "" || password === "") {
    alert("Please fill all fields before login/register.");
    return;
  }

  const user = {
    name: name,
    email: email,
    password: password,
    role: role
  };

  localStorage.setItem("currentUser", JSON.stringify(user));

  fetch("https://smart-internship-management-portal.onrender.com/api/users/add", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(user)
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    window.location.href = "dashboard.html";
  });
}

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (document.getElementById("welcome") && currentUser) {
  document.getElementById("welcome").innerText =
    `Welcome, ${currentUser.name} (${currentUser.role})`;

  applyRoleAccess();
  loadStats();
  loadReports();
}

function applyRoleAccess() {
  const role = currentUser.role;

  const reportSection = document.getElementById("reportSection");
  const attendanceSection = document.getElementById("attendanceSection");
  const feedbackSection = document.getElementById("feedbackSection");

  if (role === "Intern") {
    feedbackSection.style.display = "none";
  }

  if (role === "Mentor") {
    reportSection.style.display = "none";
    attendanceSection.style.display = "none";
  }

  if (role === "Admin") {
    // Admin can see all sections
  }
}

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function submitReport() {
  const report = {
    internName: currentUser.name,
    date: getTodayDate(),
    taskTitle: document.getElementById("taskTitle").value,
    workDone: document.getElementById("workDone").value,
    status: "Submitted"
  };

  if (report.taskTitle === "" || report.workDone === "") {
  alert("Please fill report details.");
  return;
}

  fetch("https://smart-internship-management-portal.onrender.com/api/reports/add", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(report)
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    loadStats();
    loadReports();
  });
}

function markAttendance() {
  const attendance = {
    internName: currentUser.name,
    date: getTodayDate(),
    status: document.getElementById("attendanceStatus").value
  };

  fetch("https://smart-internship-management-portal.onrender.com/api/attendance/mark", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(attendance)
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    loadStats();
  });
}

function addFeedback() {
  const feedback = {
    internName: currentUser.name,
    mentorName: document.getElementById("mentorName").value,
    comment: document.getElementById("comment").value,
    rating: document.getElementById("rating").value,
    date: getTodayDate()
  };

  if (feedback.rating < 1 || feedback.rating > 5) {
  alert("Rating should be between 1 and 5.");
  return;
}

  fetch("https://smart-internship-management-portal.onrender.com/api/feedback/add", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(feedback)
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    loadStats();
  });
}

function loadStats() {
  fetch("https://smart-internship-management-portal.onrender.com/api/stats")
  .then(res => res.json())
  .then(data => {
    document.getElementById("totalUsers").innerText = data.totalUsers;
    document.getElementById("totalReports").innerText = data.totalReports;
    document.getElementById("totalAttendance").innerText = data.totalAttendance;
    document.getElementById("totalFeedbacks").innerText = data.totalFeedbacks;
  });
}

function loadReports() {
  fetch("https://smart-internship-management-portal.onrender.com/api/reports")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("reportsList");
    list.innerHTML = "";

    data.forEach(report => {
      list.innerHTML += `
        <div class="report-card">
          <h3>${report.taskTitle}</h3>
          <p><b>Intern:</b> ${report.internName}</p>
          <p><b>Date:</b> ${report.date}</p>
          <p><b>Work:</b> ${report.workDone}</p>
          <p><b>Status:</b> ${report.status}</p>
        </div>
      `;
    });
  });
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}