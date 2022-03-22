using MongoDB.Bson.Serialization.Attributes;

namespace CustomerCore.Models;

public class Customer
{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string? Id { get; set; }

    public int rowId { get; set; }

    [BsonRequired]
    public string Name { get; set; }

    public string DateTime { get; set; }

    public string ReservedTable { get; set; }

    public string Location { get; set; }

    public string Phone { get; set; }

    public string Note { get; set; }
}