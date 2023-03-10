import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const DatepickerComponent = ({selected,onChange,dateFormat}) => {
  //const [selectedDate, setSelectedDate] = useState(null);
/*
  const handleChange = (date) => {
    setSelectedDate(date);
    
  };
*/
  const handleSubmit = (e) => {
    e.preventDefault();
   /* const { day, month, year } = selectedDate ? {
      day: selectedDate.getDate(),
      month: selectedDate.getMonth()+ 1 ,
      year: selectedDate.getFullYear(),
    } : {};
   */
  };

  return (
    <div className="popup-second-element">
      <DatePicker
        
      />
      
    </div>
  );
};

export default DatepickerComponent;
