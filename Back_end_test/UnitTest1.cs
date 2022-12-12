using Xunit;
using Database_test1.Controllers;
using System.Threading.Tasks;
using System.Net.Http.Json;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using Database_test1.Data;
using Database_test1.Models;
using Database_test1.Utilities;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Moq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using NuGet.Protocol;
using Newtonsoft.Json.Linq;

namespace Back_end_test
{
    interface IIntegrationTests
    {
        Task<string> GetJWTToken(JsonContent body, HttpClient client);

        

    }
    public class IntegrationTests : IIntegrationTests
    {
        private readonly HttpClient client;
        private readonly string Login_Email = "admin@min.com";
        private readonly string Login_Password = "adminpw";
        private readonly JsonContent body_Login;
        public  IntegrationTests()
        {
           var application = new WebApplicationFactory<Program>()
                .WithWebHostBuilder(builder => { });
            client = application.CreateClient();
            body_Login = JsonContent.Create(new UserDto
            {
                Email = Login_Email,
                Password =Login_Password 

            });



        }
        public async Task<string> GetJWTToken(JsonContent body, HttpClient client)
        {
            
                var response= await client.PostAsync("api/Users/login", body);
                return await response.Content.ReadAsStringAsync();

        }

        //ensures login works which is required in some following tests
        [Fact]
        public async Task CheckLogin()
        {
         
            var response = await client.PostAsync("api/Users/login", body_Login);
            response.EnsureSuccessStatusCode();





        }



        [Fact]
        public async Task PostFile()
        {


            //TokenDto JWTToken = new TokenDto();
            var JsonToken = await GetJWTToken(body_Login, client);

            JObject JWTToken = JObject.Parse(JsonToken);

            string JWT = (string)JWTToken["jwt"];

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", JWT);




            var bytes = Encoding.UTF8.GetBytes("This is a dummy file");
          
            var content = new MultipartFormDataContent();

            content.Add(new StreamContent(new MemoryStream(bytes)),"files","dummyfile");
            content.Add(new StringContent("test"),"language");


            var response = await client.PostAsync("/api/Files",content);

            //checks if it fails because the file was already posted
            if (response.StatusCode != HttpStatusCode.Forbidden)
            {
                response.EnsureSuccessStatusCode();
            }
            else
            {
                response = await client.DeleteAsync($"/api/Files/dummyfile");
                response = await client.PostAsync("/api/Files", content);
                response.EnsureSuccessStatusCode();


            }
        }

        [Theory]
        [InlineData("dummyfile")]
        public async Task DeleteFile(string filename)
        {
            var JsonToken = await GetJWTToken(body_Login, client);

            JObject JWTToken = JObject.Parse(JsonToken);

            string JWT = (string)JWTToken["jwt"];

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", JWT);

            var response = await client.DeleteAsync($"/api/Files/{filename}");


            response.EnsureSuccessStatusCode();

        }



        [Fact]
        public async Task PostSkill()
        {
            var body_Login = JsonContent.Create(new UserDto
            {
                Email = Login_Email,
                Password = Login_Password

            });
            var JsonToken = await GetJWTToken(body_Login, client);

            JObject JWTToken = JObject.Parse(JsonToken);

            string JWT = (string)JWTToken["jwt"];

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", JWT);
            //set test to be authroized by default


            var body = JsonContent.Create(new Skill { SkillName = "test", MonthsOfExperience = 1, SkillLevel = 1 });

            var response = await client.PostAsync("/api/Skills", body);
            response.EnsureSuccessStatusCode();
        }

        [Fact]
        public async Task GetSkill()
        {
            var application = new WebApplicationFactory<Program>()
                .WithWebHostBuilder(builder => { });

            var client = application.CreateClient();


            var response = await client.GetAsync("/api/Skills");
            response.EnsureSuccessStatusCode();
        }
    }
}