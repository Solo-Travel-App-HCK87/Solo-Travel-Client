import { useState } from 'react';
import { Link } from 'react-router';

export default function AuthForm(props) {
  const { handleSubmit, type, btmMsg1, btmLink, btmMsg2, loading } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
        {/* Left side - Image */}
        <div className="hidden md:block lg:w-1/2 md:h-64 lg:h-auto relative rounded-3xl m-1 overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
          >
            <div className="absolute inset-0 bg-black/40  bg-opacity-30"></div>
            <div className="absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-8 lg:right-8 text-white">
              <div className=" rounded-lg p-4 lg:p-6">
                <p className="text-white text-center text-xs lg:text-sm font-bold uppercase tracking-wide">
                  WHETHER YOU'RE DREAMING OF SUN-SOAKED BEACHES,
                  <br className="hidden lg:block" />
                  <span className="lg:hidden"> </span>
                  BUSTLING CITYSCAPES, OR SERENE MOUNTAIN
                  <br className="hidden lg:block" />
                  <span className="lg:hidden"> </span>
                  RETREATS, YOUR ADVENTURE STARTS HERE.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white min-h-screen lg:min-h-0">
          <div className="w-full max-w-md mx-auto">
            {/* Hero text above form */}
            <div className="mb-6 text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4 leading-tight uppercase tracking-wide">
                YOUR GATEWAY TO
                <br />
                UNFORGETTABLE JOURNEYS
              </h1>
              <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
                Ready to embark on your next adventure? {type === 'Log In' ? 'Log in' : 'Register'}{' '}
                now and let Traveler take you there. Your dream destination is just a click away!
              </p>
            </div>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(form);
              }}
            >
              {type === 'Register' && (
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-gray-700 text-sm font-medium mb-2 block">
                      First Name
                    </label>
                    <input
                      name="firstName"
                      onChange={handleChange}
                      value={form.firstName}
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                      placeholder="Enter first name"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="text-gray-700 text-sm font-medium mb-2 block">
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      onChange={handleChange}
                      value={form.lastName}
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="text-gray-900 text-sm font-bold mb-2 block">Email</label>
                <input
                  name="email"
                  onChange={handleChange}
                  value={form.email}
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors bg-gray-50"
                  placeholder="Input email"
                />
              </div>

              <div>
                <label className="text-gray-900 text-sm font-bold mb-2 block">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    onChange={handleChange}
                    value={form.password}
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                    placeholder="••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                          clipRule="evenodd"
                        />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {type === 'Log In' && (
                <div className="flex items-center justify-between text-sm mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="remember" className="ml-2 text-gray-600">
                      Remember me
                    </label>
                  </div>
                  <Link to="#" className="text-blue-600 hover:underline">
                    Forgot your password?
                  </Link>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-green-800 hover:bg-green-900 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  `${type}${type === 'Log In' ? ' - Continue Exploring and Planning' : ''}`
                )}
              </button>

              <div className="text-center mt-6">
                <span className="text-gray-600 text-sm">{btmMsg1} </span>
                <Link to={btmLink} className="text-blue-600 hover:underline text-sm font-medium">
                  {btmMsg2}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
