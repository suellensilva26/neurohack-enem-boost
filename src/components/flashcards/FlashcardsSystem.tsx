import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, Zap, CheckCircle, XCircle, Lock } from "lucide-react";
import { subjects, getFlashcardsBySubject, getRandomFlashcards, Flashcard, loadFlashcardsDataset, flashcardsData } from "@/data/flashcardsData";
import { RepeticaoEspacada } from "@/utils/sm2";
import { FlashcardVisual } from "./FlashcardVisual";
import { SeletorBlocos } from "./SeletorBlocos";
import { DashboardFlashcards } from "./DashboardFlashcards";
import { useToast } from "@/hooks/use-toast";
import { useFreemiumLimits } from "@/hooks/useFreemiumLimits";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ModoEstudo = 'Aprendizado' | 'Revisão' | 'Blitz' | 'Teste';

const DAILY_FREE_LIMIT = 30; // Limite gratuito de cards/dia

function getDailyKey() {
  const d = new Date();
  const key = `flashcards_daily_${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  return key;
}

export const FlashcardsSystem = () => {
  const { toast } = useToast();
  const { isPremium } = useFreemiumLimits();
  const [modo, setModo] = useState<ModoEstudo>('Aprendizado');
  const [blocoAtivo, setBlocoAtivo] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('todas');
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [mostrarResposta, setMostrarResposta] = useState(false);
  const [respostaCorreta, setRespostaCorreta] = useState<boolean | null>(null);
  const [botaoSelecionado, setBotaoSelecionado] = useState<'acertei' | 'errei' | null>(null);
  const [blitzTempo, setBlitzTempo] = useState(10 * 60); // 10 minutos em segundos
  const [usadosHoje, setUsadosHoje] = useState<number>(() => {
    const key = getDailyKey();
    const v = localStorage.getItem(key);
    return v ? parseInt(v) : 0;
  });
  const [streak, setStreak] = useState<number>(() => {
    const v = localStorage.getItem('flashcards_streak');
    return v ? parseInt(v) : 0;
  });

  const sm2 = useMemo(() => new RepeticaoEspacada(), []);
  useEffect(() => {
    // Carrega dataset externo e atualiza contagens
    loadFlashcardsDataset().then(() => {
      if (blocoAtivo) setBlocoAtivo(blocoAtivo);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const key = getDailyKey();
    localStorage.setItem(key, String(usadosHoje));
    // Atualiza streak se estudou pelo menos 1 card hoje
    if (usadosHoje > 0) {
      const today = new Date().toDateString();
      const lastDay = localStorage.getItem('flashcards_last_day');
      if (lastDay !== today) {
        const newStreak = streak + 1;
        const capped = isPremium ? newStreak : Math.min(newStreak, 7);
        setStreak(capped);
        localStorage.setItem('flashcards_last_day', today);
        localStorage.setItem('flashcards_streak', String(capped));
      }
    }
  }, [usadosHoje]);

  useEffect(() => {
    // Determina fonte dos cards conforme aba ativa
    const isTodas = activeTab === 'todas';
    const subjectId = blocoAtivo || undefined;

    if (!isTodas && !subjectId) return;

    if (modo === 'Aprendizado') {
      const base = isTodas ? flashcardsData : getFlashcardsBySubject(subjectId!);
      const novos = base.filter(c => !sm2.getProgress(c.id));
      setCards(novos.length ? novos.slice(0, 50) : getRandomFlashcards(20, subjectId));
    }
    if (modo === 'Revisão') {
      const base = isTodas ? flashcardsData : getFlashcardsBySubject(subjectId!);
      const dueIds = sm2.getDueCards(base.map(c => c.id));
      const due = base.filter(c => dueIds.includes(c.id));
      setCards(due.length ? due : getRandomFlashcards(10, subjectId));
    }
    if (modo === 'Blitz') {
      setCards(getRandomFlashcards(30, subjectId));
      setBlitzTempo(10 * 60);
    }
    if (modo === 'Teste') {
      setCards(getRandomFlashcards(20, subjectId));
    }
    setCardIndex(0);
    setMostrarResposta(false);
    setRespostaCorreta(null);
  }, [modo, blocoAtivo, sm2, activeTab]);

  useEffect(() => {
    let t: any;
    if (modo === 'Blitz') {
      t = setInterval(() => setBlitzTempo((s) => Math.max(0, s - 1)), 1000);
    }
    return () => t && clearInterval(t);
  }, [modo]);

  const verificarLimite = () => {
    if (isPremium) return false;
    if (usadosHoje >= DAILY_FREE_LIMIT) {
      toast({ title: 'Limite diário atingido', description: `Você usou ${usadosHoje}/${DAILY_FREE_LIMIT} cards hoje.`, variant: 'destructive' });
      return true;
    }
    return false;
  };

  const registrarUso = () => setUsadosHoje((v) => v + 1);

  const responder = (correta: boolean) => {
    const atual = cards[cardIndex];
    const quality = correta ? 4 : 2; // simplificação
    sm2.review(atual.id, quality);
    setRespostaCorreta(correta);
    setBotaoSelecionado(correta ? 'acertei' : 'errei');
    registrarUso();
  };

  const proximo = () => {
    if (verificarLimite()) return;
    setCardIndex((i) => (i + 1) % cards.length);
    setMostrarResposta(false);
    setRespostaCorreta(null);
    setBotaoSelecionado(null);
  };

  const iniciarTesteResposta = () => {
    setMostrarResposta(false);
  };

  const tempoLabel = `${Math.floor(blitzTempo / 60)}:${String(blitzTempo % 60).padStart(2, '0')}`;

  return (
    <div className="space-y-6">
      <DashboardFlashcards />
      {!isPremium && (
        <Card className="border-amber-300 bg-amber-50">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="text-sm">
              <div className="font-semibold">Plano Gratuito</div>
              <div className="text-muted-foreground">{DAILY_FREE_LIMIT} cards/dia, modos: Aprendizado, Revisão, Blitz. Streak máx. 7 dias.</div>
            </div>
            <Button size="sm">Upgrade R$297</Button>
          </CardContent>
        </Card>
      )}

      {/* Modos de estudo agora acima das matérias */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Modos de Estudo
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {(['Aprendizado','Revisão','Blitz','Teste'] as ModoEstudo[]).map((m) => (
            <Button
              key={m}
              variant={modo === m ? 'default' : 'outline'}
              size="sm"
              onClick={() => setModo(m)}
              disabled={!isPremium && m === 'Teste'}
            >
              {m}
              {!isPremium && m === 'Teste' && (
                <Lock className="h-4 w-4 ml-2 text-gold" />
              )}
            </Button>
          ))}
          {!isPremium && (
            <Badge variant="outline" className="ml-auto">Limite diário: {usadosHoje}/{DAILY_FREE_LIMIT}</Badge>
          )}
          {modo === 'Blitz' && (
              <Badge variant="secondary" className="ml-auto flex items-center gap-1">
                <Clock className="h-3 w-3" /> {tempoLabel}
              </Badge>
            )}
        </CardContent>
      </Card>

      {/* Área de estudo acima das matérias */}
      {(activeTab === 'todas' || blocoAtivo) && cards.length > 0 && (
        <Card className="border-primary/30">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Badge>{activeTab === 'todas' ? 'Todas' : subjects.find(s => s.id === blocoAtivo)?.name}</Badge>
              <span className="text-sm text-muted-foreground">{cardIndex + 1} de {cards.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <Badge variant="outline">Streak: {streak} dias</Badge>
              {!isPremium && <Badge variant="outline">Grátis</Badge>}
            </div>

            {modo === 'Teste' ? (
              <div className="space-y-4">
                <FlashcardVisual
                  key={cards[cardIndex].id}
                  question={cards[cardIndex].question}
                  answer={cards[cardIndex].answer}
                  difficulty={cards[cardIndex].difficulty}
                  onReveal={() => { /* no-op in Teste antes de responder */ }}
                />
                <div className="flex gap-3 justify-center">
                  <Button 
                    variant={botaoSelecionado === 'errei' ? 'default' : 'outline'} 
                    onClick={() => responder(false)}
                    className={botaoSelecionado === 'errei' ? 'bg-amber-500 hover:bg-amber-600 text-white ring-2 ring-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : ''}
                  >
                    <XCircle className="h-4 w-4 mr-2" /> Errei
                  </Button>
                  <Button 
                    variant={botaoSelecionado === 'acertei' ? 'default' : 'outline'} 
                    onClick={() => responder(true)}
                    className={botaoSelecionado === 'acertei' ? 'bg-amber-500 hover:bg-amber-600 text-white ring-2 ring-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : ''}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" /> Acertei
                  </Button>
                </div>
                <div className="flex justify-center">
                  <Button variant="ghost" onClick={proximo}>Próximo</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <FlashcardVisual
                  key={cards[cardIndex].id}
                  question={cards[cardIndex].question}
                  answer={cards[cardIndex].answer}
                  difficulty={cards[cardIndex].difficulty}
                  hint={cards[cardIndex].hint ?? cards[cardIndex].explanation}
                  onReveal={() => {
                    if (!verificarLimite()) setMostrarResposta(true);
                  }}
                />
                {mostrarResposta && (
                  <div className="flex gap-3 justify-center">
                    <Button 
                      variant={botaoSelecionado === 'errei' ? 'default' : 'outline'} 
                      onClick={() => responder(false)}
                      className={botaoSelecionado === 'errei' ? 'bg-amber-500 hover:bg-amber-600 text-white ring-2 ring-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : ''}
                    >
                      <XCircle className="h-4 w-4 mr-2" /> Errei
                    </Button>
                    <Button 
                      variant={botaoSelecionado === 'acertei' ? 'default' : 'outline'} 
                      onClick={() => responder(true)}
                      className={botaoSelecionado === 'acertei' ? 'bg-amber-500 hover:bg-amber-600 text-white ring-2 ring-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : ''}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" /> Acertei
                    </Button>
                    <Button variant="ghost" onClick={proximo}>Próximo</Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Abas de matérias posicionadas abaixo do estudo */}
      <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setBlocoAtivo(v === 'todas' ? null : v); }}>
        <TabsList className="flex gap-2 overflow-x-auto whitespace-nowrap -mx-2 px-2 sm:flex-wrap">
          <TabsTrigger 
            value="todas" 
            className="flex-shrink-0 px-3 py-2 h-10 text-sm rounded-full data-[state=active]:ring-2 data-[state=active]:ring-amber-400 data-[state=active]:shadow-[0_0_10px_rgba(245,158,11,0.5)]"
          >
            Todas
          </TabsTrigger>
          {subjects.map((s) => (
            <TabsTrigger
              key={s.id}
              value={s.id}
              className="flex-shrink-0 px-3 py-2 h-10 text-sm rounded-full data-[state=active]:ring-2 data-[state=active]:ring-amber-400 data-[state=active]:shadow-[0_0_10px_rgba(245,158,11,0.5)]"
            >
              {s.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Seletor de blocos com destaque da matéria selecionada */}
      <SeletorBlocos onSelect={(id) => { setActiveTab(id); setBlocoAtivo(id); }} selectedSubjectId={blocoAtivo ?? undefined} />

    </div>
  );
};