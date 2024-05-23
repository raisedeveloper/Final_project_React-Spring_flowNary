import { initializeApp } from "firebase/app";
import {
  getAuth, signOut, signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// eslint-disable-next-line
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function login({ email, password }) {
  signInWithEmailAndPassword(auth, email, password)
    .catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

// export function register({ email, password }) {
//   console.log('firebase:register():', email, password);
//   createUserWithEmailAndPassword(auth, email, password)
//     .then(() => {logout()})
//     .catch(console.error);
// }

// export function onUserStateChanged(callback) {
//   onAuthStateChanged(auth, (user) => {
//     callback(user);
//   });
// }
/*========================= anniversary =========================*/

export async function getAnnivList(adate, email) {
  return get(ref(database, 'anniversary'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        let records = Object.values(objects);
        records = records.filter(record => record.adate === adate &&
          (record.email === 'admin@human.com' || record.email === email)
        );
        return records;
      }
      return null;
    });
}

export async function insertAnniv(anniv) {
  const id = uuid();
  const { email, aname, adate, isHoliday } = anniv;
  return set(ref(database, `anniversary/${id}`), {
    id, email, aname, adate, isHoliday
  });
}

export async function updateAnniv(anniv) {
  const { id } = anniv;
  return set(ref(database, `anniversary/${id}`), anniv);
}

export async function deleteAnniv(id) {
  return remove(ref(database, `anniversary/${id}`));
}

/*========================= schedule =========================*/

export async function getSchedList(sdate, email) {
  return get(ref(database, 'schedule'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        let records = Object.values(objects);
        records = records
          .filter(record => record.sdate === sdate && record.email === email)
          .sort((a, b) => a.startTime.localeCompare(b.startTime));
        return records;
      }
      return null;
    });
}

export async function insertSched(sched) {
  const id = uuid();
  return set(ref(database, `schedule/${id}`), {
    id, ...sched
  });
}

export async function updateSched(sched) {
  const { id } = sched;
  return set(ref(database, `schedule/${id}`), sched);
}

export async function deleteSched(id) {
  return remove(ref(database, `schedule/${id}`));
}