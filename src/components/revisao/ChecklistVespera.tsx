import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, FileText, Utensils, Brain } from "lucide-react";
import { useState } from "react";

export function ChecklistVespera() {
  const [checkedItems, setCheckedItems] = useState<string[]>(() => {
    const saved = localStorage.getItem("revisao-checklist-vespera");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleItem = (item: string) => {
    const newChecked = checkedItems.includes(item)
      ? checkedItems.filter(i => i !== item)
      : [...checkedItems, item];
    setCheckedItems(newChecked);
    localStorage.setItem("revisao-checklist-vespera", JSON.stringify(newChecked));
  };

  const sections = [
    {
      title: "DOCUMENTAÇÃO",
      icon: FileText,
      items: [
        "RG original em bom estado (verificar 3 vezes)",
        "CPF (caso RG não tenha)",
        "Cartão de confirmação de inscrição impresso",
        "Comprovante de pagamento (se aplicável)"
      ]
    },
    {
      title: "MATERIAL PERMITIDO",
      icon: FileText,
      items: [
        "Caneta preta de tinta preta (levar 3 unidades)",
        "Régua transparente",
        "Borracha branca",
        "Lanche energético (barra de cereal, banana)",
        "Água em garrafa transparente (sem rótulo)"
      ]
    },
    {
      title: "PREPARAÇÃO FÍSICA",
      icon: Utensils,
      items: [
        "Dormir 8 horas nas 2 noites anteriores",
        "Evitar bebidas alcoólicas",
        "Evitar cafeína em excesso",
        "Fazer refeições leves e nutritivas",
        "Hidratação constante (2,5L água/dia)"
      ]
    },
    {
      title: "PREPARAÇÃO MENTAL",
      icon: Brain,
      items: [
        "Revisar formulário de emergência (30 min)",
        "Praticar técnicas de respiração 4-7-8",
        "Visualização positiva (ver-se aprovado)",
        "Repetir mantra: 'Eu domino os padrões do ENEM'"
      ]
    }
  ];

  const totalItems = sections.reduce((acc, section) => acc + section.items.length, 0);
  const checkedCount = checkedItems.length;
  const progress = (checkedCount / totalItems) * 100;

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            Checklist de Véspera Infalível
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Lista Master pré-ENEM (48 horas antes)
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progresso da Preparação</span>
              <span className="font-semibold text-primary">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-3">
              <div
                className="bg-primary h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-right">
              {checkedCount} de {totalItems} itens concluídos
            </p>
          </div>

          {/* Checklist Sections */}
          {sections.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <section.icon className="h-5 w-5 text-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.items.map((item, itemIndex) => {
                    const itemId = `${section.title}-${itemIndex}`;
                    const isChecked = checkedItems.includes(itemId);
                    return (
                      <label
                        key={itemIndex}
                        className="flex items-center gap-3 cursor-pointer hover:bg-secondary p-3 rounded-lg transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleItem(itemId)}
                          className="rounded h-5 w-5"
                        />
                        <span className={isChecked ? "line-through text-muted-foreground" : ""}>
                          {item}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Formulário de Emergência */}
          <Card className="border-gold/30 bg-gold/5">
            <CardHeader>
              <CardTitle className="text-base">📝 Formulário de Emergência (1 página)</CardTitle>
              <p className="text-sm text-muted-foreground">Revise 30 minutos antes da prova</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 text-primary">MATEMÁTICA:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Bhaskara: x = (-b ± √(b²-4ac))/2a</li>
                    <li>• Pitágoras: a² + b² = c²</li>
                    <li>• Área círculo: A = πr²</li>
                    <li>• Volume esfera: V = 4πr³/3</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-primary">QUÍMICA:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• pH + pOH = 14</li>
                    <li>• PV = nRT</li>
                    <li>• C = n/V</li>
                    <li>• Lavoisier: reagentes = produtos</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-primary">FÍSICA:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• F = ma</li>
                    <li>• W = F·d</li>
                    <li>• Ec = mv²/2</li>
                    <li>• V = λf</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-primary">BIOLOGIA:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• ATP = energia celular</li>
                    <li>• DNA → RNA → Proteína</li>
                    <li>• Produtor → Consumidor → Decompositor</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {progress === 100 && (
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-center font-semibold text-primary">
                🎉 Parabéns! Você está 100% preparado para o ENEM!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}