/// <reference path="c:\users\user\documents\visual studio 2015\Projects\WebApplication10\WebApplication10\scripts/angular.js" />

var SignIn = angular.module("SignIn", ['ngRoute', 'myApp']);

//SignIn.config(['$qProvider', function ($qProvider) {
//    $qProvider.errorOnUnhandledRejections(false);
//}]);
///////////////////////////////ROUTING/////////////////////////////////////////////////////////////////////////////
SignIn.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'Views/home.html'
        })
        .when('/register', {
            templateUrl: 'Views/register.html',
            controller: 'RegisterController'
        })
        .when('/Cart', {
            templateUrl: 'Views/Cart.html',
            controller: 'CartController'
        })
        .when('/CheckOut', {
            templateUrl: 'Views/CheckOut.html',
            controller: 'CheckOutController'
        })
        .when('/DriverDashboard', {
            templateUrl: 'Views/DriverDashboard.html',
            controller: 'OrderDataController'
        })
        .when('/Nandos', {
            templateUrl: 'Views/Nandos.html',
            controller: 'NandosController'
        })
        .when('/MailData', {
            templateUrl: 'Views/MailData.html',
            controller: 'MailDataController'
        })
        .when('/login', {
            templateUrl: 'Views/login.html',
            controller:'LoginController'
        })
        .when('/DriverLogIn', {
            templateUrl: 'Views/DriverLogIn.html',
            controller: 'DriverLoginController'
        })
        .when('/Customers', {
            templateUrl: 'Views/Customers.html',
            controller:'CustomerController'
        })
        .when('/restaurantData', {
            templateUrl: 'Views/restaurantData.html',
            controller:'RestDataController'
        })
        .when('/ProductData', {
            templateUrl: 'Views/ProductData.html',
            controller: 'ProductDataController'
        })
        .when('/AdminOrderData', {
            templateUrl: 'Views/AdminOrderData.html',
            controller: 'OrdersDataController'
        })
        .when('/OrderData', {
            templateUrl:'Views/OrderData.html',
            controller:'OrderDataController'
        })
        .when('/Driver', {
            templateUrl: 'Views/Driver.html',
            controller: 'DriverController'
        })
        .when('/Products', {
            templateUrl: 'Views/Products.html',
            controller:'ProductController'
        })
        .when('/home', {
            templateUrl: 'Views/home.html'
        })
        .when('/Admin', {
            templateUrl: 'Views/Admin.html',
            controller:'AdminController'
        })
        .when('/Search', {
            templateUrl: 'Views/Search.html',
            controller: 'SearchController'
        })
        .when('/restaurant', {
            templateUrl: 'Views/restaurant.html',
            controller: 'RestaurantController'
        })
        .when('/Dashboard', {
            templateUrl: 'Views/Dashboard.html'
        })
        .when('/ContactUs', {
            templateUrl: 'Views/ContactUs.html',
            controller:'MailController'
        });

}]);
///////////////////////CUSTOMER////////////////////////////////////////////////////////////////////////////////////
SignIn.controller("RegisterController", function ($scope, UserApi, $location) { 
    $scope.AdUser = function () {
        var UserToAdd = {
            'name': $scope.name,
            'surname': $scope.surname,
            'email': $scope.email,
            'password': $scope.password
        };
        UserApi.AddUser(UserToAdd).then(function (response) {
            alert('Customer added successfully. Welcome '+response.data.name);
            $scope.name = undefined;
            $scope.surname = undefined;
            $scope.email = undefined;
            $scope.password = undefined;          
            $location.path('/home');
        }),
            function (response) {
                alert('Unable to add Customer' );
            };
    }
});
//////////////////////////////ADMIN///////////////////////////////////////////////////////////////////////////////
SignIn.controller("AdminController", function ($scope, $http, UserApi,$rootScope,$window, $location) {
             var log= {
                'Admin_email': $scope.Admin_email,
                'Admin_password': $scope.Admin_password
            }

             $scope.Adlog = function () {
                 UserApi.GetAdminInfo($scope.Admin_email, $scope.Admin_password).then(function (response) {
                     if (response.data === null) {
                         alert('You have entered the wrong password and username');
                     }
                     else {
                         alert('Admin Login Successful. Welcome ' + response.data.Admin_email);
                         $rootScope.currentUser = response.data;
                         $location.path('/Dashboard');
                     }
                 }), function () {
                     alert("Error logging in");
                 }
             };
});
////////////////////////////RESTAURANT////////////////////////////////////////////////////////////////////////////
SignIn.controller("RestaurantController", function ($scope, $http, UserApi, $rootScope, $window, $location) {
    $scope.rest_pic;
    $scope.AdRest = function () {
        var fd = new FormData();
        var imgBlob = dataURItoBlob($scope.rest_pic);
        fd.append('file', imgBlob);
        $scope.rest_pic = $scope.rest_pic.split(',')[1];
        console.log($scope.rest_pic);
        var RestaurantToAdd = {
            'rest_location': $scope.rest_location,
            'rest_name': $scope.rest_name,
            'first_name': $scope.first_name,
            'last_name': $scope.last_name,
            'title': $scope.title,
            'phone': $scope.phone,
            'email': $scope.email,
            'rest_pic':$scope.rest_pic
        };
        UserApi.AddRest(RestaurantToAdd).then(function (response) {
            alert('Your Restaurant has been added successfully, Thank you.');
            $scope.rest_location = undefined;
            $scope.rest_name = undefined;
            $scope.first_name = undefined;
            $scope.last_name = undefined;
            $scope.title = undefined;
            $scope.phone = undefined;
            $scope.email = undefined;
            $scope.rest_pic = undefined;
            $location = ('/home')
        }),
        function (response) {
            alert('unable to process your request');
        }
        //you need this function to convert the dataURI
        function dataURItoBlob(dataURI) {
            var binary = atob(dataURI.split(',')[1]);
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var image = [];
            for (var i = 0; i < binary.length; i++) {
                image.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(image)], {
                type: mimeString
            });
        }


    }
});
///////////////////////////////////////LOGIN//////////////////////////////////////////////////////////////////////
SignIn.controller("LoginController", function ($scope, $http, UserApi, $rootScope, $window, $location) {
    
    var LogInUser = {
                'email':$scope.email,
                'password': $scope.password,
                'name': $scope.name,
                'cust_id':$scope.cust_id
            }        
            $scope.loginForm = function () {
                UserApi.GetUserInfo($scope.email, $scope.password).then(function (response) {
                    if (response.data === null) {
                        alert("You've entered an ivalid email and password");
                    } else
                        {
                        alert('Login Successful. Welcome ' + response.data.name);
                        alert('customer Id=' + response.data.cust_id);
                        $rootScope.currentUser = response.data;
                        $location.path('/Search');
                        }
                }), function (response) {
                    alert("Error in logging the system");
                }
            };
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
SignIn.service('CommonProp', function () {

    var items = '';
    var total = 0;

    return {

        getItems: function () {
            return items;
        },
        setItems: function (value) {
            items = value;
        },
        getTotal: function () {
            return total;
        },
        setTotal: function (value) {
            total = value;
        }
    }
});
/////////////////////////////////////////Nandos////////////////////////////////////////////////////////////////////
SignIn.controller("NandosController", function ($scope, $rootScope,CommonProp, $http, $location, UserApi) {
    GetProd();
    function GetProd() {
        UserApi.GetProduct().then(function (response) {
            $scope.prodData = response.data;
        }),
        function () {
            alert("Couldn't get all the Products information");
        }
    }
    $rootScope.shoppingCart = [];
    //Add items to cart, receiving an object of items from the HTML page using newItem to store those items
    $rootScope.addItem = function (prod) {
        if ($rootScope.shoppingCart.length == 0) {//if myItems is empty then....
            prod.count = 1;
            $rootScope.shoppingCart.push(prod);
        } else {
            var repeat = false;
            for (var i = 0; i < $rootScope.shoppingCart.length; i++) {
                if ($rootScope.shoppingCart[i].prod_id == prod.prod_id) {
                    repeat = true;
                    $rootScope.shoppingCart[i].count += 1;
                }
            }
            if (!repeat) {
                prod.count = 1;
                $rootScope.shoppingCart.push(prod);
            }
        }
 
        $scope.$watch('shoppingCart', function () {

            CommonProp.setItems($scope.shoppingCart);
        })
  
            var totalPrice = 0;
            for (var i = 0; i < $scope.shoppingCart.length; i++) {
                totalPrice += ($scope.shoppingCart[i].count) * ($scope.shoppingCart[i].prod_price);
            }
            $scope.totalPrice = totalPrice;
            CommonProp.setTotal(totalPrice);
    };
})
////////////////////////////////Contact Us////////////////////////////////////////////////////////
SignIn.controller("MailController", function ($scope, $http, $location, UserApi) {
    var navshow = true;
    $scope.SendMail = function () {
        var mail = {
            'sender': $scope.sender,
            'sender_email': $scope.sender_email,
            'sender_phone': $scope.sender_phone,
            'sender_msg': $scope.sender_msg
        };

        UserApi.sendMail(mail).then(function (response) {
            $scope.errors = response.data;
            alert("Email Sent, Thank you " + response.data.sender);
            $scope.sender = undefined;
            $scope.sender_email = undefined;
            $scope.sender_phone = undefined;
            $scope.sender_msg = undefined;
            navshow = true;
            $location.path('/home');
        }),
             function (error) {
                 $scope.errors = error.data;
                 alert("Message failed to send, try again");
             }
        ;
    };
});
///////////////////////////////Search///////////////////////////////////////////////////////////
SignIn.controller("SearchController", function ($scope, $http, $location, UserApi) {
    GetRest();
    function GetRest() {
        UserApi.GetRestaurant().then(function (response) {
            $scope.Restaurant = response.data;
        }), function () {
            alert("Couldn't get all the restaurant information");
        }
    }
});
////////////////////////////////////Get All Customers///////////////////////////////////////////////////////////////
SignIn.controller("CustomerController", function ($scope, $http, $location, UserApi) {
    GetCust();
    function GetCust() {
        UserApi.GetUserInfo().then(function (response) {
            $scope.customers = response.data;
        }),
        function () {
            alert("Couldn't get all the customer information");
        }
    }
    //Refer
    //$http({
    //        method: 'GET',
    //        url: '/api/Customers',
    //    }).then(function successCallback(response) {
    //        console.log(response.data);
    //        $scope.customers = response.data;
    //    },function errorCallback(response) {
    //        alert('error' + JSON.stringify(data) + JSON.stringify(status));
    //    });
});
///////////////////////////////////////Get All Restaurants//////////////////////////////////////////////////////////
SignIn.controller("RestDataController", function ($scope, $http, $location, UserApi) {
    GetRest();
    function GetRest() {
        UserApi.GetRestaurant().then(function (response) {
            $scope.restData = response.data;
        }),
        function () {
            alert("Couldn't get all the restaurant information");
        }
    }
    //Refer
    //$http({
    //    method: 'GET',
    //    url: '/api/Restaurants',
    //}).then(function successCallback(response) {
    //    console.log(response.data);
    //    $scope.restData = response.data;
    //},function errorCallback(response) {
    //    alert('error' + JSON.stringify(data) + JSON.stringify(status));
    //});
});
/////////////////////////////////////////Products//////////////////////////////////////////////////////////////////
SignIn.directive('fileread', [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }

    };


}]);
SignIn.controller("ProductController", function ($scope, $http, UserApi, $rootScope, $window, $location) {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //the image
   
    $scope.prod_pic;
    $scope.AdProduct = function () {
        var fd = new FormData();
        var imgBlob = dataURItoBlob($scope.prod_pic);
        fd.append('file', imgBlob);
        $scope.prod_pic = $scope.prod_pic.split(',')[1];
        console.log($scope.prod_pic);
        var ProdToAdd = {
            'prod_name': $scope.prod_name,
            'rest_name': $scope.rest_name,
            'prod_description': $scope.prod_description,
            'prod_type': $scope.prod_type,
            'prod_price': $scope.prod_price,
            'prod_pic': $scope.prod_pic
        };
      
        UserApi.AddProduct(ProdToAdd).then(function (response) {
            alert('The Product has been added successfully');
            $scope.rest_id = undefined
            $scope.prod_name = undefined;
            $scope.rest_name = undefined;
            $scope.prod_description = undefined;
            $scope.prod_type = undefined;
            $scope.prod_price = undefined;
            $scope.prod_pic = undefined;
          
        })
          $location.path = ('/Dashboard')
        ,
            function (response) {
                alert('unable to Add Product.')
            };
        //you need this function to convert the dataURI
        function dataURItoBlob(dataURI) {
            var binary = atob(dataURI.split(',')[1]);
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var image = [];
            for (var i = 0; i < binary.length; i++) {
                image.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(image)], {
                type: mimeString
            });
        }


    }
});
/////////////////////////Get All Products//////////////////////////////////////////////////////////////////////////
SignIn.controller("ProductDataController", function ($scope, $http, $location, UserApi) {
    GetProd();
    function GetProd() {
        UserApi.GetProduct().then(function (response) {
            $scope.prodData = response.data;
        }),
        function () {
            alert("Couldn't get all the Products information");
        }
    }
});
//////////////////////////Cart/////////////////////////////////////////////////////////////////////////////////////
SignIn.controller("CartController", function ($scope, $rootScope, CommonProp, $http, $location, UserApi) {
    $scope.selectedItems = CommonProp.getItems();
    $scope.checkOutTot = CommonProp.getTotal();

    $scope.Remove = function (cart) {
      
        $scope.shoppingCart.splice(cart, 1);
        $scope.checkOutTot = CommonProp.getTotal();
    }
    $scope.checkOutTot = CommonProp.getTotal();

    $scope.CheckOut = function () {
        $location.path('/CheckOut');
    }

});
//////////////////////////CheckOut/////////////////////////////////////////////////////////////////////////////////
SignIn.controller("CheckOutController", function ($scope, $rootScope, CommonProp, $http, $location, UserApi) {
    $scope.selectedItems = CommonProp.getItems();
    $scope.checkOutTot = CommonProp.getTotal();

    $scope.cust_id = $rootScope.currentUser.cust_id;

    $scope.Finish = function () {
        var paymentToAdd = {
            'cust_id': $scope.cust_id,
            'account_no': $scope.account_no,
            'account_holder': $scope.account_holder,
            'exp_date': $scope.exp_date,
            'CCV': $scope.CCV
        };
        UserApi.AddPayment(paymentToAdd).then(function (response) {      
            alert('Your Payment is successfull, Thank you.');
            $scope.cust_id = undefined;
            $scope.account_no = undefined;
            $scope.account_holder = undefined;
            $scope.exp_date = new Date();
            $scope.CCV = undefined;
            
        }),
            function (response) {
                alert('unable to process your request');
            }
            $scope.Complete();
    };

    $scope.Complete = function () {
        $scope.cust_id = $rootScope.currentUser.cust_id;
        for (var i = 0; i <= $rootScope.shoppingCart.length; i++) {
            $scope.prod_id = $rootScope.shoppingCart[i].prod_id;
            $scope.product_name = $rootScope.shoppingCart[i].prod_name;
            $scope.quantity = $rootScope.shoppingCart[i].count;
            $scope.product_price = $rootScope.shoppingCart[i].prod_price;
            $scope.order_date = new Date();
            var OrderToAdd =
                {
                    'cust_id': $scope.cust_id,
                    'prod_id': $scope.prod_id,
                    'product_name': $scope.product_name,
                    'quantity': $scope.quantity,
                    'product_price': $scope.product_price,
                    'order_date': $scope.order_date,
                    'Delivery_Address': $scope.Delivery_Address,
                    'Delivery_Status':$scope.Delivery_Status
                };

            UserApi.AddOrder(OrderToAdd).then(function (response) {
                console.log(response);
                $location.path('/home')
            }),
            function (response) {
                alert("Unable to add");
            }
        }
    };
    alert('Your Order has been Added');
});
////////////////////////////Driver////////////////////////////////////////////////////////////////////////////////
SignIn.controller("DriverController", function ($scope, $rootScope, CommonProp, $http, $location, UserApi) {
    $scope.AdDriver = function () {
        var DriverToAdd = {
            'Driver_name': $scope.Driver_name,
            'Driver_surname': $scope.Driver_surname,
            'Driver_email': $scope.Driver_email,
            'Driver_password': $scope.Driver_password,
            'Driver_phone': $scope.Driver_phone,
            'hire_date': $scope.hire_date
        };
        UserApi.AddDriver(DriverToAdd).then(function (response) {
            alert('Driver ' + response.data.Driver_name + ' added successfully.');
            $scope.Driver_name = undefined;
            $scope.Driver_surname = undefined;
            $scope.Driver_email = undefined;
            $scope.Driver_password = undefined;
            $scope.Driver_phone,
            $scope.hire_date;

            $location.path('/Dashboard');
        }),
            function (response) {
                alert('Unable to add Customer');
            };
    }
});
//////////////////////////////DriverLogIn/////////////////////////////////////////////////////////////////////////
SignIn.controller("DriverLoginController", function ($scope, $rootScope, CommonProp, $http, $location, UserApi) {
    var LogInDriver = {
        'Driver_email': $scope.Driver_email,
        'Driver_password': $scope.Driver_password,
        'Driver_name': $scope.Driver_name,
        'Driver_Id': $scope.Driver_Id
    }
    $scope.DriverLog = function () {
        UserApi.GetDriverInfo($scope.Driver_email, $scope.Driver_password).then(function (response) {
            if (response.data === null) {
                alert("You've entered an ivalid email and password");
            } else {
                alert('Login Successful. Welcome ' + response.data.Driver_name);
            
                $rootScope.currentUser = response.data;
                $location.path('/DriverDashboard');
            }
        }), function (response) {
            alert("Error in logging the system");
        }
    };
});
////////////////////////////Orders//////////////////////////////////////////////////////////////////////////////////
SignIn.controller("OrderDataController", function ($scope, $rootScope, CommonProp, $http, $location, UserApi) {
    $scope.selectedItem = "Selected Order";
    $scope.isDeleteItemVisible = false;
    GetOrders();
    function GetOrders() {
        UserApi.GetOrder().then(function (response) {
            $scope.orderData = response.data;
        }),
        function () {
            alert("Couldn't get all the Orders information");
        }
    };
    $scope.dropboxitemselected = function (order) {
        $scope.isDeleteItemVisible = true;
        $scope.selectedItem = order.Id;
        $scope.prod_id = order.prod_id;
        $scope.quantity = order.quantity;
        $scope.product_name = order.product_name;
        $scope.product_price = order.product_price;
        $scope.order_date = order.order_date;
        $scope.Delivery_Address = order.Delivery_Address;
        $scope.cust_id = order.cust_id;
    };
    
    $scope.OrderStatus = function () {
            var OrderToAdd =
                {
                    'Id': $scope.selectedItem,
                    'cust_id': $scope.cust_id,
                    'prod_id':$scope.prod_id,
                    'product_name': $scope.product_name,
                    'quantity':$scope.quantity,
                    'product_price': $scope.product_price,
                    'order_date':$scope.order_date,
                    'Delivery_Address':$scope.Delivery_Address,
                    'Delivery_Status': $scope.Delivery_Status 
                };
                console.log($scope.Delivery_Status);
                UserApi.UpdateOrder(OrderToAdd).then(function (response) {
                    alert('Order status Updated. Thank you for your Services');
                    if ($scope.Delivery_Address == "Delivered") {
                        $scope.dropboxitemselected.splice(selectedItem, 1);
                        GetOrders();
                    }
                    $scope.cust_id = undefined;
                    $scope.prod_id = undefined;
                    $scope.product_name = undefined;
                    $scope.quantity = undefined;
                    $scope.product_price = undefined;
                    $scope.order_date = undefined;
                    $scope.Delivery_Address=undefined;
                    $scope.Delivery_Status = undefined;
                    GetOrders();
                }),
                    function (response) {
                        alert("Couldn't update the status");
                    }
    } 
        
});
////////////////////////////////////////////Admin Orders/////////////////////////////////////////////////////////
SignIn.controller("OrdersDataController", function ($scope, $rootScope, CommonProp, $http, $location, UserApi) {
    GetOrders();
    function GetOrders() {
        UserApi.GetOrder().then(function (response) {
            $scope.orderData = response.data;
        }),
        function () {
            alert("Couldn't get all the Orders information");
        }
    };
});
/////////////////////////////////////////MailData////////////////////////////////////////////////////////////////
SignIn.controller("MailDataController", function ($scope, $rootScope, CommonProp, $http, $location, UserApi) {
    GetMails();
    function GetMails() {
        UserApi.GetMail().then(function (response) {
            $scope.mailData = response.data;
        }),
        function () {
            alert("Couldn't get all the Orders information");
        }
    };
});