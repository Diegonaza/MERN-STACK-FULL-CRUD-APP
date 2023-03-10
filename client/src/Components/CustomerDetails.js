import { useCustomerContext } from "../hooks/useCustomersContext"
import {Link} from 'react-router-dom'
import React from "react"
import Tattoo from "./Tattoo"
import CreateBooking from "./CreateBooking"

const CustomerDetails = ({customer}) => {
  const { dispatch} = useCustomerContext()
  const handleClick = async () => {
    const response = await fetch('http://localhost:3000/api/customers/' + customer._id,
    {method: 'Delete'})

    const json = await response.json()

    if(response.ok){
      dispatch({type: 'Delete_customer', payload: json})
    }
  
  }

  const getId = () =>{
       
    return (
      dispatch({type:'Set_customer',payload: [customer]})
    )
      
    
  }
    

  return (
    <div className="customer-details">
      <Link to="/Editcustomer">
      <h2 onClick={getId}>{customer.fname} {customer.lname}</h2>
      </Link>
      
      
      <h4>Phone:  {customer.phone}</h4>
      <h4>Email:  {customer.email}</h4>
      <h4>Date of Birth: {customer.dob}</h4>
      <h1 className="tattoos-main">Tattoos</h1>
      
      <>
      <div className="tattoo-list">
      

        <Tattoo customer = {customer}/>
        
        
        
        
      
      </div>
      </>
      <CreateBooking customer = {customer}/>
      
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default CustomerDetails
