using System.Net.Http;

namespace CustomerAPI_Tests
{
    internal class TestClientProvider
    {
        public HttpClient Client { get; set; }

        public TestClientProvider()
        {
            var application = new TestApplicationBuilder();
            Client = application.CreateClient();
        }
    }
}
