export interface PostDto {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CommentDto {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface GeoDto {
  lat: string;
  lng: string;
}

export interface AddressDto {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoDto;
}

export interface CompanyDto {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface UserDto {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressDto;
  phone: string;
  website: string;
  company: CompanyDto;
}
