/// <reference path="../../typings/globals/nanoajax/index.d.ts" />

class AddressBookService  {
    getAll (callback: (data: AddressBookItemDto[]) => void) {
        var url = '/api/data/all';
        nanoajax.ajax({
            url: url
        }, function(code: number, json: string) {
            callback(<AddressBookItemDto[]>JSON.parse(json));
        });
    };
    save (item: AddressBookItemDto, callback: (savedItem: AddressBookItemDto) => void) {
        var url = '/api/data/save';
        nanoajax.ajax({
            url: url, 
            method: 'POST', 
            body: JSON.stringify(item)
        }, function (code, json) {
            callback(JSON.parse(json));
        });
    };
    del (id: string, callback: () => void) {
        var url = '/api/data/delete/' + id;
        nanoajax.ajax({
            url: url, 
            method: 'DELETE', 
            body: ''
        }, function (code, json) {
            callback();
        });
    }

};