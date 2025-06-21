import subscriptionModel from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscribtionUser = await subscriptionModel.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json({ success: true, message: subscribtionUser });
  } catch (error) {
    next(error);
  }
};

export const getUsersSubscription = async  (req,res,next) =>{
  try {
    if(req.user.id !==  req.params.id){
      const error  = new Error("You are not owner of this account")
      error.status =  403
      throw error   
    }

    const subscription = await subscriptionModel.find({user:req.params.id})

    res.status(200).json({successful:true,message:subscription})
  } catch (error) {
    next(error)
  }
}