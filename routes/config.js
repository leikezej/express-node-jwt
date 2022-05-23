app.get('/users/:userId', [
   UsersController.getById
]);

app.post('/auth', [
   VerifyUserMiddleware.hasAuthValidFields,
   VerifyUserMiddleware.isPasswordAndUserMatch,
   AuthorizationController.login
]);