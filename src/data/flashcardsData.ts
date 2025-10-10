export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
  imageUrl?: string;
  category: string;
  // Campos adicionais para compatibilidade com especificação ENEM 30 Dias
  discipline?: string; // disciplina
  block?: string; // bloco
  topic?: string; // topico
  hint?: string; // dica
  formula?: string; // formula/exemplo
  tags?: string[]; // tags
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  totalCards: number;
  completedCards: number;
}

export const subjects: Subject[] = [
  { id: 'matematica', name: 'Matemática', icon: '📐', color: 'bg-blue-500', totalCards: 20, completedCards: 0 },
  { id: 'portugues', name: 'Português', icon: '📚', color: 'bg-green-500', totalCards: 20, completedCards: 0 },
  { id: 'biologia', name: 'Biologia', icon: '🧬', color: 'bg-emerald-500', totalCards: 20, completedCards: 0 },
  { id: 'quimica', name: 'Química', icon: '⚗️', color: 'bg-purple-500', totalCards: 20, completedCards: 0 },
  { id: 'fisica', name: 'Física', icon: '⚡', color: 'bg-red-500', totalCards: 20, completedCards: 0 },
  { id: 'historia', name: 'História', icon: '🏛️', color: 'bg-amber-500', totalCards: 20, completedCards: 0 },
  { id: 'geografia', name: 'Geografia', icon: '🌍', color: 'bg-cyan-500', totalCards: 20, completedCards: 0 },
  { id: 'filosofia', name: 'Filosofia', icon: '🤔', color: 'bg-indigo-500', totalCards: 20, completedCards: 0 },
  { id: 'sociologia', name: 'Sociologia', icon: '👥', color: 'bg-pink-500', totalCards: 20, completedCards: 0 },
  { id: 'literatura', name: 'Literatura', icon: '📖', color: 'bg-orange-500', totalCards: 20, completedCards: 0 },
  { id: 'ingles', name: 'Inglês', icon: '🇺🇸', color: 'bg-sky-500', totalCards: 20, completedCards: 0 },
  { id: 'artes', name: 'Artes', icon: '🎨', color: 'bg-rose-500', totalCards: 20, completedCards: 0 },
  { id: 'educacao-fisica', name: 'Educação Física', icon: '🏃', color: 'bg-lime-500', totalCards: 20, completedCards: 0 },
  { id: 'tecnologia', name: 'Tecnologia', icon: '💻', color: 'bg-slate-500', totalCards: 20, completedCards: 0 }
];

