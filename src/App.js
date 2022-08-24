import './App.css';

import UAuth from '@uauth/js';

function App() {
  let message = '';

  const uauth = new UAuth({
    clientID: process.env.REACT_APP_CLIENT_ID,
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
    scope: 'openid wallet',
  });

  const login = async () => {
    try {
      const authorization = await uauth.loginWithPopup();
      console.log(authorization);
      message = 'logged in';
      message = authorization.idToken.sub;
      document.getElementById('msg').innerHTML =
        '<p><h1 class="text-lg p-4">Welcome</h1> <br/><h2 class="text-xl">' +
        message +
        '</h2></p>';
      document.getElementById('btn-login').style.display = 'none';
      document.getElementById('btn-logout').style.display = '';
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    await uauth.logout();
    console.log('Logged out with Unstoppable');
    document.getElementById('msg').innerHTML = '';
    document.getElementById('btn-login').style.display = '';
  };

  return (
    <>
      <div className="flex m-10">
        <div className="m-auto">
          <button
            id="btn-login"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={login}
          >
            login
          </button>
          <button
            id="btn-logout"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={logout}
          >
            logout
          </button>
          <div id="msg" class="m-auto"></div>
        </div>
      </div>
    </>
  );
}

export default App;
