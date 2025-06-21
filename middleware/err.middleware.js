const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;
    console.error(err);

    //middleware for  castError
    if (error === "CastError") {
      const message = "Resource not found",
        error = new Error(err.message);
      error.statuscode = 400;
    }
    //middleware for duplicate key
    if (error === 11000) {
      const message = "Duplicate keys not found";
      error = new Error(err.message);
      error.statuscode = 400;
    }

    //middleware for validation error
    if (error === "ValidationError") {
      const message = Object.values(err.Object).map((val) => val.message);
      error = new Error(err.message.join(","));
      error.statuscode = 400;
    }

    res
      .statuscode(error.statuscode || 500)
      .json({ success: false, message: error.message || "Server Error" });
  } catch (error) {
    next();
  }
};

export default errorMiddleware;
