import { BrowserRouter, Routes, Route} from 'react-router-dom'

//pages & components
import Home from './views/Home'
import Search from './views/Search';
import Navbar from './Components/Navbar';
import EditCostumer from './views/EditCostumer';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Navbar />
        <div className='pages'>
          <Routes>
            <Route
            path="/"
            element={<Home />}
            />
            <Route
            path="search"
            element={<Search />} 
            />
            <Route 
            path="/EditCostumer"
            element={<EditCostumer />}
            />
           
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
