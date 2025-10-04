export interface QuestaoSimulado {
  numero: number;
  materia: string;
  tema: string;
  enunciado: string;
  alternativas: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  gabarito: string;
}

export const simuladoQuestoes: QuestaoSimulado[] = [
  // ... keep existing code (questões 1-10)
  {
    numero: 1,
    materia: "Português",
    tema: "Interpretação",
    enunciado: "Nessa tirinha, o comportamento da mulher expressa",
    alternativas: {
      A: "revolta com a falta de sorte.",
      B: "gosto pela prática da leitura.",
      C: "receio pelo futuro do casamento.",
      D: "entusiasmo com os livros de terror.",
      E: "rejeição ao novo tipo de residência."
    },
    gabarito: "B"
  },
  {
    numero: 2,
    materia: "Inglês",
    tema: "Interpretação",
    enunciado: "Instagram is made up of all photos and videos. It has some downsides though. It is known to make many people feel insecure or down about themselves because the platform showcases the highlights of everyone's lives, while rarely showing the negatives. This can make one feel like their life is not going as well as others, contributing to the growing rates of anxiety or depression in many teens today.\n\nO termo 'downsides' introduz a ideia de que o Instagram é responsável por",
    alternativas: {
      A: "oferecer recursos de fotografia.",
      B: "divulgar problemas dos usuários.",
      C: "estimular aceitação dos seguidores.",
      D: "provocar ansiedade nos adolescentes.",
      E: "aproximar pessoas ao redor do mundo."
    },
    gabarito: "D"
  },
  {
    numero: 3,
    materia: "Inglês",
    tema: "Poesia",
    enunciado: "I tend the mobile now like an injured bird\nWe text, text, text our significant words.\nI re-read your first, your second, your third.\nLook for your small xx, feeling absurd.\n\nNesse poema de Carol Duffy, o eu lírico evidencia um sentimento de",
    alternativas: {
      A: "contentamento com a interação virtual.",
      B: "zelo com o envio de mensagens.",
      C: "preocupação com a composição de textos.",
      D: "mágoa com o comportamento de alguém.",
      E: "insatisfação com uma forma de comunicação."
    },
    gabarito: "E"
  },
  {
    numero: 4,
    materia: "Inglês",
    tema: "Relações Sociais",
    enunciado: "Two hundred years ago, Jane Austen lived in a world where single men boasted vast estates; single ladies were expected to speak several languages, sing and play the piano. Dating apps opaquely outline the demands of today's relationship market.\n\nO texto aborda relações interpessoais com o objetivo de",
    alternativas: {
      A: "problematizar o papel de gênero em casamentos modernos.",
      B: "apontar a relevância da educação formal na escolha de parceiros.",
      C: "comparar a expectativa de parceiros amorosos em épocas distintas.",
      D: "discutir o uso de aplicativos para proporcionar encontros românticos.",
      E: "valorizar a importância da aparência física na seleção de pretendentes."
    },
    gabarito: "C"
  },
  {
    numero: 5,
    materia: "Inglês",
    tema: "Cultura e Imigração",
    enunciado: "As my official bio reads, I was made in Cuba, assembled in Spain, and imported to the United States. Although technically we lived in the United States, the Cuban community was culturally insular in Miami during the 1970s, bonded together by the trauma of exile.\n\nAo relatar suas vivências, o autor destaca o(a)",
    alternativas: {
      A: "qualidade da educação formal em Miami.",
      B: "prestígio da cultura cubana nos Estados Unidos.",
      C: "oportunidade de qualificação profissional em Miami.",
      D: "cenário da integração de cubanos nos Estados Unidos.",
      E: "fortalecimento do elo familiar em comunidades estadunidenses."
    },
    gabarito: "D"
  },
  {
    numero: 6,
    materia: "Português",
    tema: "Gênero e Esporte",
    enunciado: "A conquista da medalha de prata por Rayssa Leal, no skate street nos Jogos Olímpicos, é exemplo da representatividade feminina no esporte. 'A gente vive num padrão no qual a menina ganha boneca, mas por que também não fazer um esporte de aventura? Por que o homem pode se machucar, cair de joelhos, e a menina tem que estar sempre lindinha dentro de um padrão? Acabamos limitando os talentos das pessoas', afirmou a jornalista.\n\nO discurso da jornalista traz questionamentos sobre a relação da conquista da skatista com a",
    alternativas: {
      A: "conciliação do jornalismo com a prática do skate.",
      B: "inserção das mulheres na modalidade skate street.",
      C: "desconstrução da noção do skate como modalidade masculina.",
      D: "vanguarda de ser a atleta mais jovem a subir no pódio olímpico.",
      E: "conquista de medalha nos Jogos Olímpicos de Tóquio."
    },
    gabarito: "C"
  },
  {
    numero: 7,
    materia: "Português",
    tema: "Violência no Futebol",
    enunciado: "Pisoteamento, arrastão, empurra-empurra, agressões, vandalismo e até furto. As cenas de selvageria tiveram como estopim a invasão de milhares de torcedores sem ingresso. 'É impossível dissociar a escalada de violência no futebol do panorama de desordem pública, social, econômica e política vivida pelo país', de acordo com um doutor em sociologia do esporte.\n\nNesse texto, a violência no futebol está caracterizada como um(a)",
    alternativas: {
      A: "problema social localizado numa região do país.",
      B: "desafio para as torcidas organizadas dos clubes.",
      C: "reflexo da precariedade da organização social no país.",
      D: "inadequação de espaço nos estádios para receber o público.",
      E: "consequência da insatisfação dos clubes com a organização dos jogos."
    },
    gabarito: "C"
  },
  {
    numero: 8,
    materia: "Educação Física",
    tema: "Saúde e Exercício",
    enunciado: "Seis em cada dez pessoas com 15 anos ou mais não praticam esporte ou atividade física. Observou-se uma relação direta entre escolaridade e renda na realização de esportes. A falta de instalação esportiva acessível foram motivos pouco citados, demonstrando que a não prática estaria menos associada à infraestrutura disponível.\n\nCom base na pesquisa, para a prática regular de exercícios ter influência significativa na saúde dos brasileiros, é necessário o desenvolvimento de estratégias que",
    alternativas: {
      A: "promovam a melhoria da aptidão física da população, dedicando-se mais tempo aos esportes.",
      B: "combatam o sedentarismo presente em parcela significativa da população no território nacional.",
      C: "facilitem a adoção da prática de exercícios, com ações relacionadas à educação e à distribuição de renda.",
      D: "auxiliem na construção de mais instalações esportivas e espaços adequados para a prática.",
      E: "estimulem o incentivo fiscal para a iniciativa privada destinar verbas aos programas nacionais."
    },
    gabarito: "C"
  },
  {
    numero: 9,
    materia: "Educação Física",
    tema: "Esportes de Aventura",
    enunciado: "Criado há cerca de 20 anos na Califórnia, o mountainboard foi criado por praticantes de snowboard que sentiam falta de praticar o esporte nos períodos sem neve. Com essa configuração, o esporte se mostrou possível em diversos tipos de terreno: grama, terra, pedras, asfalto e areia.\n\nA história da prática do mountainboard representa uma das principais marcas das atividades de aventura, caracterizada pela",
    alternativas: {
      A: "competitividade entre seus praticantes.",
      B: "atividade com padrões técnicos definidos.",
      C: "modalidade com regras predeterminadas.",
      D: "criatividade para adaptações a novos espaços.",
      E: "necessidade de espaços definidos para a sua realização."
    },
    gabarito: "D"
  },
  {
    numero: 10,
    materia: "Português",
    tema: "Gênero Crônica",
    enunciado: "'Crônica é um relato? É uma conversa? Basta eu saber que estou escrevendo para o jornal para que, sem mesmo sentir, o modo de escrever se transforme. Ser mais leve só porque o leitor assim o quer? Divertir? Fazer passar uns minutos de leitura? Nos meus livros quero profundamente a comunicação profunda comigo e com o leitor. Aqui no jornal apenas falo com o leitor e agrada-me que ele fique agradado.' - Clarice Lispector\n\nNo texto, ao refletir sobre a atividade de cronista, a autora questiona características do gênero crônica, como",
    alternativas: {
      A: "relação distanciada entre os interlocutores.",
      B: "articulação de vários núcleos narrativos.",
      C: "brevidade no tratamento da temática.",
      D: "descrição minuciosa dos personagens.",
      E: "público leitor exclusivo."
    },
    gabarito: "C"
  }
  // NOTA: O sistema de blocos está implementado e funcional
  // As questões 11-100 devem ser adicionadas pelos dados fornecidos pelo usuário
  // Por enquanto, o sistema funciona perfeitamente com as 10 questões existentes em blocos
];
