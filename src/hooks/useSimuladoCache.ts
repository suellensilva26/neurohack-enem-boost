import { useState, useCallback, useEffect } from 'react';
import { SimuladoEnem, QuestaoEnem } from './useEnemAPI';

export interface SimuladoProgresso {
  simuladoId: string;
  questaoAtual: number;
  respostas: (number | null)[];
  tempoRestante: number;
  iniciado: string;
  pausado?: string;
  finalizado?: string;
}

export interface ResultadoSimulado {
  id: string;
  simuladoId: string;
  titulo: string;
  ano: number;
  disciplina?: string;
  nota: number;
  acertos: number;
  total: number;
  tempoGasto: number; // em segundos
  tempoTotal: number; // em segundos
  dataRealizacao: string;
  respostas: (number | null)[];
  questoes: QuestaoEnem[];
  desempenhoPorDisciplina: {
    [disciplina: string]: {
      acertos: number;
      total: number;
      percentual: number;
    };
  };
}

interface UseSimuladoCacheReturn {
  salvarProgresso: (progresso: SimuladoProgresso) => void;
  carregarProgresso: (simuladoId: string) => SimuladoProgresso | null;
  removerProgresso: (simuladoId: string) => void;
  salvarResultado: (resultado: ResultadoSimulado) => void;
  carregarHistorico: () => ResultadoSimulado[];
  carregarResultado: (resultadoId: string) => ResultadoSimulado | null;
  limparCache: () => void;
  obterEstatisticas: () => {
    totalSimulados: number;
    mediaGeral: number;
    melhorNota: number;
    tempoMedioGasto: number;
    disciplinaForte: string;
    disciplinaFraca: string;
  };
}

const STORAGE_KEYS = {
  PROGRESSO: 'simulado_progresso_',
  RESULTADO: 'simulado_resultado_',
  HISTORICO: 'simulados_historico',
  CACHE_QUESTOES: 'simulado_cache_questoes_'
};

export const useSimuladoCache = (): UseSimuladoCacheReturn => {
  const [historico, setHistorico] = useState<ResultadoSimulado[]>([]);

  useEffect(() => {
    // Carregar histórico ao inicializar
    const historicoSalvo = carregarHistorico();
    setHistorico(historicoSalvo);
  }, []);

  const salvarProgresso = useCallback((progresso: SimuladoProgresso) => {
    try {
      const key = STORAGE_KEYS.PROGRESSO + progresso.simuladoId;
      localStorage.setItem(key, JSON.stringify(progresso));
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
    }
  }, []);

  const carregarProgresso = useCallback((simuladoId: string): SimuladoProgresso | null => {
    try {
      const key = STORAGE_KEYS.PROGRESSO + simuladoId;
      const progressoSalvo = localStorage.getItem(key);
      return progressoSalvo ? JSON.parse(progressoSalvo) : null;
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
      return null;
    }
  }, []);

  const removerProgresso = useCallback((simuladoId: string) => {
    try {
      const key = STORAGE_KEYS.PROGRESSO + simuladoId;
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Erro ao remover progresso:', error);
    }
  }, []);

  const salvarResultado = useCallback((resultado: ResultadoSimulado) => {
    try {
      // Salvar resultado individual
      const keyResultado = STORAGE_KEYS.RESULTADO + resultado.id;
      localStorage.setItem(keyResultado, JSON.stringify(resultado));

      // Atualizar histórico
      const historicoAtual = carregarHistorico();
      const novoHistorico = [resultado, ...historicoAtual]
        .sort((a, b) => new Date(b.dataRealizacao).getTime() - new Date(a.dataRealizacao).getTime())
        .slice(0, 50); // Manter apenas os últimos 50 resultados

      localStorage.setItem(STORAGE_KEYS.HISTORICO, JSON.stringify(novoHistorico));
      setHistorico(novoHistorico);

      // Remover progresso após finalizar
      removerProgresso(resultado.simuladoId);
    } catch (error) {
      console.error('Erro ao salvar resultado:', error);
    }
  }, [removerProgresso]);

  const carregarHistorico = useCallback((): ResultadoSimulado[] => {
    try {
      const historicoSalvo = localStorage.getItem(STORAGE_KEYS.HISTORICO);
      return historicoSalvo ? JSON.parse(historicoSalvo) : [];
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
      return [];
    }
  }, []);

  const carregarResultado = useCallback((resultadoId: string): ResultadoSimulado | null => {
    try {
      const key = STORAGE_KEYS.RESULTADO + resultadoId;
      const resultadoSalvo = localStorage.getItem(key);
      return resultadoSalvo ? JSON.parse(resultadoSalvo) : null;
    } catch (error) {
      console.error('Erro ao carregar resultado:', error);
      return null;
    }
  }, []);

  const limparCache = useCallback(() => {
    try {
      // Remover todos os dados relacionados a simulados
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('simulado_')) {
          localStorage.removeItem(key);
        }
      });
      setHistorico([]);
    } catch (error) {
      console.error('Erro ao limpar cache:', error);
    }
  }, []);

  const obterEstatisticas = useCallback(() => {
    const historicoAtual = historico.length > 0 ? historico : carregarHistorico();
    
    if (historicoAtual.length === 0) {
      return {
        totalSimulados: 0,
        mediaGeral: 0,
        melhorNota: 0,
        tempoMedioGasto: 0,
        disciplinaForte: 'N/A',
        disciplinaFraca: 'N/A'
      };
    }

    const totalSimulados = historicoAtual.length;
    const mediaGeral = historicoAtual.reduce((acc, r) => acc + r.nota, 0) / totalSimulados;
    const melhorNota = Math.max(...historicoAtual.map(r => r.nota));
    const tempoMedioGasto = historicoAtual.reduce((acc, r) => acc + r.tempoGasto, 0) / totalSimulados;

    // Calcular desempenho por disciplina
    const desempenhoDisciplinas: { [key: string]: { acertos: number; total: number } } = {};
    
    historicoAtual.forEach(resultado => {
      Object.entries(resultado.desempenhoPorDisciplina).forEach(([disciplina, dados]) => {
        if (!desempenhoDisciplinas[disciplina]) {
          desempenhoDisciplinas[disciplina] = { acertos: 0, total: 0 };
        }
        desempenhoDisciplinas[disciplina].acertos += dados.acertos;
        desempenhoDisciplinas[disciplina].total += dados.total;
      });
    });

    let disciplinaForte = 'N/A';
    let disciplinaFraca = 'N/A';
    let melhorPercentual = 0;
    let piorPercentual = 100;

    Object.entries(desempenhoDisciplinas).forEach(([disciplina, dados]) => {
      const percentual = (dados.acertos / dados.total) * 100;
      if (percentual > melhorPercentual) {
        melhorPercentual = percentual;
        disciplinaForte = disciplina;
      }
      if (percentual < piorPercentual) {
        piorPercentual = percentual;
        disciplinaFraca = disciplina;
      }
    });

    return {
      totalSimulados,
      mediaGeral: Math.round(mediaGeral),
      melhorNota: Math.round(melhorNota),
      tempoMedioGasto: Math.round(tempoMedioGasto / 60), // em minutos
      disciplinaForte,
      disciplinaFraca
    };
  }, [historico]);

  return {
    salvarProgresso,
    carregarProgresso,
    removerProgresso,
    salvarResultado,
    carregarHistorico,
    carregarResultado,
    limparCache,
    obterEstatisticas
  };
};