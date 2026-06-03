import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { log } from "../utils/logger";
import { getAssetPath } from "../utils/assets";

interface AudioContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
}

const AudioImmersionContext = createContext<AudioContextType | undefined>(undefined);

export const AudioImmersionProvider = ({ children }: { children: ReactNode }) => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [audioState, setAudioState] = useState<{
    context: AudioContext | null;
    windFilter: BiquadFilterNode | null;
    windGain: GainNode | null;
    noiseSource: AudioBufferSourceNode | null;
    audioTrack: HTMLAudioElement | null;
  }>({
    context: null,
    windFilter: null,
    windGain: null,
    noiseSource: null,
    audioTrack: null,
  });

  const toggleSound = () => {
    if (!soundEnabled) {
      try {
        let { context, windFilter, windGain, noiseSource, audioTrack } = audioState;
        
        if (!audioTrack) {
          audioTrack = new Audio(getAssetPath("/ambient_wind.mp3"));
          audioTrack.loop = true;
          audioTrack.volume = 0.35;
        }
        audioTrack.play().catch(err => log.warn("Failed to play ambient_wind.mp3:", err));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!context) {
          context = new AudioContextClass();
          
          const bufferSize = context.sampleRate * 2;
          const noiseBuffer = context.createBuffer(1, bufferSize, context.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
          }
          
          noiseSource = context.createBufferSource();
          noiseSource.buffer = noiseBuffer;
          noiseSource.loop = true;
          
          windFilter = context.createBiquadFilter();
          windFilter.type = "bandpass";
          windFilter.frequency.value = 320;
          windFilter.Q.value = 2.0;
          
          windGain = context.createGain();
          windGain.gain.setValueAtTime(0.012, context.currentTime);
          
          noiseSource.connect(windFilter);
          windFilter.connect(windGain);
          windGain.connect(context.destination);
          
          noiseSource.start();
          
          setAudioState({ context, windFilter, windGain, noiseSource, audioTrack });
        } else if (context.state === "suspended") {
          context.resume();
        }
        setSoundEnabled(true);
      } catch (err) {
        log.warn("Audio Context blocked or unsupported:", err);
      }
    } else {
      if (audioState.context && audioState.context.state === "running") {
        audioState.context.suspend();
      }
      if (audioState.audioTrack) {
        audioState.audioTrack.pause();
      }
      setSoundEnabled(false);
    }
  };

  useEffect(() => {
    const handleScrollFreq = () => {
      if (soundEnabled && audioState.windFilter && audioState.context) {
        const delta = Math.min(650, 200 + (window.scrollY % 550));
        audioState.windFilter.frequency.setValueAtTime(delta, audioState.context.currentTime + 0.15);
      }
    };
    window.addEventListener("scroll", handleScrollFreq, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollFreq);
  }, [soundEnabled, audioState]);

  return (
    <AudioImmersionContext.Provider value={{ soundEnabled, toggleSound }}>
      {children}
    </AudioImmersionContext.Provider>
  );
};

export const useAudioImmersion = () => {
  const context = useContext(AudioImmersionContext);
  if (!context) {
    throw new Error("useAudioImmersion must be used within an AudioImmersionProvider");
  }
  return context;
};
