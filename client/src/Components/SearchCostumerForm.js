import { useState } from "react"
import { useCostumerContext } from "../hooks/useCostumersContext";


const SearchCostumerForm = () => {


const {dispatch} = useCostumerContext()


const [fname, setFname] = useState('')
const [lname, setLname] = useState('')
const [error, setError] = useState(null)
const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async(e) =>{
    e.preventDefault()
  
    
  
    const response = await fetch(`http://localhost:3000/api/costumers/${fname}`)
  
    const json = await response.json()
  
    if(!response.ok){
      setError(json.error)
      setEmptyFields(json.emptyFields)
      console.log(error)
    }
    if(response.ok){
      console.log(json)
      setFname('')
      setLname('')      
      setError(null)
      setEmptyFields([])
      dispatch({type:'Set_Costumer', payload: json})
      
      
    }
   
  }
 
  return (
   <form className="create" onSubmit={handleSubmit}>
    <h3>Search costumer</h3>
      <label>First name</label>
      <input 
        type="text"
        onChange={(e)=>setFname(e.target.value)}
        value = {fname}
        className={emptyFields.includes('First Name') ? 'error' :''}
      />
      <button>Find Costumer</button>
   
      
        
   </form>
  )
}

export default SearchCostumerForm
