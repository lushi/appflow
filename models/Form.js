class Form {
  constructor(db, form_id) {
    this.db = db;
    this.form_id = form_id;
    this.collection = 'form';
  }

  /* Sets data for form with id this.form_id
  * The data includes form id and an array of key-value pairs,
  * where the key is the form field name, and the value contains the type of
  * data, the table/collection, and the column/key that the data for the field
  * data should be stored in.
  */
  set(data) {
    this.db.set(this.collection, data);
  }

  /* Gets data for form with id this.form_id
  * The return data includes form id and an array of key-value pairs,
  * where the key is the form field name, and the value contains the type of
  * data, the table/collection, and the column/key that the data for the field
  * data should be stored in.
  */
  get() {
    return this.db.get(this.collection, this.form_id);
  }

  /* Saves data from the given form
  * The form record contains information about what table -> field
  * each form field corresponds to.
  * E.g. In a NoSQL database, the form document can contain key-value pairs,
  * where the key is the form field name, and the value is an object that
  * contains the collection and key that the data for this form field should
  * be stored in.
  */

  saveData(data) {
    /* group data by collection */
    const fields = this.get().fields;
    let dbLoc, d = {};
    Object.keys(fields).forEach((name) => {
      if (data[name]) {
        dbLoc = fields[name];
        if (!d[dbLoc.collection])
          d[dbLoc.collection] = {};

        d[dbLoc.collection][dbLoc.key] = data[name];
      }
    });

    Object.keys(d).forEach((collection) => {
      this.db.set(collection, d[collection]);
    })
  }
}

module.exports = Form;
