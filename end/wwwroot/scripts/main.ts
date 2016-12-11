/// <reference path="../../typings/globals/knockout/index.d.ts" />

class AddressBookItemModel {
    
    private id: string;
    private name: KnockoutObservable<string>;
    private birthYear: KnockoutObservable<number>;
    private isFavoriteContact: KnockoutObservable<boolean>;
    private city: KnockoutObservable<string>;
    private isEditing: KnockoutObservable<boolean>;

    constructor (private addressBookItemsDto: AddressBookItemDto) {
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
    cancelEdit = function() {
        this.isEditing(false);
        this.name = ko.observable(this.addressBookItemsDto.name);
        this.birthYear = ko.observable(this.addressBookItemsDto.birthYear);
        this.isFavoriteContact = ko.observable(this.addressBookItemsDto.isFavoriteContact);
        this.city = ko.observable(this.addressBookItemsDto.city);
    };
};

var ViewModel = function() {
    var self = this;
    var service = new AddressBookService();
    self.data = ko.observableArray([]);
    self.newItem = new AddressBookItemModel({
        id: undefined,
        city: '',
        name: '',
        birthYear: null,
        isFavoriteContact: false
    });
    self.editNew = function() {
        self.newItem.edit();
    };
    self.saveNew = function() {
        var dto: AddressBookItemDto = {
            id: undefined,
            name: self.newItem.name(),
            city: self.newItem.city(),
            birthYear: self.newItem.birthYear(),
            isFavoriteContact: self.newItem.isFavoriteContact()
        }
        service.save(dto, function(responseDto) {
            self.newItem.name('');
            self.newItem.city('');
            self.newItem.birthYear(null);
            self.newItem.isFavoriteContact(false);
            self.newItem.isEditing(false);
            self.data.push(new AddressBookItemModel(responseDto));
        });
    };
    self.cancelEditNew = function() {
        self.newItem.cancelEdit();
    };

    var refresh = async function() {
        var addressBookItemDtos = await service.getAll();
        self.data.removeAll();
        addressBookItemDtos.forEach(function(dto) {
            self.data.push(new AddressBookItemModel(dto));
        });
    };
    
    self.deleteEntry = function(entry) {
        if (window.confirm("Do you really want to delete contact: " + entry.name() + "?")) {
            service.del(entry.id, function() {
                refresh();
            });
        }
    };

    refresh();
};

document.addEventListener('DOMContentLoaded', function () {
    ko.applyBindings(new ViewModel());
});