import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req,{requested:1});

    if (decision.isDenied) {
      if (decision.reason?.isRateLimit) return res.status(429).json({ message: "Too many requests,Try later" });
      if (decision.reason.isBot)  return res.status(403).json({ message: "Bot Spam Error" });
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  } catch (error) {
    console.log(`Arcjet Middleware Error`, error);
    res.status(500).json({message:"Internal Error in Arcjet Middleware"})
  }
};

export default arcjetMiddleware;