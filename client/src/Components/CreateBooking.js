import { useCustomerContext } from "../hooks/useCustomersContext";
import { useState } from "react"
import CustomerDetails from '../Components/CustomerDetails';
import {TfiAgenda} from 'react-icons/tfi'
//import DatePicker from '../Components/DatePicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from "./TimePicker";


const CreateBooking = ({customer}) => {
  const formData = new FormData()
  const {dispatch} = useCustomerContext()

  const [img, setImg] = useState('')
  
  //Popup
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  //Request body
  const[customerName,setCustomerName] = useState(customer.fname+" "+customer.lname)
  const[customerEmail,setCustomerEmail] = useState(customer.email)
  const[customerPhone, setCustomerPhone] = useState(customer.phone)
  const[customerMedicalHistory, setCustomerMedicalHistory] = useState('')
  const[tattooArtistName, setTattooArtistName] = useState('Fernando Nunes')
  const[tattooDesign, setTattooDesign] = useState('')
  const[tattooSize, setTattooSize] = useState('')
  const[tattooPlacement, setTattooPlacement] = useState('')
  const[tattooColor, setTattooColor] = useState('')
  const[bookingDate, setBookingDate] = useState(null)
  const[bookingTime, setBookingTime] = useState('')
  const[depositAmount, setDepositAmount] = useState(0)
  const[depositMethod, setDespositMethod] = useState('')
  const[depositDeadline, setDepositDeadLine] = useState(null)
  const[refundPolicy, setRefundPolicy] = useState('')
  const[cancellationReason, setCancellationReason] = useState('')
  const[cancellationDate, setCancellationDate] = useState(null)
  const[aftercareInstructions, setAftercareInstructions] = useState('')
  const[notes, setNotes] = useState('')
  const[imgURL, setImgURL] = useState('')

  
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setImagePreview('')
  };

  const handleChangeBooking = (date) => {
    setBookingDate(date);
    console.log('YAY')
  };

  const handleChangeDeposit = (date) => {
    setDepositDeadLine(date);
  };

  const handleChangeCancellation = (date) => {
    setCancellationDate(date);
  };

  const handleTimeChange = (time) => {
    setBookingTime(time);
  };

  const handleSubmit = async(e) =>{
    e.preventDefault()
   /* formData.append('image', e.target.image.files[0])

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
    
    
    */
   
  const booking = {customerName,customerEmail,customerPhone,customerMedicalHistory,tattooArtistName,tattooDesign,tattooSize,tattooPlacement,tattooColor,bookingDate,bookingTime,depositAmount,depositMethod,depositDeadline,refundPolicy,cancellationReason,cancellationDate,aftercareInstructions,notes,imgURL}

  const response = await fetch('http://localhost:3000/api/bookings/', {
    method: 'POST',
    body: JSON.stringify(booking),
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
    handleClose()
    console.log('Update completed')
    dispatch({type:'UPDATE_TATTOO', payload: json})
    
  }
//}


  }

  function handleImagePreview(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePreview(reader.result);
      
    };
  }


  return (
    <div className="popup-container-bookings">
      <form className="create" onSubmit={handleSubmit} encType="multipart/form-data">
      
      <h1 className="icon-bookings"onClick={handleOpen}><TfiAgenda/></h1>

      {isOpen && (
        <div className="popup">
          <div className="popup-content-bookings">
          <label>Booking</label>
          <div className="popup-content-fields">
             <label className="popup-first-element">Customer Name</label>
              <input 
                className="popup-second-element"
                type="text"
                onChange={(e)=>setCustomerName(e.target.value)}
                value = {customerName}
              />
          </div>
          <div className="popup-content-fields">
             <label className="popup-first-element">Email</label>
              <input 
                className="popup-second-element"
                type="text"
                onChange={(e)=>setCustomerEmail(e.target.value)}
                value = {customerEmail}
              />
          </div>
          <div className="popup-content-fields">
             <label className="popup-first-element">Phone</label>
              <input 
                className="popup-second-element"
                type="text"
                onChange={(e)=>setCustomerPhone(e.target.value.toString())}
                value = {customerPhone}
              />
          </div>
          <div className="popup-content-fields">
             <label className="popup-first-element">Medical History</label>
              <input 
                className="popup-second-element"
                type="text"
                onChange={(e)=>setCustomerMedicalHistory(e.target.value)}
                value = {customerMedicalHistory}
              />
          </div>
          <div className="popup-content-fields">
             <label className="popup-first-element">Tattoo size</label>
              <input 
                className="popup-second-element"
                type="text"
                onChange={(e)=>setTattooSize(e.target.value)}
                value = {tattooSize}
              />
          </div>
          <div className="popup-content-fields">
             <label className="popup-first-element">Placement</label>
              <input 
                className="popup-second-element"
                type="text"
                onChange={(e)=>setTattooPlacement(e.target.value)}
                value = {tattooPlacement}
              />
          </div>
          <div className="popup-content-fields">
             <label className="popup-first-element">Color</label>
              <input 
                className="popup-second-element"
                type="text"
                onChange={(e)=>setTattooColor(e.target.value)}
                value = {tattooColor}
              />
          </div>
          <div className="popup-content-fields">
             <label className="popup-first-element">Date</label>
             <DatePicker
                  selected={bookingDate}
                  onChange={handleChangeBooking}
                  dateFormat="dd/MM/yyyy"
              />
          </div>
          
          <div className="popup-content-fields">
             <label style={{ flexBasis:"30%"}}>Time</label>
              
             <TimePicker
                onChange={handleTimeChange}
                value={bookingTime}
              />
          </div>
          
          <div className="popup-content-fields">
             <label className="popup-first-element">Deposit Amount</label>
              <input 
                className="popup-second-element"
                type="number"
                onChange={(e)=>setDepositAmount(e.target.value)}
                value = {depositAmount}
              />
          </div>
          <div className="popup-content-fields">
             <label className="popup-first-element">Deposit Method</label>
              <input 
                className="popup-second-element"
                type="text"
                onChange={(e)=>setDespositMethod(e.target.value)}
                value = {depositMethod}
              />
          </div>
          <div className="popup-content-fields">
             <label className="popup-first-element">Deposit Deadline</label>
             <DatePicker
        
                selected={depositDeadline}
                onChange={handleChangeDeposit}
                dateFormat="dd/MM/yyyy"
             />
          </div>
          <div className="popup-content-fields">
             <label className="popup-first-element">Refund Policy</label>
              <input 
                className="popup-second-element"
                type="text"
                onChange={(e)=>setRefundPolicy(e.target.value)}
                value = {refundPolicy}
              />
          </div>
          <div className="popup-content-fields">
             <label className="popup-first-element">Cancellation Reason</label>
              <input 
                className="popup-second-element"
                type="text"
                onChange={(e)=>setCancellationReason(e.target.value)}
                value = {cancellationReason}
              />
          </div>
          <div className="popup-content-fields">
             <label className="popup-first-element">Cancellation Date</label>
             <DatePicker
        
                selected={cancellationDate}
                onChange={handleChangeCancellation}
                dateFormat="dd/MM/yyyy"
             />
          </div>
          <div className="popup-content-fields">
             <label className="popup-first-element">Aftercare Instructions</label>
              <input 
                className="popup-second-element"
                type="text"
                onChange={(e)=>setAftercareInstructions(e.target.value)}
                value = {aftercareInstructions}
              />
          </div>
          
          <div className="popup-content-fields">
             <label className="popup-first-element">Artist Name</label>
              <input 
                className="popup-second-element"
                type="text"
                onChange={(e)=>setTattooArtistName(e.target.value)}
                value = {tattooArtistName}
              />
          </div>
          <div className="popup-content-fields">
             <label className="popup-first-element">Notes</label>
              <input 
                className="popup-second-element"
                type="text"
                onChange={(e)=>setNotes(e.target.value)}
                value = {notes}
              />
          </div>
          <div className="popup-content-fields">
             <label className="popup-first-element">Tattoo Design</label>
              <input 
                className="popup-second-element"
                type="text"
                onChange={(e)=>setTattooDesign(e.target.value)}
                value = {tattooDesign}
              />
          </div>
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

export default CreateBooking
