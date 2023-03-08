import { useState } from "react"
import { useCustomerContext } from "../hooks/useCustomersContext";
const formData = new FormData()
const CustomerForm = () => {

const {dispatch} = useCustomerContext()
const [fname, setFname] = useState('')
const [lname, setLname] = useState('')
const [dob, setDob] = useState('')
const [phone, setPhone] = useState('')
const [email, setEmail] = useState('')
const [tattooname, setTattooName] = useState('')
const [img, setImg] = useState('')
const [error, setError] = useState(null)
const [emptyFields, setEmptyFields] = useState([])




const handleSubmit = async(e) =>{
  e.preventDefault()
  
  formData.append('image', e.target.image.files[0])

   
  const upimg = await fetch('http://localhost:3000/api/customers/ups', {
    method: 'POST',
    body: formData,
    encType:"multipart/form-data"

  })

  const upres = await upimg.text()
 
 if(!upres===''){
    console.log("bad response")
  
 }

 if(upres!==''){
  console.log("image uploaded")
  
  let path = "http://localhost:3000/static/"+upres
  
  const customer = {fname,lname,dob,phone,email,tattooname,path}
  const response = await fetch('http://localhost:3000/api/customers/', {
    method: 'POST',
    body: JSON.stringify(customer),
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
    setTattooName('')
    setImg('')
    formData.delete('image')
    
    
    setError(null)
    setEmptyFields([])
    console.log('New customer added')
    dispatch({type:'Create_customer', payload: json})
    
  }
 }
 
 
}

  return (
    <form className="create" onSubmit={handleSubmit} encType="multipart/form-data">
      <h3>Add a new customer</h3>
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

      <label>Tattoo</label>
      <input 
        type="text"
        onChange={(e)=>setTattooName(e.target.value)}
        value = {tattooname}
      />
      <input type="file" name="image"
        onChange={(e)=>setImg(e.target.value.toString())}
        value = {img}
        
      />
      <button type="submit">Add customer</button>
      {error && <div className="error">{error}</div>}

      
      
      
      

    </form>
  )
}

export default CustomerForm
