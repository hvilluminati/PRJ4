
using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using Microsoft.AspNetCore.Mvc.Testing;
using Newtonsoft.Json.Linq;
using Portfolio.Models;

namespace Back_end_test
{

    public class IntegrationTests
    {
        private readonly HttpClient client;
        private readonly string Login_Email = "admin@min.com";
        private readonly string Login_Password = "adminpw";
        private readonly JsonContent body_Login;
        public IntegrationTests()
        {
            var application = new WebApplicationFactory<Program>()
                .WithWebHostBuilder(builder => { });
            client = application.CreateClient();
            body_Login = JsonContent.Create(new UserDto
            {
                Email = Login_Email,
                Password = Login_Password

            });



        }
        public async Task<string> GetJWTToken(JsonContent body, HttpClient client)
        {

            var response = await client.PostAsync("api/Users/login", body);
            return await response.Content.ReadAsStringAsync();

        }



        //ensures login works which is required in some following tests
        [Fact]
        public async Task CheckLogin()
        {
            var response = await client.PostAsync("api/Users/login", body_Login);
            response.EnsureSuccessStatusCode();
        }

        #region Skills
        [Fact]
        public async Task GetSkill()
        {
            var application = new WebApplicationFactory<Program>()
                .WithWebHostBuilder(builder => { });

            var client = application.CreateClient();


            var response = await client.GetAsync("/api/Skills");
            response.EnsureSuccessStatusCode();
        }

        [Fact]
        public async Task GetText()
        {
            var application = new WebApplicationFactory<Program>()
                .WithWebHostBuilder(builder => { });

            var client = application.CreateClient();


            var response = await client.GetAsync("/api/Texts");
            response.EnsureSuccessStatusCode();
        }

        [Fact]
        public async Task GetFiles()
        {
            var application = new WebApplicationFactory<Program>()
                .WithWebHostBuilder(builder => { });

            var client = application.CreateClient();


            var response = await client.GetAsync("/api/Files");
            response.EnsureSuccessStatusCode();
        }

        [Fact]
        public async Task PostSkill()
        {
            //authorize
            var JsonToken = await GetJWTToken(body_Login, client);

            JObject JWTToken = JObject.Parse(JsonToken);

            string JWT = (string)JWTToken["jwt"];

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", JWT);


            //create skill

            var body = JsonContent.Create(new Skill { SkillName = "test", MonthsOfExperience = 1, SkillLevel = 1 });

            // db call
            var response = await client.PostAsync("/api/Skills", body);

            //test
            response.EnsureSuccessStatusCode();


            //clean up

            var responseString = response.Content.ReadAsStringAsync();

            JObject json = JObject.Parse(responseString.Result);
            var id = (string)json["skillID"];

            await client.DeleteAsync($"/api/Skills/{id}");

        }


        #endregion

        #region Files
        [Fact]
        public async Task UnauthorizedPostFile()
        {
            if (client.DefaultRequestHeaders.Authorization == null)
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "wrongToken");

                //create file
                var bytes = Encoding.UTF8.GetBytes("This is a dummy file");

                var content = new MultipartFormDataContent();

                content.Add(new StreamContent(new MemoryStream(bytes)), "files", "dummyfile");
                content.Add(new StringContent("test"), "language");


                //db call
                var response = await client.PostAsync("/api/Files", content);


