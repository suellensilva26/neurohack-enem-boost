import { QuestionnaireData } from "./ScheduleQuestionnaire";

export interface StudyDay {
  day: number;
  date: string;
  subjects: {
    name: string;
    topics: string[];
    duration: number; // em minutos
    difficulty: 'easy' | 'medium' | 'hard';
    priority: 'high' | 'medium' | 'low';
    resources: {
      flashcards?: boolean;
      ebook?: string;
      simulado?: boolean;
      questoes?: boolean;
      premium?: boolean;
    };
  }[];
  totalHours: number;
  completed: boolean;
  progress: number;
  recommendations: {
    ebooks: string[];
    features: string[];
    tips: string[];
  };
}

export interface GeneratedSchedule {
  totalDays: number;
  currentDay: number;
  studyDays: StudyDay[];
  weakSubjects: string[];
  strongSubjects: string[];
  studyHoursPerDay: number;
  studyDaysPerWeek: number;
  personalizedTips: string[];
  recommendedEbooks: string[];
  recommendedFeatures: string[];
}

const subjectNames: Record<string, string> = {
  matematica: 'Matemática',
  portugues: 'Português',
  biologia: 'Biologia',
  quimica: 'Química',
  fisica: 'Física',
  historia: 'História',
  geografia: 'Geografia',
  filosofia: 'Filosofia',
  sociologia: 'Sociologia',
  redacao: 'Redação'
};

const topicsBySubject: Record<string, string[]> = {
  'Matemática': [
    'Funções do 1º grau', 'Funções do 2º grau', 'Progressões', 'Geometria Plana',
    'Geometria Espacial', 'Trigonometria', 'Estatística', 'Probabilidade',
    'Logaritmos', 'Análise Combinatória', 'Matrizes', 'Determinantes'
  ],
  'Português': [
    'Interpretação de texto', 'Gramática', 'Literatura brasileira', 'Literatura portuguesa',
    'Figuras de linguagem', 'Variação linguística', 'Gêneros textuais', 'Sintaxe',
    'Morfologia', 'Semântica', 'Estilística', 'Redação dissertativa'
  ],
  'Biologia': [
    'Citologia', 'Genética', 'Ecologia', 'Evolução', 'Fisiologia humana',
    'Botânica', 'Zoologia', 'Biologia molecular', 'Biotecnologia', 'Imunologia'
  ],
  'Química': [
    'Química orgânica', 'Química inorgânica', 'Físico-química', 'Estequiometria',
    'Termoquímica', 'Eletroquímica', 'Cinética química', 'Equilíbrio químico',
    'Soluções', 'Radioatividade'
  ],
  'Física': [
    'Mecânica', 'Termodinâmica', 'Eletromagnetismo', 'Óptica', 'Ondas',
    'Física moderna', 'Eletrostática', 'Magnetismo', 'Hidrostática', 'Calorimetria'
  ],
  'História': [
    'História do Brasil', 'História Geral', 'Idade Média', 'Idade Moderna',
    'Idade Contemporânea', 'República brasileira', 'Era Vargas', 'Ditadura militar',
    'Revolução Industrial', 'Guerras mundiais'
  ],
  'Geografia': [
    'Geografia física', 'Geografia humana', 'Cartografia', 'Climatologia',
    'Geologia', 'Demografia', 'Urbanização', 'Globalização', 'Meio ambiente',
    'Geografia do Brasil'
  ],
  'Filosofia': [
    'Filosofia antiga', 'Filosofia medieval', 'Filosofia moderna', 'Filosofia contemporânea',
    'Ética', 'Política', 'Estética', 'Lógica', 'Epistemologia', 'Metafísica'
  ],
  'Sociologia': [
    'Sociologia clássica', 'Sociologia contemporânea', 'Movimentos sociais',
    'Estratificação social', 'Cultura', 'Globalização', 'Trabalho', 'Política',
    'Educação', 'Religião'
  ],
  'Redação': [
    'Estrutura dissertativa', 'Argumentação', 'Coesão e coerência', 'Repertório sociocultural',
    'Proposta de intervenção', 'Temas sociais', 'Direitos humanos', 'Meio ambiente',
    'Tecnologia', 'Educação'
  ]
};

