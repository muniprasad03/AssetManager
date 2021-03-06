﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AssetManager.Models;
using AssetManager.Services;

namespace AssetManager.App.Web.Controllers.Api
{
    [RoutePrefix("api/work")]
    public class WorkController : BaseApiController
    {
        public IWorkService ProductService { get; set; }
        public IUserService UserService { get; set; }

        public WorkController(IWorkService productService, IUserService userService)
        {
            this.ProductService = productService;
            this.UserService = userService;
        }

        [Route("detail/{pointerId}")]
        public Pointer GetUser(int productId)
        {
            return this.ProductService.Get(productId);
        }

        [Route("getPointers")]
        public List<Pointer> GetAll()
        {
            return this.ProductService.Get();
        }

        [Route("getUsers")]
        public List<DisplayUser> GetUsers()
        {
            return this.UserService.GetUsersList();
        }

        [Route("savePointer")]
        public dynamic Post(Pointer product)
        {
            return new { id = this.ProductService.Create(product) };
        }

        [Route("updatePointer")]
        public dynamic Put(Pointer product)
        {
            return new { isUpdated = this.ProductService.Update(product) };
        }

        [Route("{id}")]
        public void Delete(int id)
        {
            this.ProductService.Delete(id);
        }
    }
}
