using MongoDB.Driver;

namespace CustomerCore;

public interface IDBClient
{
    IMongoCollection<Customer> GetCustomerCollection();
}
