import {createContext, useReducer} from  'react'

export const CustomerContext = createContext()

export const customerReducer = (state, action) =>{
  switch(action.type){
    //Load all customers
    case 'Set_customers':
      return {
        customers : action.payload
      }
    //Save customers found on search  
    case 'Set_customer':
      return{
        customerD : action.payload
      }
    //Add a new customer  
    case 'Create_customer':
      return{
        customers: [action.payload, ...state.customers]
      }
    //Delete a customer
    case 'Delete_customer':
      return {
        customers: state.customers.filter((c)=> c._id!== action.payload._id)
      }  
    //Update tattoo
    case 'UPDATE_TATTOO':
      
      return{
        customers: state.customers
      }  
    default:
      return state
  }

  
    
}

export const CustomerContextProvider = ({children}) =>{
  const [state, dispatch] = useReducer(customerReducer,{customers:null,customerD:null})



  return(
    <CustomerContext.Provider value={{...state, dispatch}}>
        {children}
    </CustomerContext.Provider>
  )
}