const ebookRecommendations: Record<string, string[]> = {
  matematica: ['Aprendizagem Acelerada ENEM', 'Padrões do ENEM'],
  portugues: ['Modelo Coringa de Redação ENEM', 'Estratégias Secretas ENEM'],
  biologia: ['Kit Revisão Express ENEM 2025', 'Padrões do ENEM'],
  quimica: ['Kit Revisão Express ENEM 2025', 'Aprendizagem Acelerada ENEM'],
  fisica: ['Padrões do ENEM', 'Estratégias Secretas ENEM'],
  historia: ['Kit Revisão Express ENEM 2025', 'Estratégias Secretas ENEM'],
  geografia: ['Kit Revisão Express ENEM 2025', 'Padrões do ENEM'],
  filosofia: ['Estratégias Secretas ENEM', 'Kit Revisão Express ENEM 2025'],
  sociologia: ['Estratégias Secretas ENEM', 'Kit Revisão Express ENEM 2025'],
  redacao: ['Modelo Coringa de Redação ENEM']
};

const featureRecommendations: Record<string, string[]> = {
  concentracao: ['Flashcards', 'Cronograma Personalizado', 'Notificações Inteligentes'],
  tempo: ['Cronograma Personalizado', 'Simulados Rápidos', 'Revisão Express'],
  motivacao: ['Gamificação', 'Progresso Visual', 'Metas Diárias'],
  organizacao: ['Cronograma Personalizado', 'Checklist Essencial', 'Dashboard'],
  ansiedade: ['Simulados Graduais', 'Técnicas de Relaxamento', 'Preparação Mental'],
  disciplina: ['Notificações', 'Metas Diárias', 'Streak de Estudos'],
  material: ['E-books Premium', 'Banco de Questões', 'Videoaulas'],
  ambiente: ['Modo Offline', 'Áudio Explicativo', 'Estudo Móvel']
};

export class ScheduleGenerator {
  static generateSchedule(data: QuestionnaireData): GeneratedSchedule {
    const totalDays = this.calculateTotalDays(data.examDate);
    const studyDays = this.generateStudyDays(data, totalDays);
    
    return {
      totalDays,
      currentDay: 1,
      studyDays,
      weakSubjects: data.weakSubjects.map(s => subjectNames[s] || s),
      strongSubjects: data.strongSubjects?.map(s => subjectNames[s] || s) || [],
      studyHoursPerDay: data.studyTime,
      studyDaysPerWeek: data.studyDays,
      personalizedTips: this.generatePersonalizedTips(data),
      recommendedEbooks: this.getRecommendedEbooks(data),
      recommendedFeatures: this.getRecommendedFeatures(data)
    };
  }

