const UserForm = require('../models/UserForm.js');

/* IDs of forms in application, in order */
const FORM_IDS = ['form0', 'form1', 'form2', 'form3', 'form4'];

const getHandler = (req, res) => {
  const user_id = 'user1';
  const userForm = new UserForm(user_id);
  let id, nextFormId, nextFormIdx;
  for (let i = 0, l = FORM_IDS.length; i<l; i++) {
    id = FORM_IDS[i];
    if (!userForm.hasCompletedForm(id)) {
      nextFormId = id;
      nextFormIdx = i;
      break;
    }
  }

  const data = userForm.getFormData(nextFormId);

  res.render('application/Index', Object.assign({}, data, {step: nextFormIdx+1}));
};

module.exports = { getHandler };
