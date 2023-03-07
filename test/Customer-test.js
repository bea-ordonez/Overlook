import {expect} from "chai";
import Customer from "../src/Customer";
import customerData from "../data/customerData";

describe('Customer', () => {
  let customer;

  beforeEach( () => {
    customer = new Customer(customerData[0]);
  })

  it('should be an instance of customer', () => {
    expect(customer).to.be.an.instanceOf(Customer);
  })

  it('should have an id', () => {
    expect(customer.id).to.equal(1);
  })

  it('should have a name', () => {
    expect(customer.name).to.equal('Leatha Ullrich');
  })
})