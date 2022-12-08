using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Portfolio.Controllers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using System.Net.Http.Json;
using Portfolio.Data;

namespace Portfolio.Test.Tests
{
    public class UsersControllerTest
    {

        [Fact]
        public async Task LoginSuccess()
        {

            var application = new WebApplicationFactory<Program>().WithWebHostBuilder(builder => { });

            var client = application.CreateClient();
            var body = JsonContent.Create(new { Email = "admin@min.com" }, { Password});
            var response = await client.PostAsync("/weatherforecast", body);
        }
    }
}
