import { useEffect, useState } from "react";

export default function GetTimeNow() {
  const [date, setDate] = useState(null);

  useEffect(() => {
    const dataTimeId = setInterval(() => {
      const currentDate = new Date().toString();
      setDate(currentDate);
    }, 1000);

    return () => clearInterval(dataTimeId);
  }); 
  //No dependency array, runs on every render to display the dateTime

  return <h4>{date}</h4>;
}
