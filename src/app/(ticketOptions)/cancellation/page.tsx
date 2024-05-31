'use client'
import React ,{useState , useEffect} from 'react'
import style from "./css/style.module.css" ; 
import ErrorMessage from '../components/ErrorMessage';
import PassengeList from './components/PassengeList';
import MyTickets from '../printticket/components/MyTickets';
import PersonDetail from './components/PersonDetail';
import {ChevronDown , ChevronUp} from "lucide-react" ; 

const Page = () => {

    const [ deleteUsers , setDeleteUsers ] = useState([]) ; 
    const [ showError , setShowError] = useState( false   ) ;
    const [errorMsg  , setErrorMsg] = useState("") ;  
    const [allTickets , setAllTickets] = useState([  ]) ; 
    const [ deleteTicketID , setDeleteTickedID] = useState( -1 ) ; 
    const [todayDate , setTodayDate] = useState('') ; 


    const [ fromDate , setFromDate]  = useState('') ; 
    const [ toDate , setToDate]  = useState('') ; 
    const [phoneNo , setPhoneNo] = useState("") ; 

    useEffect(()=>{
        setPhoneNumber() ; 
        setMinDate()  ;
        // alert(" in the useefect ");

        localStorage.setItem("deleteTicket" , String(-1) ) ; 
    } , [] ) ; 


    function setMinDate(){
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const dd = String(today.getDate()).padStart(2, '0');
        const todayString = `${yyyy}-${mm}-${dd}`;
        setTodayDate(todayString ) ; 
     }
    function formSubmitted(e:any){
        e.preventDefault() ; 
        // alert("from submitted")  ; 
        

        // const phone : any =  e.target.phone.value  ;  
        console.log( fromDate , toDate , phoneNo ) ; 
        if( fromDate > toDate ){
            setErrorMsg(" Select proper Dates ") ; 
            setShowError( true ) ; 
            return ;
        }
        if( phoneNo.length != 10 ){
            setErrorMsg("Phone Number Should be of 10 digits ") ; 
            setShowError( true ) ; 
            return ; 
        }

        getTicketDetils( ) ; 
        
    }
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
        setPhoneNo( num ) ;     
    }
   
    function getTicketDetils( ){

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
            
            if( Number(number) !== Number(phoneNo) ) continue ; 

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
        let id : any= localStorage.getItem("deleteTicket") ; 
        setDeleteTickedID( id ) ; 
         console.log( "------------------userArr-----------------" , userArr) ; 
         console.log( "------------------deleteTicket-----------------" , id) ; 
        let updatedDeletedUsers : any =  updateDeleteUsers() ; 
 
        return updateDeleteUsers ; 
        // alert("User Tickets deleted Successfully ") ; 
        // window.open("/paymentdone" , "_self") ; 
    }
    // if( deleteUsers.length === 0 ) return <></>
    function updateDeleteUsers(){
        let booking : any = localStorage.getItem("booking")  ; 
        if( !booking) return ; 

        let deleteTicketID: any= localStorage.getItem("deleteTicket") ; 
        booking = JSON.parse( booking  ) ; 
        let deleteArr = booking.reduce(( acc  : any , ele : any )=>{
            if( ele.ticketID === deleteTicketID ){
                acc.push({...ele , checked : false  })  ; 
            }
            return acc ; 
        } , [ ]) ; 

        return deleteArr ;
        // setUserArray( deleteArr) ; 


        
     }
  return (
    <div>
        <div style={{visibility : showError ? 'visible'  : 'hidden' }}>
        <ErrorMessage  error={errorMsg} setShowError={setShowError}/>
        </div> 
        <p className={style.cancel}>Cancel Your Ticket</p>
        <form onSubmit={(e)=> formSubmitted(e)} className={style.cancelForm}>
            
        <div className={style.options}>
             <div className={style.optionsDiv}>
                <label>FROM DATE </label>
                <input name="fromDate" value={fromDate} onChange={(e:any)=>setFromDate(e.target.value) } type="date" min={todayDate} className={style.divinput} placeholder='Enter your Ticket Nummber' required />

            </div>
            <div className={style.optionsDiv}>
                <label>TO DATE </label>
                <input name="toDate"  value={toDate} onChange={(e:any)=>setToDate(e.target.value) } type="date" min={todayDate} className={style.divinput} placeholder='Enter your Ticket Nummber' required />

            </div>
            
            <div className={ style.secondOptionsDiv }>
                <label>MOBILE NUMBER, (+91) </label>
                

                
                <input name="phone"  value={phoneNo} onChange={(e:any)=> ( e.target.value)} className={style.divinput} placeholder='Enter your Phone Nummber' type='number' required />
               

            </div>
           
            
        </div>
        
        <button type="submit" className={style.selectPassenger}> SELECT PASSENGER</button>
        </form>
        <div style={{paddingBottom:"50px"}}>
        {
            allTickets.map(( ele : any , ind : any )=>   <div className={style.carousel}>
                <MyTickets key={ind} ticketID={ele} showButton={false}  />
                {
                    deleteTicketID === ele &&  <PersonDetail deleteTicketID={deleteTicketID} getTicketDetils={getTicketDetils} 
                    updateDeleteUsers={updateDeleteUsers}/>
                }
               
                {
                    deleteTicketID !== ele &&  <ChevronDown size={30} className={style.arrow} onClick={()=>{
                        localStorage.setItem("deleteTicket" , ele ) ; 
                        setDeleteTickedID(ele)
                    }}/>
                }
                 {
                    deleteTicketID === ele &&  <ChevronUp size={30} className={style.arrow} onClick={()=>{
                        localStorage.setItem("deleteTicket" , String(-1) ) ; 
                        setDeleteTickedID(-1)}} />
                }
                   
               
            </div>
             ) 
        }
        </div>
       
       
    </div>
  )
}

export default Page