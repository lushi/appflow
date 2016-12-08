const Db = (() => {
  let _data = {};

  let id = 0;
  const _generateId = () => {
    return id++;
  }

  return {
    get: (collection, id) => {
      if (typeof collection === 'undefined' || collection === null) {
        throw new Error('COLLECTION_UNDEFINED');
      }

      if (typeof _data[collection] === 'undefined') {
        throw new Error('COLLECTION_NOT_EXIST');
      }

      if (typeof _data[collection][id] === 'undefined') {
        throw new Error('ID_NOT_EXIST');
      }

      return _data[collection][id];
    },

    set: (collection, data) => {
      if (typeof collection === 'undefined' || collection === null) {
        throw new Error('COLLECTION_UNDEFINED');
      }

      if (typeof data === 'undefined' || data === null) {
        throw new Error('DATA_UNDEFINED');
      }

      const now = Date.now();
      let doc = Object.assign({}, data, {
        creation_time: now,
        modified_time: now
      });

      if (typeof doc.id === 'undefined') {
        doc.id = _generateId();
      }

      if (!_data[collection]) {
        _data[collection] = {};
      }

      _data[collection][doc.id] = doc;
      return doc;
    }
  }
})();

module.exports = Db;
