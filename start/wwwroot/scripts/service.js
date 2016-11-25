AddressBookService = function(callback) {
    var getAll = function(callback) {
        var url = '/api/data/all';
        nanoajax.ajax({
            url: url
        }, function(code, json) {
            callback(JSON.parse(json));
        });
    };
    var save = function(item, callback) {
        var url = '/api/data/save';
        nanoajax.ajax({
            url: url, 
            method: 'POST', 
            body: JSON.stringify(item)
        }, function (code, json) {
            callback(JSON.parse(json));
        });
    };
    var del = function(id, callback) {
        var url = '/api/data/delete/' + id;
        nanoajax.ajax({
            url: url, 
            method: 'DELETE', 
            body: ''
        }, function (code, json) {
            callback();
        });
    }

    return {
        getAll: getAll,
        save: save,
        del: del
    }
};