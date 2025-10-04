import { useState, useRef } from "react";
import { Mic, Square, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AudioRecorderProps {
  onRecordingComplete?: (blob: Blob, duration: number) => void;
  maxDuration?: number;
}

export const AudioRecorder = ({ 
  onRecordingComplete, 
  maxDuration = 180 
}: AudioRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        onRecordingComplete?.(audioBlob, duration);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setDuration(0);

      // Start duration counter
      timerRef.current = setInterval(() => {
        setDuration(prev => {
          if (prev >= maxDuration) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (error) {
      toast.error("Erro ao acessar o microfone");
      console.error(error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const togglePlayback = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioURL);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-border bg-card/50">
      <div className="flex items-center gap-4">
        {!isRecording && !audioURL && (
          <Button
            onClick={startRecording}
            size="lg"
            className="rounded-full h-20 w-20 bg-destructive hover:bg-destructive/90"
          >
            <Mic className="h-8 w-8" />
          </Button>
        )}

        {isRecording && (
          <>
            <div className="animate-pulse flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive" />
              <span className="text-sm font-medium">Gravando...</span>
            </div>
            <Button
              onClick={stopRecording}
              size="lg"
              className="rounded-full h-16 w-16"
              variant="outline"
            >
              <Square className="h-6 w-6" />
            </Button>
          </>
        )}

        {audioURL && !isRecording && (
          <Button
            onClick={togglePlayback}
            size="lg"
            className="rounded-full h-16 w-16"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>
        )}
      </div>

      <div className="text-2xl font-bold text-primary">
        {formatTime(duration)}
      </div>

      {maxDuration && (
        <div className="text-xs text-muted-foreground">
          Máximo: {formatTime(maxDuration)}
        </div>
      )}
    </div>
  );
};