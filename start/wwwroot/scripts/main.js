AddressBookItemModel = function(addressBookItemsDto) {
    this.id = addressBookItemsDto.id;
    this.name = ko.observable(addressBookItemsDto.name);
    this.birthYear = ko.observable(addressBookItemsDto.birthYear);
    this.isFavoriteContact = ko.observable(addressBookItemsDto.isFavoriteContact);
    this.city = ko.observable(addressBookItemsDto.city);
    this.isEditing = ko.observable(false);

    this.edit = function() {
        this.isEditing(true);
    };
    this.save = function() {
        this.isEditing(false);
        var service = new AddressBookService();
        addressBookItemsDto.name = this.name();
        addressBookItemsDto.birthYear = this.birthYear();
        addressBookItemsDto.isFavoriteContact = this.isFavoriteContact();
        addressBookItemsDto.city = this.city();
        service.save(addressBookItemsDto, function() { });
    };
    this.cancelEdit = function() {
        this.isEditing(false);
        this.name = ko.observable(addressBookItemsDto.name);
        this.birthYear = ko.observable(addressBookItemsDto.birthYear);
        this.isFavoriteContact = ko.observable(addressBookItemsDto.isFavoriteContact);
        this.city = ko.observable(addressBookItemsDto.city);
    };

    
};

ViewModel = function() {
    var self = this;
    var service = new AddressBookService();
    self.data = ko.observableArray([]);
    self.newItem = new AddressBookItemModel({
        city: '',
        name: '',
        birthYear: null,
        FavoriteContact: false
    });
    self.editNew = function() {
        self.newItem.edit();
    };
    self.saveNew = function() {
        var dto = {
            name: self.newItem.name(),
            city: self.newItem.city(),
            birtYear: self.newItem.birthYear(),
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

    var refresh = function() {
        service.getAll(function(addressBookItemDtos) {
            self.data.removeAll();
            addressBookItemDtos.forEach(function(dto) {
                self.data.push(new AddressBookItemModel(dto));
            });
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