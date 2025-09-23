import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Users, MapPin } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

export default function ChatRoomPage() {
  const navigate = useNavigate();
  const { packageId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'Sarah Johnson',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      message: 'Hey everyone! So excited for this Iceland trip! 🇮🇸',
      time: '10:30 AM',
      isMe: false,
    },
    {
      id: 2,
      user: 'Mike Chen',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      message: 'Same here! Has anyone been to Iceland before? Any tips?',
      time: '10:32 AM',
      isMe: false,
    },
    {
      id: 3,
      user: 'You',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
      message: 'This is my first time too! Looking forward to the Northern Lights 🌌',
      time: '10:35 AM',
      isMe: true,
    },
    {
      id: 4,
      user: 'Emma Wilson',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      message: "I heard the Blue Lagoon is amazing! Can't wait for the spa experience 💆‍♀️",
      time: '10:38 AM',
      isMe: false,
    },
  ]);

  const messagesEndRef = useRef(null);

  const packageInfo = {
    1: { name: 'Iceland Adventure', participants: 12, departure: 'Feb 1, 2026' },
    2: { name: 'Bali Experience', participants: 8, departure: 'Jan 15, 2026' },
  };

  const currentPackage = packageInfo[packageId] || packageInfo[1];

  // Participants data with online/offline status
  const participants = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      isOnline: true,
      lastSeen: null,
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      isOnline: true,
      lastSeen: null,
    },
    {
      id: 3,
      name: 'You (Gerry)',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
      isOnline: true,
      lastSeen: null,
    },
    {
      id: 4,
      name: 'Emma Wilson',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      isOnline: false,
      lastSeen: '2 hours ago',
    },
    {
      id: 5,
      name: 'Alex Rodriguez',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      isOnline: true,
      lastSeen: null,
    },
    {
      id: 6,
      name: 'Lisa Park',
      avatar:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face',
      isOnline: false,
      lastSeen: '1 day ago',
    },
    {
      id: 7,
      name: 'David Kim',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      isOnline: false,
      lastSeen: '3 hours ago',
    },
    {
      id: 8,
      name: 'Maria Garcia',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face',
      isOnline: true,
      lastSeen: null,
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: 'You',
        avatar:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
        message: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex">
      {/* Sidebar - Participants List (Left) */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-2">
            <button
              onClick={() => navigate('/my-packages')}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Trip Participants</h3>
          <div className="text-sm text-gray-500">
            {participants.filter((p) => p.isOnline).length} of {participants.length} online
          </div>
        </div>

        {/* Participants List */}
        <div className="flex-1 overflow-y-auto">
          {/* Online Participants */}
          <div className="p-4">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
              Online ({participants.filter((p) => p.isOnline).length})
            </div>
            <div className="space-y-3">
              {participants
                .filter((p) => p.isOnline)
                .map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="relative">
                      <img
                        src={participant.avatar}
                        alt={participant.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {participant.name}
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
              Offline ({participants.filter((p) => !p.isOnline).length})
            </div>
            <div className="space-y-3">
              {participants
                .filter((p) => !p.isOnline)
                .map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="relative">
                      <img
                        src={participant.avatar}
                        alt={participant.name}
                        className="w-10 h-10 rounded-full opacity-75"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gray-400 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {participant.name}
                      </div>
                      <div className="text-xs text-gray-500">Last seen {participant.lastSeen}</div>
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
                {currentPackage.name} Group Chat
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{currentPackage.participants} participants</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>Departure: {currentPackage.departure}</span>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Online: {participants.filter((p) => p.isOnline).length}
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-100/50 backdrop-blur-sm">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`flex space-x-3 max-w-xs lg:max-w-md ${
                  msg.isMe ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <img
                  src={msg.avatar}
                  alt={msg.user}
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
                <div
                  className={`${
                    msg.isMe ? 'bg-blue-600 text-white' : 'bg-white text-gray-900'
                  } rounded-2xl px-4 py-2 shadow-sm border border-gray-200`}
                >
                  {!msg.isMe && (
                    <div className="text-xs font-medium text-gray-600 mb-1">{msg.user}</div>
                  )}
                  <div className="text-sm">{msg.message}</div>
                  <div className={`text-xs mt-1 ${msg.isMe ? 'text-blue-100' : 'text-gray-500'}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <div className="flex-1">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={!message.trim()}
              className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
