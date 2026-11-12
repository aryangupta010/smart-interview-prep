/* Sample mentor profiles are bundled for the public static demo. */
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("mentorGrid");
  const status = document.getElementById("mentorStatus");
  const search = document.getElementById("mentorSearch");
  const expertise = document.getElementById("expertiseFilter");
  const experience = document.getElementById("experienceFilter");
  const dialog = document.getElementById("mentorDialog");
  const details = document.getElementById("mentorDetails");
  const mentors = window.SMARTPREP_DATA.mentors;

  function setStatus(message, type = "") {
    status.textContent = message;
    status.className = `mentor-status ${type}`.trim();
  }
  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, ch => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[ch]));
  }
  function initials(name) {
    return String(name || "Mentor").trim().split(/\s+/).slice(0, 2).map(part => part[0] || "").join("").toUpperCase();
  }
  function filteredMentors() {
    const q = search.value.trim().toLowerCase();
    const skill = expertise.value.toLowerCase();
    const minYears = Number(experience.value || 0);
    return mentors.filter(m => {
      const skills = Array.isArray(m.skills) ? m.skills : [];
      const text = [m.name, m.specialization, m.bio, ...skills].join(" ").toLowerCase();
      return (!q || text.includes(q)) &&
        (!skill || skills.some(s => String(s).toLowerCase() === skill) || String(m.specialization || "").toLowerCase() === skill) &&
        Number(m.experience_years || 0) >= minYears;
    });
  }
  function render() {
    const list = filteredMentors();
    if (!list.length) {
      grid.innerHTML = '<div class="mentor-empty"><strong>No matching mentors</strong>Try changing your search or filters.</div>';
      return;
    }
    grid.innerHTML = list.map(m => {
      const skills = Array.isArray(m.skills) ? m.skills : [];
      const photo = m.photo_url || m.avatar_url;
      const avatar = photo
        ? `<img class="mentor-avatar" src="${escapeHTML(photo)}" alt="${escapeHTML(m.name || "Mentor")}" loading="lazy">`
        : `<div class="mentor-avatar" aria-label="${escapeHTML(m.name || "Mentor")}">${escapeHTML(initials(m.name))}</div>`;
      return `<article class="mentor-card">
        <div class="mentor-card-head">${avatar}<div><h2>${escapeHTML(m.name || "Mentor")}</h2>
        <div class="mentor-specialty">${escapeHTML(m.specialization || "Interview mentor")}</div></div></div>
        <div class="mentor-meta"><span class="mentor-chip">${escapeHTML(m.experience_years ?? 0)} years experience</span>
        <span class="mentor-chip">★ ${escapeHTML(m.rating ?? "Not rated")}</span></div>
        <p class="mentor-bio">${escapeHTML(m.bio || "Profile details have not been added yet.")}</p>
        <div class="mentor-skills">${skills.slice(0, 5).map(s => `<span class="mentor-skill">${escapeHTML(s)}</span>`).join("")}</div>
        <div class="mentor-card-actions"><button type="button" data-profile="${escapeHTML(m.id)}">View profile</button>
        <button type="button" class="primary" data-book="${escapeHTML(m.id)}">Book session</button></div>
      </article>`;
    }).join("");
  }
  function showProfile(id) {
    const m = mentors.find(item => String(item.id) === String(id));
    if (!m) return;
    const skills = Array.isArray(m.skills) ? m.skills.join(", ") : "Not specified";
    details.innerHTML = `<h2>${escapeHTML(m.name || "Mentor profile")}</h2>
      <p>${escapeHTML(m.specialization || "Interview mentor")} · ${escapeHTML(m.experience_years ?? 0)} years experience</p>
      <p>${escapeHTML(m.bio || "No biography provided.")}</p>
      <p><strong>Skills:</strong> ${escapeHTML(skills)}</p>
      <p><strong>Rating:</strong> ${escapeHTML(m.rating ?? "Not rated")}</p>
      <p class="dialog-note">This fictional profile is sample data included with the public demo. Booking is not available.</p>`;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else alert(`${m.name || "Mentor"}\n${m.specialization || ""}\nBooking is not connected yet.`);
  }
  grid.addEventListener("click", event => {
    const profileButton = event.target.closest("[data-profile]");
    const bookButton = event.target.closest("[data-book]");
    if (profileButton) showProfile(profileButton.dataset.profile);
    if (bookButton) {
      const m = mentors.find(item => String(item.id) === bookButton.dataset.book);
      if (m) {
        details.innerHTML = `<h2>Booking is demo-only</h2><p>Mentor: ${escapeHTML(m.name || "Mentor")}</p><p class="dialog-note">This static site has no booking service, so no session was booked.</p>`;
        if (typeof dialog.showModal === "function") dialog.showModal();
      }
    }
  });
  [search, expertise, experience].forEach(control => control.addEventListener("input", render));
  document.getElementById("mentorLogout").addEventListener("click", () => {
    const user = window.getSmartPrepUser();
    user.loggedIn = false;
    localStorage.setItem("smartprepUser", JSON.stringify(user));
    window.location.href = "login.html";
  });

  const skills = [...new Set(mentors.flatMap(m => [
    ...m.skills,
    m.specialization
  ]))].sort((a, b) => a.localeCompare(b));
  skills.forEach(skill => {
    const option = document.createElement("option");
    option.value = skill;
    option.textContent = skill;
    expertise.appendChild(option);
  });
  setStatus(`${mentors.length} sample mentor profiles loaded.`, "success");
  render();
});
