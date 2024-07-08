import { useEffect, useRef } from 'react'
import Message from './Message/Message'

import './MessageList.scss'

const messages = [
  { text: 'Good morning! How are you doing today?' },
  { text: 'Hello! I hope you are having a great day.', isRecieved: true },
  {
    text: 'I would like to invite you to participate in our exciting new project!',
  },
  { text: 'No, thank you. I appreciate the offer though.', isRecieved: true },
  { text: 'Why not? Is there any specific reason?' },
  { text: "Because I said so. Trust me, it's for the best.", isRecieved: true },
  { text: "Why lol? I'm just curious." },
  {
    text: 'I think you would be a great addition to our team. Your skills are impressive. I checked your profile picture and it looks amazing! Looks like you stole all of your clothes from the thrift shop! Impressive!',
  },
  {
    text: "I've seen your previous work and it's truly remarkable.",
    isRecieved: true,
  },
  { text: "Thank you for the compliment. I've put a lot of effort into it." },
  {
    text: "You're welcome! Your talent deserves recognition.",
    isRecieved: true,
  },
  { text: "Can you tell me more about the project? I'm interested." },
  {
    text: "Sure! It's a web application for managing tasks, deadlines, and collaboration.",
    isRecieved: true,
  },
  { text: 'That sounds interesting. I would love to learn more about it.' },
  {
    text: "Yes, it's a challenging but rewarding project. We have a great team working on it.",
    isRecieved: true,
  },
  {
    text: "I'm excited to be a part of it. Let's make something amazing together!",
  },
  {
    text: 'Great! We can discuss the details further. Looking forward to it!',
    isRecieved: true,
  },
  { text: 'Me too! This is going to be an incredible journey.' },
]

const MessageList = () => {
  return (
    <ul className='message-list'>
      {messages.reverse().map((message) => (
        <Message
          key={message.text}
          text={message.text}
          isRecieved={message.isRecieved}
        />
      ))}
    </ul>
  )
}

export default MessageList
