import { useState } from "react"
import { useCustomerContext } from "../hooks/useCustomersContext";
const formData = new FormData()

const AddNewTattoo = ({customer}) => {

  const {dispatch} = useCustomerContext()
  const [tattooname, setTattooName] = useState('')
  const [img, setImg] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTattooName('')
    setImagePreview('')
  };
  function handleImagePreview(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePreview(reader.result);
      
    };
  }

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
    
    
   customer.tattoos.push({
    "name":tattooname,
    "filepath":path
   })   
   
   const response = await fetch('http://localhost:3000/api/customers/'+customer._id, {
     method: 'PATCH',
     body: JSON.stringify(customer),
     headers:{
       'Content-Type': 'application/json'
     }
   })

   const json = await response.json()

  if(!response.ok){
    console.log('something went wrong')
    
  }
  if(response.ok){
    
    setImg('')
    formData.delete('image')
    setImagePreview('')
    setTattooName('')
    handleClose()
    console.log('Update completed')
    dispatch({type:'UPDATE_TATTOO', payload: json})
    
  }
 }

  }
  

  return (
    <div className="popup-container">
      <form className="create" onSubmit={handleSubmit} encType="multipart/form-data">
      <span className="material-symbols-outlined"onClick={handleOpen}>add</span>
      
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
          <label>Tattoo</label>
      <input 
        type="text"
        onChange={(e)=>setTattooName(e.target.value)}
        value = {tattooname}
      />
      <input type="file" name="image"
        onChange={handleImagePreview}
        accept="image/*"
        
        
      />
      <div>
      {imagePreview && (
        <img className="img-prev" src={imagePreview} alt="Preview Image"  />
      )}
      </div>
      <button className="popupButtom" type="submit">Confirm</button>
            <button className="btn-cancel" onClick={handleClose}>Cancel</button>
          </div>
        </div>
      )}
      </form>
    </div>
  )
}

export default AddNewTattoo
