import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to ="/">
          <h1>Medussa tattoo Studio</h1>
        </Link>
        <Link to ="/bookings">Bookings</Link>
        <Link to ="/search">Search</Link>
      </div>
    </header>
  )
}

export default Navbar
