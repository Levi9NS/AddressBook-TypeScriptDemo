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