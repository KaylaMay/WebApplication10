using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data.Sql;

namespace WebApplication10.Models
{
    public class AdminDataAccess
    {
        public long User(long id)
        {

            using (SqlConnection connect = new SqlConnection("UberDataEntities"))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connect;
                    try
                    {
                        command.Connection.Open();
                        command.CommandText = "INSERT INTO [dbo].[Admin](Admin_email,Admin_password) VALUES(@Admin_email,@Admin_password)";

                        command.ExecuteNonQuery();
                    }
                    catch (SqlException)
                    {
                        throw;
                    }
                    finally
                    {
                        command.Connection.Close();
                    }
                }
            }
            return id;
        }

        internal long User(LoginData id)
        {
            throw new NotImplementedException();
        }

        internal int User(Admin value)
        {
            throw new NotImplementedException();
        }


        public LoginData getUser(string Admin_email, string Admin_password)
        {
            LoginData use = null;
            string query = "SELECT Admin_email,Admin_password WHERE Admin_email=@Admin_email AND Admin_password=@Admin_password";


            using (SqlConnection connect = new SqlConnection("DatabaseEntities1"))
            {
                using (SqlCommand command = new SqlCommand(query, connect))
                    try
                    {
                        connect.Open();
                        command.CommandText = "INSERT INTO [dbo].[Admin](Admin_email,Admin_password) VALUES(@Admin_email,@Admin_password)";
                        command.Parameters.AddWithValue("@Admin_email", Admin_email);
                        command.Parameters.AddWithValue("@Admin_password", Admin_password);
                        command.ExecuteNonQuery();
                    }
                    catch
                    {
                        connect.Close();
                    }

            }

            return use;

        }
    }
}