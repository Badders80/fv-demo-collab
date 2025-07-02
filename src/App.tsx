import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import { Home } from './Home';
import { FvProviders } from "./providers/providers";


export default function App() {
  return (
    <FvProviders>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </FvProviders>
  );
}

