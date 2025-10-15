/*
================================================================================
                    STUDENT REST API - SHËNIME TË DETAJUARA
================================================================================

KY ËSHTË NJË REST API për menaxhimin e studentëve që përdor:
- Express.js për serverin web
- File System për ruajtjen e të dhënave në skedarë JSON
- CORS për lejimin e kërkesave nga domene të ndryshme

KONCEPTET KRYESORE:

1. REQUEST (Kërkesa) - të dhënat që vijnë nga klienti:
   - request.params - parametrat në URL (p.sh. :id në /students/:id)
   - request.query - parametrat pas ? në URL (p.sh. ?name=John&age=25)
   - request.body - të dhënat e dërguara në kërkesë (zakonisht JSON)
   - request.headers - informacionet e header-it të kërkesës

2. RESPONSE (Përgjigja) - të dhënat që dërgojmë përsëri te klienti:
   - response.json() - dërgon të dhëna si JSON
   - response.status() - vendos kodin e statusit HTTP
   - response.send() - dërgon tekst ose HTML

3. STATUS KODET HTTP:
   - 200 OK - sukses
   - 201 Created - i krijuar me sukses
   - 204 No Content - fshirë me sukses
   - 400 Bad Request - kërkesë e gabuar
   - 404 Not Found - nuk u gjet
   - 500 Internal Server Error - gabim i serverit

4. METODAT HTTP:
   - GET - për të lexuar të dhëna
   - POST - për të krijuar të dhëna të reja
   - PUT - për të përditësuar plotësisht
   - PATCH - për të përditësuar pjesërisht
   - DELETE - për të fshirë të dhëna

================================================================================
*/

// Importimi i librarive të nevojshme
import express from "express"; // Express.js është një framework për Node.js që na ndihmon të krijojmë serverë web dhe API
import fs from "fs"; // File System - libraria për të lexuar dhe shkruar skedarë në sistemin e skedarëve
import cors from "cors"; // Cross-Origin Resource Sharing - na lejon të bëjmë kërkesa nga domene të ndryshme

// Krijimi i aplikacionit Express
const app = express();

// Konfigurimi i middleware-it (shtresa ndërmjetëse që përpunojnë të dhënat para se të arrijnë në endpoint-et)
app.use(express.json()); // Middleware që përpunon të dhënat JSON që vijnë në kërkesa
// CORS middleware - lejon kërkesa nga çdo domen (në production duhet të specifikohen domene specifike)
app.use(cors("*"));

// METODAT HTTP (HyperText Transfer Protocol):
// GET - për të marrë/lexuar të dhëna nga serveri
// POST - për të krijuar të dhëna të reja në server
// PUT - për të përditësuar plotësisht një burim ekzistues
// PATCH - për të përditësuar pjesërisht një burim ekzistues
// DELETE - për të fshirë të dhëna nga serveri

// FUNKSIONET NDIHMËSE për menaxhimin e të dhënave:

// Funksioni për të lexuar të dhënat nga skedari data.json
const readData = () => {
  const data = fs.readFileSync("data.json", "utf8"); // Lexon skedarin si tekst
  return JSON.parse(data); // Konverton tekstin JSON në objekt JavaScript
};

// Funksioni për të shkruar të dhënat në skedarin data.json
const writeData = (data) => {
  try {
    // JSON.stringify konverton objektin JavaScript në tekst JSON
    // Parametri i dytë (null) dhe i tretë (2) formaton JSON-in me hapësira për lehtësi leximi
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    return true; // Kthen true nëse shkrimi ishte i suksesshëm
  } catch (error) {
    console.log("Error writting data", error); // Logon gabimin nëse ndodh
    return false; // Kthen false nëse ka gabim
  }
};

