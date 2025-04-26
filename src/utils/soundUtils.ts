// Sound utility functions

// Create audio context (lazily initialized)
let audioContext: AudioContext | null = null;

// Get audio context (creating if needed)
export const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

// Base frequencies for musical notes (C4 to C5)
const baseFrequencies = [
  261.63, // C4
  293.66, // D4
  329.63, // E4
  349.23, // F4
  392.00, // G4
  440.00, // A4
  493.88, // B4
  523.25  // C5
];

// Play a tone with the given ID (0-7)
export const playTone = (toneId: number): void => {
  try {
    const context = getAudioContext();
    
    // Create oscillator
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    // Set frequency based on toneId
    const frequency = baseFrequencies[toneId % baseFrequencies.length];
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    
    // Configure envelope
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, context.currentTime + 0.05);
    gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 0.8);
    
    // Connect and start
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    oscillator.start();
    oscillator.stop(context.currentTime + 0.8);
  } catch (error) {
    console.error("Error playing tone:", error);
  }
};

// Play a click sound for UI interaction
export const playClickSound = (): void => {
  try {
    const context = getAudioContext();
    
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, context.currentTime);
    
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, context.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 0.1);
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    oscillator.start();
    oscillator.stop(context.currentTime + 0.1);
  } catch (error) {
    console.error("Error playing click sound:", error);
  }
};

// Play a victory sound
export const playVictorySound = (): void => {
  try {
    const context = getAudioContext();
    
    // Play a series of ascending notes
    const notes = [0, 2, 4, 7, 9, 12];
    
    notes.forEach((note, index) => {
      setTimeout(() => {
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        const baseFreq = 261.63; // C4
        const freq = baseFreq * Math.pow(2, note / 12);
        
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(freq, context.currentTime);
        
        gainNode.gain.setValueAtTime(0, context.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, context.currentTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 0.3);
        
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator.start();
        oscillator.stop(context.currentTime + 0.3);
      }, index * 150);
    });
  } catch (error) {
    console.error("Error playing victory sound:", error);
  }
};

// Play a match sound
export const playMatchSound = (): void => {
  try {
    const context = getAudioContext();
    
    const oscillator1 = context.createOscillator();
    const oscillator2 = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator1.type = 'sine';
    oscillator2.type = 'sine';
    oscillator1.frequency.setValueAtTime(440, context.currentTime);
    oscillator2.frequency.setValueAtTime(880, context.currentTime);
    
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, context.currentTime + 0.05);
    gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 0.4);
    
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(context.destination);
    
    oscillator1.start();
    oscillator2.start();
    oscillator1.stop(context.currentTime + 0.4);
    oscillator2.stop(context.currentTime + 0.4);
  } catch (error) {
    console.error("Error playing match sound:", error);
  }
};