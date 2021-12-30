import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyAORUzGS3fNVYX3_O9taq4lAT1TvtJg0RI',
  authDomain: 'no-music-web.firebaseapp.com',
  projectId: 'no-music-web',
  storageBucket: 'no-music-web.appspot.com',
  messagingSenderId: '630874824097',
  appId: '1:630874824097:web:88bd7345a766beeff5bfe0',
  measurementId: 'G-R25E80NGN1'
}

// Initialize Firebase
const firebaseApp = () => initializeApp(firebaseConfig)

export default firebaseApp