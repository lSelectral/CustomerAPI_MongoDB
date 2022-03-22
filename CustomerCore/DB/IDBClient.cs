using CustomerCore.Models;
using MongoDB.Driver;

namespace CustomerCore.DB;

public interface IDBClient
{
    IMongoCollection<Customer> GetCustomerCollection();
}
