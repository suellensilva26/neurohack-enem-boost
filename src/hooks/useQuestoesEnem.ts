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
        const fontes: { url: string; tipo: 'banco' | 'recorrentes' }[] = [
          { url: '/banco-enem.json', tipo: 'banco' },
          { url: '/questoes-recorrentes.json', tipo: 'recorrentes' },
        ]

        const acumulado: Questao[] = []

        for (const fonte of fontes) {
          try {
            const resp = await fetch(fonte.url)
            if (!resp.ok) continue
            const raw = await resp.json()
            if (!Array.isArray(raw)) continue

            const normalizados: Questao[] = raw
              .map((item: any, idx: number) => {
                // Detecta formato do banco principal
                if (
                  typeof item.enunciado === 'string' &&
                  Array.isArray(item.alternativas) &&
                  typeof item.correctIndex === 'number'
                ) {
                  return {
                    id: Number(item.id ?? idx + 1),
                    enunciado: item.enunciado,
                    alternativas: item.alternativas,
                    correctIndex: item.correctIndex,
                    explicacao: item.explicacao ?? '',
                    disciplina: item.disciplina ?? '',
                    dificuldade: item.dificuldade ?? '',
                    source: fonte.tipo,
                  } as Questao
                }

                // Detecta formato de questoes-recorrentes.json
                if (
                  typeof item.questao === 'string' &&
                  Array.isArray(item.alternativas) &&
                  typeof item.gabarito === 'number'
                ) {
                  return {
                    id: Number(item.id ?? idx + 1),
                    enunciado: item.questao,
                    alternativas: item.alternativas,
                    correctIndex: item.gabarito,
                    explicacao: item.explicacao ?? '',
                    disciplina: item.disciplina ?? '',
                    dificuldade: item.dificuldade ?? '',
                    source: fonte.tipo,
                  } as Questao
                }

                return null
              })
              .filter((q: Questao | null) => !!q)
              .filter((q: Questao) => Array.isArray(q.alternativas) && q.alternativas.length === 5)

            acumulado.push(...normalizados)
          } catch {
            // Ignora fonte não disponível
          }
        }

        // Remove duplicados por id + enunciado
        const vistos = new Set<string>()
        const unicos = acumulado.filter((q) => {
          const key = `${q.id}|${q.enunciado.substring(0, 80)}`
          if (vistos.has(key)) return false
          vistos.add(key)
          return true
        })

        // Se insuficiente, preenche até 'limite' reciclando questões válidas
        const preenchidos: Questao[] = []
        if (unicos.length === 0) {
          throw new Error('Nenhuma questão válida nas fontes locais')
        }

        for (let i = 0; i < limite; i++) {
          const base = unicos[i % unicos.length]
          preenchidos.push({
            ...base,
            id: i + 1, // id sequencial para evitar colisão
            source: base.source ?? 'local',
          })
        }

        console.log(`✅ [useQuestoesEnem] Disponíveis ${unicos.length}; preenchidas ${preenchidos.length}`)
        setQuestoes(preenchidos)
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