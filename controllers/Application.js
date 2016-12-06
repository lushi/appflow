const UserForm = require('../models/UserForm.js');

/* IDs of forms in application, in order */
const FORM_IDS = ['form0', 'form1', 'form2', 'form3', 'form4'];

const _getNextForm = (userForm) => {
  let id;
  for (let i = 0, l = FORM_IDS.length; i<l; i++) {
    id = FORM_IDS[i];
    if (!userForm.hasCompletedForm(id)) {
      return {
        id,
        index: i
      }
    }
  }
}

const getHandler = (req, res, next) => {
  const userId = 'user1'; // HACK: should get dynamically from session data
  const userForm = new UserForm(userId);
  const nextForm = _getNextForm(userForm);
  const data = userForm.getFormData(nextForm.id);

  res.render('application/Index', Object.assign({}, data, {step: nextForm.index+1}));
};

const postHandler = (req, res, next) => {
  const userId = 'user1'; // HACK: should get dynamically from session data
  const formData = req.body;

  const userForm = new UserForm(userId);
  userForm.saveData(formData.id, formData);

  const nextForm = _getNextForm(userForm);
  const data = userForm.getFormData(nextForm.id);

  res.render('application/Index', Object.assign({}, data, {step: nextForm.index+1}));
}
module.exports = { getHandler, postHandler };
