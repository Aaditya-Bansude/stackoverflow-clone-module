import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import './Auth.css'
import StackIcon from '../../assets/StackIcon.png'
import {signup, login} from '../../actions/auth'
import Loading from '../../assets/Loading.gif'

const Auth = () => {

    const [isSignup, setSignup] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleSwitch = () => {
        setSignup(!isSignup)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!email){
            alert("Enter an email")
        }
        else if(!password){
            alert("Enter a password")
        }
        if(isSignup){
            if(!name){
                alert("Enter a name to continue")
            }
            dispatch(signup({name, email, password}, navigate, setLoading))
        }else{
            dispatch(login({email, password}, navigate, setLoading))
        }
    }
    
    return (
        <section class='auth-section'>
            {
                isSignup && (
                    <div class="auth-about">
                        <h1>Join the Stack Overflow community</h1>
                        <p>Get unstuck — ask a question</p>
                        <p>Unlock new privileges like voting and commenting</p>
                        <p>Save your favorite tags, filters, and jobs</p>
                        <p>Earn reputation and badges</p>
                        <p style={{fontSize: "13px", color: "rgb(102, 103, 103)"}}>Collaborate and share knowledge with a private group for</p>
                        <p style={{fontSize: "13px", color: "rgb(0, 122, 198)"}}>Get Stack Overflow for Teams free for up to 50 users.</p>
                    </div>
                ) 
            }
            <div class='auth-container'>
                { !isSignup && <img src={StackIcon} alt='Stack Overflow' className='login-logo'/>}
                <form onSubmit={handleSubmit}>
                    {
                        isSignup && (
                        <label htmlFor="name">
                            <h4>Name</h4>
                            <input type='text' name='name' id='name' onChange={(e) => {setName(e.target.value)}}/>
                        </label>
                        )
                    }
                    <label htmlFor="email">
                        <h4>Email</h4>
                        <input type='email' name='email' id='email' onChange={(e) => {setEmail(e.target.value)}}/>
                    </label>
                    <label htmlFor="password">
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <h4>Password</h4>
                            {!isSignup && <p style={{color: "#666767", fontSize: "13px"}}>forgot password?</p>}
                        </div>
                        <input type='password' name='password' id='password' onChange={(e) => {setPassword(e.target.value)}}/>
                        {isSignup && ( 
                            <p style={{color: "#666767", fontSize: "13px"}}>
                                password must contain at least 8 characters, including <br /> at least 1 letter and 1 number.
                            </p>
                            )
                        }
                    </label>
                    {
                        isSignup && (
                            <label htmlFor='check'>
                                <input type='checkbox' id='check'/>
                                <h7 style={{fontSize: "13px"}}>
                                    Opt-in to receive occasional, product updates, <br /> company announcement and digests.
                                </h7>
                            </label>
                        )
                    }
                    <button type='submit' className='auth-btn'>{isSignup ?  (loading ? <img src={Loading} alt="Loading" height='15px'/> : 'Sign up') :  (loading ? <img src={Loading} alt="Loading" height='15px'/> : 'Log in')} </button>
                    {
                        isSignup && (
                            <p style={{color: "#666767", fontSize: "13px"}}>
                                By clicking "Sign up", you agree to our
                                <span style={{color: "blue"}}> terms of service</span>, <br />
                                <span style={{color: "blue"}}> privacy policy</span> and 
                                <span style={{color: "blue"}}> cookie policy.</span>
                            </p>
                        )
                    }
                </form>
                <p>
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}
                    <button type='submit' className='switch-btn' onClick={handleSwitch}>{isSignup ? 'Log in' : 'Sign up'}</button>
                </p>
            </div>
        </section>
            
    )
}

export default Auth