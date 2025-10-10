import { useState, useCallback } from 'react';

export interface QuestaoEnem {
  id: string;
  enunciado: string;
  alternatives: string[];
  correctAnswer: number;
  year: number;
  numero?: number;
  discipline: string;
  competence?: string;
  skill?: string;
  image?: string;
  context?: string;
}

export interface SimuladoEnem {
  id: string;
  titulo: string;
  ano: number;
  disciplina?: string;
  questoes: QuestaoEnem[];
  tempoLimite: number; // em minutos
  tipo: 'completo' | 'por_disciplina' | 'personalizado';
  totalQuestoes: number;
}

interface UseEnemAPIReturn {
  loading: boolean;
  error: string | null;
  questoes: QuestaoEnem[];
  buscarQuestoes: (params: BuscarQuestoesParams) => Promise<QuestaoEnem[]>;
  gerarSimulado: (params: GerarSimuladoParams) => Promise<SimuladoEnem>;
  listarAnos: () => Promise<number[]>;
  listarDisciplinas: () => Promise<string[]>;
}

interface BuscarQuestoesParams {
  year?: number;
  discipline?: string;
  limit?: number;
  competence?: string;
  skill?: string;
}

interface GerarSimuladoParams {
  ano: number;
  disciplina?: string;
  tipo: 'completo' | 'por_disciplina' | 'personalizado';
  limite?: number;
}

const API_BASE_URL = 'https://api.enem.dev/v1';
const ENABLE_MOCK_FALLBACK = (import.meta as any)?.env?.VITE_ENABLE_ENEM_MOCK === 'true';

// Dados mock para fallback quando a API estiver indisponível
const MOCK_QUESTOES: QuestaoEnem[] = [
  {
    id: 'mock_1',
    enunciado: 'Uma empresa de telefonia oferece dois planos de celular. No plano A, o cliente paga R$ 50,00 fixos por mês e mais R$ 0,50 por minuto de ligação. No plano B, o cliente paga R$ 80,00 fixos por mês e mais R$ 0,20 por minuto de ligação. A partir de quantos minutos de ligação por mês o plano B se torna mais vantajoso que o plano A?',
    alternatives: [
      'A partir de 90 minutos',
      'A partir de 100 minutos', 
      'A partir de 110 minutos',
      'A partir de 120 minutos',
      'A partir de 130 minutos'
    ],
    correctAnswer: 1,
    year: 2023,
    discipline: 'matematica',
    competence: '1',
    skill: 'H1'
  },
  {
    id: 'mock_2',
    enunciado: 'O processo de fotossíntese é fundamental para a manutenção da vida na Terra. Durante esse processo, as plantas convertem dióxido de carbono e água em glicose, utilizando a energia solar. Qual é o principal produto liberado durante a fotossíntese?',
    alternatives: [
      'Dióxido de carbono',
      'Oxigênio',
      'Nitrogênio',
      'Hidrogênio',
      'Metano'
    ],
    correctAnswer: 1,
    year: 2023,
    discipline: 'ciencias-natureza',
    competence: '2',
    skill: 'H6'
  },
  {
    id: 'mock_3',
    enunciado: 'A Revolução Industrial, iniciada na Inglaterra no século XVIII, trouxe profundas transformações sociais e econômicas. Uma das principais consequências desse processo foi:',
    alternatives: [
      'O fortalecimento do sistema feudal',
      'A diminuição da população urbana',
      'O surgimento da classe operária',
      'A redução da produção industrial',
      'O fim do comércio internacional'
    ],
    correctAnswer: 2,
    year: 2023,
    discipline: 'ciencias-humanas',
    competence: '3',
    skill: 'H12'
  },
  {
    id: 'mock_4',
    enunciado: 'Leia o texto a seguir: "A linguagem é um sistema de signos que permite a comunicação entre os seres humanos. Ela não é apenas um meio de transmitir informações, mas também uma forma de construir a realidade social." Com base no texto, é correto afirmar que:',
    alternatives: [
      'A linguagem serve apenas para transmitir informações',
      'A linguagem é um sistema fechado e imutável',
      'A linguagem participa da construção da realidade social',
      'A linguagem é exclusiva dos seres humanos letrados',
      'A linguagem não influencia o pensamento'
    ],
    correctAnswer: 2,
    year: 2023,
    discipline: 'linguagens',
    competence: '4',
    skill: 'H18'
  }
];

