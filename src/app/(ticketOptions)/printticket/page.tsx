'use client' ; 
import React , {useState , useEffect} from 'react' ; 
import style from "./css/style.module.css" ; 
import { CircleX } from "lucide-react"; 
import ErrorMessage from '../components/ErrorMessage';
import MyTickets from "../printticket/components/MyTickets" ; 
const Page = () => {

    const [phoneNo , settPhoneNo] = useState("") ; 
    const [ showError , setShowError] = useState( false   ) ;
    const [errorMsg  , setErrorMsg] = useState("") ;  
    const [allTickets , setAllTickets] = useState([  ]) ; 
    useEffect(()=>{
        setPhoneNumber() ; 
    } , [] ) ; 
    function setPhoneNumber(){
        let loggedInUserID : any = localStorage.getItem("loggedInUserID") ; 
        if( !loggedInUserID) return ; 

        let users : any  = localStorage.getItem("users") ; 
        if( !users ){
            users = [] ; 
            localStorage.setItem("users" , JSON.stringify( users )) ; 
        }
        users = localStorage.getItem("users") ; 
        users = JSON.parse( users) ; 
        let ind : any = users.findIndex((ele  : any ) => Number(ele.id) === Number(loggedInUserID)) ; 
        if( ind === -1 ) return ; 
        let num: any = users[ind].phone ; 
        settPhoneNo( num ) ;     
    }
    

    function removeError(){
        setErrorMsg("") ;
        setShowError( false )  ; 
    }

    function formSubmitted(e:any){
        e.preventDefault() ; 
        // alert("from submitted")  ; 
        const fromDate : any = e.target.fromDate.value ; 
        const toDate : any = e.target.toDate.value ; 
        const phone : any =  e.target.phone.value  ;  
        console.log( fromDate , toDate , phone ) ; 
        if( fromDate > toDate ){
            setErrorMsg(" Select proper Dates ") ; 
            setShowError( true ) ; 
            return ;
        }
        if( phone.length != 10 ){
            setErrorMsg("Phone Number Should be of 10 digits ") ; 
            setShowError( true ) ; 
            return ; 
        }

        getTicketDetils(fromDate , toDate, phone ) ; 
        
    }

    function getTicketDetils(fromDate : any, toDate:any , phone : any ){

        let booking : any = localStorage.getItem("booking") ; 
        if( !booking ){
            booking = [] ; 
            localStorage.setItem("booking" , JSON.stringify( booking)) ; 
        }
        booking = localStorage.getItem("booking") ; 
        booking = JSON.parse( booking )  ; 

        const userTicketIDObj : any = {} ; 
        let userArr : any = [] ; 

        for( let entry of booking ){
            let date : any = entry.date ; 
            if( date < fromDate || date > toDate ) continue  ;
            let number : any = entry.phoneNo ;
            
            if( Number(number) !== Number(phone) ) continue ; 

            let ticketID : any = entry.ticketID ; 


            if( userTicketIDObj[ticketID] ) continue  ; 
            userTicketIDObj[ticketID] = true  ; 
            userArr.push( ticketID ) ; 
        }

        


        if( userArr.length === 0  ){
            setErrorMsg("No Bus ticket found  ") ; 
            setShowError( true ) ; 
            return ; 
        }
        
         

        // setRoutingParameters(userArr) ;
        setAllTickets( userArr) ;  
        

        // window.open("/paymentdone" , "_self") ; 
    }

    function setRoutingParameters(userArr: any ){
        localStorage.setItem("usersBooked" , JSON.stringify( userArr)) ; 
        let busID : any  = userArr[0].busID ,  routeID  = userArr[0].routeID ; 

       
        window.open("/paymentdone" , "_self") ; 

        
    }
    
   
  return (
    <div className={style.mainContainer}>
       
        <div style={{visibility : showError ? 'visible'  : 'hidden' }}>
        <ErrorMessage  error={errorMsg} setShowError={setShowError}/>
        </div> 
        
       
      
            
       
        <p className={style.firstp}>PRINT TICKET </p>
        <p className={style.secondp}>Verify your details, and <label style={{color : "red" }}>Print</label> your tickets</p>
        <form onSubmit={(e)=> formSubmitted(e)}>
        <div className={style.options}>
            <div className={style.optionsDiv}>
                <label>FROM DATE </label>
                <input name="fromDate" type="date" className={style.divinput} placeholder='Enter your Ticket Nummber' required />

            </div>
            <div className={style.optionsDiv}>
                <label>TO DATE </label>
                <input name="toDate" type="date" className={style.divinput} placeholder='Enter your Ticket Nummber' required />

            </div>
            <div className={ style.secondOptionsDiv }>
                <label>MOBILE NUMBER, (+91) </label>
                

                
                <input name="phone" value={phoneNo} onChange={( e : any ) => settPhoneNo( e.target.value)} className={style.divinput} placeholder='Enter your Phone Nummber' type='number' required />
               

            </div>
            <button className={style.showtickteButton} type='submit'> SUBMIT </button>
        </div>
        </form>


        {
            allTickets.map(( ele : any , ind : any )=>   <MyTickets key={ind} ticketID={ele} showButton={true}/>)
        }
      
        
        
    </div>
    
  )
}

export default Page