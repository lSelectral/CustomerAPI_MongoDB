using CustomerCore.DB;
using CustomerCore.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace CustomerAPI_Tests
{
    internal class TestApplicationBuilder : WebApplicationFactory<Program>
    {
        protected override IHost CreateHost(IHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                services.AddSingleton<IDBClient, DBClient>();
                services.AddTransient<ICustomerServices, CustomerServices>();

                //services.Configure<DBConfig>(options =>
                //{
                //    options.Database_Name = 
                //});


            });
            return base.CreateHost(builder);
        }
    }
}
