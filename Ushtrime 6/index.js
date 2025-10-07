// 💻 Çka ben ky kod?

// Ky kod eshte si nje kamarier qe punon ne nje restorant me emrin Express 🍽️.
// Ja si ndodh historia hap pas hapi 👇

// 🧑‍🍳 1. “import express from 'express';”
// Ky rresht eshte si kur therret kamarierin Express dhe i thua:
// “Hej, hajde ketu, kam nevoje per ty me sherby klientet!”
import express from "express";

// 🚪 2. “const app = express();”
// Tani qe kamarieri ka ardhur, e hapim restorantin.
// Ne kete rast, app eshte vete restoranti Express – gati per te pranuar kliente (dmth. kerkesa HTTP).
const app = express();

// 🛎️ 3. “app.get('/', (request, response) => {...})”
// Ky eshte si t’i thuash kamarierit:
// “Sa here dikush hyn nga dera kryesore ("/"), pyete si e ka emrin dhe thuaji mireseerdhe!”
// Pra çdo vizitor qe vjen ne http://localhost:3000/ – kamarieri e degjon, e sheh se çfare kerkon (request.query), dhe pergjigjet me nje “menu JSON” 🍱.
app.get("/", (request, response) => {
  //  me request (kerkesa qe marrim) dhe response (pergjigja qe japim)
  //  🧠 4. “console.log(request.query);”
  // Ky rresht eshte si kamarieri qe shkruan porosine e klientit ne bllokun e shenimeve 📝
  // (pra printon ne terminal se çfare ka kerkuar klienti, per shembull ?name=Ardi).
  console.log(request.query);

  // 🗣️ 5. “const name = request.query.name;”
  // Ketu kamarieri e lexon emrin e klientit nga porosia.
  // Nese klienti ka thene “?name=Ardi”, kamarieri e di qe quhesh Ardi 👋
  const name = request.query.name;

  //  🍽️ 6. “res.json({ name: name });”
  // Kamarieri pastaj kthen pergjigjen ne forme JSON, qe eshte si nje “menu moderne digjitale” 📱
  // Ku ai i thote klientit:
  // “Mire se erdhe, Ardi!”
  // Pra ne response.json japim pergjigjen e klientit
  response.json({ pergjigja: `Mire se erdhe, ${name}!` });
});

// 🚀 7. “app.listen(3000, ...)”
// Ky eshte momenti kur restoranti hap dyert per klientet.
// Ne terminal del mesazhi:
// Server is running on http://localhost:3000

// Pra tani, kushdo qe shkon ne kete adrese eshte si nje klient qe hyn ne restorant dhe mund te flase me kamarierin Express. 😄

// 🎭 Shembull ne jeten reale

// Imagjino qe ke nje kioske te vogel ne rruge qe shet kafe ☕
// Kur dikush afrohet dhe thote: “Dua nje kafe per Ardin.”
// Ti (si Express serveri) shikon porosine (request.query.name = "Ardi")
// Dhe i pergjigjesh: “Ok Ardi, kafeja po vjen!” (response.json({ name: "Ardi" }))
// Nese askush s’thote emer, ti s’di kujt t’i japesh kafene 😂

// 💡 Ne permbledhje:
// Ky kod eshte nje server miniature qe degjon kerkesat, i kupton parametrat qe i dergohen, dhe kthen nje pergjigje — ashtu si nje kamarier i sjellshem qe di te lexoje porosite digjitale te klienteve! 🧑‍💻☕

// Ky eshte kodi i plote qe kemi shkuar me lart
// import express from "express";
// const app = express();
// app.get("/", (request, response) => {
//   console.log(request.query);
//   const name = request.query.name;
//   response.json({ name: name });
// });
// app.listen(3000, () => {
//   console.log(`Server is running on http://localhost:3000`);
// });