// ENDPOINT KRYESOR - faqja kryesore e API-së
// GET / - kthen informacionin për API-në dhe endpoint-et e disponueshme
app.get("/", (request, response) => {
  // request - objekti që përmban të dhënat e kërkesës (headers, body, params, query, etj.)
  // response - objekti që përdorim për të dërguar përgjigjen përsëri te klienti
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

// ENDPOINT për të marrë të gjithë studentët
// GET /students - kthen listën e të gjithë studentëve nga skedari data.json
app.get("/students", (request, response) => {
  const data = readData(); // Lexon të dhënat nga skedari
  response.json(data); // Dërgon të dhënat si JSON përsëri te klienti
});

// ENDPOINT për të marrë një student specifik sipas ID-së
// GET /students/:id - kthen një student specifik bazuar në ID-në e dhënë në URL
app.get("/students/:id", (request, response) => {
  const data = readData(); // Lexon të dhënat nga skedari

  // request.params.id - merr ID-në nga URL-ja (p.sh. /students/5 -> id = "5")
  // parseInt() konverton stringun në numër
  const studentID = parseInt(request.params.id);
  console.log(typeof studentID, "studentID"); // Log për debug
  console.log(data, "ertert"); // Log për debug

  // Gjen studentin me ID-në e dhënë në array-in e studentëve
  const student = data.students.find((student) => student.id === studentID);

  // Nëse studenti nuk gjendet, kthen gabim 404 (Not Found)
  if (!student) {
    return response.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  // Nëse studenti gjendet, kthen të dhënat e tij me status 200 (OK)
  response.status(200).json({
    success: true,
    data: student,
  });
});

// ENDPOINT për të krijuar një student të ri
// POST /students - krijon një student të ri me të dhënat e dërguara në body
app.post("/students", (request, response) => {
  // SHËNIM për pjesët e një kërkese HTTP:
  // Query - parametrat në URL pas ? (p.sh. ?name=John&age=25)
  // Params - parametrat në URL path (p.sh. :id në /students/:id)
  // Body - të dhënat e dërguara në kërkesë (zakonisht JSON)

  console.log(request.body); // Log për të parë çfarë të dhënash vijnë
  const name = request.body.name; // Merr emrin nga body
  const email = request.body.email; // Merr email-in nga body
  const age = request.body.age; // Merr moshën nga body
  const course = request.body.course; // Merr kursin nga body

  // VALIDIMI i të dhënave - kontrollon nëse të gjitha fushat e nevojshme janë të plotësuara
  if (!name || !email || !age || !course) {
    return response.status(400).json({
      // 400 = Bad Request (kërkesë e gabuar)
      success: false,
      message: "Please provide name, email, age and course",
    });
  }

  const data = readData(); // Lexon të dhënat ekzistuese

  // KONTROLLI për email të përsëritur - kontrollon nëse ekziston tashmë një student me këtë email
  const existingStudent = data.students.find(
    (student) => student.email === email
  );
  if (existingStudent) {
    return response.status(400).json({
      // 400 = Bad Request
      success: false,
      message: "Student with this email alreday exist",
    });
  }

  // GJENERIMI i ID-së së re - gjen ID-në më të madhe dhe shton 1 për ID-në e re
  const maxId = Math.max(...data.students.map((student) => student.id));
  const newStudent = {
    id: maxId + 1, // ID e re
    name: name,
    email: email,
    age: age,
    course: course,
  };

  data.students.push(newStudent); // Shton studentin e ri në array
  writeData(data); // Ruan të dhënat e përditësuara në skedar

  // KONTROLLI i suksesit të ruajtjes
  if (writeData(data)) {
    response.status(201).json({
      // 201 = Created (i krijuar me sukses)
      success: true,
      message: "Student created successfully",
      data: newStudent,
    });
  } else {
    response.status(500).json({
      // 500 = Internal Server Error (gabim i serverit)
      success: false,
      message: "Erro deleting data",
    });
  }
});

// ENDPOINT për të përditësuar një student ekzistues
// PUT /students/:studentId - përditëson të dhënat e një studenti bazuar në ID-në e dhënë
app.put("/students/:studentId", (req, res) => {
  const data = readData(); // Lexon të dhënat ekzistuese
  const studentID = parseInt(req.params.studentId); // Merr ID-në nga URL dhe e konverton në numër

  // Merr të dhënat e reja nga body (mund të jenë të pjesshme)
  const name = req.body.name;
  const email = req.body.email;
  const age = req.body.age;
  const course = req.body.course;

  // ALTERNATIVË: const { name, email, age, course } = req.body; (destructuring)

  // Gjen indeksin e studentit në array bazuar në ID
  const studentIndex = data.students.findIndex(
    (student) => student.id === studentID
  );

  // Nëse studenti nuk gjendet (findIndex kthen -1)
  if (studentIndex === -1) {
    return res.status(404).json({
      // 404 = Not Found
      success: false,
      message: "Student not found",
    });
  }

  // PËRDITËSIMI i vetëm atyre fushave që janë të dhëna (jo të zbrazëta)
  if (name) {
    data.students[studentIndex].name = name;
  }
  if (email) {
    data.students[studentIndex].email = email;
  }
  if (age) {
    data.students[studentIndex].age = age;
  }
  if (course) {
    data.students[studentIndex].course = course;
  }

  // Ruan të dhënat e përditësuara
  if (writeData(data)) {
    res.status(201).json({
      // 201 = Created (përditësuar me sukses)
      success: true,
      message: "Student updated successfully",
      data: data.students[studentIndex], // Kthen të dhënat e përditësuara
    });
  } else {
    res.status(500).json({
      // 500 = Internal Server Error
      success: false,
      message: "Erro deleting data",
    });
  }
});

// ENDPOINT për të fshirë një student
// DELETE /students/:studentId - fshin një student bazuar në ID-në e dhënë
app.delete("/students/:studentId", (req, res) => {
  const data = readData(); // Lexon të dhënat ekzistuese
  const studentID = parseInt(req.params.studentId); // Merr ID-në nga URL dhe e konverton në numër

  // Gjen indeksin e studentit në array bazuar në ID
  const studentIndex = data.students.findIndex(
    (student) => student.id === studentID
  );

  // Nëse studenti nuk gjendet (findIndex kthen -1)
  if (studentIndex === -1) {
    return res.status(404).json({
      // 404 = Not Found
      success: false,
      message: "Student not found",
    });
  }

  // FSHIRJA e studentit nga array duke përdorur splice()
  // splice(studentIndex, 1) fshin 1 element nga pozicioni studentIndex
  data.students.splice(studentIndex, 1);

  // Ruan të dhënat e përditësuara (pa studentin e fshirë)
  if (writeData(data)) {
    res.status(204).json({
      // 204 = No Content (fshirë me sukses, pa përmbajtje)
      success: true,
      message: "Student deleted successfully",
      data: data.students[studentIndex], // Kjo do të jetë undefined pasi studenti është fshirë
    });
  } else {
    res.status(500).json({
      // 500 = Internal Server Error
      success: false,
      message: "Erro deleting student",
    });
  }
});

// NISJA e serverit
const PORT = 3000; // Porti ku do të dëgjojë serveri
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Mesazhi që shfaqet kur serveri fillon
});

/*
================================================================================
                            SHËNIME SHTESË
================================================================================

SHEMBUJ TË PËRDORIMIT TË API-SË:

1. GET të gjithë studentët:
   GET http://localhost:3000/students

2. GET një student specifik:
   GET http://localhost:3000/students/1

3. POST (krijo) një student të ri:
   POST http://localhost:3000/students
   Body (JSON): {
     "name": "John Doe",
     "email": "john@example.com",
     "age": 25,
     "course": "Computer Science"
   }

4. PUT (përditëso) një student:
   PUT http://localhost:3000/students/1
   Body (JSON): {
     "name": "John Smith",
     "age": 26
   }

5. DELETE një student:
   DELETE http://localhost:3000/students/1

NDRYSHIMI MIDIS PUT DHE PATCH:
- PUT: përditëson plotësisht objektin (duhet të dërgohen të gjitha fushat)
- PATCH: përditëson vetëm fushat e specifikuara (mund të dërgohen vetëm fushat që duhen ndryshuar)

MIDDLEWARE:
- Middleware janë funksione që ekzekutohen para se të arrijnë në endpoint-et
- app.use() përdoret për të regjistruar middleware
- express.json() përpunon të dhënat JSON nga kërkesat
- cors() lejon kërkesa nga domene të ndryshme

ERROR HANDLING:
- Gjithmonë kontrolloni nëse të dhënat ekzistojnë para se t'i përdorni
- Përdorni status kode të përshtatshme për situata të ndryshme
- Logoni gabimet për debug

================================================================================
*/
