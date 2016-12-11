interface AddressBookItemDto {
    id: string,
    name: string,
    phoneNumber?: string,
    city: string,
    birthYear: number | null,
    isFavoriteContact: boolean
}