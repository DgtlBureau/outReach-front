export class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null
  private audioChunks: Blob[] = []
  private isRecording = false
  private audio: Blob | null = null
  private promptId: number | null = null

  constructor(private onStatusChange: (status: string) => void) {}

  setPromptId(promptId: number) {
    this.promptId = promptId
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
        console.log('promptId', this.promptId)
      }

      this.mediaRecorder.start(1000) // Collect data every second
      console.log('Started recording')
      this.onStatusChange('Recording... Speak now')
    } catch (error) {
      console.error('Error starting recording:', error)
      this.onStatusChange('Error: ' + (error as Error).message)
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