// Gerar mais questões mock para diferentes anos e disciplinas
const gerarQuestoesMock = (ano: number, disciplina?: string, limite: number = 45): QuestaoEnem[] => {
  // Seleciona questões base conforme disciplina; se não houver, usa todas
  const base = disciplina
    ? MOCK_QUESTOES.filter(q => q.discipline === disciplina)
    : MOCK_QUESTOES;

  const questoesFiltradas = base.length > 0 ? base : MOCK_QUESTOES;

  const questoesComAno = questoesFiltradas.map(q => ({
    ...q,
    year: ano,
    discipline: disciplina || q.discipline || 'geral',
  }));

  // Garantir que sempre há pelo menos uma questão para evitar divisão por zero
  const pool = questoesComAno.length > 0 ? questoesComAno : [
    {
      id: 'mock_default',
      enunciado: 'Questão de treino gerada automaticamente.',
      alternatives: ['A', 'B', 'C', 'D', 'E'],
      correctAnswer: 0,
      year: ano,
      discipline: disciplina || 'geral',
    } as QuestaoEnem,
  ];

  // Duplicar questões para atingir o limite necessário
  const questoesExpandidas: QuestaoEnem[] = [];
  for (let i = 0; i < limite; i++) {
    const questaoBase = pool[i % pool.length];
    questoesExpandidas.push({
      ...questaoBase,
      id: `${questaoBase.id}_${ano}_${i}`,
      enunciado: `${questaoBase.enunciado} (Questão ${i + 1})`,
      year: ano,
      numero: i + 1,
      discipline: disciplina || questaoBase.discipline || 'geral',
    });
  }

  return questoesExpandidas;
};

// Cache local para otimização
const cache = new Map<string, any>();
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutos

