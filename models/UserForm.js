class UserForm {
  constructor(user_id) {
    this.user_id = user_id;
  }

  saveData(form_id, data) {
    this.data = data;
  }

  getFormData(form_id) {
    const data = {
      id: form_id,
    }

    return data;
  }

  hasCompletedForm(form_id) {
    return false;
  }

  getEditableFormIds() {
    return [];
  }
}

module.exports = UserForm;
