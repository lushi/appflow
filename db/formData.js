const Db = require('./Db.js');

Db.set('form', {
  id: 'form0',
  fields: {
    address: {
      collection: 'user_profile',
      key: 'address'
    },
    city: {
      collection: 'user_profile',
      key: 'city'
    },
    state: {
      collection: 'user_profile',
      key: 'state'
    },
    salary: {
      collection: 'user_finance',
      key: 'salary'
    }
  }
});

Db.set('form', {
  id: 'form1',
  fields: {
    number: {
      collection: 'user_profile',
      key: 'number'
    }
  }
});

Db.set('form', {
  id: 'form2',
  fields: {
    request_num: {
      collection: 'loan_request',
      key: 'request_num'
    }
  }
});

Db.set('form', {
  id: 'form3',
  fields: {
    foo: {
      collection: 'foo',
      key: 'foo'
    }
  }
});

Db.set('form', {
  id: 'form4',
  fields: {
    bar: {
      collection: 'bar',
      key: 'bar'
    }
  }
});