export const useEnemAPI = (): UseEnemAPIReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [questoes, setQuestoes] = useState<QuestaoEnem[]>([]);

  const getCacheKey = (params: any) => {
    return JSON.stringify(params);
  };

  const getFromCache = (key: string) => {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    return null;
  };

  const setCache = (key: string, data: any) => {
    cache.set(key, {
      data,
      timestamp: Date.now()
    });
  };

  const buscarQuestoes = useCallback(async (params: BuscarQuestoesParams): Promise<QuestaoEnem[]> => {
    const cacheKey = getCacheKey(params);
    const cached = getFromCache(cacheKey);
    
    if (cached) {
      setQuestoes(cached);
      return cached;
    }

    setLoading(true);
    setError(null);

    try {
      // API enem.dev: /v1/exams/{year}/questions com filtros por disciplina e linguagem
      const year = params.year || 2023;
      const queryParams = new URLSearchParams();
      if (params.discipline) queryParams.append('discipline', params.discipline);
      if (params.limit) queryParams.append('limit', params.limit.toString());
      // competence/skill não são suportados diretamente; manter para futuro

      const response = await fetch(`${API_BASE_URL}/exams/${year}/questions?${queryParams.toString()}`);

      if (!response.ok) {
        if (ENABLE_MOCK_FALLBACK) {
          const fallback = gerarQuestoesMock(
            params.year || 2023,
            params.discipline,
            params.limit || 20
          );
          setQuestoes(fallback);
          setCache(cacheKey, fallback);
          setError(null);
          return fallback;
        } else {
          setQuestoes([]);
          setCache(cacheKey, []);
          setError(`Erro na API (${response.status}). Nenhuma questão oficial disponível.`);
          return [];
        }
      }

      const data = await response.json();

      // Resposta enem.dev: { metadata, questions: [...] }
      const items = Array.isArray(data) ? data : (data?.questions || []);

      // Normalização para nosso modelo
  const questoesNormalizadas: QuestaoEnem[] = items.map((item: any, index: number) => {
        // enem.dev: campos comuns
        // title, index, discipline, language, year, context, files, correctAlternative, alternativesIntroduction, alternatives[]
        const alternativasArray: string[] = Array.isArray(item.alternatives)
          ? item.alternatives.map((alt: any) => alt?.text ?? String(alt?.letter ?? ''))
          : (item.alternatives || []);

        // correctAlternative é letra; converter para índice 0-4
        const letra = (item.correctAlternative || '').toString().trim().toUpperCase();
        const mapa = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4 } as Record<string, number>;
        let correctIndex = letra in mapa ? mapa[letra] : 0;
        if (Array.isArray(item.alternatives)) {
          const idx = item.alternatives.findIndex((alt: any) => alt?.isCorrect === true);
          if (idx >= 0) correctIndex = idx;
        }

    return {
      id: item.id || `q_${year}_${index + 1}`,
      enunciado: item.context || item.title || '',
      alternatives: alternativasArray.length ? alternativasArray : ['A', 'B', 'C', 'D', 'E'],
      correctAnswer: typeof item.correctAnswer === 'number' ? item.correctAnswer : correctIndex,
      year: item.year || year,
      numero: typeof item.index === 'number' ? item.index : (typeof item.number === 'number' ? item.number : (index + 1)),
      discipline: item.discipline || params.discipline || 'geral',
      competence: item.competence,
      skill: item.skill,
      image: Array.isArray(item.files) && item.files.length ? item.files[0] : undefined,
      context: item.context,
    } as QuestaoEnem;
  });

      // Se API retornou vazio, usar fallback
      if (!questoesNormalizadas.length) {
        if (ENABLE_MOCK_FALLBACK) {
          const fallback = gerarQuestoesMock(
            params.year || 2023,
            params.discipline,
            params.limit || 20
          );
          setQuestoes(fallback);
          setCache(cacheKey, fallback);
          setError(null);
          return fallback;
        } else {
          setQuestoes([]);
          setCache(cacheKey, []);
          setError('Nenhuma questão oficial disponível para os filtros selecionados.');
          return [];
        }
      }

      setQuestoes(questoesNormalizadas);
      setCache(cacheKey, questoesNormalizadas);
      return questoesNormalizadas;
    } catch (err) {
      console.error('Erro ao buscar questões:', err);
      if (ENABLE_MOCK_FALLBACK) {
        const fallback = gerarQuestoesMock(
          params.year || 2023,
          params.discipline,
          params.limit || 20
        );
        setQuestoes(fallback);
        setCache(cacheKey, fallback);
        setError(null);
        return fallback;
      } else {
        setQuestoes([]);
        setCache(cacheKey, []);
        setError('Erro na API e fallback desativado.');
        return [];
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const gerarSimulado = useCallback(async (params: GerarSimuladoParams): Promise<SimuladoEnem> => {
    const { ano, disciplina, tipo, limite } = params;
    
    let questoesTotais: QuestaoEnem[] = [];
    let tempoLimite = 0;
    let totalQuestoes = 0;

    try {
      if (tipo === 'completo') {
        // Simulado completo: 45 questões de cada disciplina
        const disciplinas = ['matematica', 'ciencias-natureza', 'ciencias-humanas', 'linguagens'];
        tempoLimite = 330; // 5h30min
        totalQuestoes = 180;

        for (const disc of disciplinas) {
          const questoesDisciplina = await buscarQuestoes({
            year: ano,
            discipline: disc,
            limit: 45
          });
          questoesTotais.push(...questoesDisciplina.slice(0, 45));
        }
      } else if (tipo === 'por_disciplina' && disciplina) {
        // Simulado por disciplina específica
        tempoLimite = 90; // 1h30min
        totalQuestoes = 45;
        
        questoesTotais = await buscarQuestoes({
          year: ano,
          discipline: disciplina,
          limit: 45
        });
      } else if (tipo === 'personalizado') {
        // Simulado personalizado
        const limiteQuestoes = limite || 20;
        tempoLimite = Math.ceil(limiteQuestoes * 2.5); // ~2.5min por questão
        totalQuestoes = limiteQuestoes;
        
        questoesTotais = await buscarQuestoes({
          year: ano,
          discipline: disciplina,
          limit: limiteQuestoes
        });
      }

      // Embaralhar questões
      const questoesEmbaralhadas = questoesTotais
        .sort(() => Math.random() - 0.5)
        .slice(0, totalQuestoes);

      const simulado: SimuladoEnem = {
        id: `simulado_${ano}_${tipo}_${Date.now()}`,
        titulo: disciplina 
          ? `ENEM ${ano} - ${disciplina.charAt(0).toUpperCase() + disciplina.slice(1)}`
          : `ENEM ${ano} - Simulado ${tipo === 'completo' ? 'Completo' : 'Personalizado'}`,
        ano,
        disciplina,
        questoes: questoesEmbaralhadas,
        tempoLimite,
        tipo,
        totalQuestoes: questoesEmbaralhadas.length
      };

      return simulado;
    } catch (err) {
      console.error('Erro ao gerar simulado:', err);
      throw new Error('Falha ao gerar simulado');
    }
  }, [buscarQuestoes]);

  const listarAnos = useCallback(async (): Promise<number[]> => {
    const cacheKey = 'anos_disponiveis';
    const cached = getFromCache(cacheKey);
    
    if (cached) return cached;

    try {
      const response = await fetch(`${API_BASE_URL}/exams`);
      if (!response.ok) throw new Error('Erro ao buscar anos');
      
      const data = await response.json();
      const anos = data
        .map((exam: any) => exam.year)
        .filter((y: number) => y >= 2013 && y <= 2023)
        .sort((a: number, b: number) => b - a);
      
      setCache(cacheKey, anos);
      return anos;
    } catch (err) {
      console.error('Erro ao listar anos:', err);
      // Fallback para anos conhecidos
      return [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013];
    }
  }, []);

  const listarDisciplinas = useCallback(async (): Promise<string[]> => {
    return [
      'matematica',
      'ciencias-natureza', 
      'ciencias-humanas',
      'linguagens'
    ];
  }, []);

  return {
    loading,
    error,
    questoes,
    buscarQuestoes,
    gerarSimulado,
    listarAnos,
    listarDisciplinas
  };
};