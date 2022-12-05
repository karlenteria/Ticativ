import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

// import { useDispatch, useSelector } from "react-redux";
import './Signup.css';
const SignUp = () => {
    const [userName, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [extensionName, setExtensionName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    // const [ hasError, setHasError ] = useState( false );
    // const [ errorMessage, setErrorMessage ] = useState('');
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ address, setAddress ] = useState('');

    
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "username"){
            setUsername(value);
        }
        if(id === "firstname"){
            setFirstName(value);
        }
        if(id === "middlename"){
            setMiddleName(value);
        }
        if(id === "lastname"){
            setLastName(value);
        }
        if(id === "extensionname"){
            setExtensionName(value);
        }
        if(id === "emailaddress"){
            setEmailAddress(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "address"){
            setAddress(value);
        }
        if(id === "phonenumber"){
            setPhoneNumber(value);
        }
    }
    
    const handleSubmit  = (event) => {
        event.preventDefault();

        // console.log(email,password);
        let newAccount = {
            fullname: `${firstName} ${lastName} ${extensionName}` ,
            emailAddress: emailAddress,
            password: password,
            mobileNumber: phoneNumber,
            address
        }
        alert('Registration submitted')
        axios.post('http://localhost:8088/api/v1/auth/register', {newAccount} ).then( result =>{
            console.log(result.data);
        });
    };

    return(
        <form onSubmit={handleSubmit}>
            <div className = 'registerPagePhoto'>
            {/* <img 
                className = 'registerPagePhoto'
                src = './Assets/kangaroo.jpg' 
                alt = 'pet mate kangaroo' /> */}
            <div className ='login-form-container'>
            <table>
                <tr>
                <th>
                <div className="username">
                    
                        <input 
                        id="username" 
                        value={userName} onChange = {(e) => handleInputChange(e)} 
                        placeholder="username" 
                        type="username" />
                </div>
                </th>
                </tr>
                <tr>
                    <td>
                <div className="firstname">
                    
                    <input 
                        id="firstname" 
                        value={firstName} onChange = {(e) => handleInputChange(e)} 
                        placeholder="First Name" 
                        type="firstname" />
                </div>
                </td>
                </tr>
                
                <div className="middlename">
                    
                    <input 
                        id="middlename" 
                        value={middleName} onChange = {(e) => handleInputChange(e)} 
                        placeholder="Middle Name" 
                        type="middlename" />
                </div>
                <div className="lastname">
                    
                    <input 
                        id="lastname" 
                        value={lastName} onChange = {(e) => handleInputChange(e)} 
                        placeholder="Last Name" 
                        type="lastname" />
                </div>
                <div className="extensionname">
                    
                    <input 
                        id="extensionname" 
                        value={extensionName} onChange = {(e) => handleInputChange(e)} 
                        placeholder="Extension Name" 
                        type="extensionname" />
                </div>
                    <th>
                <div className  = "emailaddress">
                    

                    {/* <input value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email" type="email" /> */}
                    <input  id = "emailaddress" onChange = {(e) => handleInputChange(e)} 
                            placeholder = "Email" type = "emailaddress" /> 
                </div>
                <div className="password">
                    

                    <input  id = "password" value = {password} onChange = {(e) => handleInputChange(e)} 
                            placeholder = "Password" type = "password" />
                    {/* <input onChange = {(e) => handleInputChange(e)} placeholder="Password" type="password" /> */}
                    {/* { hasError && <small className='error'>{ errorMessage }</small> } */}
                </div>
                <div className="phonenumber">
                    
                    <input 
                        id="phonenumber" 
                        value={phoneNumber} onChange = {(e) => handleInputChange(e)} 
                        placeholder="Contact Number" 
                        type="phonenumber" />
                </div>
                <div className = "address">

                    <input 
                        id = "address" 
                        value = {address} 
                        onChange = {(e) => handleInputChange(e)} 
                        placeholder = "Address" 
                        type = "Address" />
                </div>
                </th>
                </table>
                <Link to = '/login'>
                    <button type="submit" className="btn" > Register </button>
                </Link>
            </div>
            </div>
        </form>      
    )       
};
export default SignUp;
