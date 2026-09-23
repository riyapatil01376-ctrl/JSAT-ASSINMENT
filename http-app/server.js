const http = require('http');
const { URL } = require('url');

const PORT = Number(process.env.PORT) || 3002;

const companies = [
  {
    id: '1',
    name: 'Infosys',
    location: 'Pune',
    industry: 'Information Technology',
    package: '6.5 LPA',
    description: 'Infosys is hiring graduates for software development and testing roles.',
    jobs: [
      { title: 'Graduate Engineer Trainee', type: 'Full-time', openings: 12 },
      { title: 'QA Analyst', type: 'Full-time', openings: 5 }
    ]
  },
  {
    id: '2',
    name: 'Tata Consultancy Services',
    location: 'Mumbai',
    industry: 'Information Technology',
    package: '7.2 LPA',
    description: 'TCS offers technology careers in development, cloud, and business solutions.',
    jobs: [
      { title: 'Assistant System Engineer', type: 'Full-time', openings: 20 },
      { title: 'Cloud Support Associate', type: 'Full-time', openings: 8 }
    ]
  },
  {
    id: '3',
    name: 'Deloitte',
    location: 'Bengaluru',
    industry: 'Consulting',
    package: '8.0 LPA',
    description: 'Deloitte is looking for analytical graduates to join consulting teams.',
    jobs: [
      { title: 'Business Technology Analyst', type: 'Full-time', openings: 6 },
      { title: 'Risk Advisory Intern', type: 'Internship', openings: 4 }
    ]
  }
];

const students = [
  { id: '101', name: 'Aarav Sharma', course: 'B.Sc. Computer Science', year: 'Final Year', status: 'Placed', company: 'Infosys', job: 'Graduate Engineer Trainee', package: '6.5 LPA' },
  { id: '102', name: 'Meera Patil', course: 'BCA', year: 'Final Year', status: 'Shortlisted', company: 'Deloitte', job: 'Business Technology Analyst', package: '8.0 LPA' },
  { id: '103', name: 'Rohan Kulkarni', course: 'B.Tech. Information Technology', year: 'Final Year', status: 'Registered', company: 'Not selected yet', job: 'Awaiting interview', package: 'To be decided' }
];

function layout(title, content) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} | Campus Careers</title>
</head>
<body>
  <header class="site-header"><div class="container nav"><a class="brand" href="/">Campus Careers</a><nav><a href="/companies">Companies</a><a href="/students">Students</a></nav></div></header>
  <main class="container">${content}</main>
  <footer class="site-footer"><div class="container">College Placement Management System &middot; Node HTTP implementation</div></footer>
</body>
</html>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}

function pageHeading(eyebrow, title, description) {
  return `<section class="page-heading"><p class="eyebrow">${escapeHtml(eyebrow)}</p><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p></section>`;
}

function homePage() {
  return layout('Placement Home', `${pageHeading('PLACEMENT DESK', 'Launch your career from campus.', 'Explore trusted employers, open roles, and the latest placement progress in one place.')}
    <section class="stats"><div><strong>${companies.length}</strong><span>Participating companies</span></div><div><strong>${students.length}</strong><span>Registered students</span></div><div><strong>${companies.reduce((total, company) => total + company.jobs.length, 0)}</strong><span>Job categories</span></div></section>
    <section class="split"><div><p class="eyebrow">QUICK ACCESS</p><h2>Everything needed for placement season.</h2><p>Browse opportunities or check a student&apos;s current placement stage.</p></div><div class="action-list"><a href="/companies">View companies <span>&rarr;</span></a><a href="/students">View students <span>&rarr;</span></a></div></section>`);
}

function companiesPage() {
  const cards = companies.map((company) => `<article class="card"><div class="card-top"><span class="tag">${escapeHtml(company.industry)}</span><span>${escapeHtml(company.location)}</span></div><h2>${escapeHtml(company.name)}</h2><p>${escapeHtml(company.description)}</p><div class="card-meta"><strong>${escapeHtml(company.package)}</strong><span>average package</span></div><a class="text-link" href="/company/${encodeURIComponent(company.id)}">View company &rarr;</a></article>`).join('');
  return layout('Companies', `${pageHeading('EMPLOYER DIRECTORY', 'Participating companies', 'Compare employers and discover the roles they are bringing to campus.')}
    <section class="grid">${cards}</section>`);
}

