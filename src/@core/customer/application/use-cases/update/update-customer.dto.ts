export interface InputUpdateCustomerDto {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    city: string;
    zip: string;
  };
}

export interface OutputUpdateCustomerDto extends InputUpdateCustomerDto {}
