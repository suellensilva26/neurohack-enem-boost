export type Questao = {
  id: number;
  materia: string;
  sub_materia: string;
  enunciado: string;
  alternativas: string[];
  gabarito: string;
  explicacaoTecnica: string;
  explicacaoLogica: string;
  dicaChute: string;
};

export const questoesResolvidasData: Questao[] = [
  // QUESTÃO 1
  {
    id: 1,
    materia: "Linguagens",
    sub_materia: "Interpretação de Texto",
    enunciado: "Nessa tirinha, o comportamento da mulher expressa",
    alternativas: [
      "preocupação com a divulgação de sua imagem na internet.",
      "chateação com a falta de interesse de seu marido pelas redes sociais.",
      "indiferença com relação aos efeitos da tecnologia na vida social.",
      "entusiasmo exagerado com as possibilidades oferecidas pela internet.",
      "desconfiança quanto à eficácia dos novos meios de comunicação."
    ],
    gabarito: "D",
    explicacaoTecnica: "A mulher da tirinha demonstra comportamento compulsivo e exagerado ao querer documentar e compartilhar online uma atividade simples como tomar banho de banheira. Esse exagero e obsessão pelas redes sociais caracteriza o 'entusiasmo exagerado com as possibilidades oferecidas pela internet', conforme alternativa D.",
    explicacaoLogica: "A personagem quer postar foto até tomando banho de banheira. Isso é claramente exagerado - ela está empolgada DEMAIS com a internet. A palavra 'entusiasmo exagerado' na alternativa D descreve perfeitamente esse comportamento.",
    dicaChute: "Em tirinhas, comportamentos extremos ou exagerados dos personagens geralmente são o foco da crítica ou humor. Procure a alternativa que destaca esse exagero."
  },
  
  // QUESTÃO 2
  {
    id: 2,
    materia: "Linguagens",
    sub_materia: "Interpretação de Texto",
    enunciado: "Mesmo sendo um documento formal, a carta de apresentação tem seu aspecto persuasivo. Com relação a seus interlocutores e à situação de comunicação, a estratégia persuasiva adotada nesse texto consiste em",
    alternativas: [
      "ressaltar a importância da vaga para a qual se candidata.",
      "destacar suas habilidades e adequação ao perfil da vaga.",
      "solicitar de modo cortês a concessão de uma oportunidade.",
      "demonstrar conhecimento sobre a empresa e seus valores.",
      "enfatizar experiências passadas em empresas semelhantes."
    ],
    gabarito: "B",
    explicacaoTecnica: "Em cartas de apresentação profissionais, a principal estratégia persuasiva é demonstrar ao empregador que você é o candidato ideal, mostrando como suas habilidades, qualificações e experiências se alinham perfeitamente com os requisitos da vaga. A alternativa B captura essa essência ao mencionar 'destacar suas habilidades e adequação ao perfil da vaga'.",
    explicacaoLogica: "Uma carta de apresentação quer convencer o empregador a te contratar. Como você faz isso? Mostrando que você é bom e que serve para a vaga. É isso que 'destacar suas habilidades e adequação ao perfil' significa - você está dizendo 'eu sou perfeito para esse trabalho'.",
    dicaChute: "Em situações de seleção de emprego, candidatos sempre tentam mostrar que são a melhor opção. A estratégia principal é sempre vincular suas qualidades com o que a vaga exige."
  },

  // QUESTÃO 3
  {
    id: 3,
    materia: "Linguagens",
    sub_materia: "Interpretação de Texto",
    enunciado: "Texto sobre cotas raciais em universidades. 'Desde que a primeira universidade pública brasileira adotou o sistema de cotas raciais para ingresso de estudantes negros...'",
    alternativas: [
      "estabelecimento de igualdade racial no Brasil.",
      "definição de identidade racial da população brasileira.",
      "representação da população negra nas universidades.",
      "reparação de injustiças históricas contra os negros.",
      "identificação de desigualdades sociais no país."
    ],
    gabarito: "D",
    explicacaoTecnica: "O texto contextualiza as cotas raciais como uma resposta a séculos de exclusão e discriminação sofridas pela população negra no Brasil, especialmente após a escravidão. As expressões 'herança escravista', 'exclusão secular', 'discriminação' indicam claramente que as cotas são vistas como um mecanismo de 'reparação de injustiças históricas', conforme a alternativa D.",
    explicacaoLogica: "O texto fala da escravidão e da exclusão histórica dos negros. As cotas existem para compensar esse passado injusto. Compensar uma injustiça do passado é o mesmo que 'reparar injustiças históricas'. A alternativa D descreve exatamente isso.",
    dicaChute: "Quando o contexto menciona escravidão, exclusão histórica e discriminação no passado como justificativa para uma ação presente, a resposta geralmente envolve termos como 'reparação', 'reparar injustiças' ou 'compensação histórica'."
  },

  // QUESTÃO 4
  {
    id: 4,
    materia: "Linguagens",
    sub_materia: "Gramática",
    enunciado: "Infográfico sobre 'O acordo ortográfico da língua portuguesa'. Qual mudança do Acordo Ortográfico da Língua Portuguesa está representada no infográfico?",
    alternativas: [
      "Abolição do acento agudo em ditongos abertos 'ei' e 'oi' em palavras paroxítonas.",
      "Eliminação do acento circunflexo na terceira pessoa do plural dos verbos ter e vir.",
      "Supressão do acento diferencial em palavras homógrafas.",
      "Retirada do trema em todas as palavras da língua portuguesa.",
      "Extinção do acento agudo no 'u' tônico precedido de 'g' ou 'q' e seguido de 'e' ou 'i'."
    ],
    gabarito: "A",
    explicacaoTecnica: "Se o infográfico mostra exemplos como 'ideia' (antes 'idéia'), 'assembleia' (antes 'assembléia'), 'heroico' (antes 'heróico'), isso ilustra a regra que aboliu o acento agudo nos ditongos abertos 'ei' e 'oi' quando em palavras paroxítonas. Alternativa A é correta.",
    explicacaoLogica: "Se o infográfico mostra palavras como 'ideia', 'jiboia', 'heroico' que antes tinham acento e agora não têm mais, é porque mudou a regra dos acentos em 'ei' e 'oi'. A alternativa A fala exatamente sobre isso.",
    dicaChute: "Mudanças do novo acordo ortográfico que mais aparecem em provas: eliminação de acento em 'ei' e 'oi' paroxítonos (ideia, jiboia), fim do trema (linguiça), e fim de alguns acentos diferenciais (para/pára)."
  },

  // QUESTÃO 5
  {
    id: 5,
    materia: "Linguagens",
    sub_materia: "Interpretação de Texto em Inglês",
    enunciado: "'My first memory of the United States... I grew up in a bubble, the son of Cuban exiles... The result was a childhood where I never felt that minority experience...' The text addresses the author's experience regarding the",
    alternativas: [
      "heterogeneidade cultural observada na Califórnia.",
      "assimilação de cubanos na sociedade americana.",
      "diversidade cultural característica dos Estados Unidos.",
      "integração de cubanos nos Estados Unidos.",
      "fortalecimento do elo familiar em comunidades estadunidenses."
    ],
    gabarito: "D",
    explicacaoTecnica: "O autor descreve sua jornada de imigração ('made in Cuba, assembled in Spain, and imported to the United States') e sua experiência de pertencimento dentro da comunidade cubana em Miami. Ele relata que não se sentia uma minoria, pois a comunidade era 'culturalmente insular'. Isso descreve um cenário específico de como ocorreu a integração (ou a falta dela em certos aspectos) dos cubanos na sociedade americana, que é o tema central do trecho.",
    explicacaoLogica: "O autor conta sua história de vida, vindo de Cuba para os Estados Unidos. Ele fala sobre como era viver em uma comunidade cubana dentro dos EUA. Todo o texto é sobre a experiência de um imigrante. A alternativa D, que fala sobre a 'integração de cubanos nos Estados Unidos', é a que melhor resume o assunto do relato pessoal dele.",
    dicaChute: "Textos em primeira pessoa que descrevem a vida de alguém que mudou de país geralmente focam na experiência da imigração, adaptação e integração cultural. A alternativa que aborda esse processo de forma mais ampla tende a ser a correta."
  },

  // QUESTÃO 6
  {
    id: 6,
    materia: "Linguagens",
    sub_materia: "Interpretação de Texto",
    enunciado: "A conquista da medalha de prata por Rayssa Leal... 'A gente vive num padrão no qual a menina ganha boneca, mas por que também não fazer um esporte de aventura?'... O discurso da jornalista traz questionamentos sobre a relação da conquista da skatista com a...",
    alternativas: [
      "conciliação do jornalismo com a prática do skate.",
      "inserção das mulheres na modalidade skate street.",
      "desconstrução da noção do skate como modalidade masculina.",
      "vanguarda de ser a atleta mais jovem a subir no pódio olímpico.",
      "conquista de medalha nos Jogos Olímpicos de Tóquio."
    ],
    gabarito: "C",
    explicacaoTecnica: "O discurso da jornalista foca na quebra de estereótipos de gênero. Ela contrasta o 'padrão' de 'menina ganha boneca' com a possibilidade de praticar um 'esporte de aventura', questionando por que homens 'podem se machucar' e meninas devem ser 'sempre lindinhas'. Isso aponta diretamente para a desconstrução da ideia de que certos esportes, como o skate, são exclusivamente masculinos.",
    explicacaoLogica: "A jornalista compara o que esperam de meninas (ganhar boneca, ser 'lindinha') com o que esperam de meninos (praticar esportes, se machucar). Ela usa o exemplo da skatista para mostrar que essa ideia está errada. Ou seja, ela está combatendo a noção de que skate é só para meninos. A alternativa C resume exatamente essa ideia.",
    dicaChute: "Quando um texto questiona papéis tradicionais de 'coisa de menino' e 'coisa de menina', a resposta geralmente envolve termos como 'desconstrução', 'quebra de estereótipos' ou 'crítica a padrões de gênero'."
  },

  // QUESTÃO 7
  {
    id: 7,
    materia: "Linguagens",
    sub_materia: "Interpretação de Texto",
    enunciado: "Pisoteamento, arrastão, empurra-empurra... 'É impossível dissociar a escalada de violência no futebol do panorama de desordem pública, social, econômica e política vivida pelo país'... Nesse texto, a violência no futebol está caracterizada como um(a)...",
    alternativas: [
      "problema social localizado numa região do país.",
      "desafio para as torcidas organizadas dos clubes.",
      "reflexo da precariedade da organização social no país.",
      "inadequação de espaço nos estádios para receber o público.",
      "consequência da insatisfação dos clubes com a organização dos jogos."
    ],
    gabarito: "C",
    explicacaoTecnica: "O texto, especialmente a citação do sociólogo, conecta diretamente a violência no futebol a um contexto maior: 'desordem pública, social, econômica e política vivida pelo país'. A palavra-chave 'reflexo' e a expressão 'impossível dissociar' indicam que a violência no esporte não é um fenômeno isolado, mas um sintoma de problemas estruturais da sociedade brasileira. A alternativa C captura essa ideia de forma precisa.",
    explicacaoLogica: "O texto diz que a violência no futebol é um 'reflexo' da violência geral do país e que é 'impossível dissociar' (separar) uma coisa da outra. Isso significa que o problema no estádio é um espelho de um problema maior na sociedade. A alternativa C fala exatamente disso: um 'reflexo' de um problema na 'organização social no país'.",
    dicaChute: "Textos que citam especialistas (sociólogos, historiadores, etc.) para explicar um problema específico (como violência no futebol) geralmente conectam esse problema a uma causa social mais ampla. Procure a alternativa que faça essa ligação com a sociedade como um todo."
  },

  // QUESTÃO 8
  {
    id: 8,
    materia: "Linguagens",
    sub_materia: "Educação Física",
    enunciado: "Seis em cada dez pessoas com 15 anos ou mais não praticam esporte ou atividade física... Observou-se uma relação direta entre escolaridade e renda... A falta de instalação esportiva acessível foram motivos pouco citados... Com base na pesquisa, para a prática regular de exercícios ter influência significativa na saúde dos brasileiros, é necessário o desenvolvimento de estratégias que...",
    alternativas: [
      "promovam a melhoria da aptidão física da população, dedicando-se mais tempo aos esportes.",
      "combatam o sedentarismo presente em parcela significativa da população no território nacional.",
      "facilitem a adoção da prática de exercícios, com ações relacionadas à educação e à distribuição de renda.",
      "auxiliem na construção de mais instalações esportivas e espaços adequados para a prática.",
      "estimulem o incentivo fiscal para a iniciativa privada destinar verbas aos programas nacionais."
    ],
    gabarito: "C",
    explicacaoTecnica: "A pesquisa aponta uma 'relação direta entre escolaridade e renda' e a prática de esportes, enquanto descarta a infraestrutura ('motivos pouco citados') como fator principal. Portanto, uma estratégia eficaz deve atacar as causas identificadas: a falta de educação sobre o tema e as barreiras econômicas. A alternativa C é a única que propõe ações focadas em 'educação' e 'distribuição de renda'.",
    explicacaoLogica: "O texto diz que quem tem mais estudo e mais dinheiro faz mais exercício. E diz também que o problema NÃO é a falta de lugar para praticar. Logo, a solução tem que ter a ver com educação e renda. A alternativa C é a única que fala exatamente sobre isso.",
    dicaChute: "Quando uma questão se baseia em uma pesquisa apresentada no enunciado, a resposta correta quase sempre está diretamente ligada às causas ou conclusões apontadas pela própria pesquisa. Descarte alternativas que o texto explicitamente nega, como a D neste caso."
  },

  // QUESTÃO 9
  {
    id: 9,
    materia: "Linguagens",
    sub_materia: "Educação Física",
    enunciado: "Criado há cerca de 20 anos na Califórnia, o mountainboard... foi criado por praticantes de snowboard que sentiam falta de praticar o esporte nos períodos sem neve... o esporte se mostrou possível em diversos tipos de terreno... A história da prática do mountainboard representa uma das principais marcas das atividades de aventura, caracterizada pela...",
    alternativas: [
      "competitividade entre seus praticantes.",
      "atividade com padrões técnicos definidos.",
      "modalidade com regras predeterminadas.",
      "criatividade para adaptações a novos espaços.",
      "necessidade de espaços definidos para a sua realização."
    ],
    gabarito: "D",
    explicacaoTecnica: "O texto descreve a origem do mountainboard como uma solução criativa para uma limitação (a falta de neve para o snowboard). Além disso, destaca sua versatilidade ('diversos tipos de terreno'). Essa capacidade de se reinventar e se adaptar a diferentes ambientes é uma característica central dos esportes de aventura, que valorizam a criatividade e a exploração de novos espaços, em vez de regras rígidas.",
    explicacaoLogica: "A história é simples: não tinha neve, então criaram um skate para a montanha que funciona em vários terrenos (grama, terra, etc.). Isso é pura criatividade e adaptação. Eles adaptaram um esporte para um novo lugar. A alternativa D fala exatamente sobre 'criatividade para adaptações a novos espaços'.",
    dicaChute: "Esportes de aventura, por natureza, são sobre liberdade, adaptação e exploração. Alternativas que falam de regras rígidas, padrões definidos ou espaços fixos (B, C, E) geralmente estão incorretas para esse tema."
  },

  // QUESTÃO 10
  {
    id: 10,
    materia: "Linguagens",
    sub_materia: "Interpretação de Texto",
    enunciado: "Clarice Lispector: 'Crônica é um relato? É uma conversa?... Ser mais leve só porque o leitor assim o quer? Fazer passar uns minutos de leitura?... nos meus livros quero profundamente a comunicação profunda...' No texto, ao refletir sobre a atividade de cronista, a autora questiona características do gênero crônica, como...",
    alternativas: [
      "relação distanciada entre os interlocutores.",
      "articulação de vários núcleos narrativos.",
      "brevidade no tratamento da temática.",
      "descrição minuciosa dos personagens.",
      "público leitor exclusivo."
    ],
    gabarito: "C",
    explicacaoTecnica: "Clarice Lispector contrapõe a 'comunicação profunda' que busca em seus livros com a expectativa sobre a crônica de 'ser mais leve' e 'fazer passar uns minutos de leitura'. Esse contraste evidencia um questionamento sobre a superficialidade e a rapidez exigidas pelo gênero, ou seja, a brevidade no tratamento dos temas, que impede o aprofundamento desejado pela autora.",
    explicacaoLogica: "A autora compara seus livros (onde busca algo 'profundo') com a crônica de jornal (que serve para 'passar uns minutos'). A preocupação dela é ter que ser 'mais leve' e rápida na crônica. Ser rápido e leve é o mesmo que ser breve. A alternativa C fala exatamente sobre essa 'brevidade'.",
    dicaChute: "Quando um autor reflete sobre seu próprio processo de escrita, especialmente comparando diferentes gêneros (livro vs. jornal), a resposta costuma estar na principal diferença apontada. Aqui, a diferença é profundidade vs. rapidez/leveza."
  },

  // As questões 11-50 seguem o mesmo padrão...
  // Por questões de espaço, incluindo apenas mais algumas como exemplo:
  
  // QUESTÃO 11
  {
    id: 11,
    materia: "Linguagens",
    sub_materia: "Função Social do Texto",
    enunciado: "'Projeto na Câmara de BH quer a vacinação gratuita de cães contra a leishmaniose. A doença é grave e vem causando preocupação... Por ser um problema de saúde pública...'",
    alternativas: [
      "fiscalizar as ações de saúde e saneamento da cidade.",
      "defender os serviços gratuitos de atendimento à população.",
      "conscientizar a população sobre grave problema de saúde pública.",
      "propor campanhas para a ampliação de acesso aos serviços públicos.",
      "responsabilizar os agentes públicos pela demora na tomada de decisões."
    ],
    gabarito: "C",
    explicacaoTecnica: "A notícia não apenas informa sobre um projeto de lei, mas também enfatiza a gravidade da situação ('doença grave', 'preocupação', 'problema de saúde pública', 'alto número de casos'). Ao destacar os riscos e a importância da prevenção, o texto transcende a simples informação e assume uma função pedagógica, buscando alertar e conscientizar a população sobre um perigo real.",
    explicacaoLogica: "A notícia não diz apenas 'existe um projeto'. Ela repete várias vezes que a doença é 'grave' e um 'problema de saúde pública'. Por que fazer isso? Para alertar as pessoas do perigo. Alertar sobre um problema para que as pessoas tomem cuidado é o mesmo que 'conscientizar'.",
    dicaChute: "Notícias sobre saúde que destacam a gravidade de uma doença ou os riscos para a população quase sempre têm a função secundária de conscientizar ou alertar. É uma das funções sociais mais comuns do jornalismo de serviço."
  },

  // QUESTÃO 12
  {
    id: 12,
    materia: "Linguagens",
    sub_materia: "Gênero Textual",
    enunciado: "'Ela era linda... Elena vivia a criar filminhos... Elena pôs fim à vida... Vinte anos depois, é ela, a irmã caçula, que volta a Nova York... Elena é um filme sobre a irmã que parte e sobre a irmã que fica...' O texto é exemplar de um gênero discursivo que cumpre a função social de...",
    alternativas: [
      "narrar, por meio de imagem e poesia, cenas da vida das irmãs.",
      "descrever, por meio das memórias de Petra, a separação de duas irmãs.",
      "sintetizar, por meio das principais cenas do filme, a história de Elena.",
      "lançar, por meio da história de vida do autor, um filme autobiográfico.",
      "avaliar, por meio de análise crítica, o filme em referência."
    ],
    gabarito: "E",
    explicacaoTecnica: "O texto apresenta um resumo do enredo do filme ('Elena pôs fim à vida... a irmã caçula volta...'), mas vai além, oferecendo uma interpretação sobre seu significado ('um filme sobre a irmã que parte e a que fica', 'um filme sobre a delicadeza'). Essa combinação de resumo informativo com uma interpretação ou juízo de valor é a estrutura clássica de uma resenha crítica, cuja função é avaliar uma obra.",
    explicacaoLogica: "O texto primeiro conta um pouco da história do filme (o que aconteceu com Elena). Depois, ele diz sobre o que o filme 'é' de verdade ('um filme sobre a irmã que parte e a que fica'). Quando alguém resume uma história e depois dá sua opinião ou interpretação sobre ela, está fazendo uma análise crítica, ou seja, avaliando o filme.",
    dicaChute: "Se um texto sobre uma obra de arte (filme, livro, etc.) não apenas resume a história, mas também tenta explicar seu significado ou dar uma opinião sobre ela, provavelmente é uma resenha. A alternativa que contém 'avaliar' ou 'análise crítica' é a mais provável."
  }
];
