const UserForm = require('../models/UserForm.js');
/* Using simple datastore for proof of concept. Should use a real db*/
const Db = require('../db/Db.js');

const Application = (() => {
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

  const _mapFormsToSteps = (forms) => {
    let completed = [];
    FORM_IDS.forEach((form, idx) => {
      if (forms.indexOf(form) > -1) {
        completed[idx] = {
          form: form,
          step: idx + 1};
      }
    })

    return completed;
  }

  const _render = (userForm, res) => {
    const nextForm = _getNextForm(userForm);
    const data = userForm.getFormData(nextForm.id);
    const doneForms = userForm.getCompletedFormIds();
    const completedSteps = _mapFormsToSteps(doneForms);

    res.render('application/Index', Object.assign({}, data, {
      step: nextForm.index + 1,
      completed: completedSteps
    }));
  }

  return {
    getHandler: (req, res, next) => {
      const userId = 'user1'; // HACK: should get dynamically from session data
      const userForm = new UserForm(Db, userId);

      _render(userForm, res);
    },

    postHandler: (req, res, next) => {
      const userId = 'user1'; // HACK: should get dynamically from session data
      const formData = req.body;

      const userForm = new UserForm(Db, userId);
      userForm.saveData(formData.id, formData);

      _render(userForm, res);
    }
  }
})();
module.exports = Application;
