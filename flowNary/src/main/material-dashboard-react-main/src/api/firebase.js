import { getApps, initializeApp } from "firebase/app";
import {
  getAuth, signOut, signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, get, set, remove } from "firebase/database"; // 추가된 부분

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SEMDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Firebase 앱 초기화 (이미 초기화된 경우 재사용)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const database = getDatabase(app); // 추가된 부분

export function login({ email, password }) {
  signInWithEmailAndPassword(auth, email, password)
    .catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

// Anniversary 관련 함수들 (추가된 부분)
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

// Schedule 관련 함수들 (추가된 부분)
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
