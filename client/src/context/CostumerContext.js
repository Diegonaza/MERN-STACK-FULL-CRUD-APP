import {createContext, useReducer} from  'react'

export const CostumerContext = createContext()

export const costumerReducer = (state, action) =>{
  switch(action.type){
    //Load all costumers
    case 'Set_Costumers':
      return {
        costumers : action.payload
      }
    //Save costumers found on search  
    case 'Set_Costumer':
      return{
        costumerD : action.payload
      }
    //Add a new costumer  
    case 'Create_Costumer':
      return{
        costumers: [action.payload, ...state.costumers]
      }
    //Delete a costumer
    case 'Delete_Costumer':
      return {
        costumers: state.costumers.filter((c)=> c._id!== action.payload._id)
      }  
    default:
      return state
  }
    
}

export const CostumerContextProvider = ({children}) =>{
  const [state, dispatch] = useReducer(costumerReducer,{costumers:null,costumerD:null})



  return(
    <CostumerContext.Provider value={{...state, dispatch}}>
        {children}
    </CostumerContext.Provider>
  )
}