import React from 'react'
import { useSelector} from 'react-redux'
import './Subscription.css'

const Subscription = () => {

    const id = JSON.parse(localStorage.getItem('Profile'))?.result?._id
    const users = useSelector((state) => state.usersReducer)
    const User = users.filter((user) => user._id === id)[0]
    
    const handleButton = (plan) => {
        if(User === undefined){
            return(<button className='disable-btn' disabled title='login or signup to subscribe'>subscribe</button>)
        }
        else{
            if(User?.subscriptionPlan === plan){
                return(<a href={process.env.CLIENT_URL}><button >continue</button></a>)
            }
            else{
                if(plan === "free"){
                    return(<a href={process.env.CLIENT_URL}><button>subscribe</button></a>)
                }
                else{
                    return(
                        <form action={`${process.env.SERVER_URL}/payment/checkout`} method="POST">
                            <input className="plan" type="hidden" name="plan" value={plan} />
                            <button id="checkout-btn" type="submit">subscribe</button>
                        </form>
                    )
                }
            }
        }
    }

  return (
    
    <div>
    <section class="sub-section">  
        <div class="sub-container-first">
            {
                User?.subscriptionPlan === "free" ? <div className='tag-ribbon'>Current</div> : <div></div>
            }
            <h2>Free Tier</h2>
            <p class="brief">Basic membership</p>
            <h1 class="price">
                ₹0<p>per month</p>
            </h1>
            <ul class="features">
                <li>This is a Basic Free membership.</li>
                <li>Max 1 question can post per day.</li>
                <li>Total 30 questions per month.</li>
                <p></p>
                {handleButton("free")}
            </ul>
        </div>
        <div class="sub-container-second">
            {
                User?.subscriptionPlan === "silver" ? <div className='tag-ribbon'>Current</div> : <div></div>
            }
            <h2>Silver Plan</h2>
            <p class="brief">Plus membership</p>
            <h1 class="price">
                ₹100 <p>per month</p>
            </h1>
            <ul class="features">
                <li>This is a Plus membership plan.</li>
                <li>Max 5 questions can post per day.</li>
                <li>Monthly ₹100 for max 150 questions.</li> 
                <p></p>
                {handleButton("silver")}
            </ul>
        </div>
        <div class="sub-container-third ">
            {
                User?.subscriptionPlan === "gold" ? <div className='tag-ribbon'>Current</div> : <div></div>
            }
            <h2>Gold Plan</h2>
            <p class="brief">Premium membership</p>
            <h1 class="price">
                ₹1000<p>per month</p>
            </h1>
            <ul class="features">
                <li>This is a Premium membership with all benefits.</li>
                <li>Unlimited questions can post daily.</li>
                <li>Premium access with Unlimited questions.</li>  
                {handleButton("gold")}
            </ul>
        </div>  
    </section>
    </div>
  )
}

export default Subscription