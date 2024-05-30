'use client' ; 
import React , {useState , useEffect } from 'react'
import payment from "../css/payment.module.css" ; 
import { nanoid } from 'nanoid'
import BookingDone from "./BookingDone"  ; 

const Payment : React.FC<any>= ({sleeperSeats , seatingSeats , setDoPayment , routeID , busID , 
  seatingPrice, sleeperPrice
}) => {

  const [userDeatils , setUserDetails] = useState([]) ; 
  const [ email , setEmail] = useState("") ; 
  const [phoneNo , setPhoneNo] = useState("") ; 


  useEffect(()=>{
    let arr : any = []  ; 
    for( let entry of sleeperSeats ){
      let obj = { seatType : "SLEPPER" , seatNo : entry } ; 
      arr.push( obj ) ; 
    }

    for( let entry of seatingSeats ){
      let obj = { seatType : "SEATING" , seatNo : entry } ; 
      arr.push( obj ) ; 
    }
    console.log("arr" , arr) ; 
    setUserDetails( arr ) ; 
    setContactDetails() ; 
    
  } , [] )
  function formSubmitted(e:any){


    e.preventDefault() ; 
    // alert("form Submitted");

    
     
    let arr : any = userDeatils ; 

    const ticketID = nanoid(); 
    const date : any  = localStorage.getItem("journeyDate"); 
    for( let ind in  userDeatils ){
      console.log( ind) ; 
        let inpt : any = "name" + ind ; 
        
        let name = e.target[inpt].value ; 
        inpt = "gender" + ind ;
        let gender = e.target[inpt].value ; 
        inpt = "age" + ind ; 
        let age = e.target[inpt].value ; 
        const id = "" + Date.now() + ind ;  

        let obj : any = { name , gender , age , ticketID , routeID , busID , date , id , email, phoneNo , mailSent : false }  ;
       
       
        arr[ind] = { ...arr[ind] , ...obj } ;         

    }

    localStorage.setItem("usersBooked" , JSON.stringify( arr ) ) ; 
    setUserDetails( arr ) ;

    confirmTheBooking()  ; 
    console.log( arr ) ; 
  }
  
  function setContactDetails(){
    let loggedInUserID : any = localStorage.getItem("loggedInUserID") ; 
    if( !loggedInUserID ) return ; 

    let users : any  = localStorage.getItem("users") ; 
    if(  !users){

      return ; 
      
    }
    users = JSON.parse( users ) ; 
    let ind : any = users.findIndex(( ele : any ) => Number(ele.id) === Number(loggedInUserID) ) ; 
    if(ind === -1 ) return ; 
    setEmail( users[ind].mail) ; 
    setPhoneNo( users[ind].phone) ; 
  }
  function confirmTheBooking(){
    setTimings()  ; 
    let booking : any  = localStorage.getItem("booking")  ; 
    if( !booking ){
      booking  = []  ; 
      localStorage.setItem("booking" , JSON.stringify( booking)  ) ; 
    }
    booking = JSON.parse( booking) ; 
    booking = [ ...booking , ...userDeatils ] ; 
    localStorage.setItem("booking" , JSON.stringify( booking))  ; 
    window.open("/paymentdone" , "_self") ;  
  }

  function setTimings(){
    let availableBuses : any = localStorage.getItem("availableBuses") ; 
    if( !availableBuses){
      availableBuses = [] ; 
      localStorage.setItem("availableBuses" , JSON.stringify( availableBuses ) ) ; 
    }
    availableBuses  = localStorage.getItem("availableBuses") ; 
    availableBuses = JSON.parse( availableBuses )  ; 
    let ind : any = availableBuses.findIndex(( ele : any ) => Number(ele.routeID) === Number(routeID) && Number(ele.busID) === Number(busID) ) ;
    
    localStorage.setItem("fromTime" , "") ;
    localStorage.setItem("toTime" , "") ;
    
    if( ind === -1 ) return ; 

    localStorage.setItem( "fromTime" , availableBuses[ind].fromTime) ;
    localStorage.setItem( "toTime" , availableBuses[ind].toTime) ;



    localStorage.setItem("seatingPrice" , seatingPrice )  ;
    localStorage.setItem("sleeperPrice" , sleeperPrice) ;  
  }
  return (
    <div className={payment.boxContainer}>
      <div className={payment.outer} onClick={()=>setDoPayment(false)}></div>
      <div className={payment.inner} >
        <h4>Passenger Details</h4>
        <div className={payment.psngrDetails}>
        <p className={payment.psngrInfo}>Passenger Information</p>
        <form onSubmit={(e)=> formSubmitted(e)}>
          {
            userDeatils.map(
               ( ele : any , ind : any )=> {

                return  <div className={payment.psngrCard}>
                <p><label className={payment.psngrName}>Passenger {ind+1} </label>| <label>{ele.type} { ele.seatNo}</label></p>
                <div className={payment.psngrNameText}>
                  <p>Name</p>
                  <input type="text" placeholder="Name" name={"name" + ind }  required />
                </div>
                <div className={payment.psngrGender}>
                  <div>
                  <p>Gender</p>
                  <input type="radio" id={"male" + ind }  name={"gender" + ind }  value={"male"}  required />
                  <label htmlFor={"male"+ ind} >Male</label>
                  <input type="radio" id={"female" + ind } name={"gender" + ind}  value={"female"}  required  />
                  <label htmlFor={"female"+ ind} >Female</label>
                  </div>
                  <div>
                    <p>Age</p>
                    <input type="number" name={"age"+ ind} className={payment.psngrAge} required min="1" max="100"/>
                  </div>
                </div>
              </div>

               }            
            
            )
          }

          <div className={payment.psngrContact}>
            <p className={payment.contactName}>Contact Details</p>
            <p className={payment.tktSend}>Your ticket will be sent to these details</p>
            <div>
                <div className={payment.psngrNameText}>
                  <p>Email ID</p>
                  <input type="email" placeholder="Email ID" name="mail" value={email}  onChange={( e: any ) => setEmail( e.target.value ) }  required />
                </div>
                <div className={payment.psngrNameText}>
                  <p>Phone, (+91)</p>
                  <input type="number" placeholder="Phone"   min="1000000000" max="9999999999" name="phone" value={phoneNo} onChange={ ( e : any ) => setPhoneNo( e.target.value)} required />
                </div>
            </div>
          </div>
         
          <button className={payment.psngrBtn} type="submit">PROCEED TO PAY </button>
        </form>
        </div>

      </div>
    </div>
  )
}

export default Payment