using CustomerCore.Models;
using CustomerCore.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomerAPI_MongoDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerServices _customerServices;
        public CustomerController(ICustomerServices customerServices)
        {
            _customerServices = customerServices;
        }

        [HttpGet]
        public IActionResult GetCustomers()
        {
            return Ok(_customerServices.GetCustomers());
        }

        [HttpGet("table/{id}")]
        public IActionResult GetCustomerByRowId(int id)
        {
            return Ok(_customerServices.GetCustomerByRowId(id));
        }

        [HttpGet("count")]
        public IActionResult GetCustomerCount()
        {
            return Ok(_customerServices.GetCustomerCount());
        }

        [HttpGet("{id}", Name = "GetCustomerById")]
        public IActionResult GetCustomerById(string id)
        {
            return Ok(_customerServices.GetCustomerById(id));
        }

        [HttpPost]
        public IActionResult AddCustomer(Customer customer)
        {
            _customerServices.AddCustomer(customer);
            //return StatusCode(201);
            return CreatedAtAction(nameof(GetCustomerById), new { id = customer.Id }, customer);
        }

        [HttpPut]
        public IActionResult UpdateCustomer(Customer customer)
        {
            return Ok(_customerServices.UpdateCustomer(customer));
        }

        [HttpDelete]
        public IActionResult DeleteCustomer(string id)
        {
            _customerServices.DeleteCustomer(id);
            return StatusCode(204);
        }
    }
}
