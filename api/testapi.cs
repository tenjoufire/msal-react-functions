using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Security.Claims;

namespace Company.Function
{
    public static class testapi
    {
        [FunctionName("testapi")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ClaimsPrincipal claimsPrincipal,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var name = claimsPrincipal.Identity?.IsAuthenticated ?? false ?
            claimsPrincipal.Identity?.Name :
            "名無し";
            return new OkObjectResult($"Hello, {name}. This HTTP triggered function executed successfully.");

        }
    }
}
