using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data.Sql;

namespace WebApplication10.Models
{
    public class DriverDataAccess
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
                        command.CommandText = "INSERT INTO [dbo].[Driver](Driver_email,Driver_password) VALUES(@Driver_email,@Driver_password)";

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


        public LoginData getUser(string Driver_email, string Driver_password)
        {
            LoginData use = null;
            string query = "SELECT Driver_email,Driver_password WHERE Driver_email=@Driver_email AND Driver_password=@Driver_password";


            using (SqlConnection connect = new SqlConnection("DatabaseEntities1"))
            {
                using (SqlCommand command = new SqlCommand(query, connect))
                    try
                    {
                        connect.Open();
                        command.CommandText = "INSERT INTO [dbo].[Driver](Driver_email,Driver_password) VALUES(@Driver_email,@Driver_password)";
                        command.Parameters.AddWithValue("@Driver_email", Driver_email);
                        command.Parameters.AddWithValue("@Driver_password", Driver_password);
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