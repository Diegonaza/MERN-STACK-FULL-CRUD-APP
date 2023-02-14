import { useCostumerContext } from "../hooks/useCostumersContext"
import {Link} from 'react-router-dom'

const CostumerDetails = ({costumer}) => {
  const { dispatch} = useCostumerContext()
  const handleClick = async () => {
    const response = await fetch('http://localhost:3000/api/costumers/' + costumer._id,
    {method: 'Delete'})

    const json = await response.json()

    if(response.ok){
      dispatch({type: 'Delete_Costumer', payload: json})
    }
  
  }

  const getId = () =>{
       
    return (
      dispatch({type:'Set_Costumer',payload: [costumer]})
    )
      
    
  }
    

  return (
    <div className="costumer-details">
      <Link to="/EditCostumer">
      <h2 onClick={getId}>{costumer.fname} {costumer.lname}</h2>
      </Link>
      
      
      <h4>Phone:  {costumer.phone}</h4>
      <h4>Email:  {costumer.email}</h4>
      <h4>Date of Birth: {costumer.dob}</h4>
      <h1>Tattoos</h1>
      <>
      {costumer.tattoos && costumer.tattoos.map((tattoos)=>(
        
        <h5 key={tattoos}>{tattoos} </h5>
        
        
      ))}
      </>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default CostumerDetails
