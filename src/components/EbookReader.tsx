import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, ChevronLeft, ChevronRight, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Chapter {
  id: string;
  title: string;
  ord: number;
  ebook_id: string;
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  ord: number;
  chapter_id: string;
}

interface EbookReaderProps {
  ebookId: string;
}

export const EbookReader = ({ ebookId }: EbookReaderProps) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadChapters();
  }, [ebookId]);

  useEffect(() => {
    if (currentChapter) {
      loadLessons(currentChapter.id);
    }
  }, [currentChapter]);

  const loadChapters = async () => {
    try {
      const { data, error } = await supabase
        .from("chapters")
        .select("*")
        .eq("ebook_id", ebookId)
        .order("ord");

      if (error) throw error;
      
      setChapters(data || []);
      if (data && data.length > 0) {
        setCurrentChapter(data[0]);
      }
    } catch (error) {
      console.error("Error loading chapters:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadLessons = async (chapterId: string) => {
    try {
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("chapter_id", chapterId)
        .order("ord");

      if (error) throw error;
      
      setLessons(data || []);
      if (data && data.length > 0) {
        setCurrentLesson(data[0]);
      }
    } catch (error) {
      console.error("Error loading lessons:", error);
    }
  };

  const nextLesson = () => {
    if (!currentLesson) return;
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex < lessons.length - 1) {
      setCurrentLesson(lessons[currentIndex + 1]);
    }
  };

  const previousLesson = () => {
    if (!currentLesson) return;
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex > 0) {
      setCurrentLesson(lessons[currentIndex - 1]);
    }
  };

  const startQuiz = () => {
    if (currentLesson) {
      navigate(`/quiz/${currentLesson.id}`);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Carregando conteúdo...</div>;
  }

  if (chapters.length === 0) {
    return (
      <div className="card-premium text-center">
        <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">
          Conteúdo em breve. Estamos preparando material exclusivo para você!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar com capítulos */}
      <div className="lg:col-span-1">
        <div className="card-premium">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Capítulos
          </h3>
          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {chapters.map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => setCurrentChapter(chapter)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    currentChapter?.id === chapter.id
                      ? "bg-primary/20 text-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="text-sm font-medium">{chapter.title}</div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="lg:col-span-3">
        <div className="card-premium">
          {currentLesson ? (
            <>
              <h2 className="text-2xl font-bold mb-4">{currentLesson.title}</h2>
              <ScrollArea className="h-[500px] mb-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-foreground whitespace-pre-wrap">
                    {currentLesson.content || "Conteúdo em desenvolvimento..."}
                  </p>
                </div>
              </ScrollArea>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <Button
                  onClick={previousLesson}
                  variant="outline"
                  disabled={lessons.findIndex(l => l.id === currentLesson.id) === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Anterior
                </Button>

                <Button onClick={startQuiz} className="btn-premium">
                  <Target className="h-4 w-4 mr-2" />
                  Praticar
                </Button>

                <Button
                  onClick={nextLesson}
                  variant="outline"
                  disabled={lessons.findIndex(l => l.id === currentLesson.id) === lessons.length - 1}
                >
                  Próximo
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Selecione um capítulo para começar
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
