module.exports = {
  
  // GET /techniques/:id
  get_error : function(req, res){
    res.render('error', {message: req.params.message});
  }
  
}
