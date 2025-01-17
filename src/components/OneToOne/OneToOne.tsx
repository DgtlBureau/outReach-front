import { useEffect, useRef, useState } from 'react'
import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  TaskMode,
  TaskType,
  VoiceEmotion,
} from '@heygen/streaming-avatar'
import CustomButton from '../Shared/CustomButton/CustomButton'
import { secondaryInstance } from '../../utils/api'
import { useQuery } from '@tanstack/react-query'
import { AudioRecorder } from './audio-handler'
import Loader from '../Shared/Loader/Loader'
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'

import './OneToOne.scss'

const OneToOne = () => {
  const [isLoadingSession, setIsLoadingSession] = useState(false)
  const [stream, setStream] = useState<MediaStream>()
  const mediaStream = useRef<HTMLVideoElement>(null)
  const avatar = useRef<StreamingAvatar | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [audioRecorder, setAudioRecorder] = useState<AudioRecorder | null>(null)
  const [answers, setAnswers] = useState<string[]>([])
  const [lastQuestionId, setLastQuestionId] = useState<number | null>(null)

  const { data: questions, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await secondaryInstance.get('/one-to-one/promts')
      return data
    },
    queryKey: ['questions'],
  })

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

  async function endSession() {
    await avatar.current?.stopAvatar()
    setCurrentQuestionIndex(0)
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
      if (currentQuestionIndex === 0) {
        handleSpeak()
      }
    })
    avatar.current.on(StreamingEvents.STREAM_DISCONNECTED, () => {
      console.log('Stream disconnected')
      endSession()
    })
    try {
      await avatar.current.createStartAvatar({
        quality: AvatarQuality.High,
        avatarName: '',
        knowledgeId: '',
        voice: {
          rate: 1.5,
          emotion: VoiceEmotion.SOOTHING,
        },
        language: 'en',
        disableIdleTimeout: true,
      })
    } catch (error) {
      console.error('Error starting avatar session:', error)
    } finally {
      setIsLoadingSession(false)
    }
  }

  const handleSpeak = async () => {
    setLastQuestionId(questions[currentQuestionIndex]?.id)
    setCurrentQuestionIndex((index) => index + 1)
    if (!questions[currentQuestionIndex]) {
      endSession()
      return
    }
    if (!avatar.current) {
      enqueueSnackbar('Avatar API not initialized', {
        variant: 'error',
      })
      return
    }

    const question = questions[currentQuestionIndex]?.text
    await avatar.current
      .speak({
        text: question || '',
        taskType: TaskType.REPEAT,
        taskMode: TaskMode.SYNC,
      })
      .catch((e) => {
        enqueueSnackbar(e.message, {
          variant: 'error',
        })
      })
  }

  function initializeAudioRecorder() {
    const audio = new AudioRecorder((status) => {
      console.log(status)
    })
    setAudioRecorder(audio)
  }

  async function toggleRecording() {
    if (!isRecording) {
      await audioRecorder?.startRecording()
      setIsRecording(true)
    } else {
      audioRecorder?.setPromptId(lastQuestionId as number)
      audioRecorder?.stopRecording()
      setIsRecording(false)
      handleSpeak()
    }
  }

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current?.play()
        console.log('Playing')
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
  }, [audioRecorder])

  if (isLoading) {
    return <Loader />
  }

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
          <span className='one-to-one__question'>
            {
              questions.find((question: any) => question.id === lastQuestionId)
                ?.text
            }
          </span>
          <div className='one-to-one__record-container'>
            <CustomButton
              className='one-to-one__record-button'
              onClick={toggleRecording}
            >
              {isRecording
                ? questions.find(
                    (question: any) => question.id === lastQuestionId
                  )?.id !== questions[questions.length - 1]?.id
                  ? 'Next question'
                  : 'Finish answering'
                : 'Start answering to question'}
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
          Start session
        </CustomButton>
      )}
    </>
  )
}

export default OneToOne
