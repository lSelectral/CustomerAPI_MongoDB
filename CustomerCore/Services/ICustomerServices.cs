namespace CustomerCore;

public interface ICustomerServices
{
    List<Customer> GetCustomers();

    int GetCustomerCount();

    Customer GetCustomerById(string id);

    Customer GetCustomerByRowId(int id);

    Customer AddCustomer(Customer customer);

    Customer UpdateCustomer(Customer customer);

    void DeleteCustomer(string id);
}