// Base mínima embutida (fallback) usada se não houver dataset externo
export let flashcardsData: Flashcard[] = [
  // Matemática
  {
    id: 'math-1',
    question: 'Qual é a fórmula para calcular a área de um triângulo?',
    answer: 'A = (base × altura) / 2',
    subject: 'matematica',
    difficulty: 'easy',
    explanation: 'A área de um triângulo é sempre metade do produto da base pela altura.',
    category: 'Geometria'
  },
  {
    id: 'math-2',
    question: 'Como calcular o volume de um cilindro?',
    answer: 'V = π × r² × h',
    subject: 'matematica',
    difficulty: 'medium',
    explanation: 'O volume é o produto da área da base circular (πr²) pela altura (h).',
    category: 'Geometria'
  },
  {
    id: 'math-3',
    question: 'Qual é a derivada de x²?',
    answer: '2x',
    subject: 'matematica',
    difficulty: 'hard',
    explanation: 'Aplicando a regra da potência: d/dx(x²) = 2x²⁻¹ = 2x¹ = 2x',
    category: 'Cálculo'
  },
  
  // Português
  {
    id: 'port-1',
    question: 'O que é uma metáfora?',
    answer: 'Figura de linguagem que estabelece uma comparação implícita entre dois termos.',
    subject: 'portugues',
    difficulty: 'easy',
    explanation: 'Exemplo: "Ela é uma flor" - comparação implícita entre a pessoa e uma flor.',
    category: 'Figuras de Linguagem'
  },
  {
    id: 'port-2',
    question: 'Qual é a diferença entre denotação e conotação?',
    answer: 'Denotação: sentido literal. Conotação: sentido figurado ou subjetivo.',
    subject: 'portugues',
    difficulty: 'medium',
    explanation: 'Denotação é o dicionário, conotação são as associações e sentimentos.',
    category: 'Semântica'
  },
  
  // Biologia
  {
    id: 'bio-1',
    question: 'O que é fotossíntese?',
    answer: 'Processo pelo qual plantas convertem luz solar, CO₂ e água em glicose e oxigênio.',
    subject: 'biologia',
    difficulty: 'easy',
    explanation: '6CO₂ + 6H₂O + luz → C₆H₁₂O₆ + 6O₂',
    category: 'Fisiologia Vegetal'
  },
  {
    id: 'bio-2',
    question: 'Qual é a diferença entre mitose e meiose?',
    answer: 'Mitose: divisão celular que produz células idênticas. Meiose: produz gametas com metade dos cromossomos.',
    subject: 'biologia',
    difficulty: 'hard',
    explanation: 'Mitose mantém o número de cromossomos, meiose reduz pela metade.',
    category: 'Genética'
  },
  
  // Química
  {
    id: 'chem-1',
    question: 'O que é o número de Avogadro?',
    answer: '6,022 × 10²³ - número de partículas em 1 mol de qualquer substância.',
    subject: 'quimica',
    difficulty: 'medium',
    explanation: 'É uma constante fundamental que relaciona massa atômica com quantidade de matéria.',
    category: 'Química Geral'
  },
  
  // Física
  {
    id: 'phys-1',
    question: 'Qual é a fórmula da velocidade média?',
    answer: 'v = Δs / Δt',
    subject: 'fisica',
    difficulty: 'easy',
    explanation: 'Velocidade é o deslocamento (Δs) dividido pelo tempo (Δt).',
    category: 'Mecânica'
  },
  {
    id: 'phys-2',
    question: 'O que diz a Lei de Ohm?',
    answer: 'V = R × I (Tensão = Resistência × Corrente)',
    subject: 'fisica',
    difficulty: 'medium',
    explanation: 'A tensão elétrica é diretamente proporcional à corrente e à resistência.',
    category: 'Eletricidade'
  },
  
  // História
  {
    id: 'hist-1',
    question: 'Em que ano foi proclamada a Independência do Brasil?',
    answer: '1822',
    subject: 'historia',
    difficulty: 'easy',
    explanation: 'Dom Pedro I proclamou a independência em 7 de setembro de 1822.',
    category: 'Brasil Império'
  },
  
  // Geografia
  {
    id: 'geo-1',
    question: 'Qual é o maior oceano do mundo?',
    answer: 'Oceano Pacífico',
    subject: 'geografia',
    difficulty: 'easy',
    explanation: 'Oceano Pacífico cobre mais de 30% da superfície terrestre.',
    category: 'Geografia Física'
  },
  
  // Filosofia
  {
    id: 'phil-1',
    question: 'Quem foi Sócrates?',
    answer: 'Filósofo grego que desenvolveu o método da maiêutica e o "sei que nada sei".',
    subject: 'filosofia',
    difficulty: 'medium',
    explanation: 'Sócrates é considerado o pai da filosofia ocidental.',
    category: 'Filosofia Antiga'
  },
  
  // Sociologia
  {
    id: 'soc-1',
    question: 'O que é capital social?',
    answer: 'Recursos sociais que resultam das redes de relacionamento entre pessoas.',
    subject: 'sociologia',
    difficulty: 'hard',
    explanation: 'Inclui confiança, normas e redes que facilitam a coordenação e cooperação.',
    category: 'Sociologia Contemporânea'
  },
  
  // Literatura
  {
    id: 'lit-1',
    question: 'Qual é o principal autor do Romantismo brasileiro?',
    answer: 'Gonçalves Dias',
    subject: 'literatura',
    difficulty: 'medium',
    explanation: 'Autor de "Canção do Exílio" e principal poeta da primeira geração romântica.',
    category: 'Romantismo'
  },
  
  // Inglês
  {
    id: 'eng-1',
    question: 'Qual é a diferença entre "few" e "little"?',
    answer: 'Few: substantivos contáveis. Little: substantivos incontáveis.',
    subject: 'ingles',
    difficulty: 'medium',
    explanation: 'Few books (poucos livros), Little water (pouca água).',
    category: 'Gramática'
  },
  
  // Artes
  {
    id: 'art-1',
    question: 'Quem pintou a "Mona Lisa"?',
    answer: 'Leonardo da Vinci',
    subject: 'artes',
    difficulty: 'easy',
    explanation: 'Pintura do Renascimento italiano, exposta no Louvre.',
    category: 'Arte Renascentista'
  },
  
  // Educação Física
  {
    id: 'pe-1',
    question: 'O que é frequência cardíaca máxima?',
    answer: '220 - idade (aproximadamente)',
    subject: 'educacao-fisica',
    difficulty: 'medium',
    explanation: 'Fórmula para estimar a frequência cardíaca máxima durante exercícios.',
    category: 'Fisiologia do Exercício'
  },
  
  // Tecnologia
  {
    id: 'tech-1',
    question: 'O que é HTML?',
    answer: 'HyperText Markup Language - linguagem de marcação para páginas web.',
    subject: 'tecnologia',
    difficulty: 'easy',
    explanation: 'HTML define a estrutura e o conteúdo das páginas web.',
    category: 'Programação Web'
  }
];

