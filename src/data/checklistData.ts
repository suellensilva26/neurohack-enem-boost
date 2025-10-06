export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
  frequency: number; // Percentual de recorrência no ENEM (0-100)
  completed: boolean;
  estimatedTime: number; // Em minutos
  prerequisites?: string[];
  tips?: string[];
}

export interface SubjectChecklist {
  id: string;
  name: string;
  icon: string;
  color: string;
  totalItems: number;
  completedItems: number;
  criticalItems: number;
  items: ChecklistItem[];
}

export const checklistData: SubjectChecklist[] = [
  {
    id: 'matematica',
    name: 'Matemática',
    icon: '📐',
    color: 'bg-blue-500',
    totalItems: 25,
    completedItems: 0,
    criticalItems: 8,
    items: [
      {
        id: 'math-1',
        title: 'Funções do 1º Grau',
        description: 'Definição, gráfico, coeficiente angular e linear',
        category: 'Álgebra',
        importance: 'critical',
        frequency: 95,
        completed: false,
        estimatedTime: 45,
        tips: ['Foque em interpretação gráfica', 'Pratique problemas de aplicação']
      },
      {
        id: 'math-2',
        title: 'Funções do 2º Grau',
        description: 'Parábola, vértice, raízes, máximo e mínimo',
        category: 'Álgebra',
        importance: 'critical',
        frequency: 90,
        completed: false,
        estimatedTime: 60,
        tips: ['Domine a fórmula do vértice', 'Pratique problemas de otimização']
      },
      {
        id: 'math-3',
        title: 'Geometria Plana',
        description: 'Áreas e perímetros de figuras planas',
        category: 'Geometria',
        importance: 'critical',
        frequency: 85,
        completed: false,
        estimatedTime: 90,
        tips: ['Memorize fórmulas principais', 'Pratique decomposição de figuras']
      },
      {
        id: 'math-4',
        title: 'Geometria Espacial',
        description: 'Volumes de sólidos geométricos',
        category: 'Geometria',
        importance: 'high',
        frequency: 75,
        completed: false,
        estimatedTime: 60,
        tips: ['Foque em cilindro, cone e esfera', 'Pratique problemas práticos']
      },
      {
        id: 'math-5',
        title: 'Probabilidade',
        description: 'Eventos, espaço amostral, probabilidade condicional',
        category: 'Estatística',
        importance: 'high',
        frequency: 80,
        completed: false,
        estimatedTime: 45,
        tips: ['Domine princípio fundamental da contagem', 'Pratique problemas de análise combinatória']
      },
      {
        id: 'math-6',
        title: 'Estatística Básica',
        description: 'Média, mediana, moda, desvio padrão',
        category: 'Estatística',
        importance: 'high',
        frequency: 70,
        completed: false,
        estimatedTime: 30,
        tips: ['Foque na interpretação de dados', 'Pratique análise de gráficos']
      },
      {
        id: 'math-7',
        title: 'Progressões Aritméticas',
        description: 'Termo geral, soma dos termos',
        category: 'Álgebra',
        importance: 'medium',
        frequency: 60,
        completed: false,
        estimatedTime: 30,
        tips: ['Memorize fórmula do termo geral', 'Pratique problemas de aplicação']
      },
      {
        id: 'math-8',
        title: 'Progressões Geométricas',
        description: 'Termo geral, soma dos termos, soma infinita',
        category: 'Álgebra',
        importance: 'medium',
        frequency: 55,
        completed: false,
        estimatedTime: 35,
        tips: ['Entenda o conceito de razão', 'Pratique problemas financeiros']
      }
    ]
  },
  {
    id: 'portugues',
    name: 'Português',
    icon: '📚',
    color: 'bg-green-500',
    totalItems: 20,
    completedItems: 0,
    criticalItems: 6,
    items: [
      {
        id: 'port-1',
        title: 'Figuras de Linguagem',
        description: 'Metáfora, metonímia, hipérbole, ironia, antítese',
        category: 'Literatura',
        importance: 'critical',
        frequency: 90,
        completed: false,
        estimatedTime: 40,
        tips: ['Foque na diferença entre denotação e conotação', 'Pratique identificação em textos']
      },
      {
        id: 'port-2',
        title: 'Funções da Linguagem',
        description: 'Referencial, emotiva, conativa, metalinguística, fática, poética',
        category: 'Linguística',
        importance: 'critical',
        frequency: 85,
        completed: false,
        estimatedTime: 35,
        tips: ['Memorize os elementos do circuito da comunicação', 'Pratique análise de textos']
      },
      {
        id: 'port-3',
        title: 'Variação Linguística',
        description: 'Geográfica, social, histórica, situacional',
        category: 'Linguística',
        importance: 'high',
        frequency: 75,
        completed: false,
        estimatedTime: 30,
        tips: ['Entenda o preconceito linguístico', 'Pratique análise de textos regionais']
      },
      {
        id: 'port-4',
        title: 'Períodos Compostos',
        description: 'Coordenação e subordinação, pontuação',
        category: 'Gramática',
        importance: 'high',
        frequency: 80,
        completed: false,
        estimatedTime: 45,
        tips: ['Domine as conjunções principais', 'Pratique análise sintática']
      },
      {
        id: 'port-5',
        title: 'Crase',
        description: 'Regras de uso, casos obrigatórios e proibidos',
        category: 'Gramática',
        importance: 'medium',
        frequency: 65,
        completed: false,
        estimatedTime: 25,
        tips: ['Memorize as regras principais', 'Pratique com exercícios específicos']
      }
    ]
  },
  {
    id: 'biologia',
    name: 'Biologia',
    icon: '🧬',
    color: 'bg-emerald-500',
    totalItems: 18,
    completedItems: 0,
    criticalItems: 7,
    items: [
      {
        id: 'bio-1',
        title: 'Evolução',
        description: 'Teoria de Darwin, seleção natural, evidências',
        category: 'Evolução',
        importance: 'critical',
        frequency: 90,
        completed: false,
        estimatedTime: 50,
        tips: ['Entenda a diferença entre evolução e adaptação', 'Pratique com questões de genética']
      },
      {
        id: 'bio-2',
        title: 'Genética',
        description: 'Leis de Mendel, herança, DNA, RNA',
        category: 'Genética',
        importance: 'critical',
        frequency: 85,
        completed: false,
        estimatedTime: 60,
        tips: ['Domine os cruzamentos mendelianos', 'Pratique problemas de herança']
      },
      {
        id: 'bio-3',
        title: 'Ecologia',
        description: 'Cadeias alimentares, ciclos biogeoquímicos, sustentabilidade',
        category: 'Ecologia',
        importance: 'critical',
        frequency: 80,
        completed: false,
        estimatedTime: 45,
        tips: ['Foque em problemas ambientais atuais', 'Entenda os ciclos da natureza']
      },
      {
        id: 'bio-4',
        title: 'Fisiologia Humana',
        description: 'Sistemas digestório, respiratório, circulatório',
        category: 'Fisiologia',
        importance: 'high',
        frequency: 75,
        completed: false,
        estimatedTime: 55,
        tips: ['Relacione com problemas de saúde', 'Pratique com questões interdisciplinares']
      }
    ]
  },
  {
    id: 'quimica',
    name: 'Química',
    icon: '⚗️',
    color: 'bg-purple-500',
    totalItems: 16,
    completedItems: 0,
    criticalItems: 6,
    items: [
      {
        id: 'chem-1',
        title: 'Estequiometria',
        description: 'Cálculos com mol, massa molar, rendimento',
        category: 'Química Geral',
        importance: 'critical',
        frequency: 85,
        completed: false,
        estimatedTime: 60,
        tips: ['Domine o conceito de mol', 'Pratique com problemas de balanceamento']
      },
      {
        id: 'chem-2',
        title: 'Ligações Químicas',
        description: 'Iônica, covalente, metálica, propriedades',
        category: 'Química Geral',
        importance: 'critical',
        frequency: 80,
        completed: false,
        estimatedTime: 45,
        tips: ['Entenda a eletronegatividade', 'Pratique com a tabela periódica']
      },
      {
        id: 'chem-3',
        title: 'Química Orgânica',
        description: 'Funções orgânicas, nomenclatura, reações',
        category: 'Química Orgânica',
        importance: 'high',
        frequency: 75,
        completed: false,
        estimatedTime: 70,
        tips: ['Memorize as funções principais', 'Pratique nomenclatura IUPAC']
      }
    ]
  },
  {
    id: 'fisica',
    name: 'Física',
    icon: '⚡',
    color: 'bg-red-500',
    totalItems: 15,
    completedItems: 0,
    criticalItems: 5,
    items: [
      {
        id: 'phys-1',
        title: 'Mecânica',
        description: 'Movimento uniforme, aceleração, forças',
        category: 'Mecânica',
        importance: 'critical',
        frequency: 90,
        completed: false,
        estimatedTime: 70,
        tips: ['Domine as equações do movimento', 'Pratique com problemas gráficos']
      },
      {
        id: 'phys-2',
        title: 'Eletricidade',
        description: 'Corrente elétrica, resistência, potência',
        category: 'Eletricidade',
        importance: 'critical',
        frequency: 80,
        completed: false,
        estimatedTime: 55,
        tips: ['Entenda a Lei de Ohm', 'Pratique circuitos elétricos']
      },
      {
        id: 'phys-3',
        title: 'Óptica',
        description: 'Reflexão, refração, lentes, espelhos',
        category: 'Óptica',
        importance: 'high',
        frequency: 70,
        completed: false,
        estimatedTime: 45,
        tips: ['Domine as leis da reflexão e refração', 'Pratique com construção de imagens']
      }
    ]
  },
  {
    id: 'historia',
    name: 'História',
    icon: '🏛️',
    color: 'bg-amber-500',
    totalItems: 22,
    completedItems: 0,
    criticalItems: 8,
    items: [
      {
        id: 'hist-1',
        title: 'Brasil Colônia',
        description: 'Capitanias hereditárias, escravidão, economia açucareira',
        category: 'História do Brasil',
        importance: 'critical',
        frequency: 85,
        completed: false,
        estimatedTime: 40,
        tips: ['Foque na estrutura social', 'Pratique com questões de economia']
      },
      {
        id: 'hist-2',
        title: 'Brasil Império',
        description: 'Independência, primeiro e segundo reinado',
        category: 'História do Brasil',
        importance: 'critical',
        frequency: 80,
        completed: false,
        estimatedTime: 45,
        tips: ['Entenda o processo de independência', 'Pratique com questões políticas']
      },
      {
        id: 'hist-3',
        title: 'Brasil República',
        description: 'República Velha, Era Vargas, Ditadura Militar',
        category: 'História do Brasil',
        importance: 'critical',
        frequency: 75,
        completed: false,
        estimatedTime: 50,
        tips: ['Foque nas transformações políticas', 'Pratique com questões sociais']
      }
    ]
  },
  {
    id: 'geografia',
    name: 'Geografia',
    icon: '🌍',
    color: 'bg-cyan-500',
    totalItems: 20,
    completedItems: 0,
    criticalItems: 7,
    items: [
      {
        id: 'geo-1',
        title: 'Geografia Física',
        description: 'Clima, vegetação, relevo, hidrografia',
        category: 'Geografia Física',
        importance: 'critical',
        frequency: 85,
        completed: false,
        estimatedTime: 50,
        tips: ['Domine os biomas brasileiros', 'Pratique com mapas']
      },
      {
        id: 'geo-2',
        title: 'Geografia Humana',
        description: 'População, urbanização, migrações',
        category: 'Geografia Humana',
        importance: 'critical',
        frequency: 80,
        completed: false,
        estimatedTime: 45,
        tips: ['Foque em problemas urbanos', 'Pratique com dados estatísticos']
      },
      {
        id: 'geo-3',
        title: 'Geografia Econômica',
        description: 'Setores da economia, globalização, desigualdades',
        category: 'Geografia Econômica',
        importance: 'high',
        frequency: 75,
        completed: false,
        estimatedTime: 40,
        tips: ['Entenda a divisão internacional do trabalho', 'Pratique com questões de atualidade']
      }
    ]
  }
];

