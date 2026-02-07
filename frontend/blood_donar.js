const donor_id = localStorage.getItem("donor_id");

function openProfile() {
  window.location.href = "profile.html";
}

function loadRequests() {
  const urgency = document.getElementById("urgencyFilter").value;
  let url = "http://localhost:3000/donor/requests";
  if (urgency) url += "?urgency=" + urgency;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const box = document.getElementById("requests");
      box.innerHTML = "";

      data.forEach(r => {
        box.innerHTML += `
          <div class="card">
            <p><b>Hospital:</b> ${r.hospital}</p>
            <p><b>Blood:</b> ${r.blood_group_needed}</p>
            <p><b>Units:</b> ${r.units}</p>
            <p class="urgency ${r.urgency.toLowerCase()}">Urgency: ${r.urgency}</p>
            <div class="actions">
              <button class="accept" onclick="respond(${r.id},'accepted')">Accept</button>
              <button class="reject" onclick="respond(${r.id},'rejected')">Reject</button>
            </div>
          </div>
        `;
      });
    });
}

function respond(request_id, response) {
  fetch("http://localhost:3000/donor/respond", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      request_id,
      donor_id,
      response
    })
  })
  .then(res => res.json())
  .then(() => loadRequests());
}


document.getElementById("appointmentBtn").onclick = () =>
  location.href = "Book_Appointment_to_Donate_Blood.html";

document.getElementById("historyBtn").onclick = () =>
  location.href = "Cheak_Appointment_History.html";

document.getElementById("profileBtn").onclick = () =>
  location.href = "user_donor_profile.html";

function loadRequests(){
  const urgency = document.getElementById("urgencyFilter").value;
  let url = "http://localhost:3000/donor/requests";
  if(urgency) url += "?urgency=" + urgency;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      requests.innerHTML = "";
      data.forEach(r => {
        requests.innerHTML += `
          <div>
            <p>${r.hospital}</p>
            <p>${r.blood_group_needed}</p>
            <button onclick="respond(${r.id},'accepted')">Accept</button>
            <button onclick="respond(${r.id},'rejected')">Reject</button>
          </div>`;
      });
    });
}

function respond(request_id, response){
  fetch("http://localhost:3000/donor/respond", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ request_id, donor_id, response })
  }).then(()=>loadRequests());
}

loadRequests();
