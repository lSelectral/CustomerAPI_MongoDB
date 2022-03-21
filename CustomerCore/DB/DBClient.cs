using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CustomerCore;

public class DBClient : IDBClient
{
    private readonly IMongoCollection<Customer> _customers;

    public DBClient(IOptions<DBConfig> dbConfig)
    {
        MongoClient client = new MongoClient(dbConfig.Value.Connection_String);
        IMongoDatabase database = client.GetDatabase(dbConfig.Value.Database_Name);
        Console.WriteLine(database.GetCollection<Customer>(dbConfig.Value.Customer_Collection));
        _customers = database.GetCollection<Customer>(dbConfig.Value.Customer_Collection);
    }

    public IMongoCollection<Customer> GetCustomerCollection() => _customers;
}