using CustomerCore;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();


builder.Services.Configure<DBConfig>(builder.Configuration);
builder.Services.AddTransient<ICustomerServices, CustomerServices>();

builder.Services.AddSingleton<IDBClient, DBClient>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors((CorsOptions corsOption) =>
{
    corsOption.AddPolicy("AllowOrigin", options => options
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());
});

builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
    .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver =
    new DefaultContractResolver());

var app = builder.Build();

app.UseCors(options => options
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
