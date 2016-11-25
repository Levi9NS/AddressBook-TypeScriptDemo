using System;

namespace AddressBook
{
    public class AddressBookItem
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string City { get; set; }
        public int? BirthYear { get; set; }
        public bool IsFavoriteContact { get; set; }

        public void Update(AddressBookItem item)
        {
            if (item == null) throw new ArgumentNullException(nameof(item));
            
            Name = item.Name;
            PhoneNumber = item.PhoneNumber;
            City = item.City;
            BirthYear = item.BirthYear;
            IsFavoriteContact = item.IsFavoriteContact;
        }
    }
}