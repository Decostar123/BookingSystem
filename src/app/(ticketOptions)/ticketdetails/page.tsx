import React from 'react'
import style from "./css/style.module.css"
const page = () => {
  return (
    <div className={style.outer} >

        <div  className={style.inner}>
        <p className={style.leftp}>Ticket ID </p>
            <p className={style.rightp}>123</p>
        <p className={style.leftp}>From</p>
            <p className={style.rightp}>CityA, 5.00 am </p>
            <p className={style.leftp}>To</p>
            <p className={style.rightp}>CityB, 12.00pm </p>
            <p className={style.leftp} >Date</p>
            <p className={style.rightp} >22/05/2001</p>

            <p className={style.leftp} >Bus Name</p>
            <p className={style.rightp} >HK travels</p>

            <p className={style.leftp}> Number of seats</p>
            <p className={style.rightp}>2</p>
            <p className={style.leftp}>Ram  </p>
            <p className={style.rightp}>Seat No. 6, Sleeper</p>
            <p className={style.leftp}>Arjun</p>
            <p className={style.rightp}>Seat No. 5 Sitting</p>
            <p className={style.leftp}>Total Price</p>
            <p className={style.rightp}>₹23</p>
            
         
            <button>Download Ticket</button>
            
        </div>
      
    </div>
  )
}

export default page