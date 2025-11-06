import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ListProdukComponent from './components/produk/ListProdukComponent'
import HeaderComponent from './components/templates/HeaderComponent'
import FooterComponent from './components/templates/FooterComponent'
import AddProdukComponent from './components/produk/AddProdukComponent'

function App() {

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <HeaderComponent />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/tambah-produk" element={<AddProdukComponent />} />
            <Route path="/edit-produk/:id" element={<AddProdukComponent />} />
            <Route path="/list-produk" element={<ListProdukComponent />} />
          </Routes>
        </div>
        <FooterComponent></FooterComponent>
      </div>
    </Router>
  )
}

export default App
