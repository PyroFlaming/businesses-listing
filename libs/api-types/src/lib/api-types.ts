export interface BusinessType {
  id: string;
  name: string;
  description: string;
  phone: string;
  image: string;
  email: string;
  address: AddressType;
}

export interface AddressType {
  number: string;
  street: string;
  zip: string;
  city: string;
  country: string;
}