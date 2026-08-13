const API_BASE = 'http://localhost:8080/api';

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(sec => {
        sec.style.display = 'none';
        sec.classList.remove('active-section');
    });
    const section = document.getElementById(sectionId);
    section.style.display = 'block';
    // Small delay to allow display block to apply before animation
    setTimeout(() => section.classList.add('active-section'), 10);
    
    if(sectionId === 'students-section') fetchStudents();
    if(sectionId === 'companies-section') fetchCompanies();
    if(sectionId === 'jobs-section') fetchJobs();
}

function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal.classList.contains('active')) {
        modal.classList.remove('active');
    } else {
        modal.classList.add('active');
    }
}

// Fetchers
async function fetchStudents() {
    try {
        const res = await fetch(`${API_BASE}/students`);
        const students = await res.json();
        const list = document.getElementById('studentsList');
        list.innerHTML = students.map(s => `
            <div class="card">
                <h3>${s.name}</h3>
                <p><strong>Email:</strong> ${s.email}</p>
                <p><strong>Degree:</strong> ${s.degree}</p>
                <p><strong>CGPA:</strong> ${s.cgpa}</p>
                <div>
                    ${s.skills.split(',').map(skill => `<span class="badge">${skill.trim()}</span>`).join('')}
                </div>
            </div>
        `).join('');
    } catch (e) {
        console.error("Error fetching students", e);
    }
}

async function fetchCompanies() {
    try {
        const res = await fetch(`${API_BASE}/companies`);
        const companies = await res.json();
        const list = document.getElementById('companiesList');
        list.innerHTML = companies.map(c => `
            <div class="card">
                <h3>${c.name}</h3>
                <p>${c.description}</p>
                <p><small>ID: ${c.id}</small></p>
            </div>
        `).join('');
    } catch (e) {
        console.error("Error fetching companies", e);
    }
}

async function fetchJobs() {
    try {
        const res = await fetch(`${API_BASE}/jobs`);
        const jobs = await res.json();
        const list = document.getElementById('jobsList');
        list.innerHTML = jobs.map(j => `
            <div class="card">
                <h3>${j.title}</h3>
                <p>${j.description}</p>
                <p><strong>Required CGPA:</strong> ${j.requiredCgpa}</p>
                <button class="btn-primary" style="margin-top: 10px; width: 100%;" onclick="applyForJob('${j.id}')">Apply</button>
            </div>
        `).join('');
    } catch (e) {
        console.error("Error fetching jobs", e);
    }
}

// Submitters
async function submitStudent(e) {
    e.preventDefault();
    const student = {
        name: document.getElementById('sName').value,
        email: document.getElementById('sEmail').value,
        degree: document.getElementById('sDegree').value,
        cgpa: parseFloat(document.getElementById('sCgpa').value),
        skills: document.getElementById('sSkills').value
    };
    
    await fetch(`${API_BASE}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
    });
    toggleModal('studentModal');
    document.getElementById('studentForm').reset();
    fetchStudents();
}

async function submitCompany(e) {
    e.preventDefault();
    const company = {
        name: document.getElementById('cName').value,
        description: document.getElementById('cDesc').value
    };
    
    await fetch(`${API_BASE}/companies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(company)
    });
    toggleModal('companyModal');
    document.getElementById('companyForm').reset();
    fetchCompanies();
}

async function submitJob(e) {
    e.preventDefault();
    const job = {
        companyId: document.getElementById('jCompanyId').value,
        title: document.getElementById('jTitle').value,
        description: document.getElementById('jDesc').value,
        requiredCgpa: parseFloat(document.getElementById('jCgpa').value)
    };
    
    await fetch(`${API_BASE}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job)
    });
    toggleModal('jobModal');
    document.getElementById('jobForm').reset();
    fetchJobs();
}

async function applyForJob(jobId) {
    const studentId = prompt("Enter your Student ID to apply:");
    if(!studentId) return;
    
    const application = {
        jobId: jobId,
        studentId: studentId
    };
    
    try {
        await fetch(`${API_BASE}/applications`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(application)
        });
        alert("Applied successfully!");
    } catch (e) {
        alert("Error applying.");
    }
}

// Initial fetch
window.onload = fetchStudents;
