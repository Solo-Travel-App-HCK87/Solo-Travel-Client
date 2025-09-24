import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { showError } from '../helpers/alert';
import { http } from '../helpers/http';

export default function ProfilePage() {
  const params = useParams();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setInitialLoading(true);
        const response = await http({
          method: 'GET',
          url: `/users/${params.id}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        const userData = response.data;
        setProfile({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          imageUrl: userData.imageUrl || '',
        });
      } catch (error) {
        showError(error);
      } finally {
        setInitialLoading(false);
      }
    };

    if (params.id) {
      fetchUserData();
    }
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showError('Please select a valid image file');
        return;
      }

      // Validate file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        showError('File size must be less than 2MB');
        return;
      }

      try {
        setLoading(true);

        // Create FormData for file upload
        const formData = new FormData();
        formData.append('image', file);

        const response = await http({
          method: 'PATCH',
          url: `/users/${params.id}/image`,
          data: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        // Update profile with new image URL from server response
        setProfile({ ...profile, imageUrl: response.data.imageUrl });
      } catch (error) {
        showError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await http({
        method: 'PUT',
        url: `/users/${params.id}`,
        data: {
          firstName: profile.firstName,
          lastName: profile.lastName,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      // Update profile with response data
      setProfile((prevProfile) => ({
        ...prevProfile,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
      }));

      // Show success message or redirect
      console.log('Profile updated successfully:', response.data);
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
          style={{
            backgroundImage: "url('/src/assets/bg.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen py-20 px-4">
          <div className="max-w-[480px] w-full">
            <div className="p-6 sm:p-8 rounded-2xl bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-slate-600">Loading profile...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
          style={{
            backgroundImage: "url('/src/assets/bg.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen py-20 px-4">
          <div className="max-w-[480px] w-full">
            <div className="p-6 sm:p-8 rounded-2xl bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl">
              <h1 className="text-slate-900 text-center text-3xl font-semibold">Profile</h1>

              {/* Profile Picture Section */}
              <div className="mt-8 flex flex-col items-center">
                <div className="relative">
                  {profile.imageUrl ? (
                    <img
                      src={profile.imageUrl}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-blue-600"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#9ca3af"
                        className="w-12 h-12"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )}
                </div>
                <label
                  className={`mt-4 cursor-pointer px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                  } text-white`}
                >
                  {loading ? 'Uploading...' : 'Upload Picture'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={loading}
                  />
                </label>
              </div>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="text-slate-900 text-sm font-medium mb-2 block">
                    First Name
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="firstName"
                      onChange={handleChange}
                      value={profile.firstName}
                      type="text"
                      required
                      className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                      placeholder="Enter First Name"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-4 h-4 absolute right-4"
                      viewBox="0 0 24 24"
                    >
                      <circle cx={10} cy={7} r={6} data-original="#000000" />
                      <path
                        d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                        data-original="#000000"
                      />
                    </svg>
                  </div>
                </div>

                <div>
                  <label className="text-slate-900 text-sm font-medium mb-2 block">Last Name</label>
                  <div className="relative flex items-center">
                    <input
                      name="lastName"
                      onChange={handleChange}
                      value={profile.lastName}
                      type="text"
                      required
                      className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                      placeholder="Enter Last Name"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-4 h-4 absolute right-4"
                      viewBox="0 0 24 24"
                    >
                      <circle cx={10} cy={7} r={6} data-original="#000000" />
                      <path
                        d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                        data-original="#000000"
                      />
                    </svg>
                  </div>
                </div>

                <div className="!mt-12">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white focus:outline-none cursor-pointer ${
                      loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {loading ? 'Updating...' : 'Update Profile'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
