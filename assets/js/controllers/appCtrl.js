app.controller("AppCtrl", [
  "$scope",
  "$location",
  function ($scope, $location) {
    $scope.showHeader =
      $location.path() !== "/login" && $location.path() !== "/register";
  },
]);

app.controller("HeadCtrl", [
  "$rootScope",
  "$scope",
  "$location",
  "$http",
  function ($rootScope, $scope, $location, $http) {
    var userToken = localStorage.getItem("access_token");
    if (!userToken) {
      $location.path("/login");
    } else {
      let data = { token: userToken };
      $http({
        method: "POST",
        url: "apiConfig/home.php",
        data: JSON.stringify(data),
        async: false,
      })
        .then(function (result) {
          $scope.tablesList = result.data.data;
          $rootScope.userDetails = result.data.user_details;
        })
        .catch(function () {});
    }
  },
]);

app.controller("HomeCtrl", [
  "$rootScope",
  "$scope",
  "$location",
  "$http",

  function ($rootScope, $scope, $location, $http) {
    var userToken = localStorage.getItem("access_token");
    if (!userToken) {
      $location.path("/login");
    } else {
      $rootScope.$watch("userDetails", function (newValue, oldValue) {
        if (newValue !== undefined) {
          console.log($rootScope.userDetails);
        }
      });

      let movieQuotes = [
        "Bringing the box office to your fingertips – one ticket at a time.",
        "Empowering moviegoers and streamlining cinema experiences.",
        "Seamless ticket management for the cinema dream team.",
        "From showtimes to sold-out seats, all in the palm of your hand.",
        "Where movie magic meets modern convenience.",
        "Unlocking the reel world with every scan and swipe.",
        "Because every movie deserves a full house.",
        "Your pass to stress-free ticketing, anytime, anywhere.",
        "Turning movie nights into memorable experiences, one app at a time.",
        "Tickets made easy, for the love of cinema and its fans.",
        "No lines, no wait – just lights, camera, app-tion!",
        "Bringing movie joy to screens and scanners near you.",
        "Lights down, curtains up – and your digital ticket shines.",
        "Curtains rise on efficiency: the movie staff's ultimate companion.",
        "Joining the cast of cinema enthusiasts – all on the app stage.",
      ];

      $scope.quote =
        movieQuotes[Math.floor(Math.random() * movieQuotes.length)];
    }
  },
]);

app.controller("LoginCtrl", [
  "$scope",
  "$location",
  "$http",
  function ($scope, $location, $http) {
    var userToken = localStorage.getItem("access_token");
    if (userToken) {
      $location.path("/");
    } else {
      // emailEl
      $scope.email = "";
      $scope.emailErr = "";
      $scope.emailValidation = function () {
        if ($scope.email === "") {
          $scope.emailErr = "*Email required";
          return false;
        } else if (!$scope.email.match(/^\w+@\w+\.[A-z]{2,}$/)) {
          $scope.emailErr = "*Please enter valid email";
          return false;
        } else {
          $scope.emailErr = "";
          return true;
        }
      };

      // passwordEl
      $scope.password = "";
      $scope.passwordErr = "";
      $scope.passwordValidation = function () {
        if ($scope.password === "") {
          $scope.passwordErr = "*Password required";
          return false;
        } else if ($scope.password.length < 8) {
          $scope.passwordErr = "*Password must contain 8 characters";
          return false;
        } else if (
          !(
            $scope.password.match(/[A-Z]/) &&
            $scope.password.match(/[a-z]/) &&
            $scope.password.match(/[0-9]/) &&
            $scope.password.match(/\W/)
          )
        ) {
          $scope.passwordErr =
            "*Password must contain alpha-numeric and specialCharacters";
          return false;
        } else {
          $scope.passwordErr = "";
          return true;
        }
      };

      // loginBtn

      $scope.loginBtn = function () {
        $scope.emailValidation();
        $scope.passwordValidation();
        if ($scope.emailErr === "" && $scope.passwordErr === "") {
          let data = { email: $scope.email, password: $scope.password };
          $http({
            method: "POST",
            url: "apiConfig/login.php",
            data: JSON.stringify(data),
          })
            .then(function (response) {
              if (!response.data.status) {
                alert(response.data.message);
                return;
              }
              localStorage.setItem("access_token", response.data.token);
              $location.path("/");
            })
            .catch(function (response) {
              alert(response.data.message);
            });
        }
      };
    }
  },
]);

