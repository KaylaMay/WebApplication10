using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApplication10.Models;

namespace WebApplication10.Controllers
{
    public class MailsController : ApiController
    {
        private UberDataEntities db = new UberDataEntities();

        // GET: api/Mails
        public IQueryable<Mail> GetMails()
        {
            return db.Mails;
        }

        // GET: api/Mails/5
        [ResponseType(typeof(Mail))]
        public IHttpActionResult GetMail(int id)
        {
            Mail mail = db.Mails.Find(id);
            if (mail == null)
            {
                return NotFound();
            }

            return Ok(mail);
        }

        // PUT: api/Mails/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMail(int id, Mail mail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != mail.Id)
            {
                return BadRequest();
            }

            db.Entry(mail).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Mails
        [ResponseType(typeof(Mail))]
        public IHttpActionResult PostMail(Mail mail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            mail.Id = new Random().Next(600000, 900000);
            db.Mails.Add(mail);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (MailExists(mail.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = mail.Id }, mail);
        }

        // DELETE: api/Mails/5
        [ResponseType(typeof(Mail))]
        public IHttpActionResult DeleteMail(int id)
        {
            Mail mail = db.Mails.Find(id);
            if (mail == null)
            {
                return NotFound();
            }

            db.Mails.Remove(mail);
            db.SaveChanges();

            return Ok(mail);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MailExists(int id)
        {
            return db.Mails.Count(e => e.Id == id) > 0;
        }
    }
}