module.exports.Index = (request, response) => {
  response.step = '5';
  response.render('application/Index', response);
}
