//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebApplication10.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Order
    {
        public int Id { get; set; }
        public string product_name { get; set; }
        public Nullable<int> quantity { get; set; }
        public Nullable<System.DateTime> order_date { get; set; }
        public Nullable<int> cust_id { get; set; }
        public Nullable<int> prod_id { get; set; }
        public Nullable<double> product_price { get; set; }
        public string Delivery_Address { get; set; }
        public string Delivery_Status { get; set; }
    }
}