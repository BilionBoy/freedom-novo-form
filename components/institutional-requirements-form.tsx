"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  ChevronRight,
  ChevronLeft,
  Building2,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

type FormData = {
  // Hero Section
  heroStyle: string;
  heroElements: string[];
  heroMessage: string;
  heroCTA: string;

  // Identidade Visual
  coresPreferidas: string;
  tipografiaStyle: string;
  usarElementosLP: string;
  animacoes: string;

  // Conteúdo Sobre
  temHistoria: string;
  historiaTexto: string;
  valoresEmpresa: string;
  diferenciais: string;

  // Vídeos
  temVideos: string;
  tiposVideos: string[];
  ondeHospedar: string;

  // Método/Processo
  temProcesso: string;
  etapasProcesso: string;
  nomeMetodo: string;

  // Leads Específicos
  segmentarLeads: string;
  tiposLeads: string[];
  fluxosDiferentes: string;

  // Empreendimentos
  mostrarEmpreendimentos: string;
  formatoEmpreendimentos: string;
  quantidadeDestaque: string;

  // Feedbacks
  temFeedbacks: string;
  tiposFeedbacks: string[];
  quantidadeFeedbacks: string;

  // Equipe
  mostrarEquipe: string;
  formatoEquipe: string;
  informacoesEquipe: string[];

  // CTAs e Conversão
  ctaPrincipal: string;
  ctasSecundarios: string[];
  ferramentasIntegracao: string;

  // Extras
  outrasSecoes: string;
  referenciasVisuais: string;
  observacoes: string;
};

const initialFormData: FormData = {
  heroStyle: "",
  heroElements: [],
  heroMessage: "",
  heroCTA: "",
  coresPreferidas: "",
  tipografiaStyle: "",
  usarElementosLP: "",
  animacoes: "",
  temHistoria: "",
  historiaTexto: "",
  valoresEmpresa: "",
  diferenciais: "",
  temVideos: "",
  tiposVideos: [],
  ondeHospedar: "",
  temProcesso: "",
  etapasProcesso: "",
  nomeMetodo: "",
  segmentarLeads: "",
  tiposLeads: [],
  fluxosDiferentes: "",
  mostrarEmpreendimentos: "",
  formatoEmpreendimentos: "",
  quantidadeDestaque: "",
  temFeedbacks: "",
  tiposFeedbacks: [],
  quantidadeFeedbacks: "",
  mostrarEquipe: "",
  formatoEquipe: "",
  informacoesEquipe: [],
  ctaPrincipal: "",
  ctasSecundarios: [],
  ferramentasIntegracao: "",
  outrasSecoes: "",
  referenciasVisuais: "",
  observacoes: "",
};

