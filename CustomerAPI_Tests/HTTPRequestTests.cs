using System.IO;
using System.Net;
using Xunit;

namespace CustomerAPI_Tests
{
    public class HTTPRequestTests
    {
        [Fact]
        public async void GetCustomersTest()
        {
            var client = new TestClientProvider().Client;
            var okResult = await client.GetAsync("api/customer");

            File.WriteAllText(Directory.GetCurrentDirectory() + "\\recep.txt",
                await okResult.Content.ReadAsStringAsync());

            okResult.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, okResult.StatusCode);

        }
    }
}