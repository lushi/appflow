const UserForm = require('../models/UserForm.js');
/* Using simple datastore for proof of concept. Should use a real db*/
const Db = require('../db/Db.js');

const Application = (() => {
  /* IDs of forms in application, in order */
  const FORM_IDS = ['form0', 'form1', 'form2', 'form3', 'form4'];

  const _getNextForm = (completedForms, step) => {
    let id;

    if (typeof step !== 'undefined') {
      id = FORM_IDS[step];
      if (completedForms.indexOf(id) > -1) {
        return {
          id,
          index: step
        }
      }
    }

    for (let i = 0, l = FORM_IDS.length; i<l; i++) {
      id = FORM_IDS[i];
      if (completedForms.indexOf(id) < 0) {
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

  const _render = (userForm, res, step) => {
    const completedForms = userForm.getCompletedFormIds();
    const nextForm = _getNextForm(completedForms, step);
    const data = userForm.getFormData(nextForm.id);
    const completedSteps = _mapFormsToSteps(completedForms);

    res.render('application/Index', Object.assign({}, data, {
      step: nextForm.index + 1,
      completed: completedSteps
    }));
  }

  return {
    getHandler: (req, res, next) => {
      const userId = 'user1'; // HACK: should get dynamically from session data
      const userForm = new UserForm(Db, userId);
      const step = parseInt(req.params.step) - 1;
      _render(userForm, res, step);
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