app.controller("RegisterCtrl", [
  "$scope",
  "$location",
  "$http",
  function ($scope, $location, $http) {
    let userToken = localStorage.getItem("access_token");
    if (userToken) {
      $location.path("/");
    } else {
      // firstNameEl
      $scope.firstName = "";
      $scope.firstNameErr = "";

      $scope.firstNameValidation = function () {
        if ($scope.firstName === "") {
          $scope.firstNameErr = "*First name required";
          return false;
        } else if ($scope.firstName.match(/[^A-z ]/)) {
          $scope.firstNameErr = "*Please enter alphabets";
          return false;
        } else {
          $scope.firstNameErr = "";
          return true;
        }
      };

      // lastNameEl
      $scope.lastName = "";
      $scope.lastNameErr = "";
      $scope.lastNameValidation = function () {
        if ($scope.lastName === "") {
          $scope.lastNameErr = "*Last name required";
          return false;
        } else if ($scope.lastName.match(/[^A-z ]/)) {
          $scope.lastNameErr = "*Please enter alphabets";
          return false;
        } else {
          $scope.lastNameErr = "";
          return true;
        }
      };

      // emailEl
      $scope.email = "";
      $scope.emailErr = "";
      $scope.emailValidation = function () {
        if ($scope.email === "") {
          $scope.emailErr = "*Please enter email";
          return false;
        } else if (!$scope.email.match(/\w+@[A-z]+\.[A-z]{2,}/)) {
          $scope.emailErr = "*Please enter valid email";
          return false;
        } else {
          $scope.emailErr = "";
          return true;
        }
      };

      // passwordEl
      $scope.password = "";
      $scope.passwordErr = "";
      $scope.passwordValidation = function () {
        if ($scope.password === "") {
          $scope.passwordErr = "*Please enter password";
          return false;
        } else if ($scope.password.length < 8) {
          $scope.passwordErr = "*Password must contain 8 characters";
          return false;
        } else if (
          !(
            $scope.password.match(/[A-Z]/) &&
            $scope.password.match(/[a-z]/) &&
            $scope.password.match(/[0-9]/) &&
            $scope.password.match(/\W/)
          )
        ) {
          $scope.passwordErr =
            "*Password must contain alpha-numeric and specialCharacters";
          return false;
        } else {
          $scope.passwordErr = "";
          return true;
        }
      };

      // confirmPasswordEl
      $scope.confirmPassword = "";
      $scope.confirmPasswordErr = "";
      $scope.confirmPasswordValidation = function () {
        if ($scope.confirmPassword === "") {
          $scope.confirmPasswordErr = "*Please enter confirm password";
          return false;
        } else if ($scope.confirmPassword.length < 8) {
          $scope.confirmPasswordErr = "*Password must contain 8 characters";
          return false;
        } else if (
          !(
            $scope.confirmPassword.match(/[A-Z]/) &&
            $scope.confirmPassword.match(/[a-z]/) &&
            $scope.confirmPassword.match(/[0-9]/) &&
            $scope.confirmPassword.match(/\W/)
          )
        ) {
          $scope.confirmPasswordErr =
            "*Password must contain alpha-numeric and specialCharacters";
          return false;
        } else if ($scope.confirmPassword !== $scope.password) {
          $scope.confirmPasswordErr =
            "*Confirm password must be same as password";
          return false;
        } else {
          $scope.confirmPasswordErr = "";
          return true;
        }
      };

      // signUpBtn

      $scope.signupBtn = function () {
        $scope.firstNameValidation();
        $scope.lastNameValidation();
        $scope.emailValidation();
        $scope.passwordValidation();
        $scope.confirmPasswordValidation();
        if (
          !(
            $scope.firstNameErr &&
            $scope.lastNameErr &&
            $scope.emailErr &&
            $scope.passwordErr &&
            $scope.confirmPasswordErr
          )
        ) {
          let data = {
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            email: $scope.email,
            password: $scope.password,
          };
          $http({
            method: "POST",
            url: "apiConfig/register.php",
            data: JSON.stringify(data),
          })
            .then(function (response) {
              if (response.data.status) {
                $location.path("login");
                return;
              }
              alert(response.data.message);
              return;
            })
            .catch(function (response) {});
        }
      };
    }
  },
]);

app.controller("TheatersListCtrl", [
  "$rootScope",
  "$scope",
  "$location",
  "$http",
  "TablesDataList",
  function ($rootScope, $scope, $location, $http, TablesDataList) {
    TablesDataList.getList("theaters")
      .then(function (data) {
        if(data.status){
          $scope.theaterList=data.data
        }else{
          alert(data["message"])
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  },
]);


app.controller("usersListCtrl", [
  "$rootScope",
  "$scope",
  "$location",
  "$http",
  "TablesDataList",
  function ($rootScope, $scope, $location, $http, TablesDataList) {
    TablesDataList.getList("users")
      .then(function (data) {
        if(data.status){
          $scope.userList=data.data
        }else{
          alert(data["message"])
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  },
]);

app.controller("moviesListCtrl", [
  "$rootScope",
  "$scope",
  "$location",
  "$http",
  "TablesDataList",
  function ($rootScope, $scope, $location, $http, TablesDataList) {
    TablesDataList.getList("movies")
      .then(function (data) {
        if(data.status){
          $scope.movieList=data.data
        }else{
          alert(data["message"])
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  },
]);

app.controller("bookingsListCtrl", [
  "$rootScope",
  "$scope",
  "$location",
  "$http",
  "TablesDataList",
  function ($rootScope, $scope, $location, $http, TablesDataList) {
    TablesDataList.getList("bookings")
      .then(function (data) {
        if(data.status){
          $scope.bookingList=data.data
        }else{
          alert(data["message"])
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  },
]);