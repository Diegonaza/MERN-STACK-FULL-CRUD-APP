import { useEffect} from "react";
import { useCustomerContext } from "../hooks/useCustomersContext";

//components
import CustomerDetails from '../Components/CustomerDetails'
import CustomerForm from "../Components/CustomerForm";

const Home = () =>{
  const {customers,dispatch} = useCustomerContext()

  useEffect(()=>{

    const fetchcustomers = async () =>{
      const response = await fetch('http://localhost:3000/api/customers/')
      const json = await response.json()

      if(response.ok){
        dispatch({type: 'Set_customers', payload: json})
      }
    }

    fetchcustomers()
  },[])

  return (
    
    <div className="home">
      <div className="customers">
        {customers && customers.map((customer)=>(
          <CustomerDetails key={customer._id} customer = {customer}/>
        ))}
      </div>
      <CustomerForm />
    </div>
  )
}

export default Home;