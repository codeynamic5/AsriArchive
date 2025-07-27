// src/lib/firebase.ts
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
        apiKey: "AIzaSyDwuRDh-RBVO1b0iC4pz_cdHEVYfIbVzrU",
        authDomain: "asriarchive-2025.firebaseapp.com",
        projectId: "asriarchive-2025",
        storageBucket: "asriarchive-2025.firebasestorage.app",
        messagingSenderId: "922720875250",
        appId: "1:922720875250:web:a1aea1c8e286496afd966b",
        measurementId: "G-N6R5M29TTS",
      };
      firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const db   = firebase.firestore()

