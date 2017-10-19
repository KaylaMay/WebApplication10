using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication10.Models
{
    public class LoginData
    {
        public string email { get; set; }
        public string password { get; set; }
        public string Admin_email { get; set; }
        public string Admin_password { get; set; }
        public string Diver_email { get; set; }
        public string Driver_password { get; set; }
    }
}