/// <reference path="../../typings/globals/nanoajax/index.d.ts" />

class AddressBookService {
    getAll (): Promise<AddressBookItemDto[]> {
        var url = '/api/data/all';
        return new Promise<AddressBookItemDto>(resolve => {
            nanoajax.ajax({
                url: url
            }, function(code, json) {
                resolve(JSON.parse(json));
            });
        });
    };
    save (item: AddressBookItemDto, callback: (result: AddressBookItemDto) => void) {
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