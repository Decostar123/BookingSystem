import React from 'react'
import passengerList from "../css/passengerList.module.css" ; 
const PassengeList : React.FC<any> = ({deleteUsers}) => {
    function formSubmitted(e: any ){
        e.preventDefault() ; 
        alert( "form submitted ") ; 
    }
  return (
    <div className={passengerList.outer}>

        <form onSubmit={(e)=>formSubmitted(e)}>
            {
                deleteUsers.map( ( ele : any ) =>{
                    return   <>
                        <div className={passengerList.inner}>
                            <input type="checkbox"  name={ele.id} id={ele.id} />
                            <div className={passengerList.personDetail} >
                                <p >Arjun</p>
                                <p>{ele.gender}, {ele.age}years</p>
                            </div>
                    </div>
                    <div className={passengerList.inner}>
                        <input type="checkbox" />
                        <div className={passengerList.personDetail}>
                            <label htmlFor={ele.id}>Arjun</label>
                            <p>Male, 25years</p>
                        </div>
                    </div>
                   
                    
                    </>
               
            
            } ) 
            }
         
            <button className={passengerList.cancelTicketbutton}>Cancel Ticket</button>
        </form>    
    </div>
  )
}

export default PassengeList