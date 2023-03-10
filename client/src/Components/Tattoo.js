import React from "react"
import { useCustomerContext } from "../hooks/useCustomersContext"
import AddNewTattoo from "./AddNewTattoo"

const Tattoo = ({customer}) => {

  const { dispatch} = useCustomerContext()
  let delimgpath = {path:""}
  
  
  const handleClick = async (tname,filepath) => {
   delimgpath.path = filepath.substring(29)
   
   const updatedtattoos = customer.tattoos.filter((tattoo) => tattoo.name !== tname);
   customer.tattoos = updatedtattoos
   
    
  
    const deleteimg = await fetch('http://localhost:3000/api/customers/delete/img',{
      method:'POST',
      body: JSON.stringify(delimgpath),
      headers:{
        'Content-Type': 'application/json'
      }
    })

    const response = await fetch('http://localhost:3000/api/customers/' + customer._id,
    {
      method: 'PATCH',
      body: JSON.stringify(customer),
      headers:{
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if(response.ok){
      dispatch({type: 'UPDATE_TATTOO', payload: json})
      console.log(json)
    }
    if(!response.ok)
     console.log("something went wrong")
    
  
  }

  return (
    
    <div className="tattoo1">
      
      <div className="tattooicon">
      <AddNewTattoo customer={customer}/>
      
      </div>
        {customer.tattoos && customer.tattoos.map((tattoos)=>(
        
        <React.Fragment key={tattoos.name}>
        
        <div className="tattoo">

        <h5>{tattoos.name} </h5>

        <span className="material-symbols-outlined"
        onClick={()=>handleClick(tattoos.name, tattoos.filepath)}>delete</span>
      
        <img className="tattooimg"
         src={tattoos.filepath}
         width="150" height="150" 
         alt=''></img>

        </div>
        
       
        </React.Fragment>
        
      ))}
      
      
      
    </div>
  )
}

export default Tattoo
