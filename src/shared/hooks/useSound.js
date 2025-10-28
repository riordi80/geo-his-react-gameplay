import { useCallback, useRef } from 'react';

/**
 * Hook personalizado para reproducir sonidos usando Web Audio API
 * Genera sonidos sintéticos sin necesidad de archivos de audio
 */
export const useSound = () => {
  const audioContextRef = useRef(null);
  const musicIntervalRef = useRef(null);
  const musicGainRef = useRef(null);
  const musicRepetitionsRef = useRef(0);

  /**
   * Obtiene o crea el contexto de audio
   */
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  /**
   * Reproduce un sonido de acierto (tono ascendente alegre)
   */
  const playSuccess = useCallback(() => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Oscilador principal
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Configuración del tono (Do → Mi → Sol - acorde mayor)
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, now); // Do (C5)
    oscillator.frequency.setValueAtTime(659.25, now + 0.1); // Mi (E5)
    oscillator.frequency.setValueAtTime(783.99, now + 0.2); // Sol (G5)

    // Envolvente de volumen (ataque y decay)
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.1);
    gainNode.gain.linearRampToValueAtTime(0.25, now + 0.2);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

    // Reproducir
    oscillator.start(now);
    oscillator.stop(now + 0.4);
  }, [getAudioContext]);

  /**
   * Reproduce un sonido de error (tono descendente)
   */
  const playError = useCallback(() => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Oscilador principal
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Configuración del tono (descendente, tipo "buzzer")
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(300, now);
    oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.3);

    // Envolvente de volumen
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    // Reproducir
    oscillator.start(now);
    oscillator.stop(now + 0.3);
  }, [getAudioContext]);

  /**
   * Reproduce un sonido de click/tap suave
   */
  const playClick = useCallback(() => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Oscilador
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Configuración (tono corto y agudo)
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, now);

    // Envolvente muy corta
    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    // Reproducir
    oscillator.start(now);
    oscillator.stop(now + 0.05);
  }, [getAudioContext]);

  /**
   * Reproduce un sonido de racha/streak (tono celebratorio)
   */
  const playStreak = useCallback(() => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Dos osciladores para un sonido más rico
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Configuración (intervalo de quinta)
    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, now); // Mi
    osc2.frequency.setValueAtTime(987.77, now); // Si

    // Envolvente
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.25, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    // Reproducir
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.25);
    osc2.stop(now + 0.25);
  }, [getAudioContext]);

  /**
   * Reproduce una nota individual
   */
  const playMusicNote = useCallback((frequency, duration) => {
    const ctx = getAudioContext();

    // Asegurar que el contexto está activo
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Saltar silencios (frecuencia 0)
    if (frequency === 0) return;

    if (!musicGainRef.current) {
      musicGainRef.current = ctx.createGain();
      musicGainRef.current.connect(ctx.destination);
      musicGainRef.current.gain.value = 0.2;
    }

    const oscillator = ctx.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.value = frequency;
    oscillator.connect(musicGainRef.current);

    const now = ctx.currentTime;
    oscillator.start(now);
    oscillator.stop(now + duration);
  }, [getAudioContext]);

  /**
   * Inicia música de fondo estilo años 90 (se repite 3 veces)
   */
  const playVictoryMusic = useCallback(() => {
    // Detener música anterior si existe
    if (musicIntervalRef.current) {
      clearTimeout(musicIntervalRef.current);
    }

    // Resetear contador de repeticiones
    musicRepetitionsRef.current = 0;

    // Melodía victorias estilo años 90 - alegre y pegadiza
    const melody = [
      { note: 659.25, duration: 120 },  // Mi
      { note: 783.99, duration: 120 },  // Sol
      { note: 1046.50, duration: 120 }, // Do alto
      { note: 1318.51, duration: 300 }, // Mi alto (largo)
      { note: 0, duration: 100 },       // Silencio
      { note: 1046.50, duration: 150 }, // Do alto
      { note: 1174.66, duration: 150 }, // Re alto
      { note: 1318.51, duration: 500 }, // Mi alto (final largo)
      { note: 0, duration: 200 },       // Silencio
      { note: 1046.50, duration: 120 }, // Do alto
      { note: 1318.51, duration: 120 }, // Mi alto
      { note: 1568, duration: 400 },    // Sol alto (remate)
    ];

    let currentDelay = 0;
    const totalDuration = melody.reduce((sum, note) => sum + note.duration, 0);

    const playMelodySequence = () => {
      currentDelay = 0;

      melody.forEach(({ note, duration }) => {
        setTimeout(() => {
          playMusicNote(note, duration / 1000);
        }, currentDelay);
        currentDelay += duration;
      });

      // Incrementar contador
      musicRepetitionsRef.current++;

      // Si no hemos llegado a 3 repeticiones, programar la siguiente
      if (musicRepetitionsRef.current < 3) {
        musicIntervalRef.current = setTimeout(() => {
          playMelodySequence();
        }, totalDuration);
      } else {
        // Limpiar después de la tercera repetición
        musicIntervalRef.current = null;
      }
    };

    // Reproducir la melodía inicial inmediatamente
    playMelodySequence();
  }, [getAudioContext, playMusicNote]);

  /**
   * Detiene la música de fondo
   */
  const stopVictoryMusic = useCallback(() => {
    if (musicIntervalRef.current) {
      clearTimeout(musicIntervalRef.current);
      musicIntervalRef.current = null;
    }

    // Resetear contador
    musicRepetitionsRef.current = 0;

    if (musicGainRef.current) {
      const ctx = getAudioContext();
      musicGainRef.current.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      setTimeout(() => {
        if (musicGainRef.current) {
          musicGainRef.current.disconnect();
          musicGainRef.current = null;
        }
      }, 500);
    }
  }, [getAudioContext]);

  return {
    playSuccess,
    playError,
    playClick,
    playStreak,
    playVictoryMusic,
    stopVictoryMusic,
  };
};
