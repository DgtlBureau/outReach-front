import { useEffect, useRef, useState } from 'react'
import StreamingAvatar, {
  AvatarQuality,
  StartAvatarResponse,
  StreamingEvents,
  TaskMode,
  TaskType,
  VoiceEmotion,
} from '@heygen/streaming-avatar'
import axios from 'axios'
import Loader from '../Shared/Loader/Loader'
import { AudioRecorder } from './audio-handler'

import './OneToOne.scss'
import CustomButton from '../Shared/CustomButton/CustomButton'

const QUESTIONS = [
  {
    id: 1,
    text: 'Привет, как тебя зовут?',
  },
  {
    id: 2,
    text: 'Сколько тебе лет?',
  },
  {
    id: 3,
    text: 'Отлично, спасибо тебе за ответы!',
  },
]

const OneToOne = () => {
  const [isLoadingSession, setIsLoadingSession] = useState(false)
  const [isLoadingRepeat, setIsLoadingRepeat] = useState(false)
  const [stream, setStream] = useState<MediaStream>()
  const [debug, setDebug] = useState<string>()
  const [knowledgeId, setKnowledgeId] = useState<string>('')
  const [avatarId, setAvatarId] = useState<string>('')
  const [language, setLanguage] = useState<string>('en')

  const [data, setData] = useState<StartAvatarResponse>()
  const [text, setText] = useState<string>('')
  const mediaStream = useRef<HTMLVideoElement>(null)
  const avatar = useRef<StreamingAvatar | null>(null)
  const [chatMode, setChatMode] = useState('text_mode')
  const [isUserTalking, setIsUserTalking] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [audioRecorder, setAudioRecorder] = useState<AudioRecorder | null>(null)
  const [recordingStatus, setRecordingStatus] = useState('')
  const [answers, setAnswers] = useState<string[]>([])

  const getStreamingToken = async () => {
    try {
      if (!process.env.REACT_APP_HEYGEN_KEY) {
        throw new Error('API key is missing from .env')
      }

      const { data } = await axios.post(
        'https://api.heygen.com/v1/streaming.create_token',
        {},
        {
          headers: {
            'x-api-key': process.env.REACT_APP_HEYGEN_KEY,
          },
        }
      )

      return data.data.token
    } catch (error) {
      console.error('Error retrieving access token:', error)
      throw new Error('Failed to retrieve access token')
    }
  }

  const handleAddAnswer = (text: string) => {
    setAnswers((prevState) => [...prevState, text])
  }

  async function endSession() {
    await avatar.current?.stopAvatar()
    setCurrentQuestion(1)
    setAnswers([])
    setStream(undefined)
  }

  async function startSession() {
    setIsLoadingSession(true)
    const newToken = await getStreamingToken()
    avatar.current = new StreamingAvatar({
      token: newToken as string,
    })
    avatar.current?.on(StreamingEvents.STREAM_READY, (event) => {
      console.log('>>>>> Stream ready:', event.detail)
      setStream(event.detail)
      if (currentQuestion === 1) {
        handleSpeak()
      }
    })
    avatar.current.on(StreamingEvents.STREAM_DISCONNECTED, () => {
      console.log('Stream disconnected')
      endSession()
    })
    try {
      const res = await avatar.current.createStartAvatar({
        quality: AvatarQuality.High,
        avatarName: avatarId,
        knowledgeId: knowledgeId, // Or use a custom `knowledgeBase`.
        voice: {
          rate: 1.5, // 0.5 ~ 1.5
          emotion: VoiceEmotion.SOOTHING,
        },
        language: 'ru',
        disableIdleTimeout: true,
      })

      setData(res)
      setChatMode('text_mode')
    } catch (error) {
      console.error('Error starting avatar session:', error)
    } finally {
      setIsLoadingSession(false)
    }
  }

  const handleSpeak = async () => {
    if (!avatar.current) {
      setDebug('Avatar API not initialized')

      return
    }
    const question = QUESTIONS.find(
      (question) => question.id === currentQuestion
    )?.text
    await avatar.current
      .speak({
        text: question || '',
        taskType: TaskType.REPEAT,
        taskMode: TaskMode.SYNC,
      })
      .catch((e) => {
        setDebug(e.message)
      })

    avatar.current.on(StreamingEvents.AVATAR_STOP_TALKING, () => {
      if (
        !QUESTIONS.find((question) => question.id === currentQuestion + 1)?.text
      ) {
        endSession()
        alert('Спасибо за участие')
      }
    })
    setIsLoadingRepeat(false)
    setCurrentQuestion((prevQuestionId) => prevQuestionId + 1)
  }

  function initializeAudioRecorder() {
    const audio = new AudioRecorder(
      (status) => {
        setRecordingStatus(status)
      },
      (text) => {
        handleAddAnswer(text)
      }
    )
    setAudioRecorder(audio)
  }

  async function toggleRecording() {
    if (!isRecording) {
      await audioRecorder?.startRecording()
      setIsRecording(true)
    } else {
      audioRecorder?.stopRecording()
      setIsRecording(false)
      handleSpeak()
    }
  }

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current!.play()
        setDebug('Playing')
      }
    }
  }, [mediaStream, stream])

  useEffect(() => {
    if (!audioRecorder) {
      initializeAudioRecorder()
    }
    return () => {
      endSession()
    }
  }, [])

  return (
    <>
      {stream ? (
        <div className='one-to-one__container'>
          <CustomButton
            style='outlined'
            className='one-to-one__button one-to-one__button--stop'
            onClick={endSession}
          >
            Stop session
          </CustomButton>
          <div className='one-to-one'>
            <video
              className='one-to-one__video'
              ref={mediaStream}
              autoPlay
              playsInline
            >
              <track kind='captions' />
            </video>
          </div>
          <div className='one-to-one__record-container'>
            <CustomButton
              className='one-to-one__record-button'
              onClick={toggleRecording}
            >
              {isRecording ? 'Stop recording' : 'Start recording'}
            </CustomButton>
          </div>
          <ol className='one-to-one__list'>
            {answers.map((answer) => {
              return <li key={answer}>{answer}</li>
            })}
          </ol>
        </div>
      ) : isLoadingSession ? (
        <Loader />
      ) : (
        <CustomButton className='one-to-one__button' onClick={startSession}>
          Press to start the avatar
        </CustomButton>
      )}
    </>
  )
}

export default OneToOne
