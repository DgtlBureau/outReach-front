import { secondaryInstance } from '../../utils/api'

export class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null
  private audioChunks: Blob[] = []
  private isRecording = false
  private audio: Blob | null = null
  private promptId: number | null = null
  public answer: {
    answer: string
    promt_id: number
    question_id: number
  } | null = null
  private hash: string | null = null

  constructor(private onStatusChange: (status: string) => void) {}

  setPromptId(promptId: number) {
    this.promptId = promptId
  }

  setAnswer(prompt: { answer: string; promt_id: number; question_id: number }) {
    this.answer = prompt
  }

  getAnswer() {
    return this.answer
  }

  setHash(hash: string | null) {
    this.hash = hash
  }

  async startRecording() {
    try {
      console.log('Requesting microphone access...')
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      console.log('Microphone access granted')

      this.mediaRecorder = new MediaRecorder(stream)
      this.audioChunks = []
      this.isRecording = true

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          console.log('Received audio chunk:', event.data.size, 'bytes')
          this.audioChunks.push(event.data)
        }
      }

      this.mediaRecorder.onstop = async () => {
        console.log('Recording stopped, processing audio...')
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' })
        console.log('Audio blob size:', audioBlob.size, 'bytes')
        this.postAudio(audioBlob)
      }

      this.mediaRecorder.start(1000) // Collect data every second
      console.log('Started recording')
      this.onStatusChange('Recording... Speak now')
    } catch (error) {
      console.error('Error starting recording:', error)
      this.onStatusChange('Error: ' + (error as Error).message)
    }
  }

  postAudio = async (audio: Blob) => {
    try {
      const { data } = await secondaryInstance.postForm('/one-to-one/answer', {
        promt_id: this.promptId,
        audio: audio,
        hash: this.hash,
      })
      console.log(data)
      this.setAnswer({ ...data, question_id: this.promptId })
    } catch (error) {
      console.log(error)
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      console.log('Stopping recording...')
      this.mediaRecorder.stop()
      this.isRecording = false
      this.onStatusChange('Processing audio...')

      // Stop all tracks in the stream
      const stream = this.mediaRecorder.stream
      stream.getTracks().forEach((track) => track.stop())
      return this.audio
    }
  }
}
