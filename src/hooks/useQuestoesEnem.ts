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
      console.log(`🔄 Tentando carregar ${limite} questões...`)
      
      try {
        // PRIORIDADE 1: Tentar carregar do arquivo local
        let response = await fetch('/banco-enem.json')

        if (!response.ok) {
          throw new Error(`Arquivo não encontrado: ${response.status}`)
        }

        let data = await response.json()

        if (!Array.isArray(data)) {
          throw new Error('Formato inválido: esperado array')
        }

        console.log(`✅ Carregou ${data.length} questões do arquivo local`)

        // Normalizar estrutura e garantir campos obrigatórios
        const normalizadas: Questao[] = data.map((q: any, i: number) => ({
          id: typeof q.id === 'number' ? q.id : Number(q.id ?? i + 1),
          enunciado: q.enunciado ?? q.question ?? `Questão ${i + 1}: conteúdo indisponível`,
          alternativas: Array.isArray(q.alternativas)
            ? q.alternativas
            : Array.isArray(q.alternatives)
            ? q.alternatives
            : ["A", "B", "C", "D", "E"].map((letra, idx) => `Alternativa ${letra} da questão ${i + 1}`),
          correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : (typeof q.gabarito === 'number' ? q.gabarito : 0),
          explicacao: q.explicacao ?? q.explicacaoTecnica ?? '',
          disciplina: q.disciplina ?? q.materia ?? 'Geral',
          dificuldade: q.dificuldade ?? q.sub_materia ?? 'média',
          source: q.source ?? 'Local'
        }))

        // Se arquivo tiver menos que limite, completar com fallback
        const faltantes = Math.max(0, limite - normalizadas.length)
        const geradas: Questao[] = faltantes > 0
          ? Array.from({ length: faltantes }, (_, j) => {
              const k = normalizadas.length + j + 1
              return {
                id: k,
                enunciado: `Questão ${k}: Esta é uma questão de demonstração gerada para completar ${limite}.`,
                alternativas: ["A","B","C","D","E"].map((letra) => `Alternativa ${letra} da questão ${k}`),
                correctIndex: Math.floor(Math.random() * 5),
                explicacao: `Explicação de demonstração para a questão ${k}.`,
                disciplina: ['Matemática', 'Física', 'Química', 'Biologia', 'História'][j % 5],
                dificuldade: ['fácil', 'média', 'difícil'][j % 3],
                source: 'Demonstração'
              }
            })
          : []

        const completas = [...normalizadas, ...geradas].slice(0, limite)
        setQuestoes(completas)
        setError(null)

      } catch (err) {
        console.error('❌ Erro ao carregar local:', err)
        
        // FALLBACK: Criar questões de demonstração
        console.log('🔄 Usando questões de fallback...')
        
        // Tentar fallback secundário: questoes-recorrentes.json
        try {
          const resp2 = await fetch('/questoes-recorrentes.json')
          if (resp2.ok) {
            const data2 = await resp2.json()
            if (Array.isArray(data2) && data2.length > 0) {
              const norm2: Questao[] = data2.map((q: any, i: number) => ({
                id: typeof q.id === 'number' ? q.id : Number(q.id ?? i + 1),
                enunciado: q.enunciado ?? q.questao ?? `Questão ${i + 1}: conteúdo indisponível`,
                alternativas: Array.isArray(q.alternativas) ? q.alternativas : ["A","B","C","D","E"].map((letra, idx) => `Alternativa ${letra} da questão ${i + 1}`),
                correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : (typeof q.gabarito === 'number' ? q.gabarito : 0),
                explicacao: q.explicacao ?? '',
                disciplina: q.disciplina ?? 'Geral',
                dificuldade: q.dificuldade ?? 'média',
                source: 'Recorrentes'
              }))

              const faltantes2 = Math.max(0, limite - norm2.length)
              const geradas2: Questao[] = Array.from({ length: faltantes2 }, (_, j) => {
                const k = norm2.length + j + 1
                return {
                  id: k,
                  enunciado: `Questão ${k}: Esta é uma questão de demonstração gerada para completar ${limite}.`,
                  alternativas: ["A","B","C","D","E"].map((letra) => `Alternativa ${letra} da questão ${k}`),
                  correctIndex: Math.floor(Math.random() * 5),
                  explicacao: `Explicação de demonstração para a questão ${k}.`,
                  disciplina: ['Matemática', 'Física', 'Química', 'Biologia', 'História'][j % 5],
                  dificuldade: ['fácil', 'média', 'difícil'][j % 3],
                  source: 'Demonstração'
                }
              })

              const completas2 = [...norm2, ...geradas2].slice(0, limite)
              setQuestoes(completas2)
              setError('Usando questões recorrentes como fallback. Adicione banco-enem.json para carregar as questões reais.')
              return
            }
          }
        } catch {}

        const questoesFallback: Questao[] = Array.from({ length: limite }, (_, i) => ({
          id: i + 1,
          enunciado: `Questão ${i + 1}: Esta é uma questão de demonstração. O conteúdo completo será carregado do arquivo banco-enem.json.`,
          alternativas: [
            `Alternativa A da questão ${i + 1}`,
            `Alternativa B da questão ${i + 1}`,
            `Alternativa C da questão ${i + 1}`,
            `Alternativa D da questão ${i + 1}`,
            `Alternativa E da questão ${i + 1}`
          ],
          correctIndex: Math.floor(Math.random() * 5),
          explicacao: `Esta é uma explicação de demonstração para a questão ${i + 1}.`,
          disciplina: ['Matemática', 'Física', 'Química', 'Biologia', 'História'][i % 5],
          dificuldade: ['fácil', 'média', 'difícil'][i % 3],
          source: 'Demonstração'
        }))

        setQuestoes(questoesFallback)
        setError('Usando questões de demonstração. Adicione banco-enem.json para carregar as questões reais.')
      } finally {
        setLoading(false)
      }
    }

    carregarQuestoes()
  }, [limite])

  return { questoes, loading, error }
}