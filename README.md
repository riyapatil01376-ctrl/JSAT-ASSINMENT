# College Placement Management System

This assignment contains two separate applications for the same case study.

## Folder structure

- `http-app`: uses only Node.js built-in `http` module. It does not use Express or Handlebars.
- `express-app`: uses Express.js and Handlebars (`.hbs`) templates.

## Requirements

Install Node.js from https://nodejs.org/ if it is not already installed. Check it with:

```bash
node --version
npm --version
```

## Run Implementation A: Node HTTP module

Open a terminal in `http-app`:

```bash
cd http-app
node server.js
```

Open http://localhost:3002. Stop the server with `Ctrl + C`.

If port 3002 is already in use, run `$env:PORT=3004; node server.js` and open http://localhost:3004.

## Run Implementation B: Express.js

Open a second terminal in `express-app`:

```bash
cd express-app
npm install
npm start
```

Open http://localhost:3001. Stop the server with `Ctrl + C`.

If port 3001 is already in use, run ` $env:PORT=3003; npm start ` and open http://localhost:3003.

The applications use different ports so they can be run at the same time.

## Routes in both applications

- `/` - placement home
- `/companies` - participating companies
- `/company/:id` - company details and openings
- `/students` - registered students
- `/student/:id` - student placement details
- `/jobs/:company` - jobs offered by one company

Try examples such as `/company/1`, `/student/101`, and `/jobs/infosys`.

## HTTP status codes demonstrated

- `200 OK`: a page was found and rendered
- `404 Not Found`: an unknown route, company, student, or job company
- `405 Method Not Allowed`: a method other than GET
- `500 Internal Server Error`: unexpected server error

## Short comparison

| Area | Node.js HTTP module | Express.js |
| --- | --- | --- |
| Routing | Manually inspect method and URL | Declarative `app.get()` routes and parameters |
| Code complexity | More code for headers, status codes, and HTML | Less repetitive code and clearer route handlers |
| Maintainability | Fine for small learning projects, but grows quickly | Middleware, routers, and templates make larger apps easier to organize |
| Scalability | Possible, but common features must be built manually | Strong ecosystem for middleware, validation, authentication, and APIs |

The native implementation is useful for learning what a web server does. Express is more practical for maintainable applications, while still using normal HTTP concepts underneath.
