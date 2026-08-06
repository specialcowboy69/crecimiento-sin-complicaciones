import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getDataConnect } from "firebase-admin/data-connect";

const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
const projectId = process.env.FIREBASE_PROJECT_ID ?? "crecimiento-sin-complicaciones";

function initFirebaseAdmin() {
  if (getApps().length > 0) {
    return;
  }

  if (serviceAccountJson) {
    const serviceAccount = JSON.parse(serviceAccountJson.replace(/\\n/g, "\n"));
    initializeApp({ credential: cert(serviceAccount), projectId });
    return;
  }

  initializeApp({ projectId });
}

export function getLeadsDataConnect() {
  initFirebaseAdmin();

  return getDataConnect({
    location: process.env.FIREBASE_DATA_CONNECT_LOCATION ?? "europe-west1",
    serviceId: process.env.FIREBASE_DATA_CONNECT_SERVICE_ID ?? "leads",
    connector: process.env.FIREBASE_DATA_CONNECT_CONNECTOR_ID ?? "leads",
  });
}
