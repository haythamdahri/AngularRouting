// Fake auth service
export class AuthService {
  loggedIn: boolean = false;

  // Return the fake user authentication state using promise class
  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            resolve(this.loggedIn);
          }, 1000);
      }
    );
    return promise;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }

}
