import React from 'react';

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/auth/google'; // Backend URL
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md text-center">
        <div className="text-5xl text-blue-500 mb-4">📝</div>
        <h2 className="text-2xl font-bold mb-2">Welcome to TaskFlow</h2>
        <p className="text-gray-600 mb-6">
          Sign in with Google to manage your tasks efficiently
        </p>
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 bg-white border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:shadow-md"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="G"
            className="h-5 w-5"
          />
          <span className="font-medium text-gray-700">Continue with Google</span>
        </button>
        <p className="text-xs text-gray-500 mt-4">
          By signing in, you agree to our{' '}
          <a href="#" className="text-blue-500 underline">Terms of Service</a>{' '}
          and{' '}
          <a href="#" className="text-blue-500 underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default Login;
