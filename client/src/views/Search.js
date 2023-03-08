import CustomerDetails from '../Components/CustomerDetails'
import SearchCustomerForm from "../Components/SearchCustomerForm";
import { useCustomerContext } from "../hooks/useCustomersContext";
import { useEffect} from "react";

const Homer = () => {
  const {customerD} = useCustomerContext()
  useEffect(()=>{

  },[])

  return (
    
    <div className="x">
      
      <div className="y">
      <SearchCustomerForm />
          
          {customerD && customerD.map((customer)=>(
          
         <CustomerDetails key={customer._id} customer = {customer} />
        ))}
      </div>
    </div>
  )
}

export default Homer;
