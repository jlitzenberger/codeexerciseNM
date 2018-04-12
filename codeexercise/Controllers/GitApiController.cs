using codeexerciseapi.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace codeexerciseapi.Controllers
{
    public class GitApiController : ApiController
    {
        // GET: api/GitApi
        public IEnumerable<TeamArrest> Get()
        {
            string res = "";

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://nflarrest.com/api/");
                client.DefaultRequestHeaders.Accept.Clear();

                HttpResponseMessage response = client.GetAsync("v1/team/").Result;
                
                using (HttpContent content = response.Content)
                {
                    // ... Read the string.
                    Task<string> result = content.ReadAsStringAsync();
                    res = result.Result;
                }
            }

            return JsonConvert.DeserializeObject<IEnumerable<TeamArrest>>(res);
        }

        // GET: api/GitApi/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/GitApi
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/GitApi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/GitApi/5
        public void Delete(int id)
        {
        }
    }
}
