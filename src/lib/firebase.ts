// src/lib/firebase.ts
import { initializeApp }    from "firebase/app";
import { getAuth }           from "firebase/auth";
import { getFirestore }      from "firebase/firestore";

const firebaseConfig = {
        apiKey: "AIzaSyDwuRDh-RBVO1b0iC4pz_cdHEVYfIbVzrU",
        authDomain: "asriarchive-2025.firebaseapp.com",
        projectId: "asriarchive-2025",
        storageBucket: "asriarchive-2025.firebasestorage.app",
        messagingSenderId: "922720875250",
        appId: "1:922720875250:web:a1aea1c8e286496afd966b",
        measurementId: "G-N6R5M29TTS",
      };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

