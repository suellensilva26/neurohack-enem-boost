import { useState, useEffect } from 'react'

interface Questao {
  id: number
  enunciado: string
  alternativas: string[]
  correctIndex: number
  explicacao?: string
  disciplina?: string
  dificuldade?: string
  source?: string
}

export const useQuestoesEnem = (limite: number = 150) => {
  const [questoes, setQuestoes] = useState<Questao[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const carregarQuestoes = async () => {
      console.log(`[useQuestoesEnem] Carregando ${limite} questões...`)
      setLoading(true)
      
      try {
        // Tentar carregar arquivo local
        const response = await fetch('/banco-enem.json')
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data = await response.json()
        
        if (!Array.isArray(data)) {
          throw new Error('Não é um array')
        }

        if (data.length === 0) {
          throw new Error('Arquivo vazio')
        }

        const questoesSelecionadas = data.slice(0, limite)
        
        console.log(`✅ [useQuestoesEnem] Carregou ${questoesSelecionadas.length} questões`)
        
        setQuestoes(questoesSelecionadas)
        setError(null)

      } catch (err: any) {
        console.error(`❌ [useQuestoesEnem] Erro: ${err.message}`)
        
        // Fallback com questões de teste
        const fallback: Questao[] = [
          {
            id: 1,
            enunciado: "TESTE: Arquivo banco-enem.json não encontrado",
            alternativas: ["A", "B", "C", "D"],
            correctIndex: 0,
            explicacao: "Adicione public/banco-enem.json",
            disciplina: "Teste",
            dificuldade: "fácil",
            source: "Fallback"
          }
        ]
        
        setQuestoes(fallback)
        setError('Usando fallback')
      } finally {
        setLoading(false)
      }
    }

    carregarQuestoes()
  }, [limite])

  return { questoes, loading, error }
}