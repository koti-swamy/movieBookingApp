app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "templates/home.html",
      controller: "HomeCtrl",
    })
    .state("theaters", {
      url: "/theaters",
      templateUrl: "templates/theatersList.html",
      controller: "TheatersListCtrl",
    })
    .state("users", {
      url: "/users",
      templateUrl: "templates/usersList.html",
      controller: "usersListCtrl",
    })
    .state("movies", {
      url: "/movies",
      templateUrl: "templates/moviesList.html",
      controller: "moviesListCtrl",
    })
    .state("bookings", {
      url: "/bookings",
      templateUrl: "templates/bookingsList.html",
      controller: "bookingsListCtrl",
    })
    .state("login", {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: "LoginCtrl",
    })
    .state("register", {
      url: "/register",
      templateUrl: "templates/register.html",
      controller: "RegisterCtrl",
    });

  $urlRouterProvider.otherwise("/");
});
