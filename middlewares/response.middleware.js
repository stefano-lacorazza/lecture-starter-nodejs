const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query


  if (req.error_message) {
    if(req.error_message === "User not found!" || req.error_message === "Fighter not found!"){
      res.status(404).send({ error: true, message: req.error_message });
      
    }
    else{
      res.status(400).send({ error: true, message: req.error_message });
    }
    
    
  }
  else{
    res.status(200);
    next();
  }
  
};

export { responseMiddleware };
