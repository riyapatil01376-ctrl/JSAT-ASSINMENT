const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const { companies, students } = require('./data');

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: {
    eq: (left, right) => left === right,
    statusClass: (status) => status.toLowerCase()
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
  response.render('home', {
    title: 'Placement Home',
    companyCount: companies.length,
    studentCount: students.length,
    jobCount: companies.reduce((total, company) => total + company.jobs.length, 0)
  });
});

app.get('/companies', (request, response) => {
  response.render('companies', { title: 'Companies', companies });
});

app.get('/company/:id', (request, response) => {
  const company = companies.find((item) => item.id === request.params.id);
  if (!company) return response.status(404).render('404', { title: 'Company Not Found', message: 'That company was not found.' });
  response.render('company', { title: company.name, company });
});

app.get('/students', (request, response) => {
  response.render('students', { title: 'Students', students });
});

app.get('/student/:id', (request, response) => {
  const student = students.find((item) => item.id === request.params.id);
  if (!student) return response.status(404).render('404', { title: 'Student Not Found', message: 'That student was not found.' });
  response.render('student', { title: student.name, student });
});

app.get('/jobs/:company', (request, response) => {
  const company = companies.find((item) => item.slug === request.params.company.toLowerCase());
  if (!company) return response.status(404).render('404', { title: 'Jobs Not Found', message: 'No jobs were found for that company.' });
  response.render('jobs', { title: `Jobs at ${company.name}`, company });
});

app.use((request, response) => {
  response.status(404).render('404', { title: 'Page Not Found', message: 'The page you requested does not exist.' });
});

app.listen(PORT, () => {
  console.log(`Express application running at http://localhost:${PORT}`);
});