// Função para calcular progresso por matéria
export const calculateSubjectProgress = (subject: SubjectChecklist): number => {
  const completed = subject.items.filter(item => item.completed).length;
  return Math.round((completed / subject.items.length) * 100);
};

// Função para calcular progresso geral
export const calculateOverallProgress = (subjects: SubjectChecklist[]): number => {
  const totalItems = subjects.reduce((acc, subject) => acc + subject.items.length, 0);
  const completedItems = subjects.reduce((acc, subject) => 
    acc + subject.items.filter(item => item.completed).length, 0
  );
  return Math.round((completedItems / totalItems) * 100);
};

// Função para obter itens críticos pendentes
export const getCriticalPendingItems = (subjects: SubjectChecklist[]): ChecklistItem[] => {
  return subjects.flatMap(subject => 
    subject.items.filter(item => !item.completed && item.importance === 'critical')
  );
};

// Função para obter próximos itens recomendados
export const getRecommendedItems = (subjects: SubjectChecklist[], limit: number = 5): ChecklistItem[] => {
  const allItems = subjects.flatMap(subject => subject.items);
  const pendingItems = allItems.filter(item => !item.completed);
  
  // Ordenar por importância e frequência
  return pendingItems
    .sort((a, b) => {
      const importanceWeight = { critical: 4, high: 3, medium: 2, low: 1 };
      const aWeight = importanceWeight[a.importance] + (a.frequency / 100);
      const bWeight = importanceWeight[b.importance] + (b.frequency / 100);
      return bWeight - aWeight;
    })
    .slice(0, limit);
};


