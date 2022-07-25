import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <header>
      <div className="navbar navbar-light bg-dark">
        <Link to="/">
          <h1 style={{'color': 'white'}}>Weekly ToDo</h1>
        </Link>
      </div>
    </header>
  )
}

export default Navbar