                try
                {
                    //test
                    Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
                }
                catch (Exception e)
                {
                    //clean up if test actually puts a file in db
                    if (response.IsSuccessStatusCode)
                    {
                        var responseString = response.Content.ReadAsStringAsync();

                        JObject json = JObject.Parse(responseString.Result);
                        var id = (string)json["DocumentId"];

                        await client.DeleteAsync($"/api/Files/{id}");
                    }

                    throw;
                }


            }


        }


        [Fact]
        public async Task AuthorizedPostFile()
        {

            //authorize
            var JsonToken = await GetJWTToken(body_Login, client);

            JObject JWTToken = JObject.Parse(JsonToken);

            string JWT = (string)JWTToken["jwt"];

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", JWT);



            //create file

            var bytes = Encoding.UTF8.GetBytes("This is a dummy file");

            var content = new MultipartFormDataContent();

            content.Add(new StreamContent(new MemoryStream(bytes)), "files", "dummyfile");
            content.Add(new StringContent("test"), "language");

            //db call

            var response = await client.PostAsync("/api/Files", content);

            //checks if it fails because the file was already posted
            if (response.StatusCode != HttpStatusCode.Forbidden)
            {
                response.EnsureSuccessStatusCode();
            }
            else
            {
                response = await client.DeleteAsync($"/api/Files/name/dummyfile");
                response = await client.PostAsync("/api/Files", content);
                response.EnsureSuccessStatusCode();
            }
            // clean up
            var responseString = response.Content.ReadAsStringAsync();

            JObject json = JObject.Parse(responseString.Result);
            var id = (string)json["DocumentId"];

            await client.DeleteAsync($"/api/Files/{id}");

        }

        [Fact]
        public async Task PostFileWithSameNameFails()
        {

            //authorize
            var JsonToken = await GetJWTToken(body_Login, client);

            JObject JWTToken = JObject.Parse(JsonToken);

            string JWT = (string)JWTToken["jwt"];

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", JWT);



            //create file

            var bytes = Encoding.UTF8.GetBytes("This is a dummy file");

            var content = new MultipartFormDataContent();

            content.Add(new StreamContent(new MemoryStream(bytes)), "files", "dummyfile");
            content.Add(new StringContent("test"), "language");

            //db call

            var response = await client.PostAsync("/api/Files", content);

            //checks if it fails because the file was already posted
            if (response.StatusCode != HttpStatusCode.Forbidden)
            {
                response.EnsureSuccessStatusCode();
            }
            else
            {
                response = await client.DeleteAsync($"/api/Files/name/dummyfile");
                response = await client.PostAsync("/api/Files", content);
                response.EnsureSuccessStatusCode();
            }
            //Posts the file again
            response = await client.PostAsync("/api/Files", content);


            // clean up
            var responseString = response.Content.ReadAsStringAsync();
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);


            JObject json = JObject.Parse(responseString.Result);
            var id = (string)json["DocumentId"];

            await client.DeleteAsync($"/api/Files/{id}");

        }

        [Fact]
        public async Task PostFileEmptyFile()
        {

            //authorize
            var JsonToken = await GetJWTToken(body_Login, client);

            JObject JWTToken = JObject.Parse(JsonToken);

            string JWT = (string)JWTToken["jwt"];

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", JWT);

            //create file
            var bytes = Encoding.UTF8.GetBytes("");

            var content = new MultipartFormDataContent();

            content.Add(new StreamContent(new MemoryStream(bytes)), "files", "dummyfile");
            content.Add(new StringContent("test"), "language");

            //db call
            var response = await client.PostAsync("/api/Files", content);


            try
            {
                //test
                Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            }
            catch (Exception e)
            {
                //clean up if test actually puts a file in db
                if (response.IsSuccessStatusCode)
                {
                    var responseString = response.Content.ReadAsStringAsync();

                    JObject json = JObject.Parse(responseString.Result);
                    var id = (string)json["DocumentId"];

                    await client.DeleteAsync($"/api/Files/{id}");
                }

                throw;
            }
        }



        [Fact]
        public async Task PostFileWithoutFile()
        {

            //authorize
            var JsonToken = await GetJWTToken(body_Login, client);

            JObject JWTToken = JObject.Parse(JsonToken);

            string JWT = (string)JWTToken["jwt"];

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", JWT);

            //create file

            var content = new MultipartFormDataContent();

            content.Add(new StringContent("test"), "language");
            content.Add(new StringContent(""), "file");


            //db call
            var response = await client.PostAsync("/api/Files", content);


            try
            {
                //test
                Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            }
            catch (Exception e)
            {
                //clean up if test actually puts a file in db
                if (response.IsSuccessStatusCode)
                {
                    var responseString = response.Content.ReadAsStringAsync();

                    JObject json = JObject.Parse(responseString.Result);
                    var id = (string)json["DocumentId"];

                    await client.DeleteAsync($"/api/Files/{id}");
                }

                throw;
            }
        }

        #endregion




    }
}
