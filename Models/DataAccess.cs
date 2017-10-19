using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data.Sql;


namespace WebApplication10.Models
{
    public class DataAccess
    {
        public long User(long id, string name)
        {

            using (SqlConnection connect = new SqlConnection("UberDataEntities"))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connect;
                    try
                    {
                        command.Connection.Open();
                        command.CommandText = "INSERT INTO [dbo].[Customer](name,surname,email,password) VALUES(@name,@surname,@email,@password)";
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

        internal int User(Customer value)
        {
            throw new NotImplementedException();
        }


        public LoginData getUser(string email, string password)
        {
            
            LoginData use = null;
            string query = "SELECT email, password WHERE email = @email AND password = @password";


            using (SqlConnection connect = new SqlConnection("DatabaseEntities1"))
            {
                using (SqlCommand command = new SqlCommand(query, connect))
                    try
                    {
                        connect.Open();
                        command.CommandText = "INSERT INTO [dbo].[Customer](email,password) VALUES(@email,@password)";
                        command.Parameters.AddWithValue("@email", email);
                        command.Parameters.AddWithValue("@password", password);
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