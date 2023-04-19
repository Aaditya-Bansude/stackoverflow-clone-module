import React, {useRef, useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import { useMutation } from "react-query"
import emailjs from 'emailjs-com'
import { fetchResponse } from '../../actions/chatbotAPI'
import './Chatbot.css'
import SendIcon from '../../assets/SendIcon.png'
import Loader from '../../assets/Loader.gif'

const Chatbot = () => {

  const User = useSelector((state) => (state.currentUserReducer))  
  const [value, setValue] = useState('');
  const parent = useRef(null);
  const bottomRef = useRef(null);
  const [chat, setChat] = useState([]);
  const [OTP, setOTP] = useState('')
  const [authenticate, setAuthenticate] = useState(false)
  const [authenticateFail, setAuthenticateFail] = useState(false)

  useEffect(()=>{
    fetchResponse([{sender: "user", message: 'generate 6 digit otp'}]).then((data) =>{
      setOTP(data.message.replace(/^\n\n/, ""))
      emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID, {'name': User?.result?.name, 'email': User?.result?.email, 'OTP': data.message.replace(/^\n\n/, "")}, process.env.EMAILJS_ID)
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      })
    })
  }, [])
  
  useEffect(()=>{
    bottomRef.current?.scrollIntoView({behavior: "smooth"})
  }, [chat])

  const mutation = useMutation({
    mutationFn: () => {
      return fetchResponse(chat);
    },
    onSuccess: (data) =>
      setChat((prev) => [
        ...prev,
        { sender: "ai", message: data?.message?.replace(/^\n\n/, "") },
      ]),
  });

  const sendMessage = async (message) => {
    await Promise.resolve(setChat((prev) => [...prev, message]));
    mutation.mutate();
  };

  const handleSubmit = (e) => {
    if (value === ""){
      return;
    }
    else if(authenticate){
      sendMessage({ sender: "user", message: value });
      e.preventDefault()
      document.getElementById("div-input").innerHTML = ""
    }
    else if(value === OTP){
      setAuthenticate(true)
      setAuthenticateFail(false)
      e.preventDefault()
      document.getElementById("div-input").innerHTML = ""
    }
    else{
      setAuthenticateFail(true)
      setAuthenticate(false)
      e.preventDefault()
      document.getElementById("div-input").innerHTML = ""
    }
  };

  
  return (

    <div className='chatbot-container'>
      <div className="chatbot-response">
        <div className='chatbot-response-results'>
          <div className='chatbot-response-result'>
            <pre><span>Welcome to AI Chatbot</span></pre>
          </div>
          <div className='chatbot-response-result'>
            <pre><span>Enter Authentication Code sent on {User?.result?.email}</span></pre>
          </div>
          {
            authenticate ? 
              <div className='chatbot-response-result'>
                <pre><span>Authentication Successful.</span></pre>
                <pre><span>hello {User?.result?.name}, how can I help you?</span></pre>
              </div>
              :
              <></>
          }
          {
            authenticateFail ?
              <div className='chatbot-response-result'>
                <pre><span>you've entered invalid OTP.</span></pre>
              </div>
              :
              <></>
          }
        </div>
        {
          authenticate ?
            <div className='chatbot-response-results' ref={parent}>
              {chat.map((message, i) => {
                return (
                  <div key={i} className={message.sender === 'ai' ? 'chatbot-response-result' : 'chatbot-response-input'}>
                    <pre>
                      <span>{message.message}</span>
                    </pre>
                  </div>
                );
              })}

              <div ref={bottomRef} style={{height: 3}}></div>
            </div>
            :
            <></>
          }
      </div>
      <div className='chatbot-input'>
        <div
          onKeyDown={(e) => { 
            e.key === 'Enter' && (e.shiftKey ? setValue(value + "\n") : handleSubmit(e))
          }}
          onInput={(e) => setValue(e.currentTarget.textContent)}
          id="div-input"
          className="chatbot-input-area"
          contentEditable={true}
        >{mutation.isLoading ? <center><img src={Loader} alt="Loading" width='40px'/></center> : <></>}</div>

        <img
          onClick={handleSubmit}
          src={SendIcon}
          height="20px"
          alt="send-button"
          className="chatbot-input-send-btn"
        />
      </div>
    </div>
  )
}

export default Chatbot