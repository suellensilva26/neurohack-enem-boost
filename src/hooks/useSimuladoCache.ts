import { useCallback } from 'react';
import { SimuladoEnem } from '@/hooks/useEnemAPI';

export interface ProgressoSimulado {
  questaoAtual: number;
  tempoRestante: number; // em minutos
  finalizado: boolean;
}

export interface ResultadoSimulado {
  id: string;
  simuladoId: string;
  titulo: string;
  ano: number;
  disciplina?: string;
  totalQuestoes: number;
  acertos: number;
  erros: number;
  porcentagem: number; // 0-100
  tempoGastoMinutos: number;
  data: string; // ISO string
}

const HISTORICO_KEY = 'simulado_historico';
const PROGRESSO_PREFIX = 'simulado_progresso_';

export const useSimuladoCache = () => {
  const carregarHistorico = useCallback((): ResultadoSimulado[] => {
    try {
      const raw = localStorage.getItem(HISTORICO_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, []);

  const salvarResultado = useCallback((resultado: ResultadoSimulado) => {
    try {
      const historico = carregarHistorico();
      const atualizado = [resultado, ...historico].slice(0, 100); // limitar
      localStorage.setItem(HISTORICO_KEY, JSON.stringify(atualizado));
      // Remover progresso do simulado finalizado
      localStorage.removeItem(`${PROGRESSO_PREFIX}${resultado.simuladoId}`);
    } catch {
      // noop
    }
  }, [carregarHistorico]);

  const carregarProgresso = useCallback((simuladoId: string): ProgressoSimulado | null => {
    try {
      const raw = localStorage.getItem(`${PROGRESSO_PREFIX}${simuladoId}`);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const salvarProgresso = useCallback((simuladoId: string, progresso: ProgressoSimulado) => {
    try {
      localStorage.setItem(`${PROGRESSO_PREFIX}${simuladoId}`, JSON.stringify(progresso));
    } catch {
      // noop
    }
  }, []);

  const obterEstatisticas = useCallback(() => {
    const historico = carregarHistorico();
    const totalSimulados = historico.length;
    const mediaGeral = totalSimulados
      ? Math.round(
          historico.reduce((acc, h) => acc + h.porcentagem, 0) / totalSimulados
        )
      : 0;
    const melhorNota = historico.reduce((max, h) => Math.max(max, h.porcentagem), 0);
    const tempoMedioGasto = totalSimulados
      ? Math.round(
          historico.reduce((acc, h) => acc + h.tempoGastoMinutos, 0) / totalSimulados
        )
      : 0;

    // Disciplinas forte/fraca (baseado em média)
    const porDisciplina: Record<string, { soma: number; count: number }> = {};
    historico.forEach((h) => {
      const key = h.disciplina || 'geral';
      porDisciplina[key] = porDisciplina[key] || { soma: 0, count: 0 };
      porDisciplina[key].soma += h.porcentagem;
      porDisciplina[key].count += 1;
    });
    let disciplinaForte = 'N/A';
    let disciplinaFraca = 'N/A';
    const entries = Object.entries(porDisciplina);
    if (entries.length) {
      const medias = entries.map(([d, v]) => [d, v.soma / v.count] as const);
      medias.sort((a, b) => b[1] - a[1]);
      disciplinaForte = medias[0][0];
      disciplinaFraca = medias[medias.length - 1][0];
    }

    return {
      totalSimulados,
      mediaGeral,
      melhorNota,
      tempoMedioGasto,
      disciplinaForte,
      disciplinaFraca,
    };
  }, [carregarHistorico]);

  return {
    carregarHistorico,
    salvarResultado,
    carregarProgresso,
    salvarProgresso,
    obterEstatisticas,
  };
};