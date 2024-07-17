import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white w-4/5 md:w-1/2 lg:w-1/3 xl:w-1/4 p-8 rounded-lg shadow-lg" style={{ fontFamily: 'Arial', color: '#2C0B07' }}>
        <div className=" items-center justify-center mb-6">
          <img src='/logo.png' alt="Logo" className=" mr-2" /> {/* Utilisation de l'image du logo */}
          {/* <h2 className="text-2xl font-bold text-center">Login</h2> */}
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-bold mb-2">Identifiant</label>
          <input type="text" id="username" name="username" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-bold mb-2">Mot de Passe</label>
          <input type="password" id="password" name="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500" />
        </div>
        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
