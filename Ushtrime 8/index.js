import express from "express";
import fs from "fs";
import { request } from "http";
const app = express();

// Middleware
app.use(express.json());
app.use(express.static("."));

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// GET
// POST
// PUT
// PATCH
// DELETE

app.get("/", (request, response) => {
  response.json({
    message: "Welcome to Student REST API",
    endpoints: {
      "GET /students": "Get All Students",
      "GET /students/:id": "Get Student by ID",
      "POST /students": "Create new student",
      "PUT /students/:id": "Update student by id",
      "DELETE /students/:id": "Deleter student by id",
    },
  });
});

app.get("/students", (request, response) => {
  const data = fs.readFileSync("data.json", "utf8");
  response.json(JSON.parse(data));
});

app.get("/students/:id", (request, response) => {
  const data = fs.readFileSync("data.json", "utf8");
  const dataParse = JSON.parse(data);
  const studentID = parseInt(request.params.id);
  console.log(typeof studentID, "studentID");
  console.log(dataParse, "ertert");

  const student = dataParse.students.find(
    (student) => student.id === studentID
  );
  if (!student) {
    return response.status(404).json({
      success: false,
      message: "Student not found",
    });
  }
  response.status(200).json({
    success: true,
    data: student,
  });
});

app.post("/students", (request, response) => {
  // Query
  // Params
  // Body
  console.log(request.body);
  const name = request.body.name;
  const email = request.body.email;
  const age = request.body.age;
  const course = request.body.course;

  if (!name || !email || !age || !course) {
    return response.status(400).json({
      success: false,
      message: "Please provide name, email, age and course",
    });
  }
  const data = fs.readFileSync("data.json", "utf8");
  const dataParse = JSON.parse(data);

  const existingStudent = dataParse.students.find(
    (student) => student.email === email
  );
  if (existingStudent) {
    return response.status(400).json({
      success: false,
      message: "Student with this email alreday exist",
    });
  }

  const maxId = Math.max(...dataParse.students.map((student) => student.id));
  const newStudent = {
    id: maxId + 1,
    name: name,
    email: email,
    age: age,
    course: course,
  };
  dataParse.students.push(newStudent);
  fs.writeFileSync("data.json", JSON.stringify(dataParse, null, 2));
  response.status(201).json({
    success: true,
    message: "Student created successfully",
    data: newStudent,
  });
});

// start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
