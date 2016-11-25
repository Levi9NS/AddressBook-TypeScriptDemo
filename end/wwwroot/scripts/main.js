/// <reference path="../../typings/globals/knockout/index.d.ts" />
var AddressBookItemModel = (function () {
    function AddressBookItemModel(addressBookItemsDto) {
        this.addressBookItemsDto = addressBookItemsDto;
        this.id = addressBookItemsDto.id;
        this.name = ko.observable(addressBookItemsDto.name);
        this.birthYear = ko.observable(addressBookItemsDto.birthYear);
        this.isFavoriteContact = ko.observable(addressBookItemsDto.isFavoriteContact);
        this.city = ko.observable(addressBookItemsDto.city);
        this.isEditing = ko.observable(false);
    }
    AddressBookItemModel.prototype.edit = function () {
        this.isEditing(true);
    };
    ;
    AddressBookItemModel.prototype.save = function () {
        this.isEditing(false);
        var service = new AddressBookService();
        this.addressBookItemsDto.name = this.name();
        this.addressBookItemsDto.birthYear = this.birthYear();
        this.addressBookItemsDto.isFavoriteContact = this.isFavoriteContact();
        this.addressBookItemsDto.city = this.city();
        service.save(this.addressBookItemsDto, function () { });
    };
    ;
    AddressBookItemModel.prototype.cancelEdit = function () {
        this.isEditing(false);
        this.name = ko.observable(this.addressBookItemsDto.name);
        this.birthYear = ko.observable(this.addressBookItemsDto.birthYear);
        this.isFavoriteContact = ko.observable(this.addressBookItemsDto.isFavoriteContact);
        this.city = ko.observable(this.addressBookItemsDto.city);
    };
    ;
    return AddressBookItemModel;
}());
;
var ViewModel = (function () {
    function ViewModel() {
        this.service = new AddressBookService();
        this.data = ko.observableArray([]);
        this.newItem = new AddressBookItemModel({
            city: '',
            name: '',
            birthYear: null,
            isFavoriteContact: false
        });
        this.editNew = function () {
            this.newItem.edit();
        };
        this.saveNew = function () {
            var _this = this;
            var dto = {
                name: this.newItem.name(),
                city: this.newItem.city(),
                birthYear: this.newItem.birthYear(),
                isFavoriteContact: this.newItem.isFavoriteContact()
            };
            this.service.save(dto, function (responseDto) {
                _this.newItem.name('');
                _this.newItem.city('');
                _this.newItem.birthYear(null);
                _this.newItem.isFavoriteContact(false);
                _this.newItem.isEditing(false);
                _this.data.push(new AddressBookItemModel(responseDto));
            });
        };
        this.cancelEditNew = function () {
            this.newItem.cancelEdit();
        };
        this.deleteEntry = function (entry) {
            if (window.confirm("Do you really want to delete contact: " + entry.name() + "?")) {
                this.service.del(entry.id, function () {
                    this.refresh();
                });
            }
        };
        this.refresh();
    }
    ViewModel.prototype.refresh = function () {
        var _this = this;
        this.service.getAll(function (addressBookItemDtos) {
            _this.data.removeAll();
            addressBookItemDtos.forEach(function (dto) {
                _this.data.push(new AddressBookItemModel(dto));
            });
        });
    };
    ;
    return ViewModel;
}());
;
document.addEventListener('DOMContentLoaded', function () {
    ko.applyBindings(new ViewModel());
});
//# sourceMappingURL=main.js.map