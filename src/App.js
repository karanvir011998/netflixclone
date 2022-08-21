// import logo from './logo.svg';
import './App.css';
import styled from "styled-components";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function App() {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 

  const Div = styled.div`
  /* background-color: black; */
  min-height: 660px;

  .signin{
    
    opacity: 0.8;
    border-radius: 5px;
    background-color: black;
    color:white;
    padding: 35px;
    max-width: 330px;
    margin: auto;
    /* border: 1px solid white; */
    min-height: 540px;
  }
  form{
    display: flex;
    flex-direction: column;
  }
  .white{
    color: white;
  }
  .red{
    color:red;
    /* line-height: 60px; */
    margin-left: 20px;
    font-size:40px ;
  }
  .needhelp{
    float:right;
  }
  /* .form .input{
    height: 55px;
  } */
  .inputbtn{
    background-color: red;
    min-height: 50px;
    color:white;
    border-radius: 6px;
    border: none;
  }
  .input{
    /* background-color: grey; */

    background: #333;
    ::placeholder{
      color: white;
    }
    color: white;
    min-height: 50px;
    border-radius: 6px;
    border: none;
  }  
  .err{
    color:#e87c03;
  }
  `;
  const onSubmit = async (data) =>{
    try{
      const res = await axios.post(
        "https://sql-dev-india.thewitslab.com:3003/auth/login",
        data
      );
      if(res.status === 200){
        // alert("Done");
        navigate("/dashboard"); 
        localStorage.setItem("userData",JSON.stringify(res));
        // localStorage.setItem("token",JSON.stringify(res.token));
          console.log(res);
        }
    }
    catch(err){
      alert("Not Registered");

    }
  }
  
  return (
    <>
    <Div className="App">
    <h4 className='red'>Netflix</h4>

      <div className="signin">
        <h2 className='white'>Sign In</h2>

         <form className='form' onSubmit={handleSubmit(onSubmit)}>
          {/* {errors.email || errors.password} */}
          <input className='input' {...register('email',{required:true,pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/})} placeholder="  Email or phone number"/>
          {errors.email && <p className='err'>Please enter valid email </p> }
          <br />
          <input className='input' {...register('password',{required:true})} type="password" placeholder="  Password"/>
          {errors.password && <p className='err'>Your password must contain between 4 and 60 characters. </p> }

          <br /><br />
          <button className='inputbtn'type="submit">Sign In</button>

        </form>
        <input type="checkbox" name="Remember me" value="Remember Me" id="RememberMe" checked/>Remember Me
        <span className='needhelp'> Need help?</span><br /><br /><br /><br />
        <span className='new'>New to Netflix?</span>
        <span className='signup'>Sign up now.</span><br />
        
        <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. 
        <a >Learn more.</a></p>
      </div>

    </Div>

    </>
  );
}

export default App;