// Função para obter flashcards por matéria
export const getFlashcardsBySubject = (subjectId: string): Flashcard[] => {
  return flashcardsData.filter(card => card.subject === subjectId);
};

// Loader de dataset JSON em `public/data/flashcards.json`
// Estrutura esperada: Array de objetos compatíveis com `Flashcard`
export const loadFlashcardsDataset = async (): Promise<void> => {
  try {
    const res = await fetch('/data/flashcards.json', { cache: 'no-store' });
    if (!res.ok) return; // Mantém fallback se arquivo não existir
    const data = await res.json();
    if (Array.isArray(data)) {
      // Normaliza campos possíveis vindos do documento
      flashcardsData = data.map((raw: any, idx: number) => {
        const subject = raw.subject || raw.discipline || raw.materia || raw.area || 'matematica';
        return {
          id: String(raw.id || raw.uid || `fc-${subject}-${idx}`),
          question: String(raw.question || raw.pergunta || raw.q || ''),
          answer: String(raw.answer || raw.resposta || raw.a || ''),
          subject: String(subject).toLowerCase().replace(/\s+/g, '-'),
          difficulty: (raw.difficulty || raw.dificuldade || 'medium') as 'easy' | 'medium' | 'hard',
          explanation: raw.explanation || raw.explicacao || raw.details || undefined,
          imageUrl: raw.imageUrl || raw.imagem || undefined,
          category: raw.category || raw.categoria || 'Geral',
          discipline: raw.discipline || undefined,
          block: raw.block || raw.bloco || undefined,
          topic: raw.topic || raw.topico || undefined,
          hint: raw.hint || raw.dica || undefined,
          formula: raw.formula || undefined,
          tags: raw.tags || undefined,
        } as Flashcard;
      });

      // Atualiza contagem por matéria
      const counts: Record<string, number> = {};
      flashcardsData.forEach(fc => {
        counts[fc.subject] = (counts[fc.subject] || 0) + 1;
      });
      subjects.forEach(s => {
        s.totalCards = counts[s.id] || 0;
      });
    }
  } catch (e) {
    // Silencia erros para não quebrar a UI
    console.warn('Falha ao carregar dataset de flashcards:', e);
  }
};

// Função para obter flashcards por dificuldade
export const getFlashcardsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): Flashcard[] => {
  return flashcardsData.filter(card => card.difficulty === difficulty);
};

// Função para obter flashcards aleatórios
export const getRandomFlashcards = (count: number, subjectId?: string): Flashcard[] => {
  let filtered = subjectId ? getFlashcardsBySubject(subjectId) : flashcardsData;
  return filtered.sort(() => 0.5 - Math.random()).slice(0, count);
};


