var AddressBookService = (function () {
    function AddressBookService() {
    }
    AddressBookService.prototype.getAll = function () {
        var url = '/api/data/all';
        return new Promise(function (resolve) {
            nanoajax.ajax({
                url: url
            }, function (code, json) {
                resolve(JSON.parse(json));
            });
        });
    };
    ;
    AddressBookService.prototype.save = function (item, callback) {
        var url = '/api/data/save';
        nanoajax.ajax({
            url: url,
            method: 'POST',
            body: JSON.stringify(item)
        }, function (code, json) {
            callback(JSON.parse(json));
        });
    };
    ;
    AddressBookService.prototype.del = function (id, callback) {
        var url = '/api/data/delete/' + id;
        nanoajax.ajax({
            url: url,
            method: 'DELETE',
            body: ''
        }, function (code, json) {
            callback();
        });
    };
    return AddressBookService;
}());
;
//# sourceMappingURL=service.js.map