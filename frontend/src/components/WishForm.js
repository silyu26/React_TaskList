import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const WishForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [statue, setStatue] = useState('')
  const [error, setError] = useState(null) // better shows the error directly in the page

  const handleSubmit = async (e) => {
    e.preventDefault()

    const wish = {title, content, statue} // create the object to be sent
    
    const response = await fetch('http://localhost:5000/api/wishlist', { // fetch for making a request or fetch resources
      method: 'POST',
      body: JSON.stringify(wish), // turn the object to json string
      headers: {
        'Content-Type': 'application/json' // say that body would be json
      }
    })
    const json = await response.json() // convert the res object to json 

    
    if (response.ok) { // clear the inputs for next inputs
      setError(null)
      setTitle('')
      setContent('')
      setStatue('')
      
      console.log('new wish added:', json)
      window.location.reload()
    }

    if (!response.ok) {
      setError(json.error)
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      
      <h3>Add a New Task</h3>
      <div className='form-group'></div>
      <label>Task Title:</label>
      <input 
        type="text"
        className='form-control' 
        onChange={(e) => setTitle(e.target.value)} // event object
        value={title} // not sure what for here
      /><div/>
      
      <div className='form-group'>
      <label>Content:</label>
      <input 
        type="text" 
        className='form-control' 
        onChange={(e) => setContent(e.target.value)} 
        value={content}
      /></div>

      <div className='form-group'>
      <label>Status</label>
      <input
        type="text"
        className='form-control' 
        onChange={(e) => setStatue(e.target.value)}
        value={statue}
      /></div><br/>

      <button className='btn btn-primary btn-block'>Add Task</button>
      {error && <div className="error">{error}</div>}
    
    </form>
  )
}

export default WishForm