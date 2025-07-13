import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';


const ChatBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem('user') || localStorage.getItem('userId');
  const receiver = location.state?.receiver; // { _id, name, imageUrl }
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!userId || !receiver?._id) return;
    setLoading(true);

    const fetchMessages = () => {
      axios.get(`${import.meta.env.VITE_API_URL}/chat/${userId}/${receiver._id}`, { withCredentials: true })
        .then(res => setMessages(res.data))
        .catch(() => setMessages([]))
        .finally(() => setLoading(false));
    };

    fetchMessages(); // initial fetch

    const interval = setInterval(fetchMessages, 2000); // poll every 2 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [userId, receiver]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !userId || !receiver?._id) return;
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/chat/`, {
        sender: userId,
        receiver: receiver._id,
        content: input.trim(),
      }, {withCredentials: true});
      setMessages(prev => [...prev, res.data]);
      setInput('');
    } catch (err) {
      // Optionally show error
    }
  };

  if (!receiver) {
    return <div className='flex items-center justify-center h-screen text-gray-400'>No user selected.</div>;
  }

  return (
    <div className='h-screen'>
      <div className='w-full h-18 rounded-md bg-gray-200 border-2 border-black flex items-center gap-5 px-4'>
        <i onClick={() => navigate(-1)} className="text-2xl fa-solid fa-arrow-left cursor-pointer"></i>
        <div><img className='w-12 border-2 border-black h-12 object-cover rounded-full ' src={receiver.imageUrl || '/public/images/alesia-kazantceva-XLm6-fPwK5Q-unsplash.jpg'} alt='' /></div>
        <div className='flex flex-col '>
          <p className='font-semibold'>{receiver.name}</p>
          <p>Online</p>
        </div>
      </div>
      <div className='flex flex-col justify-between h-[calc(100vh-72px)]'>
        <div className='flex flex-col gap-2 p-4 overflow-y-scroll flex-1'>
          {loading ? (
            <div className='text-center text-gray-400'>Loading...</div>
          ) : messages.length === 0 ? (
            <div className='text-center text-gray-400'>No messages yet.</div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={msg._id || idx}
                className={
                  msg.sender === userId
                    ? 'bg-blue-300 p-2 rounded-md self-end max-w-[70%] flex flex-col items-end'
                    : 'bg-gray-300 p-2 rounded-md w-fit max-w-[70%] flex flex-col items-start'
                }
              >
                <span>{msg.content}</span>
                {msg.timestamp && (
                  <span className="text-xs text-gray-500 mt-1">
                    {new Date(msg.timestamp).toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true, month: 'short', day: 'numeric' })}
                  </span>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className='flex items-center justify-around gap-2 m-3'>
          <input
            type='text'
            className='w-[90%] h-12 rounded-md border-2 border-black px-4'
            placeholder='Type your message...'
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
            disabled={!receiver}
          />
          <i
            className='text-black text-3xl fa-solid fa-paper-plane cursor-pointer'
            onClick={sendMessage}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default ChatBar;

