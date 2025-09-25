import { useState, useRef, useEffect, useContext } from 'react';
import { ArrowLeft, Send, Users, MapPin } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { format } from 'date-fns';
import socket from '../libs/socket';
import { AuthContext } from '../contexts/auth';

export default function ChatRoomPage() {
  const navigate = useNavigate();
  const { packageId } = useParams();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const { profile, fetchProfile } = useContext(AuthContext);
  const [packageData, setPackageData] = useState({});

  const params = useParams();

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    socket.auth = {
      access_token: localStorage.getItem('access_token'),
      roomId: params.packageId,
    };
    socket.disconnect().connect();
    return () => {
      socket.disconnect();
      console.log('socket disconnected');
    };
  }, []);

  useEffect(() => {
    socket.on(`travel:${params.packageId}`, (msg) => {
      setMessages(msg);
    });
    socket.on(`users_online:${params.packageId}`, (data) => {
      setUsers(data);
    });
    socket.on(`package:${params.packageId}`, (data) => {
      setPackageData(data);
    });
    return () => {
      socket.off(`travel:${params.packageId}`);
      socket.off(`users_online:${params.packageId}`);
      socket.off(`package:${params.packageId}`);
    };
  }, []);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  console.log(packageData.Transactions, '<<< package data');
  console.log(users, '<<< users');

  return (
    <div className="h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex">
      {/* Sidebar - Participants List (Left) */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-2">
            <button
              onClick={() => navigate('/my-packages')}
              className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Trip Participants</h3>
          <div className="text-sm text-gray-500">
            {users.length} of {packageData.Transactions ? packageData.Transactions.length : 0}{' '}
            online
          </div>
        </div>

        {/* Participants List */}
        <div className="flex-1 overflow-y-auto">
          {/* Online Participants */}
          <div className="p-4">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
              Online (
              {packageData.Transactions
                ? packageData.Transactions.filter((participant) =>
                    users.some((user) => user.userId === participant.User.id)
                  ).length
                : 0}
              )
            </div>
            <div className="space-y-3">
              {packageData.Transactions &&
                packageData.Transactions.filter((participant) =>
                  users.some((user) => user.userId === participant.User.id)
                ).map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="relative">
                      <img
                        src={
                          participant.User.ImageUrl
                            ? participant.User.ImageUrl
                            : 'https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78='
                        }
                        alt="participant.User.firstName"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {participant.User.firstName}
                        {participant.User.id === profile.id && (
                          <span className="text-xs text-blue-400 font-normal ml-1"> ( you ) </span>
                        )}
                      </div>
                      <div className="text-xs text-green-600">Online</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Offline Participants */}
          <div className="p-4 border-t border-gray-100">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
              Offline (
              {packageData.Transactions
                ? packageData.Transactions.filter(
                    (participant) => !users.some((user) => user.userId === participant.User.id)
                  ).length
                : 0}
              )
            </div>
            <div className="space-y-3">
              {packageData.Transactions &&
                packageData.Transactions.filter(
                  (participant) => !users.some((user) => user.userId === participant.User.id)
                ).map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="relative">
                      <img
                        src={
                          participant.User.ImageUrl
                            ? participant.User.ImageUrl
                            : 'https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78='
                        }
                        alt="participant.User.firstName"
                        className="w-10 h-10 rounded-full opacity-75"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gray-400 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {participant.User.firstName}
                        {participant.User.id === profile.id && (
                          <span className="text-xs text-blue-600 font-normal ml-1">(you)</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">Offline</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area (Right) */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {packageData.location} Group Chat
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>
                    {packageData.Transactions ? packageData.Transactions.length : 0} participants
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>
                    Departure:{' '}
                    {packageData.departure_date
                      ? new Date(packageData.departure_date).toISOString().split('T')[0]
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500">Online: {users.length}</div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-100/50 backdrop-blur-sm">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.User.id === profile.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex space-x-3 max-w-xs lg:max-w-md ${
                  msg.User.id === profile.id ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <img
                  src={
                    msg.User.ImageUrl ||
                    'https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78='
                  }
                  alt={msg.User.firstName}
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
                <div
                  className={`${
                    msg.User.id === profile.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-900'
                  } rounded-2xl px-4 py-2 shadow-sm border border-gray-200`}
                >
                  {!msg.User.id === profile.id && (
                    <div className="text-xs font-medium text-gray-600 mb-1">{msg.user}</div>
                  )}
                  <div className="text-sm">{msg.message}</div>
                  <div
                    className={`text-xs mt-1 ${
                      msg.User.id === profile.id ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {format(new Date(msg.createdAt), 'h:mm a')}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const msg = formData.get('message');
              if (!msg) return;
              socket.emit('chat_message', { message: msg });
              e.target.reset();
            }}
            className="flex space-x-4"
          >
            <div className="flex-1">
              <input
                type="text"
                name="message"
                placeholder="Type your message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="cursor-pointer bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
