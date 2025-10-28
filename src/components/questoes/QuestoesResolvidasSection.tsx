import { useState, useEffect } from 'react'
import { useQuestoesEnem } from '@/hooks/useQuestoesEnem'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Brain, GraduationCap, CheckCircle2, XCircle, ChevronRight, ChevronLeft } from 'lucide-react'

export default function QuestoesResolvidasSection() {
  const { questoes, loading, error } = useQuestoesEnem(50)
  const [indiceAtual, setIndiceAtual] = useState(0)
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null)
  const [mostrarExplicacao, setMostrarExplicacao] = useState(false)

  // Reset quando mudar de questão
  useEffect(() => {
    setRespostaSelecionada(null)
    setMostrarExplicacao(false)
  }, [indiceAtual])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-lg">⏳ Carregando 50 questões...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded">
        <p className="text-red-700 font-bold mb-2">⚠️ Aviso:</p>
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (!questoes || questoes.length === 0) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded">
        <p className="text-yellow-700 font-bold mb-2">📋 Nenhuma questão encontrada</p>
        <p className="text-yellow-600">Verifique se o arquivo banco-enem.json existe e contém questões válidas.</p>
      </div>
    )
  }

  const questaoAtual = questoes[indiceAtual]
  const isCorrect = respostaSelecionada === questaoAtual.correctIndex

  const handleSelectAnswer = (index: number) => {
    if (!mostrarExplicacao) {
      setRespostaSelecionada(index)
    }
  }

  const handleConfirm = () => {
    setMostrarExplicacao(true)
  }

  const handleNext = () => {
    if (indiceAtual < questoes.length - 1) {
      setIndiceAtual(indiceAtual + 1)
    }
  }

  const handlePrevious = () => {
    if (indiceAtual > 0) {
      setIndiceAtual(indiceAtual - 1)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="text-sm">
          Questão {indiceAtual + 1} de {questoes.length}
        </Badge>
        <Badge variant="secondary">{questaoAtual.disciplina}</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Questão {questaoAtual.id} - {questaoAtual.disciplina}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-line text-foreground">{questaoAtual.enunciado}</p>
          </div>

          <div className="space-y-3">
            {questaoAtual.alternativas.map((alternativa, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={mostrarExplicacao}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  mostrarExplicacao && index === questaoAtual.correctIndex
                    ? "border-green-500 bg-green-50 dark:bg-green-950"
                    : mostrarExplicacao && index === respostaSelecionada && !isCorrect
                    ? "border-red-500 bg-red-50 dark:bg-red-950"
                    : respostaSelecionada === index
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                } ${mostrarExplicacao ? "cursor-default" : "cursor-pointer"}`}
              >
                <div className="flex items-start gap-3">
                  <span className="font-bold text-lg">{String.fromCharCode(65 + index)})</span>
                  <span className="flex-1">{alternativa}</span>
                  {mostrarExplicacao && index === questaoAtual.correctIndex && (
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                  )}
                  {mostrarExplicacao && index === respostaSelecionada && !isCorrect && (
                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {!mostrarExplicacao && respostaSelecionada !== null && (
            <Button onClick={handleConfirm} className="w-full" size="lg">
              Confirmar Resposta
            </Button>
          )}

          {mostrarExplicacao && (
            <div className="space-y-6 mt-6">
              <Separator />
              
              <div className={`p-4 rounded-lg ${isCorrect ? "bg-green-50 dark:bg-green-950" : "bg-red-50 dark:bg-red-950"}`}>
                <p className="font-semibold flex items-center gap-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-green-700 dark:text-green-300">Resposta Correta!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-600" />
                      <span className="text-red-700 dark:text-red-300">
                        Resposta Incorreta. A alternativa correta é: {String.fromCharCode(65 + questaoAtual.correctIndex)}
                      </span>
                    </>
                  )}
                </p>
              </div>

              {/* Explicação */}
              {questaoAtual.explicacao && (
                <Card className="border-primary/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      Explicação
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{questaoAtual.explicacao}</p>
                  </CardContent>
                </Card>
              )}

              {/* Informações adicionais */}
              <div className="flex flex-wrap gap-2">
                {questaoAtual.dificuldade && (
                  <Badge variant="outline">
                    Dificuldade: {questaoAtual.dificuldade}
                  </Badge>
                )}
                {questaoAtual.source && (
                  <Badge variant="outline">
                    Fonte: {questaoAtual.source}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handlePrevious}
              disabled={indiceAtual === 0}
              variant="outline"
              className="flex-1"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Anterior
            </Button>
            <Button
              onClick={handleNext}
              disabled={indiceAtual === questoes.length - 1}
              className="flex-1"
            >
              Próxima
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
