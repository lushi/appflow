const Form = require('./Form.js');

class UserForm {
  constructor(db, user_id) {
    this.db = db;
    this.user_id = user_id;
    this.collection = 'user_form';
  }

  /*  Saves data from the given form for this user and appends form_id to
   *  forms the user has completed (in table/collection 'user_form');
   */
  saveData(form_id, data) {
    // pass data to
    new Form(this.db, form_id).saveData(data);

    // append form_id to list of forms that the user has completed
    let userForm;
    try {
      userForm = this.db.get(this.collection, this.user_id);
    } catch (e) {
      userForm = {
        id: this.user_id,
        completed: []
      };
    }

    userForm.completed.push(form_id);
    this.db.set(this.collection, userForm);
  }

  /* Gets data for the given form from the 'form' table/collection.
  * The return data includes form id and an array of key-value pairs,
  * where the key is the form field name, and the value contains the type of
  * data
  */
  getFormData(form_id) {
    return new Form(this.db, form_id).get();
  }

  /* Check if given form_id is in list of completed form ids for the user */
  hasCompletedForm(form_id) {
    const doneForms = this.getCompletedFormIds();
    return doneForms.indexOf(form_id) > -1;
  }

  /* Get list of form ids that the user has completed in table/collection
   * 'user_form'
  */
  getCompletedFormIds() {
    try {
      return this.db.get(this.collection, this.user_id).completed;
    } catch (e) {
      if (e == 'Error: COLLECTION_NOT_EXIST')
        return [];
    }
  }
}

module.exports = UserForm;
