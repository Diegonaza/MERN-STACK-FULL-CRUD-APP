import React, { useState } from 'react';

function TimePicker() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "hour") {
      setHour(parseInt(value));
    } else if (name === "minute") {
      setMinute(parseInt(value));
    }
  };

  return (
    <div>
      <select name="hour" value={hour} onChange={handleChange}>
        {Array.from(Array(24).keys()).map((hour) => (
          <option key={hour} value={hour}>
            {hour < 10 ? "0" + hour : hour}
          </option>
        ))}
      </select>
      :
      <select name="minute" value={minute} onChange={handleChange}>
        {Array.from(Array(60).keys()).map((minute) => (
          <option key={minute} value={minute}>
            {minute < 10 ? "0" + minute : minute}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TimePicker