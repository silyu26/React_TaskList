import { useEffect, useState } from "react" //using hooks allows the use of states even without classes
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import WishDetail from '../components/WishDetail'
import WishForm from "../components/WishForm"

const Home = () => {
  const [wishs, setWish] = useState(null)//declare a new count state

  useEffect(() => { //to perform side effects from a function component. performed each time after rendering
    const fetchWish = async () => { // define the function
      //fetch the data and stores in the response
      const response = await fetch('http://localhost:5000/api/wishlist/') //works with proxy in the package.json: can replace cors
      // parse the json to objects that we can work with, because we sent back in json format in controllerjs
      const json = await response.json() 
      
      if (response.ok) {  // check if the response is ok
        setWish(json)
      }
      console.log(wishs)
    }

    fetchWish()   // use the function
  }, []) // [] stands for only use the useEffect after the first render, then it wount be used

  return (
    <div className="home container">
      <div className="row">
      <div className="workouts col-8">
        {wishs && wishs.map(wish => ( //update only when wish is updated
          <WishDetail key={wish._id} wish={wish}/> // key is neccessary when mapping
        ))}
      </div>
      <div className="col">
      <WishForm/>
      </div>
      </div>
    </div>
  )
}

export default Home