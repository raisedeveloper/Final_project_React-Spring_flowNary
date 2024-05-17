const fs = require('fs');
const propsReader = require('properties-reader');
const { initializeApp } = require("firebase/app");
const { getAuth } = require('firebase/auth');
const { getDatabase, ref, set } = require("firebase/database");
const { v4 } = require('uuid');

const props = propsReader('../../../../.env.local');
const firebaseConfig = {
  apiKey: props.get('REACT_APP_FIREBASE_API_KEY'),
  authDomain: props.get('REACT_APP_FIREBASE_AUTH_DOMAIN'),
  projectId: props.get('REACT_APP_FIREBASE_PROJECT_ID'),
  databaseURL: props.get('REACT_APP_FIREBASE_DATABASE_URL'),
};

const csv = fs.readFileSync('anniv.csv', 'utf-8');
const rows = csv.split('\r\n');

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

async function insertAnniv(anniv) {
  const id = v4();
  const { email, aname, adate, isHoliday } = anniv;
  return set(ref(database, `anniversary/${id}`), {
    id, email, aname, adate, isHoliday
  });
}

rows.forEach(async (row, idx) => {
  const data = row.split(',');
  const anniv = {email:'admin@human.com', aname:data[2], adate:data[3],
      isHoliday: data[4] == '1' ? true : false}
  await insertAnniv(anniv);
  if (idx % 10 === 0) 
    console.log(idx);
});
