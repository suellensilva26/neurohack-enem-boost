export interface ProgressoFlashcard {
  cardId: string;
  easeFactor: number; // EF
  interval: number; // dias
  repetitions: number; // número de repetições consecutivas com sucesso
  dueDate: string; // ISO date string
  lastReviewed?: string; // ISO date
  correctCount: number;
  wrongCount: number;
}

const STORAGE_KEY = 'ProgressoFlashcard';

export class RepeticaoEspacada {
  private progressMap: Record<string, ProgressoFlashcard> = {};

  constructor() {
    this.load();
  }

  private load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      this.progressMap = raw ? JSON.parse(raw) : {};
    } catch {
      this.progressMap = {};
    }
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progressMap));
  }

  getProgress(cardId: string): ProgressoFlashcard | null {
    return this.progressMap[cardId] || null;
  }

  /**
   * Avalia o card usando SM-2.
   * quality: 0-5 (5 = perfeito, 0 = falha completa)
   */
  review(cardId: string, quality: number): ProgressoFlashcard {
    const today = new Date();
    const existing = this.progressMap[cardId] || {
      cardId,
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      dueDate: today.toISOString(),
      correctCount: 0,
      wrongCount: 0,
    } as ProgressoFlashcard;

    // Atualiza contadores
    if (quality >= 3) existing.correctCount += 1; else existing.wrongCount += 1;

    if (quality < 3) {
      existing.repetitions = 0;
      existing.interval = 1;
    } else {
      existing.repetitions += 1;
      if (existing.repetitions === 1) {
        existing.interval = 1;
      } else if (existing.repetitions === 2) {
        existing.interval = 6;
      } else {
        existing.interval = Math.round(existing.interval * existing.easeFactor);
      }

      // Atualiza EF conforme SM-2
      const newEF = existing.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
      existing.easeFactor = Math.max(1.3, Number(newEF.toFixed(2)));
    }

    // Calcula próxima data
    const next = new Date(today);
    next.setDate(today.getDate() + Math.max(1, existing.interval));
    existing.dueDate = next.toISOString();
    existing.lastReviewed = today.toISOString();

    this.progressMap[cardId] = existing;
    this.save();
    return existing;
  }

  /** Retorna ids de cards vencidos (dueDate <= hoje) */
  getDueCards(cardIds: string[]): string[] {
    const today = new Date();
    return cardIds.filter((id) => {
      const prog = this.progressMap[id];
      if (!prog) return false;
      return new Date(prog.dueDate) <= today;
    });
  }

  /** Reseta progresso de um card (util para modo Teste ou reset) */
  resetCard(cardId: string) {
    delete this.progressMap[cardId];
    this.save();
  }

  /** Estatísticas agregadas */
  getStats() {
    const values = Object.values(this.progressMap);
    const total = values.length;
    const dueToday = values.filter(v => new Date(v.dueDate) <= new Date()).length;
    const avgEF = total ? (values.reduce((s, v) => s + v.easeFactor, 0) / total) : 0;
    return { total, dueToday, avgEF: Number(avgEF.toFixed(2)) };
  }
}