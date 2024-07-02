import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"
import Navbar from './components/navbar';
import { RoutesForTheApp } from './router';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB906OhepAbiFJMtZYHdzRJjnb8j0xCvYc",
  authDomain: "factfinder-f2dd7.firebaseapp.com",
  projectId: "factfinder-f2dd7",
  storageBucket: "factfinder-f2dd7.appspot.com",
  messagingSenderId: "690785494463",
  appId: "1:690785494463:web:606a9943ce5f65bf8ced0a",
  measurementId: "G-EEMT08FVMW"
};
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
getAnalytics(app);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
      <Navbar />
      <RoutesForTheApp/>
    </BrowserRouter>
);

reportWebVitals();
