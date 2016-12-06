/// <reference path="../../typings/globals/knockout/index.d.ts" />

class AddressBookItemModel {
    id: number;
    name: KnockoutObservable<string>;
    birthYear: KnockoutObservable<number>;
    isFavoriteContact: KnockoutObservable<boolean>;
    city: KnockoutObservable<string>;
    isEditing: KnockoutObservable<boolean>;

    constructor(private addressBookItemsDto) {
        this.id = addressBookItemsDto.id;
        this.name = ko.observable(addressBookItemsDto.name);
        this.birthYear = ko.observable(addressBookItemsDto.birthYear);
        this.isFavoriteContact = ko.observable(addressBookItemsDto.isFavoriteContact);
        this.city = ko.observable(addressBookItemsDto.city);
        this.isEditing = ko.observable(false);
    }
    edit () {
        this.isEditing(true);
    };
    save () {
        this.isEditing(false);
        var service = new AddressBookService();
        this.addressBookItemsDto.name = this.name();
        this.addressBookItemsDto.birthYear = this.birthYear();
        this.addressBookItemsDto.isFavoriteContact = this.isFavoriteContact();
        this.addressBookItemsDto.city = this.city();
        service.save(this.addressBookItemsDto, function() { });
    };
    cancelEdit () {
        this.isEditing(false);
        this.name = ko.observable(this.addressBookItemsDto.name);
        this.birthYear = ko.observable(this.addressBookItemsDto.birthYear);
        this.isFavoriteContact = ko.observable(this.addressBookItemsDto.isFavoriteContact);
        this.city = ko.observable(this.addressBookItemsDto.city);
    };

};

class ViewModel {
    constructor() {
        this.refresh();
    }

    service = new AddressBookService();
    data = ko.observableArray([]);
    newItem = new AddressBookItemModel({
        city: '',
        name: '',
        birthYear: null,
        FavoriteContact: false
    });
    editNew = function() {
        this.newItem.edit();
    };
    saveNew () {
        var dto : AddressBookItemDto = {
            id: undefined,
            name: this.newItem.name(),
            city: this.newItem.city(),
            birtYear: this.newItem.birthYear(),
            isFavoriteContact: this.newItem.isFavoriteContact(),
            phoneNumber: ''
        }
        this.service.save(dto, (responseDto) => {
            this.newItem.name('');
            this.newItem.city('');
            this.newItem.birthYear(null);
            this.newItem.isFavoriteContact(false);
            this.newItem.isEditing(false);
            this.data.push(new AddressBookItemModel(responseDto));
        });
    };
    cancelEditNew () {
        this.newItem.cancelEdit();
    };

    private refresh () {
        this.service.getAll((addressBookItemDtos) => {
            this.data.removeAll();
            addressBookItemDtos.forEach((dto) => {
                this.data.push(new AddressBookItemModel(dto));
            });
        });
    };
    
    deleteEntry: Function = (entry) => {
        if (window.confirm("Do you really want to delete contact: " + entry.name() + "?")) {
            this.service.del(entry.id, () => {
                this.refresh();
            });
        }
    };
};

document.addEventListener('DOMContentLoaded', () => {
    ko.applyBindings(new ViewModel());
});