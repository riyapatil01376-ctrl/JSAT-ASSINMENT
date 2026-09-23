const companies = [
  {
    id: '1',
    slug: 'infosys',
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
    slug: 'tcs',
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
    slug: 'deloitte',
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

module.exports = { companies, students };
