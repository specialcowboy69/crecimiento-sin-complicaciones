import { cert, getApps, initializeApp, type ServiceAccount } from "firebase-admin/app";
import { getDataConnect } from "firebase-admin/data-connect";

type FirebaseServiceAccountJson = {
  project_id?: string;
  projectId?: string;
  client_email?: string;
  clientEmail?: string;
  private_key?: string;
  privateKey?: string;
};

const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
const projectId = process.env.FIREBASE_PROJECT_ID ?? "crecimiento-sin-complicaciones";

function initFirebaseAdmin() {
  if (getApps().length > 0) {
    return;
  }

  if (serviceAccountJson) {
    const parsed = JSON.parse(serviceAccountJson) as FirebaseServiceAccountJson;
    const privateKey = parsed.privateKey ?? parsed.private_key;

    const serviceAccount: ServiceAccount = {
      projectId: parsed.projectId ?? parsed.project_id,
      clientEmail: parsed.clientEmail ?? parsed.client_email,
      privateKey: typeof privateKey === "string" ? privateKey.replace(/\\n/g, "\n") : undefined,
    };

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