function companyPage(company) {
  const jobs = company.jobs.map((job) => `<li><div><strong>${escapeHtml(job.title)}</strong><span>${escapeHtml(job.type)}</span></div><b>${job.openings} openings</b></li>`).join('');
  return layout(company.name, `${pageHeading('COMPANY PROFILE', company.name, company.description)}
    <section class="detail-grid"><div class="detail-panel"><p class="eyebrow">ABOUT THE ROLE</p><h2>Build your first chapter here.</h2><p>Location: <strong>${escapeHtml(company.location)}</strong></p><p>Expected package: <strong>${escapeHtml(company.package)}</strong></p></div><div class="detail-panel"><p class="eyebrow">OPEN POSITIONS</p><ul class="job-list">${jobs}</ul></div></section>`);
}

function studentsPage() {
  const rows = students.map((student) => `<article class="student-row"><div class="avatar">${escapeHtml(student.name.charAt(0))}</div><div><h2>${escapeHtml(student.name)}</h2><p>${escapeHtml(student.course)} &middot; ${escapeHtml(student.year)}</p></div><span class="status ${student.status.toLowerCase()}">${escapeHtml(student.status)}</span><a class="text-link" href="/student/${encodeURIComponent(student.id)}">Details &rarr;</a></article>`).join('');
  return layout('Students', `${pageHeading('STUDENT REGISTER', 'Placement progress', 'A quick view of every registered student and their current status.')}
    <section class="student-list">${rows}</section>`);
}

function studentPage(student) {
  return layout(student.name, `${pageHeading('STUDENT PROFILE', student.name, `${student.course} &middot; ${student.year}`)}
    <section class="profile-card"><div class="avatar large">${escapeHtml(student.name.charAt(0))}</div><div><p class="eyebrow">PLACEMENT STATUS</p><span class="status ${student.status.toLowerCase()}">${escapeHtml(student.status)}</span><dl><dt>Company</dt><dd>${escapeHtml(student.company)}</dd><dt>Role</dt><dd>${escapeHtml(student.job)}</dd><dt>Package</dt><dd>${escapeHtml(student.package)}</dd></dl></div></section>`);
}

function jobsPage(companyName) {
  const company = companies.find((item) => item.name.toLowerCase() === companyName.toLowerCase());
  if (!company) return null;
  return layout(`Jobs at ${company.name}`, `${pageHeading('OPEN ROLES', `Jobs at ${company.name}`, 'Current opportunities available through the campus placement cell.')}
    <section class="detail-panel"><ul class="job-list">${company.jobs.map((job) => `<li><div><strong>${escapeHtml(job.title)}</strong><span>${escapeHtml(job.type)}</span></div><b>${job.openings} openings</b></li>`).join('')}</ul></section>`);
}

function sendHtml(response, statusCode, html) {
  response.writeHead(statusCode, { 'Content-Type': 'text/html; charset=utf-8' });
  response.end(html);
}

function sendNotFound(response, message = 'The page you requested does not exist.') {
  sendHtml(response, 404, layout('Not Found', `${pageHeading('404 ERROR', 'Page not found', message)}<a class="button" href="/">Return home</a>`));
}

function requestHandler(request, response) {
  if (request.method !== 'GET') {
    response.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8', Allow: 'GET' });
    response.end('Method Not Allowed. This application accepts GET requests only.');
    return;
  }

  const requestUrl = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(requestUrl.pathname);
  if (pathname === '/') return sendHtml(response, 200, homePage());
  if (pathname === '/companies') return sendHtml(response, 200, companiesPage());
  if (pathname === '/students') return sendHtml(response, 200, studentsPage());

  const companyMatch = pathname.match(/^\/company\/([^/]+)$/);
  if (companyMatch) {
    const company = companies.find((item) => item.id === companyMatch[1]);
    return company ? sendHtml(response, 200, companyPage(company)) : sendNotFound(response, 'That company was not found.');
  }

  const studentMatch = pathname.match(/^\/student\/([^/]+)$/);
  if (studentMatch) {
    const student = students.find((item) => item.id === studentMatch[1]);
    return student ? sendHtml(response, 200, studentPage(student)) : sendNotFound(response, 'That student was not found.');
  }

  const jobsMatch = pathname.match(/^\/jobs\/([^/]+)$/);
  if (jobsMatch) {
    const jobsPageHtml = jobsPage(jobsMatch[1]);
    return jobsPageHtml ? sendHtml(response, 200, jobsPageHtml) : sendNotFound(response, 'No jobs were found for that company.');
  }

  sendNotFound(response);
}

const server = http.createServer(requestHandler);

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try: $env:PORT=3004; node server.js`);
    return;
  }
  throw error;
});

server.listen(PORT, () => {
  console.log(`Native HTTP application running at http://localhost:${PORT}`);
});
