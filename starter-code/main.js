const MongoDB = require('mongodb');
const mongoClient = MongoDB.MongoClient;
const clear = require('clear');
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

mongoClient.connect(`mongodb://localhost:27017/crunchbase`, (error, db) => {

  if (error) { console.log('Error trying to connect to the Database:', error) } else {
    console.log('Connection established correctly!! 😬');

    function mainMenu() {
      clear();
      printMenu();

      rl.question('Type an option: ', (option) => {
        switch (option) {
          case "1":
            // 1.- List by name all companies.
            db.collection('companies').find({}, { name: 1, _id: 0 }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
            break;

          case "2":
            // 2.- How many companies are there?
            db.collection('companies').find({}, { name: 1, _id: 0 }).count((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
            break;

          case "3":
            // 3.- How many companies were founded in 2004?
            db.collection('companies').find({ founded_year: 2004, founded_month: 2 }, { name: 1, _id: 0 }).count((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
            break;

          case "4":
            // 4.- Enumere por nombre todas las empresas fundadas en febrero de 2004.
            db.collection('companies').find({ "funding_rounds.funded_year": 2004, "funding_rounds.funded_year": 2004 }, { name: 1, _id: 0 }).count((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
            break;


          case "5":
            // 5.- Enumere por nombre todas las empresas fundadas en el verano de 2004 (abril a junio) ordenadas por fecha.

            db.collection('companies').find({ $and: [{ founded_year: 2004 }, { "founded_month": { $gt: 4 } }, { "founded_month": { $lt: 6 } }] }, { name: 1, _id: 0 }).count((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
            break;

          case "6":

            // 6.- Qué empresas tienen oficinas en "Barcelona".

            db.collection('companies').find({ "offices.city": 'Barcelona' }, { name: 1, _id: 0 }).count((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
            break;

          case "7":

            // 7.- Enumere las 10 empresas con más empleados ordenados de forma ascendente (mostrar nombre y empleados

            db.collection("companies").find({ "number_of_employees": { $gte: 1 } }, { name: 1, number_of_employees: 1, _id: 0 }).sort({ number_of_employees: -1 }).limit(10).toArray((error, result) => {
              if (error) {
                console.log(error)
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() })
              } else {
                console.log(result.reverse())
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() })
              }
            })
            break;

          case "8":

            // 8.- Busque la empresa con el nombre "Facebook".

            db.collection('companies').find({ name: "Facebook" }).count((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
            break;

          case "9":

            // 9.- ¿Cuántos empleados tiene Facebook?.

            db.collection('companies').find({ name: "Facebook" }, { number_of_employees: 1, _id: 0 }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
            break;

          case "10":

            // 10.- Lista el nombre de todos los productos de Facebook.

            db.collection('companies').find({ name: "Facebook" }, { "products.name": 1, _id: 0 }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(...result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
            break;

          case "11":

            // 11.- Enumere las personas que están trabajando en Facebook en este momento (marque el campo de relaciones).

            db.collection('companies').find({ $and: [{ name: "Facebook" }, { "relationships.is_past": false }] }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result[0].relationships);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
            break;

          case "12":

            // 12.- Enumere todas las empresas en las que ha trabajado "david-ebersman".

            db.collection('companies').find({ "relationships.person.permalink": "david-ebersman" }, { name: 1, _id: 0 }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(...result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
            break;


          case "13":

            // 13.- Enumerar por nombre las competidoras de Facebook.

            db.collection('companies').find({ name: "Facebook" }, { "competitions.competitor.name": 1 }, { name: 1, _id: 0 }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result[0].competitions);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
            break;

          case "14":

            //14.-Nombres de las empresas que tienen "redes sociales" en la lista de etiquetas(tenga en cuenta que el valor del campo es una cadena de verificación de operadores de expresiones regulares)

            db.collection('companies').find({ tag_list: { $regex: /social-networking/ } }, { name: 1, _id: 0 }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
            break;

          case "15":

            //15.-Nombres de las empresas que tienen "redes sociales" en la lista de etiquetas(tenga en cuenta que el valor del campo es una cadena de verificación de operadores de expresiones regulares)

            db.collection('companies').find({ $and: [{ founded_year: { $gte: 2002 } }, { founded_year: { $lte: 2016 } }, { tag_list: { $regex: /social-network/ } }] }, { name: 1, _id: 0 }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
            break;

          case "16":

            db.collection('companies').find({ "offices.city": { $regex: /London/ } }, { name: 1, _id: 0, "offices.city": 1 }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
            break;

          case "17":

            db.collection('companies').find({ $and: [{ founded_year: { $gte: 2002 } }, { founded_year: { $lte: 2016 } }, { tag_list: { $regex: /social-network/ } }, { "offices.city": { $regex: /New York/ } }] }).count((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
            break;





        }
      });
    }

    mainMenu()
  }
});



function printMenu() {
  console.log(`
    0.- Exit
    1.- List by name all companies.
    2.- How many companies are there?
    3.- How many companies were founded in 2004?
    4.- List by name all companies founded in february of 2004.
    5.- List by name all companies founded in the summer of 2004 (april to june) sorted by date.
    6.- What companies have offices in "Barcelona".
    7.- List the 10 companies with more employees sorted ascending (show name and employees).
    8.- Find the company with the name "Facebook"
    9.- How many employees has Facebook?
    10.- List the name of all the products of Facebook
    11.- List the people that are working at Facebook right now (check relationships field)
    12.- List all the companies where "david-ebersman" has worked.
    13.- List by name the competitors of Facebook
    14.- Names of the companies that has "social-networking" in tag-list (be aware that the value of field is a string check regex operators)
    15.- How many companies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive
    16.- Names and locations of companies that have offices in London
    17.- How many companies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive and has offices in New York
    `
  );
}