export function InstitutionalRequirementsForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isComplete, setIsComplete] = useState(false);

  const totalSteps = 10;

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: keyof FormData, value: string) => {
    const currentArray = formData[field] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];
    updateFormData(field, newArray);
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setIsComplete(true);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const progress = (step / totalSteps) * 100;

  const downloadResults = () => {
    const results = `
# LEVANTAMENTO DE REQUISITOS - SITE INSTITUCIONAL FREEDOM
# Data: ${new Date().toLocaleDateString("pt-BR")}

═══════════════════════════════════════════════════════════════

## 1. HERO SECTION (Seção Principal)
Estilo Visual: ${formData.heroStyle}
Elementos Visuais: ${formData.heroElements.join(", ")}
Mensagem Principal: ${formData.heroMessage}
Texto do CTA Principal: ${formData.heroCTA}

═══════════════════════════════════════════════════════════════

## 2. IDENTIDADE VISUAL
Cores Preferidas: ${formData.coresPreferidas}
Estilo de Tipografia: ${formData.tipografiaStyle}
Usar Elementos das LPs?: ${formData.usarElementosLP}
Nível de Animações: ${formData.animacoes}

═══════════════════════════════════════════════════════════════

## 3. SEÇÃO "SOBRE" / PROPÓSITO
Tem História para Contar?: ${formData.temHistoria}
${
  formData.temHistoria === "sim" ? `História:\n${formData.historiaTexto}\n` : ""
}
Valores da Empresa: ${formData.valoresEmpresa}
Principais Diferenciais: ${formData.diferenciais}

═══════════════════════════════════════════════════════════════

## 4. SEÇÃO DE VÍDEOS
Tem Vídeos Disponíveis?: ${formData.temVideos}
${
  formData.temVideos === "sim"
    ? `Tipos de Vídeos: ${formData.tiposVideos.join(", ")}\n`
    : ""
}
${formData.temVideos === "sim" ? `Hospedagem: ${formData.ondeHospedar}\n` : ""}

═══════════════════════════════════════════════════════════════

## 5. MÉTODO / PROCESSO DE TRABALHO
Tem Processo Definido?: ${formData.temProcesso}
${formData.temProcesso === "sim" ? `Etapas:\n${formData.etapasProcesso}\n` : ""}
${formData.nomeMetodo ? `Nome do Método: ${formData.nomeMetodo}\n` : ""}

═══════════════════════════════════════════════════════════════

## 6. LEADS ESPECÍFICOS
Segmentar por Tipo de Lead?: ${formData.segmentarLeads}
${
  formData.segmentarLeads === "sim"
    ? `Tipos de Leads: ${formData.tiposLeads.join(", ")}\n`
    : ""
}
${
  formData.segmentarLeads === "sim"
    ? `Fluxos Diferentes?: ${formData.fluxosDiferentes}\n`
    : ""
}

═══════════════════════════════════════════════════════════════

## 7. MINI SEÇÃO DE EMPREENDIMENTOS
Mostrar Empreendimentos?: ${formData.mostrarEmpreendimentos}
${
  formData.mostrarEmpreendimentos === "sim"
    ? `Formato: ${formData.formatoEmpreendimentos}\n`
    : ""
}
${
  formData.mostrarEmpreendimentos === "sim"
    ? `Quantidade em Destaque: ${formData.quantidadeDestaque}\n`
    : ""
}

═══════════════════════════════════════════════════════════════

## 8. FEEDBACKS / PROVA SOCIAL
Tem Feedbacks Disponíveis?: ${formData.temFeedbacks}
${
  formData.temFeedbacks === "sim"
    ? `Tipos: ${formData.tiposFeedbacks.join(", ")}\n`
    : ""
}
${
  formData.temFeedbacks === "sim"
    ? `Quantidade: ${formData.quantidadeFeedbacks}\n`
    : ""
}

═══════════════════════════════════════════════════════════════

## 9. APRESENTAÇÃO DA EQUIPE
Mostrar Equipe?: ${formData.mostrarEquipe}
${
  formData.mostrarEquipe === "sim" ? `Formato: ${formData.formatoEquipe}\n` : ""
}
${
  formData.mostrarEquipe === "sim"
    ? `Informações: ${formData.informacoesEquipe.join(", ")}\n`
    : ""
}

═══════════════════════════════════════════════════════════════

## 10. CTAs E CONVERSÃO
CTA Principal: ${formData.ctaPrincipal}
CTAs Secundários: ${formData.ctasSecundarios.join(", ")}
Ferramentas de Integração: ${formData.ferramentasIntegracao}

═══════════════════════════════════════════════════════════════

## 11. EXTRAS E OBSERVAÇÕES
Outras Seções Desejadas: ${formData.outrasSecoes || "Nenhuma"}
Referências Visuais: ${formData.referenciasVisuais || "Nenhuma"}
Observações Gerais: ${formData.observacoes || "Nenhuma"}

═══════════════════════════════════════════════════════════════

FIM DO LEVANTAMENTO
    `.trim();

    const blob = new Blob([results], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `levantamento-institucional-freedom-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sendToWhatsApp = () => {
    const message = `*LEVANTAMENTO DE REQUISITOS - SITE INSTITUCIONAL FREEDOM*
*Data:* ${new Date().toLocaleDateString("pt-BR")}

═══════════════════════════════════════

*1. HERO SECTION*
Estilo Visual: ${formData.heroStyle || "Não informado"}
Elementos Visuais: ${formData.heroElements.join(", ") || "Nenhum"}
Mensagem Principal: ${formData.heroMessage || "Não informado"}
CTA Principal: ${formData.heroCTA || "Não informado"}

═══════════════════════════════════════

*2. IDENTIDADE VISUAL*
Cores: ${formData.coresPreferidas || "Não informado"}
Tipografia: ${formData.tipografiaStyle || "Não informado"}
Usar Elementos LPs: ${formData.usarElementosLP || "Não informado"}
Animações: ${formData.animacoes || "Não informado"}

═══════════════════════════════════════

*3. SEÇÃO "SOBRE"*
Tem História: ${formData.temHistoria || "Não informado"}
${
  formData.temHistoria === "sim" ? `História: ${formData.historiaTexto}\n` : ""
}Valores: ${formData.valoresEmpresa || "Não informado"}
Diferenciais: ${formData.diferenciais || "Não informado"}

═══════════════════════════════════════

*4. VÍDEOS*
Tem Vídeos: ${formData.temVideos || "Não informado"}
${
  formData.temVideos === "sim"
    ? `Tipos: ${formData.tiposVideos.join(", ")}\n`
    : ""
}${formData.temVideos === "sim" ? `Hospedagem: ${formData.ondeHospedar}\n` : ""}

═══════════════════════════════════════

*5. MÉTODO/PROCESSO*
Tem Processo: ${formData.temProcesso || "Não informado"}
${
  formData.temProcesso === "sim" ? `Etapas: ${formData.etapasProcesso}\n` : ""
}${formData.nomeMetodo ? `Nome: ${formData.nomeMetodo}\n` : ""}

═══════════════════════════════════════

*6. LEADS ESPECÍFICOS*
Segmentar: ${formData.segmentarLeads || "Não informado"}
${
  formData.segmentarLeads === "sim"
    ? `Tipos: ${formData.tiposLeads.join(", ")}\n`
    : ""
}${
      formData.segmentarLeads === "sim"
        ? `Fluxos Diferentes: ${formData.fluxosDiferentes}\n`
        : ""
    }

═══════════════════════════════════════

*7. EMPREENDIMENTOS*
Mostrar: ${formData.mostrarEmpreendimentos || "Não informado"}
${
  formData.mostrarEmpreendimentos === "sim"
    ? `Formato: ${formData.formatoEmpreendimentos}\n`
    : ""
}${
      formData.mostrarEmpreendimentos === "sim"
        ? `Quantidade: ${formData.quantidadeDestaque}\n`
        : ""
    }

═══════════════════════════════════════

*8. FEEDBACKS*
Tem Feedbacks: ${formData.temFeedbacks || "Não informado"}
${
  formData.temFeedbacks === "sim"
    ? `Tipos: ${formData.tiposFeedbacks.join(", ")}\n`
    : ""
}${
      formData.temFeedbacks === "sim"
        ? `Quantidade: ${formData.quantidadeFeedbacks}\n`
        : ""
    }

═══════════════════════════════════════

*9. EQUIPE*
Mostrar: ${formData.mostrarEquipe || "Não informado"}
${
  formData.mostrarEquipe === "sim" ? `Formato: ${formData.formatoEquipe}\n` : ""
}${
      formData.mostrarEquipe === "sim"
        ? `Informações: ${formData.informacoesEquipe.join(", ")}\n`
        : ""
    }

═══════════════════════════════════════

*10. CTAs E CONVERSÃO*
CTA Principal: ${formData.ctaPrincipal || "Não informado"}
CTAs Secundários: ${formData.ctasSecundarios.join(", ") || "Nenhum"}
Ferramentas: ${formData.ferramentasIntegracao || "Não informado"}

═══════════════════════════════════════

*11. EXTRAS*
Outras Seções: ${formData.outrasSecoes || "Nenhuma"}
Referências: ${formData.referenciasVisuais || "Nenhuma"}
Observações: ${formData.observacoes || "Nenhuma"}

═══════════════════════════════════════

*FIM DO LEVANTAMENTO*`;

    const phoneNumber = "5569993881869";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  if (isComplete) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card className="border-2 border-green-500">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-2xl">Levantamento Concluído!</CardTitle>
            <CardDescription>
              Todas as informações foram coletadas com sucesso.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="font-semibold mb-2">Próximos Passos:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                <li>Envie o levantamento via WhatsApp</li>
                <li>Baixe o arquivo com todas as respostas</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                onClick={sendToWhatsApp}
                size="lg"
                className="w-full cursor-pointer bg-green-600 hover:bg-green-700"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Enviar via WhatsApp
              </Button>
              <Button
                onClick={downloadResults}
                size="lg"
                className="w-full cursor-pointer"
              >
                Baixar Levantamento Completo
              </Button>
              <Button
                onClick={() => {
                  setStep(1);
                  setIsComplete(false);
                }}
                variant="outline"
                size="lg"
                className="w-full cursor-pointer"
              >
                Fazer Novo Levantamento
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <Building2 className="h-8 w-8 text-red-500" />
          <h1 className="text-3xl font-bold">
            Levantamento - Site Institucional
          </h1>
        </div>
        <p className="text-slate-600">
          Formulário específico para redesign de site institucional de
          imobiliária
        </p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">
            Etapa {step} de {totalSteps}
          </span>
          <span className="text-sm text-slate-600">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Hero Section (Seção Principal)"}
            {step === 2 && "Identidade Visual"}
            {step === 3 && 'Seção "Sobre" / Propósito'}
            {step === 4 && "Seção de Vídeos"}
            {step === 5 && "Método / Processo de Trabalho"}
            {step === 6 && "Leads Específicos"}
            {step === 7 && "Mini Seção de Empreendimentos"}
            {step === 8 && "Feedbacks / Prova Social"}
            {step === 9 && "Apresentação da Equipe"}
            {step === 10 && "CTAs, Conversão e Extras"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Como deve ser a primeira impressão do site?"}
            {step === 2 && "Cores, tipografia e elementos visuais"}
            {step === 3 && "História, valores e diferenciais da empresa"}
            {step === 4 && "Conteúdo audiovisual para humanizar a marca"}
            {step === 5 && "Como a imobiliária trabalha? Qual o processo?"}
            {step === 6 && "Diferentes tipos de clientes e suas necessidades"}
            {step === 7 && "Destacar empreendimentos no institucional"}
            {step === 8 && "Depoimentos e avaliações de clientes"}
            {step === 9 && "Apresentar o time responsável"}
            {step === 10 && "Chamadas para ação e observações finais"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* STEP 1: Hero Section */}
          {step === 1 && (
            <>
              <div className="space-y-3">
                <Label>Estilo Visual da Hero Section</Label>
                <RadioGroup
                  value={formData.heroStyle}
                  onValueChange={(value) => updateFormData("heroStyle", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderno-minimalista" id="hero1" />
                    <Label htmlFor="hero1">
                      Moderno e Minimalista (fundo claro, muito espaço)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="impactante-escuro" id="hero2" />
                    <Label htmlFor="hero2">
                      Impactante com Fundo Escuro (como as LPs)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="video-background" id="hero3" />
                    <Label htmlFor="hero3">Vídeo em Background</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="imagem-fullscreen" id="hero4" />
                    <Label htmlFor="hero4">
                      Imagem Full-Screen com Overlay
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>
                  Elements Visuais na Hero (marque todos que desejar)
                </Label>
                <div className="space-y-2">
                  {[
                    "Animações sutis",
                    "Parallax",
                    "Carrossel de imagens",
                    "Estatísticas/números",
                  ].map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                        id={`hero-${item}`}
                        checked={formData.heroElements.includes(item)}
                        onCheckedChange={() =>
                          toggleArrayItem("heroElements", item)
                        }
                      />
                      <Label htmlFor={`hero-${item}`}>{item}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="heroMessage">Mensagem/Headline Principal</Label>
                <Textarea
                  id="heroMessage"
                  value={formData.heroMessage}
                  onChange={(e) =>
                    updateFormData("heroMessage", e.target.value)
                  }
                  placeholder="Ex: Transformamos planejamento imobiliário em realização de sonhos"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="heroCTA">Texto do CTA Principal</Label>
                <Input
                  id="heroCTA"
                  value={formData.heroCTA}
                  onChange={(e) => updateFormData("heroCTA", e.target.value)}
                  placeholder="Ex: Falar com um especialista"
                />
              </div>
            </>
          )}

          {/* STEP 2: Identidade Visual */}
          {step === 2 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="coresPreferidas">
                  Cores da Marca / Preferências
                </Label>
                <Textarea
                  id="coresPreferidas"
                  value={formData.coresPreferidas}
                  onChange={(e) =>
                    updateFormData("coresPreferidas", e.target.value)
                  }
                  placeholder="Ex: Vermelho/coral como destaque, preto, branco, cinza"
                  rows={2}
                />
              </div>

              <div className="space-y-3">
                <Label>Estilo de Tipografia</Label>
                <RadioGroup
                  value={formData.tipografiaStyle}
                  onValueChange={(value) =>
                    updateFormData("tipografiaStyle", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderna-sans" id="tipo1" />
                    <Label htmlFor="tipo1">
                      Moderna Sans-Serif (Inter, Poppins, Manrope)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="elegante-serif" id="tipo2" />
                    <Label htmlFor="tipo2">
                      Elegante com Serifa (para títulos)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mix" id="tipo3" />
                    <Label htmlFor="tipo3">
                      Mix (Serif nos títulos, Sans no corpo)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Usar Elementos Visuais das Landing Pages?</Label>
                <RadioGroup
                  value={formData.usarElementosLP}
                  onValueChange={(value) =>
                    updateFormData("usarElementosLP", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="lp1" />
                    <Label htmlFor="lp1">Sim, manter consistência visual</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="parcial" id="lp2" />
                    <Label htmlFor="lp2">
                      Parcialmente, adaptar para institucional
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="lp3" />
                    <Label htmlFor="lp3">Não, criar identidade diferente</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Nível de Animações e Movimento</Label>
                <RadioGroup
                  value={formData.animacoes}
                  onValueChange={(value) => updateFormData("animacoes", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="minimo" id="anim1" />
                    <Label htmlFor="anim1">
                      Mínimo (só transições básicas)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderado" id="anim2" />
                    <Label htmlFor="anim2">
                      Moderado (scroll reveals, hovers interessantes)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dinamico" id="anim3" />
                    <Label htmlFor="anim3">
                      Dinâmico (parallax, animações complexas)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </>
          )}

          {/* STEP 3: Sobre/Propósito */}
          {step === 3 && (
            <>
              <div className="space-y-3">
                <Label>Tem História para Contar?</Label>
                <RadioGroup
                  value={formData.temHistoria}
                  onValueChange={(value) =>
                    updateFormData("temHistoria", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="historia1" />
                    <Label htmlFor="historia1">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="historia2" />
                    <Label htmlFor="historia2">Não</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.temHistoria === "sim" && (
                <div className="space-y-2">
                  <Label htmlFor="historiaTexto">História da Empresa</Label>
                  <Textarea
                    id="historiaTexto"
                    value={formData.historiaTexto}
                    onChange={(e) =>
                      updateFormData("historiaTexto", e.target.value)
                    }
                    placeholder="Ex: A empresa começou em 2000 e tem se destacado na indústria imobiliária."
                    rows={4}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="valoresEmpresa">Valores da Empresa</Label>
                <Textarea
                  id="valoresEmpresa"
                  value={formData.valoresEmpresa}
                  onChange={(e) =>
                    updateFormData("valoresEmpresa", e.target.value)
                  }
                  placeholder="Ex: Ética, qualidade, comprometimento."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="diferenciais">Principais Diferenciais</Label>
                <Textarea
                  id="diferenciais"
                  value={formData.diferenciais}
                  onChange={(e) =>
                    updateFormData("diferenciais", e.target.value)
                  }
                  placeholder="Ex: Serviço personalizado, expertise técnica."
                  rows={2}
                />
              </div>
            </>
          )}

          {/* STEP 4: Vídeos */}
          {step === 4 && (
            <>
              <div className="space-y-3">
                <Label>Tem Vídeos Disponíveis?</Label>
                <RadioGroup
                  value={formData.temVideos}
                  onValueChange={(value) => updateFormData("temVideos", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="videos1" />
                    <Label htmlFor="videos1">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="videos2" />
                    <Label htmlFor="videos2">Não</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.temVideos === "sim" && (
                <div className="space-y-3">
                  <Label>Tipos de Vídeos</Label>
                  <div className="space-y-2">
                    {[
                      "Vídeos Institucionais",
                      "Vídeos de Funcionários",
                      "Vídeos de Clientes",
                      "Vídeos de Projetos",
                    ].map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          id={`videos-${item}`}
                          checked={formData.tiposVideos.includes(item)}
                          onCheckedChange={() =>
                            toggleArrayItem("tiposVideos", item)
                          }
                        />
                        <Label htmlFor={`videos-${item}`}>{item}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {formData.temVideos === "sim" && (
                <div className="space-y-2">
                  <Label htmlFor="ondeHospedar">Hospedagem dos Vídeos</Label>
                  <Input
                    id="ondeHospedar"
                    value={formData.ondeHospedar}
                    onChange={(e) =>
                      updateFormData("ondeHospedar", e.target.value)
                    }
                    placeholder="Ex: YouTube, Vimeo"
                  />
                </div>
              )}
            </>
          )}

          {/* STEP 5: Método/Processo */}
          {step === 5 && (
            <>
              <div className="space-y-3">
                <Label>Tem Processo Definido?</Label>
                <RadioGroup
                  value={formData.temProcesso}
                  onValueChange={(value) =>
                    updateFormData("temProcesso", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="processo1" />
                    <Label htmlFor="processo1">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="processo2" />
                    <Label htmlFor="processo2">Não</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.temProcesso === "sim" && (
                <div className="space-y-2">
                  <Label htmlFor="etapasProcesso">Etapas do Processo</Label>
                  <Textarea
                    id="etapasProcesso"
                    value={formData.etapasProcesso}
                    onChange={(e) =>
                      updateFormData("etapasProcesso", e.target.value)
                    }
                    placeholder="Ex: Consultoria, planejamento, execução."
                    rows={4}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="nomeMetodo">
                  Nome do Método (se aplicável)
                </Label>
                <Input
                  id="nomeMetodo"
                  value={formData.nomeMetodo}
                  onChange={(e) => updateFormData("nomeMetodo", e.target.value)}
                  placeholder="Ex: Método XYZ"
                />
              </div>
            </>
          )}

          {/* STEP 6: Leads Específicos */}
          {step === 6 && (
            <>
              <div className="space-y-3">
                <Label>Segmentar por Tipo de Lead?</Label>
                <RadioGroup
                  value={formData.segmentarLeads}
                  onValueChange={(value) =>
                    updateFormData("segmentarLeads", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="leads1" />
                    <Label htmlFor="leads1">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="leads2" />
                    <Label htmlFor="leads2">Não</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.segmentarLeads === "sim" && (
                <div className="space-y-3">
                  <Label>Tipos de Leads</Label>
                  <div className="space-y-2">
                    {[
                      "Leads Residenciais",
                      "Leads Comerciais",
                      "Leads Empresariais",
                    ].map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          id={`leads-${item}`}
                          checked={formData.tiposLeads.includes(item)}
                          onCheckedChange={() =>
                            toggleArrayItem("tiposLeads", item)
                          }
                        />
                        <Label htmlFor={`leads-${item}`}>{item}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {formData.segmentarLeads === "sim" && (
                <div className="space-y-2">
                  <Label htmlFor="fluxosDiferentes">Fluxos Diferentes?</Label>
                  <Input
                    id="fluxosDiferentes"
                    value={formData.fluxosDiferentes}
                    onChange={(e) =>
                      updateFormData("fluxosDiferentes", e.target.value)
                    }
                    placeholder="Ex: Sim, fluxos personalizados para cada tipo de lead."
                  />
                </div>
              )}
            </>
          )}

          {/* STEP 7: Empreendimentos */}
          {step === 7 && (
            <>
              <div className="space-y-3">
                <Label>Mostrar Empreendimentos?</Label>
                <RadioGroup
                  value={formData.mostrarEmpreendimentos}
                  onValueChange={(value) =>
                    updateFormData("mostrarEmpreendimentos", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="empreendimentos1" />
                    <Label htmlFor="empreendimentos1">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="empreendimentos2" />
                    <Label htmlFor="empreendimentos2">Não</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.mostrarEmpreendimentos === "sim" && (
                <div className="space-y-2">
                  <Label htmlFor="formatoEmpreendimentos">
                    Formato de Exibição
                  </Label>
                  <Input
                    id="formatoEmpreendimentos"
                    value={formData.formatoEmpreendimentos}
                    onChange={(e) =>
                      updateFormData("formatoEmpreendimentos", e.target.value)
                    }
                    placeholder="Ex: Galeria de imagens, carrossel."
                  />
                </div>
              )}

              {formData.mostrarEmpreendimentos === "sim" && (
                <div className="space-y-2">
                  <Label htmlFor="quantidadeDestaque">
                    Quantidade em Destaque
                  </Label>
                  <Input
                    id="quantidadeDestaque"
                    value={formData.quantidadeDestaque}
                    onChange={(e) =>
                      updateFormData("quantidadeDestaque", e.target.value)
                    }
                    placeholder="Ex: 3 empreendimentos principais."
                  />
                </div>
              )}
            </>
          )}

          {/* STEP 8: Feedbacks */}
          {step === 8 && (
            <>
              <div className="space-y-3">
                <Label>Tem Feedbacks Disponíveis?</Label>
                <RadioGroup
                  value={formData.temFeedbacks}
                  onValueChange={(value) =>
                    updateFormData("temFeedbacks", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="feedbacks1" />
                    <Label htmlFor="feedbacks1">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="feedbacks2" />
                    <Label htmlFor="feedbacks2">Não</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.temFeedbacks === "sim" && (
                <div className="space-y-3">
                  <Label>Tipos de Feedbacks</Label>
                  <div className="space-y-2">
                    {[
                      "Depoimentos de Clientes",
                      "Avaliações Online",
                      "Feedbacks Internos",
                    ].map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          id={`feedbacks-${item}`}
                          checked={formData.tiposFeedbacks.includes(item)}
                          onCheckedChange={() =>
                            toggleArrayItem("tiposFeedbacks", item)
                          }
                        />
                        <Label htmlFor={`feedbacks-${item}`}>{item}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {formData.temFeedbacks === "sim" && (
                <div className="space-y-2">
                  <Label htmlFor="quantidadeFeedbacks">
                    Quantidade de Feedbacks
                  </Label>
                  <Input
                    id="quantidadeFeedbacks"
                    value={formData.quantidadeFeedbacks}
                    onChange={(e) =>
                      updateFormData("quantidadeFeedbacks", e.target.value)
                    }
                    placeholder="Ex: 10 depoimentos."
                  />
                </div>
              )}
            </>
          )}

          {/* STEP 9: Equipe */}
          {step === 9 && (
            <>
              <div className="space-y-3">
                <Label>Mostrar Equipe?</Label>
                <RadioGroup
                  value={formData.mostrarEquipe}
                  onValueChange={(value) =>
                    updateFormData("mostrarEquipe", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="equipe1" />
                    <Label htmlFor="equipe1">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="equipe2" />
                    <Label htmlFor="equipe2">Não</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.mostrarEquipe === "sim" && (
                <div className="space-y-2">
                  <Label htmlFor="formatoEquipe">Formato de Exibição</Label>
                  <Input
                    id="formatoEquipe"
                    value={formData.formatoEquipe}
                    onChange={(e) =>
                      updateFormData("formatoEquipe", e.target.value)
                    }
                    placeholder="Ex: Lista com fotos e descrições."
                  />
                </div>
              )}

              {formData.mostrarEquipe === "sim" && (
                <div className="space-y-3">
                  <Label>Informações da Equipe</Label>
                  <div className="space-y-2">
                    {["Nomes", "Funções", "Fotos", "Redes Sociais"].map(
                      (item) => (
                        <div key={item} className="flex items-center space-x-2">
                          <Checkbox
                            id={`equipe-${item}`}
                            checked={formData.informacoesEquipe.includes(item)}
                            onCheckedChange={() =>
                              toggleArrayItem("informacoesEquipe", item)
                            }
                          />
                          <Label htmlFor={`equipe-${item}`}>{item}</Label>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 10: CTAs e Extras */}
          {step === 10 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="ctaPrincipal">CTA Principal</Label>
                <Input
                  id="ctaPrincipal"
                  value={formData.ctaPrincipal}
                  onChange={(e) =>
                    updateFormData("ctaPrincipal", e.target.value)
                  }
                  placeholder="Ex: Solicitar Orçamento"
                />
              </div>

              <div className="space-y-3">
                <Label>CTAs Secundários</Label>
                <div className="space-y-2">
                  {[
                    "Agendar Visita",
                    "Baixar Catálogo",
                    "Contatar Especialista",
                  ].map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                        id={`ctas-${item}`}
                        checked={formData.ctasSecundarios.includes(item)}
                        onCheckedChange={() =>
                          toggleArrayItem("ctasSecundarios", item)
                        }
                      />
                      <Label htmlFor={`ctas-${item}`}>{item}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ferramentasIntegracao">
                  Ferramentas de Integração
                </Label>
                <Input
                  id="ferramentasIntegracao"
                  value={formData.ferramentasIntegracao}
                  onChange={(e) =>
                    updateFormData("ferramentasIntegracao", e.target.value)
                  }
                  placeholder="Ex: Google Forms, HubSpot."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="outrasSecoes">Outras Seções Desejadas</Label>
                <Textarea
                  id="outrasSecoes"
                  value={formData.outrasSecoes}
                  onChange={(e) =>
                    updateFormData("outrasSecoes", e.target.value)
                  }
                  placeholder="Ex: Serviços, Blog, Contato."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="referenciasVisuais">Referências Visuais</Label>
                <Input
                  id="referenciasVisuais"
                  value={formData.referenciasVisuais}
                  onChange={(e) =>
                    updateFormData("referenciasVisuais", e.target.value)
                  }
                  placeholder="Ex: URL de outros sites inspiradores."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações Gerais</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) =>
                    updateFormData("observacoes", e.target.value)
                  }
                  placeholder="Ex: Algumas observações adicionais."
                  rows={3}
                />
              </div>
            </>
          )}

          <div className="flex justify-between pt-4">
            <Button
              onClick={prevStep}
              variant="outline"
              disabled={step === 1}
              className="cursor-pointer bg-transparent"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            <Button onClick={nextStep} className="cursor-pointer">
              {step === totalSteps ? (
                <>
                  Finalizar
                  <CheckCircle2 className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Próximo
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
