export interface DailyQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  year?: number;
  source: string;
  tips?: string[];
  relatedTopics?: string[];
}

export const dailyQuestions: DailyQuestion[] = [
  {
    id: 'daily-1',
    question: 'Uma empresa de delivery cobra R$ 5,00 pela taxa de entrega e R$ 2,00 por quilômetro rodado. Se um cliente mora a 8 km do restaurante, quanto ele pagará pelo delivery?',
    options: [
      'R$ 16,00',
      'R$ 21,00', 
      'R$ 26,00',
      'R$ 32,00'
    ],
    correctAnswer: 1,
    explanation: 'A função que representa o custo é C(x) = 5 + 2x, onde x é a distância em km. Para 8 km: C(8) = 5 + 2×8 = 5 + 16 = R$ 21,00.',
    subject: 'matematica',
    category: 'Funções do 1º Grau',
    difficulty: 'easy',
    year: 2023,
    source: 'ENEM 2023',
    tips: [
      'Identifique a taxa fixa (R$ 5,00) e a taxa variável (R$ 2,00/km)',
      'Use a fórmula: Custo = Taxa Fixa + (Taxa Variável × Distância)',
      'Substitua os valores na fórmula'
    ],
    relatedTopics: ['Função do 1º grau', 'Problemas práticos', 'Interpretação de texto']
  },
  {
    id: 'daily-2',
    question: 'No trecho "A pandemia trouxe mudanças que pareciam impossíveis antes", a palavra "impossíveis" tem função:',
    options: [
      'Adjetivo predicativo',
      'Adjetivo atributivo',
      'Substantivo',
      'Advérbio'
    ],
    correctAnswer: 0,
    explanation: '"Impossíveis" é um adjetivo predicativo porque se refere ao substantivo "mudanças" através de uma ligação verbal ("pareciam").',
    subject: 'portugues',
    category: 'Sintaxe',
    difficulty: 'medium',
    year: 2022,
    source: 'ENEM 2022',
    tips: [
      'Adjetivo predicativo se liga ao substantivo através de verbo de ligação',
      'Adjetivo atributivo fica diretamente junto ao substantivo',
      'Observe a estrutura da frase: sujeito + verbo + predicativo'
    ],
    relatedTopics: ['Sintaxe', 'Funções do adjetivo', 'Verbos de ligação']
  },
  {
    id: 'daily-3',
    question: 'O processo de fotossíntese é fundamental para a vida na Terra. Qual das alternativas melhor explica sua importância?',
    options: [
      'Produz apenas oxigênio para a respiração dos animais',
      'Converte energia solar em energia química, produzindo oxigênio e glicose',
      'Remove apenas o gás carbônico da atmosfera',
      'Serve apenas para o crescimento das plantas'
    ],
    correctAnswer: 1,
    explanation: 'A fotossíntese converte energia luminosa em energia química, produzindo glicose (alimento) e liberando oxigênio como subproduto.',
    subject: 'biologia',
    category: 'Fisiologia Vegetal',
    difficulty: 'easy',
    year: 2021,
    source: 'ENEM 2021',
    tips: [
      'Lembre-se da equação: 6CO₂ + 6H₂O + luz → C₆H₁₂O₆ + 6O₂',
      'A fotossíntese é a base das cadeias alimentares',
      'Produz tanto alimento quanto oxigênio'
    ],
    relatedTopics: ['Cadeias alimentares', 'Ciclos biogeoquímicos', 'Ecossistemas']
  },
  {
    id: 'daily-4',
    question: 'Um estudante dissolve 2 mols de NaCl em água suficiente para 1 litro de solução. A concentração molar desta solução é:',
    options: [
      '1 mol/L',
      '2 mol/L',
      '4 mol/L',
      '0,5 mol/L'
    ],
    correctAnswer: 1,
    explanation: 'A concentração molar (M) é calculada por M = n/V, onde n é o número de mols e V é o volume em litros. M = 2 mol/1 L = 2 mol/L.',
    subject: 'quimica',
    category: 'Soluções',
    difficulty: 'easy',
    year: 2020,
    source: 'ENEM 2020',
    tips: [
      'Fórmula da concentração molar: M = n/V',
      'n = número de mols do soluto',
      'V = volume da solução em litros'
    ],
    relatedTopics: ['Estequiometria', 'Preparação de soluções', 'Concentrações']
  },
  {
    id: 'daily-5',
    question: 'Um carro parte do repouso e acelera uniformemente com aceleração de 2 m/s² por 10 segundos. Qual é sua velocidade final?',
    options: [
      '10 m/s',
      '20 m/s',
      '40 m/s',
      '100 m/s'
    ],
    correctAnswer: 1,
    explanation: 'Usando a equação v = v₀ + at, onde v₀ = 0 (repouso), a = 2 m/s² e t = 10 s: v = 0 + 2×10 = 20 m/s.',
    subject: 'fisica',
    category: 'Mecânica',
    difficulty: 'easy',
    year: 2019,
    source: 'ENEM 2019',
    tips: [
      'Equação da velocidade: v = v₀ + at',
      'v₀ = velocidade inicial (0 no repouso)',
      'a = aceleração, t = tempo'
    ],
    relatedTopics: ['Movimento uniformemente variado', 'Cinemática', 'Equações do movimento']
  },
  {
    id: 'daily-6',
    question: 'A Lei Áurea de 1888, que aboliu a escravidão no Brasil, foi resultado principalmente de:',
    options: [
      'Pressão exclusiva dos abolicionistas',
      'Iniciativa do governo imperial',
      'Pressão internacional e movimentos abolicionistas',
      'Decisão unilateral da princesa Isabel'
    ],
    correctAnswer: 2,
    explanation: 'A abolição resultou de pressões internas (movimentos abolicionistas) e externas (pressão internacional), além de interesses econômicos.',
    subject: 'historia',
    category: 'Brasil Império',
    difficulty: 'medium',
    year: 2018,
    source: 'ENEM 2018',
    tips: [
      'A abolição foi um processo complexo com múltiplos fatores',
      'Houve pressão internacional (principalmente da Inglaterra)',
      'Movimentos abolicionistas ganharam força no período'
    ],
    relatedTopics: ['Segundo Reinado', 'Economia cafeeira', 'Transição para República']
  },
  {
    id: 'daily-7',
    question: 'O fenômeno do efeito estufa natural é essencial para a vida na Terra porque:',
    options: [
      'Aumenta a temperatura global',
      'Mantém a temperatura adequada para a vida',
      'Reduz a poluição atmosférica',
      'Melhora a qualidade do ar'
    ],
    correctAnswer: 1,
    explanation: 'O efeito estufa natural mantém a temperatura média da Terra em cerca de 15°C, permitindo a existência de vida. Sem ele, a Terra seria muito fria.',
    subject: 'geografia',
    category: 'Geografia Física',
    difficulty: 'easy',
    year: 2017,
    source: 'ENEM 2017',
    tips: [
      'Efeito estufa natural é diferente do aquecimento global',
      'Mantém temperatura adequada para a vida',
      'Gases como CO₂, CH₄ e vapor d\'água são essenciais'
    ],
    relatedTopics: ['Clima', 'Biosfera', 'Sustentabilidade']
  },
  {
    id: 'daily-8',
    question: 'No contexto da filosofia socrática, a maiêutica se refere a:',
    options: [
      'Método de memorização',
      'Técnica de ensino através de perguntas',
      'Sistema de classificação de ideias',
      'Forma de escrita filosófica'
    ],
    correctAnswer: 1,
    explanation: 'A maiêutica é o método socrático de fazer o interlocutor "dar à luz" suas próprias ideias através de perguntas dirigidas.',
    subject: 'filosofia',
    category: 'Filosofia Antiga',
    difficulty: 'medium',
    year: 2016,
    source: 'ENEM 2016',
    tips: [
      'Maiêutica significa "arte do parto" em grego',
      'Sócrates usava perguntas para levar ao conhecimento',
      'Método indutivo: do particular ao geral'
    ],
    relatedTopics: ['Método socrático', 'Conhecimento', 'Filosofia grega']
  }
];

// Função para obter questão aleatória do dia
export const getDailyQuestion = (): DailyQuestion => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  // Usar o dia do ano como seed para garantir consistência no mesmo dia
  const index = dayOfYear % dailyQuestions.length;
  return dailyQuestions[index];
};

// Função para obter questão por matéria
export const getQuestionBySubject = (subject: string): DailyQuestion[] => {
  return dailyQuestions.filter(q => q.subject === subject);
};

// Função para obter questões por dificuldade
export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): DailyQuestion[] => {
  return dailyQuestions.filter(q => q.difficulty === difficulty);
};

// Função para obter histórico de questões (últimos 7 dias)
export const getQuestionHistory = (): DailyQuestion[] => {
  const history: DailyQuestion[] = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const index = dayOfYear % dailyQuestions.length;
    history.push(dailyQuestions[index]);
  }
  
  return history;
};


