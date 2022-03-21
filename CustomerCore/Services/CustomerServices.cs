using MongoDB.Driver;

namespace CustomerCore;

public class CustomerServices : ICustomerServices
{
    private readonly IMongoCollection<Customer> _customers;
    public CustomerServices(IDBClient dbClient)
    {
        _customers = dbClient.GetCustomerCollection();
    }

    public List<Customer> GetCustomers()
    {
        return _customers.Find(c => true).ToList();
    }

    public Customer GetCustomerByRowId(int id)
    {
        return _customers.Find(c => c.rowId == id).First();
    }

    public int GetCustomerCount()
    {
        return GetCustomers().Count;
    }

    public Customer GetCustomerById(string id)
    {
        return _customers.Find(c => c.Id == id).First();
    }

    public Customer AddCustomer(Customer customer)
    {
        if (customer.rowId == 0 ) customer.rowId = GetCustomerCount() + 1;
        _customers.InsertOne(customer);
        return customer;
    }

    public Customer UpdateCustomer(Customer customer)
    {
        _customers.ReplaceOne(c => c.Id == customer.Id, customer);
        return customer;
    }

    public void DeleteCustomer(string id)
    {
        _customers.DeleteOne(book => book.Id == id);
    }
}