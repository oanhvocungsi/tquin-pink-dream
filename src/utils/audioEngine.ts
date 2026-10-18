// Procedural Web Audio API engine for Dreamy Pop / Lofi Pink Aesthetic
// Zero external asset dependencies, zero network latency, 100% reliable everywhere

class LuxuryAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private loopInterval: number | null = null;
  private chordIndex: number = 0;
  private analyser: AnalyserNode | null = null;

  // Dreamy Pop Chords in F Major (Fmaj7 - Dm9 - Bbmaj7 - Cadd9)
  private readonly chords: number[][] = [
    [174.61, 261.63, 329.63, 440.0], // F3, C4, E4, A4 (Fmaj7)
    [146.83, 220.0, 261.63, 329.63, 349.23], // D3, A3, C4, E4, F4 (Dm9)
    [116.54, 174.61, 220.0, 293.66], // Bb2, F3, A3, D4 (Bbmaj7)
    [130.81, 196.0, 246.94, 293.66, 329.63], // C3, G3, B3, D4, E4 (Cadd9)
  ];

  private melodyNotes: number[] = [
    523.25, 587.33, 659.25, 698.46, 783.99, 880.0, 1046.5,
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.55, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public startMusic() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Start chord & arp loop
    this.scheduleChordBeat();
    this.loopInterval = window.setInterval(() => {
      this.scheduleChordBeat();
    }, 2800);
  }

  private scheduleChordBeat() {
    if (!this.ctx || !this.musicGain || !this.isPlaying) return;

    const currentChord = this.chords[this.chordIndex];
    this.chordIndex = (this.chordIndex + 1) % this.chords.length;

    const now = this.ctx.currentTime;

    // Play lush pad chords
    currentChord.forEach((freq, idx) => {
      if (!this.ctx || !this.musicGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = idx === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800 + idx * 250, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.7);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);

      osc.start(now);
      osc.stop(now + 2.8);
    });

    // Play dreamy bell arpeggios
    for (let i = 0; i < 4; i++) {
      const arpTime = now + i * 0.65;
      const noteFreq = this.melodyNotes[(this.chordIndex * 2 + i * 2) % this.melodyNotes.length];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(noteFreq, arpTime);

      gain.gain.setValueAtTime(0.001, arpTime);
      gain.gain.linearRampToValueAtTime(0.035, arpTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, arpTime + 0.6);

      osc.connect(gain);
      gain.connect(this.musicGain);

      osc.start(arpTime);
      osc.stop(arpTime + 0.65);
    }
  }

  public stopMusic() {
    this.isPlaying = false;
    if (this.loopInterval) {
      clearInterval(this.loopInterval);
      this.loopInterval = null;
    }
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : 0.7, now + 0.15);
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // SFX: Tactile Pink Glass Click
  public playClickSound() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.08);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  // SFX: CapCut Transition Light Whoosh
  public playWhoosh() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.linearRampToValueAtTime(1200, now + 0.3);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.42);
  }

  // SFX: Sparkling Luxury Crystal Chime
  public playSparkle() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const freqs = [1046.5, 1318.5, 1567.98, 2093.0];
    const now = this.ctx.currentTime;

    freqs.forEach((freq, i) => {
      if (!this.ctx || !this.sfxGain) return;
      const noteTime = now + i * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.04, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.45);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(noteTime);
      osc.stop(noteTime + 0.46);
    });
  }

  // SFX: Gift Box Unboxing Fanfare
  public playGiftFanfare() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const noteTime = now + idx * 0.09;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.06, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.6);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(noteTime);
      osc.stop(noteTime + 0.65);
    });
  }
}

export const audioEngine = new LuxuryAudioEngine();
