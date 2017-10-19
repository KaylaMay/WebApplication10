/// <reference path="c:\users\user\documents\visual studio 2015\Projects\WebApplication10\WebApplication10\scripts/angular.js" />


var myApp = angular.module("myApp", []);

myApp.factory('UserApi',['$http', function ($http) {
    var urlBase = "http://localhost:34462/api/";
    var UserApi = {};

    //Get all useres
    UserApi.getUserss = function () {
        return $http.get(urlBase + '/Customers');
    }
    //RegisterUser
    UserApi.AddUser = function (customer) {
        return $http.post(urlBase + '/Customers', customer);
    }
    //LoginUser
    UserApi.GetUserInfo = function (email, password) {
        return $http.get(urlBase + 'Customers?email=' + email + '&password=' + password );
    }
///////////////////////////////////////////////////////////////////////////////////////////////
    //Get Admin
    UserApi.Admin = function () {
        return $http.get(urlBase + '/Admins/');
    }
    //Admin login
    UserApi.GetAdminInfo = function (Admin_email, Admin_password) {
        return $http.get(urlBase + 'Admins?Admin_email=' + Admin_email + '&Admin_password=' + Admin_password);
    }
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //RegisterRestaurant
    UserApi.AddRest = function (Restaurants) {
        return $http.post(urlBase + '/Restaurants', Restaurants);
    }
    //getRestaurant
    UserApi.GetRestaurant = function () {
        return $http.get(urlBase + '/Restaurants');
    }
////////////////////////////////////////////////////////////////////////////////
    //Send email
    UserApi.sendMail = function (mail) {
        return $http.post(urlBase + 'Mails', mail);
    }
    ///////////////////////////////////////////////////////////////////////////////
    //Add Product
    UserApi.AddProduct = function (Products) {
        return $http.post(urlBase + '/Products', Products);
    }

    //getProducts
    UserApi.GetProduct = function () {
        return $http.get(urlBase + '/Products');
    };
    ///////////////////////////////////////Payment////////////////////////////////////////////////////////
    //Add Payment
    UserApi.AddPayment = function (Payments) {
        return $http.post(urlBase + '/Payments', Payments);
    }
    //Add Order
    UserApi.AddOrder = function (Orders) {
        return $http.post(urlBase + '/Orders', Orders);
    }
    //Get Orders
    UserApi.GetOrder = function () {
        return $http.get(urlBase + '/Orders');
    };
    //Add Driver
    UserApi.AddDriver = function (Drivers) {
        return $http.post(urlBase + '/Drivers', Drivers);
    }
    //Driver Login
    UserApi.GetDriverInfo = function (Driver_email, Driver_password) {
        return $http.get(urlBase + 'Drivers?Driver_email=' + Driver_email + '&Driver_password=' + Driver_password);
    }
    //Update Order
    UserApi.UpdateOrder = function (OrderToAdd) {
        var Order_data = $http({
            method: 'PUT',
            url: urlBase + 'Orders/' + OrderToAdd.Id,
            data: OrderToAdd,

        });
        return Order_data;
    }
    //Get Mail
    UserApi.GetMail = function () {
        return $http.get(urlBase + '/Mails');
    };


    return UserApi;
}]);


