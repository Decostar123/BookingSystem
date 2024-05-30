'use client' ;
import React from 'react'
import loginsignup from "../css/loginsinup.module.css"
const LoginSignup  : React.FC<any> = ({setShowLogin , setShowToastMesssage , addToastMessage}) => {
  function formSubmitted(e:any){
      e.preventDefault() ; 
      let phone = e.target.phone.value ; 
      let mail = e.target.mail.value ;
      let id  = Date.now() ; 
      phone = phone.trim() ; 
      mail = mail.trim() ; 


      if( phone.length != 10 ){
        alert("Please enter proper Phone Number") ; 
        return ; 
      }

      let userObj = { phone  ,mail , id }; 
      let exist : any = checkDuplicate( userObj ) ; 
      if( exist ){
        alert("User already Exist") ; 
        return  ; 
      }
      // return  ; 
     
      let users : any = localStorage.getItem("users") ; 
      if( !users ){
        users = [] ; 
        localStorage.setItem("users"  , JSON.stringify( users ) ) ; 
      }
      users = localStorage.getItem("users") ; 
      users = JSON.parse( users ) ; 

      users.push(userObj  ) ; 
      localStorage.setItem("users"  , JSON.stringify( users ) ) ; 
      localStorage.setItem("loggedInUserID" , JSON.stringify(id) ) ; 
      setShowLogin( false ) ; 
      addToastMessage( "Logged In !! Successfully")
      // setShowToastMesssage("Logged In !! Successfully") ; 
      // setShowToastMesssage("") ; 
      
  }
  function checkDuplicate( userObj  :any ){
    let users : any = localStorage.getItem("users") ; 
    if( !users ){
      users = [] ; 
      localStorage.setItem("users"  , JSON.stringify( users ) ) ; 
    }
    users = localStorage.getItem("users") ; 
    users = JSON.parse( users ) ; 
    let ind : any = users.findIndex( ( ele : any ) => ( ele.phone === userObj.phone || ele.mail === userObj.mail )) ; 
    if( ind !== - 1 ) return true ; 
    return false ; 
  }
  return (
    <>
    <div className={loginsignup.outerForm} onClick={()=>setShowLogin(false)} ></div>
    <div className={loginsignup.box} >
      <form className={loginsignup.innerForm} onSubmit={e => formSubmitted(e)}>
                <input className={loginsignup.formInput} name="phone" placeholder="Enter Phone number, (+91)" type="number"/>
                <input className={loginsignup.formInput} name="mail" placeholder="Enter Mail" type="email"/>
                <button type="submit" >SIGNIN</button>
            </form>
      </div>
    </>
    
     
        
    
  )
}

export default LoginSignup