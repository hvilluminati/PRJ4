using System.Diagnostics;

namespace PortfolioTest
{
    public class TestHelpers
    {
        private const string _jsonMediaType = "application/json";
        private const int _expectedMaxElapsedMilliseconds = 1000;
        private readonly JsonSerializerOptions _jsonSerializerOptions = new() { PropertyNameCaseInsensitive = true };
        public static async Task AssertResponseWithContentAsync<T>(Stopwatch stopwatch,
            HttpResponseMessage response, System.Net.HttpStatusCode expectedStatusCode,
            T expectedContent)
        {
            AssertCommonResponseParts(stopwatch, response, expectedStatusCode);
            Assert.Equal(_jsonMediaType, response.Content.Headers.ContentType?.MediaType);
            Assert.Equal(expectedContent, await JsonSerializer.DeserializeAsync<T?>(
                await response.Content.ReadAsStreamAsync(), _jsonSerializerOptions));
        }
    }

    public class TextsControllerTest :IDisposable
    {
        internal record Text(int TextID, string HeadLine, string MainText);
        private readonly HttpClient _httpClient = new() { BaseAddress = new Uri("https://localhost:7041") };

        public void Dispose()
        {
            _httpClient.DeleteAsync("/state").GetAwaiter().GetResult();
        }

        [Fact]
        public void Test1()
        {

        }
    }
}