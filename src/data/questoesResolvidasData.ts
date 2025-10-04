export interface QuestaoResolvida {
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
  explicacaoTecnica: {
    passos: string[];
    justificativa: string;
  };
  explicacaoLogica: {
    raciocinio: string[];
    dica: string;
  };
}

export const questoesResolvidas: QuestaoResolvida[] = [
  {
    numero: 1,
    materia: "Português",
    tema: "Interpretação de Texto",
    enunciado: "Nessa tirinha, o comportamento da mulher expressa",
    alternativas: {
      A: "revolta com a falta de sorte.",
      B: "gosto pela prática da leitura.",
      C: "receio pelo futuro do casamento.",
      D: "entusiasmo com os livros de terror.",
      E: "rejeição ao novo tipo de residência."
    },
    gabarito: "B",
    explicacaoTecnica: {
      passos: [
        "Identifique o gênero: Tirinha (texto misto: verbal + não-verbal)",
        "Analise o contexto: Observe as expressões faciais, gestos e falas",
        "Foque na ação principal: A mulher demonstra interesse pelos livros",
        "Elimine alternativas: Não há menção a azar (A), medo (C), terror (D) ou crítica à casa (E)",
        "Confirme: A resposta B está diretamente relacionada ao comportamento observado"
      ],
      justificativa: "O comportamento da personagem evidencia interesse genuíno pela leitura, manifestado através de suas ações e expressões na tirinha."
    },
    explicacaoLogica: {
      raciocinio: [
        "Observe o que a mulher ESTÁ FAZENDO: Olhando, pegando ou comentando sobre livros",
        "Descarte o óbvio: Se ela demonstra interesse pelos livros, não pode ser 'revolta' ou 'rejeição'",
        "Use eliminação: Terror (D) e casamento (C) precisariam aparecer na tirinha explicitamente",
        "Lógica simples: Se alguém se aproxima de livros de forma positiva = gosta de ler"
      ],
      dica: "Em questões de interpretação, a resposta geralmente está no que o personagem FAZ, não no que poderia estar pensando."
    }
  },
  {
    numero: 2,
    materia: "Inglês",
    tema: "Interpretação",
    enunciado: "A Teen's View of Social Media\n\nInstagram is made up of all photos and videos. [...] It has some downsides though. It is known to make many people feel insecure or down about themselves because the platform showcases the highlights of everyone's lives, while rarely showing the negatives. This can make one feel like their life is not going as well as others, contributing to the growing rates of anxiety or depression in many teens today.\n\nO termo 'downsides' introduz a ideia de que o Instagram é responsável por",
    alternativas: {
      A: "oferecer recursos de fotografia.",
      B: "divulgar problemas dos usuários.",
      C: "estimular aceitação dos seguidores.",
      D: "provocar ansiedade nos adolescentes.",
      E: "aproximar pessoas ao redor do mundo."
    },
    gabarito: "D",
    explicacaoTecnica: {
      passos: [
        "Traduza 'downsides': Aspectos negativos, desvantagens",
        "Identifique a função: 'Downsides' introduz os problemas do Instagram",
        "Localize as consequências: 'insecure', 'down', 'anxiety', 'depression'",
        "Conecte causa-efeito: Instagram → comparações → ansiedade em teens",
        "Confirme com o texto: 'contributing to growing rates of anxiety or depression in many teens'"
      ],
      justificativa: "O texto explicitamente menciona que o Instagram contribui para ansiedade e depressão em adolescentes."
    },
    explicacaoLogica: {
      raciocinio: [
        "Palavras-chave reconhecíveis: 'anxiety', 'depression', 'teens' (parecidas com português)",
        "Contexto das alternativas: Apenas D fala de 'provocar ansiedade nos adolescentes'",
        "Lógica da pergunta: Se 'downsides' são aspectos negativos, a resposta deve ser negativa",
        "Eliminação: A, C, E são efeitos positivos; B não combina com 'teens'"
      ],
      dica: "Quando não souber inglês, procure palavras similares ao português no texto e nas alternativas."
    }
  },
  {
    numero: 3,
    materia: "Inglês",
    tema: "Literatura",
    enunciado: "I tend the mobile now like an injured bird\nWe text, text, text our significant words.\nI re-read your first, your second, your third, Look for your small xx, feeling absurd.\nThe codes we send arrive with a broken chord.\nI try to picture your hands, their image is blurred.\nNothing my thumbs press will ever be heard.\n\nNesse poema de Carol Duffy, o eu lírico evidencia um sentimento de",
    alternativas: {
      A: "contentamento com a interação virtual.",
      B: "zelo com o envio de mensagens.",
      C: "preocupação com a composição de textos.",
      D: "mágoa com o comportamento de alguém.",
      E: "insatisfação com uma forma de comunicação."
    },
    gabarito: "E",
    explicacaoTecnica: {
      passos: [
        "Identifique o tom: Melancólico, frustrado ('injured bird', 'broken chord')",
        "Analise as metáforas: Celular como 'pássaro ferido' = algo que não funciona bem",
        "Observe a progressão: Cuidado excessivo → releitura compulsiva → frustração final",
        "Foque na última linha: 'Nothing... will ever be heard' = comunicação fracassada",
        "Sintetize: O problema não é com a pessoa, mas com o meio de comunicação"
      ],
      justificativa: "Todo o poema critica a superficialidade e ineficácia da comunicação digital."
    },
    explicacaoLogica: {
      raciocinio: [
        "Palavras reconhecíveis: 'mobile' (celular), 'text' (mensagem), 'broken' (quebrado)",
        "Tom das palavras: 'injured' (ferido), 'broken' (quebrado), 'blurred' (borrado) = negativo",
        "Lógica das alternativas: Se o tom é negativo, não pode ser contentamento (A) ou zelo (B)",
        "Eliminação: D (mágoa com pessoa) vs E (problema com comunicação)",
        "Contexto tecnológico: Poema fala de celular, então problema é com a tecnologia"
      ],
      dica: "Em poemas sobre tecnologia, geralmente há crítica ao meio, não às pessoas."
    }
  },
  {
    numero: 4,
    materia: "Inglês",
    tema: "Análise Textual",
    enunciado: "Two hundred years ago, Jane Austen lived in a world where single men boasted vast estates; single ladies were expected to speak several languages, sing and play the piano. [...] Dating apps opaquely outline the demands of today's relationship market; users ruminate long and hard over their choice of pictures and what they write in their biographies to hook in potential lovers [...]\n\nO texto aborda relações interpessoais com o objetivo de",
    alternativas: {
      A: "problematizar o papel de gênero em casamentos modernos.",
      B: "apontar a relevância da educação formal na escolha de parceiros.",
      C: "comparar a expectativa de parceiros amorosos em épocas distintas.",
      D: "discutir o uso de aplicativos para proporcionar encontros românticos.",
      E: "valorizar a importância da aparência física na seleção de pretendentes."
    },
    gabarito: "C",
    explicacaoTecnica: {
      passos: [
        "Identifique a estrutura: 'Two hundred years ago' → 'Dating apps' = comparação temporal",
        "Analise o contraste: Época de Jane Austen vs época atual",
        "Foque na similaridade: Ambas as épocas têm 'exigências' para relacionamentos",
        "Observe o propósito: Mostrar que as expectativas mudaram de forma, mas persistem",
        "Confirme: O texto compara duas épocas diferentes sobre o mesmo tema"
      ],
      justificativa: "A estrutura comparativa (passado vs presente) indica claramente o objetivo de contrastar épocas."
    },
    explicacaoLogica: {
      raciocinio: [
        "Estrutura temporal: 'Two hundred years ago' = há 200 anos (passado)",
        "Palavras modernas: 'Dating apps' = aplicativos de namoro (presente)",
        "Padrão de texto: Passado + presente = comparação",
        "Lógica das alternativas: Apenas C fala de 'épocas distintas'",
        "Eliminação: Outras alternativas focam em aspectos específicos, não comparação temporal"
      ],
      dica: "Quando o texto começa com data antiga e fala de tecnologia moderna, sempre é comparação entre épocas."
    }
  },
  {
    numero: 5,
    materia: "Inglês",
    tema: "Interpretação Cultural",
    enunciado: "As my official bio reads, I was made in Cuba, assembled in Spain, and imported to the United States [...] Although technically we lived in the United States, the Cuban community was culturally insular in Miami during the 1970s, bonded together by the trauma of exile. [...] I didn't grow up feeling different or treated as a minority. The few kids who got picked on in my grade school were the ones with freckles and funny last names like Dawson and O'Neil.\n\nAo relatar suas vivências, o autor destaca o(a)",
    alternativas: {
      A: "qualidade da educação formal em Miami.",
      B: "prestígio da cultura cubana nos Estados Unidos.",
      C: "oportunidade de qualificação profissional em Miami.",
      D: "cenário da integração de cubanos nos Estados Unidos.",
      E: "fortalecimento do elo familiar em comunidades estadunidenses."
    },
    gabarito: "D",
    explicacaoTecnica: {
      passos: [
        "Identifique o tema central: Experiência de imigrante cubano nos EUA",
        "Analise a 'integração invertida': Em Miami, cubanos eram maioria, americanos eram minoria",
        "Foque no contraste: Autor não se sentia minoritário, outros sim",
        "Observe o fenômeno: Comunidade cubana criou 'bolha cultural' em território americano",
        "Sintetize: Mostra como imigração cubana se integrou de forma particular nos EUA"
      ],
      justificativa: "O texto descreve um modelo específico de integração cultural cubana no contexto americano."
    },
    explicacaoLogica: {
      raciocinio: [
        "Palavras reconhecíveis: 'Cuba', 'Spain', 'United States', 'Miami', 'Cuban community'",
        "Lógica migratória: Cuba → Espanha → Estados Unidos = processo de imigração",
        "Contexto das alternativas: Apenas D fala de 'integração de cubanos nos Estados Unidos'",
        "Eliminação: A, C, E não se relacionam com o relato migratório",
        "Confirmação: B poderia confundir, mas não fala do processo de integração"
      ],
      dica: "Textos sobre experiência de imigrante sempre focam no processo de adaptação/integração."
    }
  }
];
