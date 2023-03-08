import { BrowserRouter, Routes, Route} from 'react-router-dom'

//pages & components
import Home from './views/Home'
import Search from './views/Search';
import Navbar from './Components/Navbar';
import EditCustomer from './views/EditCustomer';

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
            path="/editcustomer"
            element={<EditCustomer />}
            />
           
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
