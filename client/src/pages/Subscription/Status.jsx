import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateSubscription } from '../../actions/users'
import Swal from "sweetalert2"

const Status = () => {

    const query = new URLSearchParams(window.location.search)
    const User = JSON.parse(localStorage.getItem('Profile'))
    const dispatch = useDispatch()
    const subscriptionPlan = query.get('plan')
    const sessionId = query.get('session_id')
    const currentDate = Date.now()

    const handleStatus = (status) => {
      if(status === 'success'){
        dispatch(updateSubscription(User?.result?._id, {subscriptionPlan: subscriptionPlan, subscriptionDate: currentDate, sessionId: sessionId}))
        Swal.fire({
          title: "Payment Successful",
          text: `your subscription for ${subscriptionPlan} plan is activated`,
          icon: "success",
          confirmButtonText: "OK",
          
        }).then(function () {
            window.location.href = "/";
      })
      }
      else if(status === 'failed'){
        Swal.fire({
          title: "Payment Failed",
          text: `your subscription for ${subscriptionPlan} plan is not activated due to payment failed, please try again!`,
          icon: 'error',
          confirmButtonText: "OK",
        }).then(function () {
            window.location.href = "/Subscription";
      })
      }

    }

    useEffect(() => {
        if (query.get('success') && sessionId !== null) {
            console.log('payment successful')
            handleStatus('success')         
        }else{
          Swal.fire({
            title: "Payment Failed",
            text: `your subscription for ${subscriptionPlan} plan is not activated due to payment failed, please try again!`,
            icon: 'error',
            confirmButtonText: "OK",
          }).then(function () {
              window.location.href = "/Subscription";
          })
        }
    
        if (query.get('canceled')) {
            console.log('payment failed')
            handleStatus('failed')
        }
       
    }, [])

  return (
    <div></div>
  )
}

export default Status