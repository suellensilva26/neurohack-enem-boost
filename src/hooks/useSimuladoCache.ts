import { useCallback } from 'react';
import * as logger from '@/utils/logger';

export type ResultadoSimulado = {
  id: string;
  titulo: string;
  ano: number;
  disciplina?: string;
  tipo: 'completo' | 'por_disciplina' | 'personalizado';
  totalQuestoes: number;
  acertos: number;
  percentual: number;
  tempoGastoMin: number;
  dataISO: string;
};

type ProgressoSimulado = {
  questaoAtual: number;
  respostas: number[];
  tempoRestante: number; // segundos
  finalizado?: boolean;
};

const HISTORICO_KEY = 'simulado_historico';
const PROGRESS_PREFIX = 'simulado_progresso_';

export const useSimuladoCache = () => {
  const salvarResultado = useCallback((resultado: ResultadoSimulado) => {
    try {
      const historicoRaw = localStorage.getItem(HISTORICO_KEY);
      const historico: ResultadoSimulado[] = historicoRaw ? JSON.parse(historicoRaw) : [];
      historico.unshift(resultado);
      localStorage.setItem(HISTORICO_KEY, JSON.stringify(historico));
    } catch (err) {
      logger.error('Erro ao salvar resultado do simulado', err);
    }
  }, []);

  const carregarHistorico = useCallback((): ResultadoSimulado[] => {
    try {
      const historicoRaw = localStorage.getItem(HISTORICO_KEY);
      return historicoRaw ? JSON.parse(historicoRaw) : [];
    } catch (err) {
      logger.error('Erro ao carregar histórico de simulados', err);
      return [];
    }
  }, []);

  const salvarProgresso = useCallback((simuladoId: string, progresso: ProgressoSimulado) => {
    try {
      localStorage.setItem(PROGRESS_PREFIX + simuladoId, JSON.stringify(progresso));
    } catch (err) {
      logger.error('Erro ao salvar progresso do simulado', err);
    }
  }, []);

  const carregarProgresso = useCallback((simuladoId: string): ProgressoSimulado | null => {
    try {
      const raw = localStorage.getItem(PROGRESS_PREFIX + simuladoId);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      logger.error('Erro ao carregar progresso do simulado', err);
      return null;
    }
  }, []);

  const limparProgresso = useCallback((simuladoId: string) => {
    try {
      localStorage.removeItem(PROGRESS_PREFIX + simuladoId);
    } catch (err) {
      logger.error('Erro ao limpar progresso do simulado', err);
    }
  }, []);

  const obterEstatisticas = useCallback(() => {
    const historico = carregarHistorico();
    const totalSimulados = historico.length;
    const mediaGeral = totalSimulados
      ? Math.round(historico.reduce((acc, r) => acc + r.percentual, 0) / totalSimulados)
      : 0;
    const melhorNota = historico.reduce((max, r) => Math.max(max, r.percentual), 0);
    const tempoMedioGasto = totalSimulados
      ? Math.round(historico.reduce((acc, r) => acc + r.tempoGastoMin, 0) / totalSimulados)
      : 0;

    // Cálculo simples de disciplinas forte/fraca
    const porDisciplina: Record<string, { soma: number; count: number }> = {};
    historico.forEach((r) => {
      if (!r.disciplina) return;
      porDisciplina[r.disciplina] = porDisciplina[r.disciplina] || { soma: 0, count: 0 };
      porDisciplina[r.disciplina].soma += r.percentual;
      porDisciplina[r.disciplina].count += 1;
    });
    const medias = Object.entries(porDisciplina).map(([disc, obj]) => ({
      disciplina: disc,
      media: Math.round(obj.soma / obj.count),
    }));
    medias.sort((a, b) => b.media - a.media);

    return {
      totalSimulados,
      mediaGeral,
      melhorNota,
      tempoMedioGasto,
      disciplinaForte: medias[0]?.disciplina || 'N/A',
      disciplinaFraca: medias[medias.length - 1]?.disciplina || 'N/A',
    };
  }, [carregarHistorico]);

  return {
    salvarResultado,
    carregarHistorico,
    salvarProgresso,
    carregarProgresso,
    limparProgresso,
    obterEstatisticas,
  };
};