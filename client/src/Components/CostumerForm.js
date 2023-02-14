import { useState } from "react"
import { useCostumerContext } from "../hooks/useCostumersContext";

const CostumerForm = () => {
const {dispatch} = useCostumerContext()

const [fname, setFname] = useState('')
const [lname, setLname] = useState('')
const [dob, setDob] = useState('')
const [phone, setPhone] = useState('')
const [email, setEmail] = useState('')
const [tattoos, setTattoos] = useState('')
const [error, setError] = useState(null)
const [emptyFields, setEmptyFields] = useState([])





const handleSubmit = async(e) =>{
  e.preventDefault()


  const costumer = {fname,lname,dob,phone,email,tattoos}

  const response = await fetch('http://localhost:3000/api/costumers/', {
    method: 'POST',
    body: JSON.stringify(costumer),
    headers:{
      'Content-Type': 'application/json'
    }
  })

  const json = await response.json()

  if(!response.ok){
    setError(json.error)
    setEmptyFields(json.emptyFields)
  }
  if(response.ok){
    setFname('')
    setLname('')
    setDob('')
    setPhone('')
    setEmail('')
    setTattoos('')
    setError(null)
    setEmptyFields([])
    console.log('New costumer added')
    dispatch({type:'Create_Costumer', payload: json})
  }
}

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new costumer</h3>
      <label>First name</label>
      <input 
        type="text"
        onChange={(e)=>setFname(e.target.value)}
        value = {fname}
        className={emptyFields.includes('First Name') ? 'error' :''}
      />

      <label>Last name</label>
      <input 
        type="text"
        onChange={(e)=>setLname(e.target.value)}
        value = {lname}
        className={emptyFields.includes('Last Name') ? 'error' :''}
      />

      <label>Date of Birth</label>
      <input 
        type="text"
        onChange={(e)=>setDob(e.target.value)}
        value = {dob}
        className={emptyFields.includes('Date of Birth') ? 'error' :''}
      />

      <label>Phone Number</label>
      <input 
        type="number"
        onChange={(e)=>setPhone(e.target.value)}
        value = {phone}
        className={emptyFields.includes('Phone Number') ? 'error' :''}
      />

      <label>Email</label>
      <input 
        type="text"
        onChange={(e)=>setEmail(e.target.value)}
        value = {email}
        
      />

      <label>Tattoos</label>
      <input 
        type="text"
        onChange={(e)=>setTattoos(e.target.value)}
        value = {tattoos}
      />

      <button>Add Costumer</button>
      {error && <div className="error">{error}</div>}

      
      <input type="file"  />
      <button type="submit">Upload</button>
      

    </form>
  )
}

export default CostumerForm
