import Stripe from 'stripe'

export const paymentCheckout = async (req, res) => {
    
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const {plan} = req.body
    var priceId 
        
    if(plan === 'silver'){
        priceId = process.env.SILVER_PLAN_KEY
    }else if(plan === 'gold'){
        priceId = process.env.GOLD_PLAN_KEY
    }
    
    const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        line_items: [
            {
            price: priceId,
            quantity: 1,

            },
        ],
        mode: 'subscription',
        success_url: `${process.env.CLIENT_URL}/Subscription/status/?success=true&plan=${plan}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/Subscription/status/?canceled=true`,
    });

    res.redirect(303, session.url);
}
