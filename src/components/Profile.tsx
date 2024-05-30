'use client'
import React from 'react'
import profile from "@/css/profile.module.css" ; 
import {CircleUserRound , ChevronDown }  from "lucide-react" ; 
import LoginSignup from './LoginSignup';
import {useState , useEffect} from "react" ; 
import Link from 'next/link';


const Profile : React.FC<any> = ({addToastMessage}) => {
    const [showOptions, setShowOptions] = useState( false) ; 
    const [showLogin , setShowLogin ] = useState( false ) ; 
    const [ showLoginOptions, setShowLoginOptions] = useState( ""  ) ; 
    // const [ showToastMessage , setShowToastMesssage]= useState("" ) ; 

   

   
    useEffect( ()=>{

      let loggedInUserID : any = localStorage.getItem("loggedInUserID") ; 
      setShowLoginOptions( loggedInUserID  ) ; 
    }, [showLogin , showOptions]) 

    function toggleShowOptions(){
        setShowOptions( prev => !prev ) ; 
    }
    function hideShowOptions(){
      setShowOptions( false ) ; 
    }
    function showLoginSignUp(){
      setShowLogin( true)
      setShowOptions( false ) ; 
      
    }

    function logout(){
      let loggedInUserID = localStorage.getItem("loggedInUserID") ; 
      localStorage.removeItem("loggedInUserID")  ; 
      let users : any = localStorage.getItem("users") ; 
      if( !users ){
        users = [] ; 
        localStorage.setItem("users"  , JSON.stringify( users ) ) ; 
      }
      users = localStorage.getItem("users") ; 
      users = JSON.parse( users ) ; 

     
      users = users.filter(( ele : any ) => ( Number(ele.id) != Number(loggedInUserID) )) ;
      localStorage.setItem( "users"  , JSON.stringify( users )) ; 
      console.log( "users " ,  users ) ;
      setShowLogin( false );
      setShowOptions( false ) ; 
      
    
      // window.open("/" , "_self") ;
      let msg : any = "Logged Out !! Successfully" ; 
      // setShowToastMesssage(()=> new String("")) ; 
      addToastMessage( msg )
      // setShowToastMesssage(msg) ;  
    }

    
    
  return (
    <>
     <div className={`${profile.secondDiv} ${profile.dontPrint}`} onClick={()=>toggleShowOptions()}>
     

        <CircleUserRound /> <p>My Account</p> <ChevronDown  className="navbar.downCursor"/>
        
       
       </div>
       { showOptions && <div className={profile.options}>
            <Link className={profile.link} href="/printticket" onClick={hideShowOptions}>
            <p>Show My Ticket</p>
            </Link>
          
            <Link className={profile.link} href="/cancellation" onClick={hideShowOptions}>
            <p>Cancel Ticket</p>
            </Link>
           
           {
            !showLoginOptions &&   <p onClick={()=>showLoginSignUp()}>Login / Signup</p>
           }
           {
            showLoginOptions &&
             <>
              <p onClick={logout}>LogOut</p> 
              <Link href="/myprofile" className={profile.link} onClick={hideShowOptions} >
              <p>My Profile</p>
              </Link>
              
              </>
           }
          
            
            
        </div>}


        { showLogin && <LoginSignup addToastMessage={addToastMessage}  setShowLogin={setShowLogin}/>}
        
    </>
  )
}

export default Profile