  private static calculateTotalDays(examDate: string): number {
    const today = new Date();
    const exam = new Date(examDate);
    const diffTime = exam.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, Math.min(diffDays, 365)); // Entre 1 e 365 dias
  }

  private static generateStudyDays(data: QuestionnaireData, totalDays: number): StudyDay[] {
    const studyDays: StudyDay[] = [];
    const dailyHours = data.studyTime;
    const weeklyDays = data.studyDays;
    
    // Distribuição de tempo por matéria baseada no nível e dificuldades
    const subjectDistribution = this.calculateSubjectDistribution(data);
    
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date();
      date.setDate(date.getDate() + day - 1);
      
      // Pular fins de semana se necessário
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      if (isWeekend && weeklyDays < 7) {
        continue;
      }

      const daySubjects = this.generateDaySubjects(
        day, 
        data, 
        subjectDistribution, 
        dailyHours
      );

      studyDays.push({
        day,
        date: date.toISOString().split('T')[0],
        subjects: daySubjects,
        totalHours: dailyHours,
        completed: false,
        progress: 0,
        recommendations: this.generateDayRecommendations(data, daySubjects)
      });
    }

    return studyDays;
  }

  private static calculateSubjectDistribution(data: QuestionnaireData): Record<string, number> {
    const distribution: Record<string, number> = {};
    const weakSubjects = data.weakSubjects.map(s => subjectNames[s] || s);
    const strongSubjects = data.strongSubjects?.map(s => subjectNames[s] || s) || [];
    
    // Matérias fracas recebem mais tempo (40% do tempo total)
    const weakWeight = 0.4 / Math.max(weakSubjects.length, 1);
    weakSubjects.forEach(subject => {
      distribution[subject] = weakWeight;
    });
    
    // Matérias fortes recebem menos tempo (20% do tempo total)
    const strongWeight = 0.2 / Math.max(strongSubjects.length, 1);
    strongSubjects.forEach(subject => {
      distribution[subject] = strongWeight;
    });
    
    // Outras matérias dividem o tempo restante (40%)
    const allSubjects = Object.keys(subjectNames).map(s => subjectNames[s]);
    const otherSubjects = allSubjects.filter(s => 
      !weakSubjects.includes(s) && !strongSubjects.includes(s)
    );
    const otherWeight = 0.4 / Math.max(otherSubjects.length, 1);
    otherSubjects.forEach(subject => {
      distribution[subject] = otherWeight;
    });
    
    return distribution;
  }

  private static generateDaySubjects(
    day: number, 
    data: QuestionnaireData, 
    distribution: Record<string, number>,
    dailyHours: number
  ) {
    const subjects = [];
    const totalMinutes = dailyHours * 60;
    
    // Selecionar 2-4 matérias por dia baseado no tempo disponível
    const subjectsPerDay = Math.min(4, Math.max(2, Math.floor(dailyHours / 1.5)));
    
    // Priorizar matérias fracas nos primeiros 70% dos dias
    const priorityPhase = day <= (30 * 0.7);
    const sortedSubjects = Object.entries(distribution)
      .sort(([,a], [,b]) => priorityPhase ? b - a : a - b)
      .slice(0, subjectsPerDay);
    
    sortedSubjects.forEach(([subjectName, weight]) => {
      const duration = Math.round(totalMinutes * weight);
      const topics = this.getRandomTopics(subjectName, Math.ceil(duration / 30));
      
      subjects.push({
        name: subjectName,
        topics,
        duration,
        difficulty: this.getSubjectDifficulty(subjectName, data),
        priority: this.getSubjectPriority(subjectName, data),
        resources: this.getSubjectResources(subjectName, data)
      });
    });
    
    return subjects;
  }

  private static getRandomTopics(subjectName: string, count: number): string[] {
    const topics = topicsBySubject[subjectName] || [];
    const shuffled = [...topics].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, topics.length));
  }

  private static getSubjectDifficulty(
    subjectName: string, 
    data: QuestionnaireData
  ): 'easy' | 'medium' | 'hard' {
    const weakSubjects = data.weakSubjects.map(s => subjectNames[s] || s);
    const strongSubjects = data.strongSubjects?.map(s => subjectNames[s] || s) || [];
    
    if (weakSubjects.includes(subjectName)) return 'hard';
    if (strongSubjects.includes(subjectName)) return 'easy';
    return 'medium';
  }

  private static getSubjectPriority(
    subjectName: string, 
    data: QuestionnaireData
  ): 'high' | 'medium' | 'low' {
    const weakSubjects = data.weakSubjects.map(s => subjectNames[s] || s);
    const prioritySubjects = data.prioritySubjects?.map(s => subjectNames[s] || s) || [];
    
    if (weakSubjects.includes(subjectName) || prioritySubjects.includes(subjectName)) {
      return 'high';
    }
    return 'medium';
  }

  private static getSubjectResources(subjectName: string, data: QuestionnaireData) {
    const subjectKey = Object.keys(subjectNames).find(
      key => subjectNames[key] === subjectName
    ) || '';
    
    return {
      flashcards: data.useFlashcards,
      ebook: ebookRecommendations[subjectKey]?.[0],
      simulado: data.useSimulados,
      questoes: true,
      premium: data.usePremiumFeatures
    };
  }

  private static generateDayRecommendations(data: QuestionnaireData, subjects: any[]) {
    const ebooks = [...new Set(subjects
      .map(s => s.resources.ebook)
      .filter(Boolean)
    )];
    
    const features = [];
    if (data.useFlashcards) features.push('Flashcards');
    if (data.useSimulados) features.push('Simulados');
    if (data.useEbooks) features.push('E-books');
    
    const tips = this.generateDailyTips(data, subjects);
    
    return { ebooks, features, tips };
  }

  private static generateDailyTips(data: QuestionnaireData, subjects: any[]): string[] {
    const tips = [];
    
    // Dicas baseadas no período de estudo
    if (data.studyPeriod === 'manha') {
      tips.push('Comece com as matérias mais difíceis pela manhã quando sua mente está mais fresca');
    } else if (data.studyPeriod === 'noite') {
      tips.push('Faça uma revisão leve antes de dormir para fixar o conteúdo');
    }
    
    // Dicas baseadas no estilo de aprendizagem
    if (data.studyStyle === 'pratico') {
      tips.push('Foque em exercícios práticos e simulados para fixar o conteúdo');
    } else if (data.studyStyle === 'teorico') {
      tips.push('Dedique tempo extra para leitura e compreensão dos conceitos');
    }
    
    // Dicas baseadas nos desafios
    if (data.mainChallenges?.includes('concentracao')) {
      tips.push('Use a técnica Pomodoro: 25min de estudo + 5min de pausa');
    }
    
    if (data.mainChallenges?.includes('ansiedade')) {
      tips.push('Pratique exercícios de respiração antes de começar a estudar');
    }
    
    return tips;
  }

  private static generatePersonalizedTips(data: QuestionnaireData): string[] {
    const tips = [];
    
    // Dicas baseadas no nível
    if (data.currentLevel === 'iniciante') {
      tips.push('Foque primeiro nos conceitos básicos antes de partir para exercícios complexos');
      tips.push('Use flashcards para memorizar fórmulas e conceitos fundamentais');
    } else if (data.currentLevel === 'avancado') {
      tips.push('Concentre-se em simulados e questões de alta dificuldade');
      tips.push('Revise apenas os pontos onde ainda tem dúvidas');
    }
    
    // Dicas baseadas no tempo disponível
    if (data.studyTime < 3) {
      tips.push('Otimize seu tempo com técnicas de estudo ativo e revisão espaçada');
    } else if (data.studyTime > 6) {
      tips.push('Divida seu tempo de estudo em blocos para manter a concentração');
    }
    
    // Dicas baseadas na meta
    if (data.targetScore > 800) {
      tips.push('Para notas altas, foque em questões interdisciplinares e redação nota 1000');
    }
    
    return tips;
  }

  private static getRecommendedEbooks(data: QuestionnaireData): string[] {
    const ebooks = new Set<string>();
    
    // E-books baseados nas matérias fracas
    data.weakSubjects.forEach(subject => {
      const recommendations = ebookRecommendations[subject] || [];
      recommendations.forEach(ebook => ebooks.add(ebook));
    });
    
    // E-books essenciais baseados no nível
    if (data.currentLevel === 'iniciante') {
      ebooks.add('Aprendizagem Acelerada ENEM');
      ebooks.add('Kit Revisão Express ENEM 2025');
    }
    
    // E-book de redação se necessário
    if (data.weakSubjects.includes('redacao') || data.targetScore > 700) {
      ebooks.add('Modelo Coringa de Redação ENEM');
    }
    
    return Array.from(ebooks);
  }

  private static getRecommendedFeatures(data: QuestionnaireData): string[] {
    const features = new Set<string>();
    
    // Se selecionou "todos", adicionar todas as features premium
    if (data.usePremiumFeatures) {
      features.add('Flashcards Inteligentes');
      features.add('Simulados Cronometrados');
      features.add('E-books Interativos');
      features.add('Análise Avançada de Performance');
      features.add('Cronograma Adaptativo');
      features.add('Correção de Redação Premium');
      features.add('Banco de Questões Completo');
      features.add('Relatórios Detalhados');
    }
    
    // Features baseadas nos desafios
    data.mainChallenges?.forEach(challenge => {
      const recommendations = featureRecommendations[challenge] || [];
      recommendations.forEach(feature => features.add(feature));
    });
    
    // Features baseadas nas preferências
    if (data.useFlashcards) features.add('Flashcards Inteligentes');
    if (data.useSimulados) features.add('Simulados Cronometrados');
    if (data.useEbooks) features.add('E-books Interativos');
    
    // Features baseadas no nível
    if (data.currentLevel === 'iniciante') {
      features.add('Explicações Detalhadas');
      features.add('Progresso Visual');
    }
    
    return Array.from(features);
  }
}