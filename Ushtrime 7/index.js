import express from "express";
import fs from "fs";
import { request } from "http";
const app = express();

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

// start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
