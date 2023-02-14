import { useCostumerContext } from "../hooks/useCostumersContext";
import { useState } from "react"
import { useEffect} from "react";

const EditCostumer = () => {
  const {dispatch,costumerD} = useCostumerContext()

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [dob, setDob] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [tattoos, setTattoos] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  useEffect(()=>{
    setFname(costumerD[0].fname)
    setLname(costumerD[0].lname)
    setDob(costumerD[0].dob)
    setPhone(costumerD[0].phone)
    setEmail(costumerD[0].email)
    setTattoos(costumerD[0].tattoos)
  },[])

  const handleSubmit = async(e) =>{
    e.preventDefault()

    const costumer = {fname,lname,dob,phone,email,tattoos}

  const response = await fetch(`http://localhost:3000/api/costumers/${costumerD[0]._id}`, {
    method: 'PATCH',
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
    console.log('Update completed')
   // dispatch({type:'Create_Costumer', payload: json})
  }
  }

  return (
    <div>
      <form className="create" onSubmit={handleSubmit}>
      <h3>Costumer Details</h3>
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

      <button>Save Changes</button>
      {error && <div className="error">{error}</div>}

    </form>
    </div>
  )
}

export default EditCostumer
