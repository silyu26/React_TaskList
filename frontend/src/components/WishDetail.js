import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import 'bootstrap/dist/css/bootstrap.min.css';

const WishDetail = ({wish}) => {

    const handleClick = async () => {
        const response = await fetch('http://localhost:5000/api/wishlist/' + wish._id, {
          method: 'DELETE'
        })

        window.location.reload()
        //const json = await response.json()
      }

    const handleClick2 = async () => {
        const response = await fetch('http://localhost:5000/api/wishlist/' + wish._id, {
          method: 'PATCH',
          body: JSON.stringify({
            statue: "Finished"
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })

        window.location.reload()
    }

    return (
        <div className="wishdetail container">
          <div className='row'>
            <div className='col'>
            <h4>{wish.title}</h4>
            <p>Content: {wish.content}</p>
            <p>Created at: {formatDistanceToNow(new Date(wish.createdAt), {addSuffix: true})}</p>
            <p>Statue: {wish.statue}</p>
            </div>
            <div className='col'>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
            <span className='material-symbols-outlined' onClick={handleClick2}>check</span>
            </div>
          </div>
        </div>
    )
}

export default WishDetail