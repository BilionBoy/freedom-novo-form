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
  ServerCog,
  CheckCircle2,
  FileText,
  Pill,
  Truck,
  CreditCard,
  Building,
  Database,
  ArrowLeftRight,
  Gavel,
} from "lucide-react";

// --- TIPAGEM COMPLETA DOS DADOS ---
type ProcurementFormData = {
  // 1. Fluxo Geral
  tiposCompraExistentes: string[];
  fluxoCompraRegular: string;
  fluxoCompraEmergencial: string;
  fluxoCompraJudicial: string;
  fluxoCompraAta: string;
  etapasObrigatorias: string;
  etapasInexistentes: string;
  pontoCancelamentoSemDano: string;
  pontoCompromissoFinanceiro: string;
  pontoOficialIrreversivel: string;

  // 2. Regras de Volta (Correção)
  permiteVoltarEtapa: string;
  permiteCorrecaoInfo: string;
  consequenciaVoltar: string; // Perde dados ou histórico?

  // 3. Regras de Avanço
  quemAvancaEtapa: string;
  requisitosAvanco: string;
  avancoAutomatico: string;

  // 4. Solicitação (Requisição)
  camposObrigatoriosSolicitacao: string[];
  camposObrigatoriosSolicitacaoOutros: string;
  volumeSolicitacao: string; // Um ou Vários
  dadosItemSolicitacao: string[]; // Qtd, Subst, Justificativa
  limiteEdicaoSolicitacao: string;
  tratamentoErroSolicitacaoPosterior: string;

  // 5. Medicamentos (Produto)
  existeListaOficial: string;
  dadosImutaveisMedicamento: string;
  medicamentosEspeciais: string[];
  comportamentoMedicamentoDesativado: string;

  // 6. Cotação
  origemCotacao: string;
  agrupamentoItens: string;
  criterioEncerramentoCotacao: string;
  situacoesCotacao: string[];
  consultaHistoricoCotacao: string[];

  // 7. Propostas
  criteriosDecisaoProposta: string[];
  fornecedorPodeCorrigir: string;
  historicoPropostasPerdedoras: string;

  // 8. Julgamento
  modeloEscolhaVencedor: string; // Item ou Global
  registroDecisaoJulgamento: string[];
  multiplosVencedores: string;

  // 9. Ordem de Compra (OC)
  nomeDocumentoOficial: string;
  flexibilidadeOC: string[]; // Parcial, Cancelar, Alterar
  rastreabilidadeAlteracaoOC: string[]; // O que, quem, quando

  // 10. Entrega
  registroEntrega: string[];
  entregaParcial: string;
  tratamentoProblemasEntrega: string; // Atraso, falta, erro
  visibilidadeEntrega: string[];

  // 11. Nota Fiscal
  momentoNF: string;
  multiplasNFs: string[];
  situacoesNF: string; // Workflow da NF

  // 12. Pagamento
  gatilhoPagamento: string;
  tiposPagamento: string[];
  visibilidadePagamento: string[];

  // 13. Cadastro de Unidades (Campos)
  camposUnidade: string[];
  camposUnidadeOutros: string;
  regrasUnidade: string[]; // Multiplos CC, Multiplos Responsaveis
  historicoUnidade: string[];

  // 14. Cadastro de Fornecedores (Campos)
  camposFornecedor: string[];
  camposFornecedorOutros: string;
  exigenciasFornecedor: string[];
  historicoFornecedor: string[];

  // 15 a 21. Campos Técnicos de Transação
  camposBasicosCotacao: string[];
  camposBasicosCotacaoOutros: string;

  camposItemCotacao: string[];
  camposItemCotacaoOutros: string;

  camposProposta: string[];
  camposPropostaOutros: string;
  camposItemProposta: string[];

  camposOrdemCompra: string[];
  camposOrdemCompraOutros: string;

  camposRegistroEntrega: string[];
  camposRegistroEntregaOutros: string;

  camposRegistroNF: string[];
  camposRegistroNFOutros: string;

  camposRegistroPagamento: string[];
  camposRegistroPagamentoOutros: string;
};

const initialFormData: ProcurementFormData = {
  tiposCompraExistentes: [],
  fluxoCompraRegular: "",
  fluxoCompraEmergencial: "",
  fluxoCompraJudicial: "",
  fluxoCompraAta: "",
  etapasObrigatorias: "",
  etapasInexistentes: "",
  pontoCancelamentoSemDano: "",
  pontoCompromissoFinanceiro: "",
  pontoOficialIrreversivel: "",
  permiteVoltarEtapa: "",
  permiteCorrecaoInfo: "",
  consequenciaVoltar: "",
  quemAvancaEtapa: "",
  requisitosAvanco: "",
  avancoAutomatico: "",
  camposObrigatoriosSolicitacao: [],
  camposObrigatoriosSolicitacaoOutros: "",
  volumeSolicitacao: "",
  dadosItemSolicitacao: [],
  limiteEdicaoSolicitacao: "",
  tratamentoErroSolicitacaoPosterior: "",
  existeListaOficial: "",
  dadosImutaveisMedicamento: "",
  medicamentosEspeciais: [],
  comportamentoMedicamentoDesativado: "",
  origemCotacao: "",
  agrupamentoItens: "",
  criterioEncerramentoCotacao: "",
  situacoesCotacao: [],
  consultaHistoricoCotacao: [],
  criteriosDecisaoProposta: [],
  fornecedorPodeCorrigir: "",
  historicoPropostasPerdedoras: "",
  modeloEscolhaVencedor: "",
  registroDecisaoJulgamento: [],
  multiplosVencedores: "",
  nomeDocumentoOficial: "",
  flexibilidadeOC: [],
  rastreabilidadeAlteracaoOC: [],
  registroEntrega: [],
  entregaParcial: "",
  tratamentoProblemasEntrega: "",
  visibilidadeEntrega: [],
  momentoNF: "",
  multiplasNFs: [],
  situacoesNF: "",
  gatilhoPagamento: "",
  tiposPagamento: [],
  visibilidadePagamento: [],
  camposUnidade: [],
  camposUnidadeOutros: "",
  regrasUnidade: [],
  historicoUnidade: [],
  camposFornecedor: [],
  camposFornecedorOutros: "",
  exigenciasFornecedor: [],
  historicoFornecedor: [],
  camposBasicosCotacao: [],
  camposBasicosCotacaoOutros: "",
  camposItemCotacao: [],
  camposItemCotacaoOutros: "",
  camposProposta: [],
  camposPropostaOutros: "",
  camposItemProposta: [],
  camposOrdemCompra: [],
  camposOrdemCompraOutros: "",
  camposRegistroEntrega: [],
  camposRegistroEntregaOutros: "",
  camposRegistroNF: [],
  camposRegistroNFOutros: "",
  camposRegistroPagamento: [],
  camposRegistroPagamentoOutros: "",
};

export function InstitutionalRequirementsForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] =
    useState<ProcurementFormData>(initialFormData);
  const [isComplete, setIsComplete] = useState(false);

  // Aumentado para 8 etapas para acomodar os detalhes técnicos
  const totalSteps = 8;

  const updateFormData = (field: keyof ProcurementFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: keyof ProcurementFormData, value: string) => {
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
# LEVANTAMENTO DE REQUISITOS - NEXT TECH (SISTEMA DE COMPRAS)
# Data: ${new Date().toLocaleDateString("pt-BR")}

═══════════════════════════════════════════════════════════════

## 1. FLUXOS DE COMPRA
Tipos Existentes: ${formData.tiposCompraExistentes.join(", ")}

Fluxo Regular:
${formData.fluxoCompraRegular}

${formData.tiposCompraExistentes.includes("Emergencial") ? `Fluxo Emergencial:\n${formData.fluxoCompraEmergencial}\n` : ""}
${formData.tiposCompraExistentes.includes("Judicial") ? `Fluxo Judicial:\n${formData.fluxoCompraJudicial}\n` : ""}
${formData.tiposCompraExistentes.includes("Ata/Registro") ? `Fluxo Ata/Registro:\n${formData.fluxoCompraAta}\n` : ""}

Etapas Obrigatórias: ${formData.etapasObrigatorias}
Etapas Inexistentes em certos casos: ${formData.etapasInexistentes}
Ponto de Cancelamento s/ Dano: ${formData.pontoCancelamentoSemDano}
Compromisso Financeiro: ${formData.pontoCompromissoFinanceiro}
Ponto Irreversível (Oficial): ${formData.pontoOficialIrreversivel}

═══════════════════════════════════════════════════════════════

## 2. REGRAS DE VOLTA E AVANÇO (WORKFLOW)
Voltar Etapa: ${formData.permiteVoltarEtapa}
Correção de Info: ${formData.permiteCorrecaoInfo}
Consequência ao Voltar (Perda/Histórico): ${formData.consequenciaVoltar}

Quem Avança: ${formData.quemAvancaEtapa}
Requisitos para Avançar: ${formData.requisitosAvanco}
Avanço Automático: ${formData.avancoAutomatico}

═══════════════════════════════════════════════════════════════

## 3. SOLICITAÇÃO (NASCIMENTO DO PEDIDO)
Campos Obrigatórios (Checklist): ${formData.camposObrigatoriosSolicitacao.join(", ")}
Outros Campos (Manual): ${formData.camposObrigatoriosSolicitacaoOutros}
Volume: ${formData.volumeSolicitacao}
Dados por Item: ${formData.dadosItemSolicitacao.join(", ")}
Limite de Edição: ${formData.limiteEdicaoSolicitacao}
Erro após o processo andar: ${formData.tratamentoErroSolicitacaoPosterior}

═══════════════════════════════════════════════════════════════

## 4. MEDICAMENTOS (PRODUTO)
Lista Oficial: ${formData.existeListaOficial}
Dados Imutáveis: ${formData.dadosImutaveisMedicamento}
Regras Especiais: ${formData.medicamentosEspeciais.join(", ")}
Desativação: ${formData.comportamentoMedicamentoDesativado}

═══════════════════════════════════════════════════════════════

## 5. COTAÇÃO E PROPOSTAS
Origem: ${formData.origemCotacao}
Agrupamento: ${formData.agrupamentoItens}
Encerramento: ${formData.criterioEncerramentoCotacao}
Situações: ${formData.situacoesCotacao.join(", ")}
Histórico Necessário: ${formData.consultaHistoricoCotacao.join(", ")}

Critérios Decisão Proposta: ${formData.criteriosDecisaoProposta.join(", ")}
Fornecedor Corrige?: ${formData.fornecedorPodeCorrigir}
Histórico Perdedoras: ${formData.historicoPropostasPerdedoras}

═══════════════════════════════════════════════════════════════

## 6. JULGAMENTO E ORDEM DE COMPRA
Modelo: ${formData.modeloEscolhaVencedor}
Registro Decisão: ${formData.registroDecisaoJulgamento.join(", ")}
Múltiplos Vencedores: ${formData.multiplosVencedores}

Documento Oficial: ${formData.nomeDocumentoOficial}
Flexibilidade OC: ${formData.flexibilidadeOC.join(", ")}
Rastreabilidade OC: ${formData.rastreabilidadeAlteracaoOC.join(", ")}

═══════════════════════════════════════════════════════════════

## 7. LOGÍSTICA E FINANCEIRO
Registro Entrega: ${formData.registroEntrega.join(", ")}
Entrega Parcial: ${formData.entregaParcial}
Problemas na Entrega: ${formData.tratamentoProblemasEntrega}
Visibilidade Entrega: ${formData.visibilidadeEntrega.join(", ")}

Momento NF: ${formData.momentoNF}
Regras NF: ${formData.multiplasNFs.join(", ")}
Workflow NF: ${formData.situacoesNF}

Gatilho Pagamento: ${formData.gatilhoPagamento}
Tipos Pagamento: ${formData.tiposPagamento.join(", ")}
Visibilidade Pagamento: ${formData.visibilidadePagamento.join(", ")}

═══════════════════════════════════════════════════════════════

## 8. CADASTROS (ENTIDADES)
Campos Unidade (Checklist): ${formData.camposUnidade.join(", ")}
Outros Campos Unidade: ${formData.camposUnidadeOutros}
Regras Unidade: ${formData.regrasUnidade.join(", ")}
Histórico Unidade: ${formData.historicoUnidade.join(", ")}

Campos Fornecedor (Checklist): ${formData.camposFornecedor.join(", ")}
Outros Campos Fornecedor: ${formData.camposFornecedorOutros}
Exigências Fornecedor: ${formData.exigenciasFornecedor.join(", ")}
Histórico Fornecedor: ${formData.historicoFornecedor.join(", ")}

═══════════════════════════════════════════════════════════════

## 9. DEFINIÇÃO TÉCNICA DE CAMPOS (TRANSAÇÕES)

### Cotação
Campos Básicos: ${formData.camposBasicosCotacao.join(", ")}
Outros: ${formData.camposBasicosCotacaoOutros}
Campos Item: ${formData.camposItemCotacao.join(", ")}
Outros: ${formData.camposItemCotacaoOutros}

### Propostas
Campos Proposta: ${formData.camposProposta.join(", ")}
Outros: ${formData.camposPropostaOutros}
Campos Item Proposta: ${formData.camposItemProposta.join(", ")}

### Ordem de Compra
Campos: ${formData.camposOrdemCompra.join(", ")}
Outros: ${formData.camposOrdemCompraOutros}

### Entrega
Campos: ${formData.camposRegistroEntrega.join(", ")}
Outros: ${formData.camposRegistroEntregaOutros}

### Nota Fiscal
Campos: ${formData.camposRegistroNF.join(", ")}
Outros: ${formData.camposRegistroNFOutros}

### Pagamento
Campos: ${formData.camposRegistroPagamento.join(", ")}
Outros: ${formData.camposRegistroPagamentoOutros}

═══════════════════════════════════════════════════════════════
FIM DO LEVANTAMENTO
    `.trim();

    const blob = new Blob([results], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `next-tech-requisitos-completo-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sendToWhatsApp = () => {
    // Resumo para WhatsApp (URL tem limite de tamanho, então é um resumo executivo)
    const message = `*LEVANTAMENTO NEXT TECH - RESUMO*
Data: ${new Date().toLocaleDateString("pt-BR")}

*1. Fluxo:* ${formData.fluxoCompraRegular ? "Definido" : "Pendente"}
*2. Tipos:* ${formData.tiposCompraExistentes.join(", ")}
*3. Financeiro:* Ocorre após ${formData.gatilhoPagamento}
*4. Docs Oficiais:* ${formData.nomeDocumentoOficial}
*5. Solicitação:* ${formData.camposObrigatoriosSolicitacao.length} campos obrigatórios.
*6. Campos Técnicos:*
- Unidade: ${formData.camposUnidade.length} + extras
- Fornecedor: ${formData.camposFornecedor.length} + extras
- Cotação: ${formData.camposBasicosCotacao.length} + extras

*Baixe o arquivo TXT completo para todos os detalhes.*`;

    const phoneNumber = "5569993881869"; // Substituir pelo número real
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  if (isComplete) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card className="border-2 border-green-600 shadow-lg">
          <CardHeader className="text-center bg-slate-50 rounded-t-lg">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-600">
              <CheckCircle2 className="h-12 w-12 text-white" />
            </div>
            <CardTitle className="text-3xl text-slate-800">
              Levantamento Concluído!
            </CardTitle>
            <CardDescription className="text-lg">
              Todas as 21 seções de requisitos foram mapeadas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-2">Próximos Passos:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-blue-700">
                <li>
                  Baixe o <strong>Relatório TXT Completo</strong> (contém todos
                  os campos detalhados).
                </li>
                <li>Envie o resumo executivo para o grupo do WhatsApp.</li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                onClick={downloadResults}
                size="lg"
                className="w-full cursor-pointer bg-slate-900 hover:bg-slate-800 h-14 text-lg"
              >
                <FileText className="mr-2 h-6 w-6" />
                Baixar Relatório Completo (TXT)
              </Button>
              <Button
                onClick={sendToWhatsApp}
                variant="outline"
                size="lg"
                className="w-full cursor-pointer border-green-600 text-green-700 hover:bg-green-50 h-14 text-lg"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WA"
                  className="w-6 h-6 mr-2"
                />
                Enviar Resumo no WhatsApp
              </Button>
              <Button
                onClick={() => {
                  setStep(1);
                  setIsComplete(false);
                }}
                variant="ghost"
                size="sm"
                className="w-full cursor-pointer mt-4"
              >
                Iniciar Novo Levantamento
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-3 mb-2 justify-center">
          <ServerCog className="h-12 w-12 text-blue-700" />
          <h1 className="text-4xl font-extrabold text-slate-900">Next Tech</h1>
        </div>
        <p className="text-xl text-slate-600 font-medium">
          Engenharia de Requisitos - Sistema de Compras & Medicamentos
        </p>
      </div>

      <div className="mb-8 sticky top-0 bg-white z-10 py-4 shadow-sm">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-bold text-blue-700">
            ETAPA {step} DE {totalSteps}
          </span>
          <span className="text-sm font-bold text-slate-600">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      <Card className="shadow-lg border-t-4 border-t-blue-600">
        <CardHeader className="bg-slate-50 border-b">
          <CardTitle className="flex items-center gap-3 text-2xl">
            {step === 1 && (
              <>
                <ArrowLeftRight className="h-8 w-8 text-blue-600" /> 1. Fluxos
                de Compra
              </>
            )}
            {step === 2 && (
              <>
                <ServerCog className="h-8 w-8 text-orange-600" /> 2. Workflow
                (Volta e Avanço)
              </>
            )}
            {step === 3 && (
              <>
                <Pill className="h-8 w-8 text-green-600" /> 3. Solicitação e
                Produto
              </>
            )}
            {step === 4 && (
              <>
                <FileText className="h-8 w-8 text-purple-600" /> 4. Cotação e
                Propostas
              </>
            )}
            {step === 5 && (
              <>
                <Gavel className="h-8 w-8 text-red-600" /> 5. Julgamento e
                Pedido
              </>
            )}
            {step === 6 && (
              <>
                <Truck className="h-8 w-8 text-yellow-600" /> 6. Logística e
                Financeiro
              </>
            )}
            {step === 7 && (
              <>
                <Building className="h-8 w-8 text-indigo-600" /> 7. Cadastros
                (Unidades/Fornecedores)
              </>
            )}
            {step === 8 && (
              <>
                <Database className="h-8 w-8 text-slate-700" /> 8. Definição
                Técnica de Campos
              </>
            )}
          </CardTitle>
          <CardDescription className="text-base">
            {step === 1 &&
              "Definição exata do caminho da compra, tipos e pontos críticos."}
            {step === 2 &&
              "Regras de negócio: Onde trava? Onde volta? O que perde?"}
            {step === 3 &&
              "Como nasce o pedido e as especificidades dos medicamentos."}
            {step === 4 &&
              "Processo de orçamentação e recebimento de propostas."}
            {step === 5 && "Decisão do vencedor e oficialização da compra."}
            {step === 6 && "Recebimento físico, Nota Fiscal e Pagamento."}
            {step === 7 && "Dados obrigatórios para cadastro de entidades."}
            {step === 8 &&
              "Checklist detalhado de campos para cada tabela do banco."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8 p-8 max-h-[65vh] overflow-y-auto">
          {/* STEP 1: FLUXOS */}
          {step === 1 && (
            <div className="space-y-8">
              <div className="bg-yellow-50 p-4 border-l-4 border-yellow-400 text-yellow-800 text-sm">
                ⚠️ <strong>Atenção:</strong> Não utilize "depende". Descreva o
                fluxo real do dia a dia.
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-bold">
                  Quais tipos de compra existem?
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Regular",
                    "Emergencial",
                    "Judicial",
                    "Ata/Registro de Preços",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center space-x-2 border p-3 rounded hover:bg-slate-50"
                    >
                      <Checkbox
                        id={`tipo-${item}`}
                        checked={formData.tiposCompraExistentes.includes(item)}
                        onCheckedChange={() =>
                          toggleArrayItem("tiposCompraExistentes", item)
                        }
                      />
                      <Label
                        htmlFor={`tipo-${item}`}
                        className="cursor-pointer"
                      >
                        {item}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="font-semibold text-blue-800">
                  Fluxo da Compra Regular (Obrigatório)
                </Label>
                <Textarea
                  value={formData.fluxoCompraRegular}
                  onChange={(e) =>
                    updateFormData("fluxoCompraRegular", e.target.value)
                  }
                  placeholder="Ex: Solicitação → Aprovação → Cotação → Propostas → Julgamento → OC → Entrega → NF → Pagamento"
                  className="min-h-[100px]"
                />
              </div>

              {formData.tiposCompraExistentes.includes("Emergencial") && (
                <div className="space-y-3">
                  <Label className="font-semibold text-red-800">
                    Fluxo da Compra Emergencial
                  </Label>
                  <Textarea
                    value={formData.fluxoCompraEmergencial}
                    onChange={(e) =>
                      updateFormData("fluxoCompraEmergencial", e.target.value)
                    }
                    placeholder="Descreva o passo a passo..."
                    className="min-h-[80px]"
                  />
                </div>
              )}

              {formData.tiposCompraExistentes.includes("Judicial") && (
                <div className="space-y-3">
                  <Label className="font-semibold text-purple-800">
                    Fluxo da Compra Judicial
                  </Label>
                  <Textarea
                    value={formData.fluxoCompraJudicial}
                    onChange={(e) =>
                      updateFormData("fluxoCompraJudicial", e.target.value)
                    }
                    placeholder="Descreva o passo a passo..."
                    className="min-h-[80px]"
                  />
                </div>
              )}

              {formData.tiposCompraExistentes.includes(
                "Ata/Registro de Preços",
              ) && (
                <div className="space-y-3">
                  <Label className="font-semibold text-green-800">
                    Fluxo via Ata / Registro de Preços
                  </Label>
                  <Textarea
                    value={formData.fluxoCompraAta}
                    onChange={(e) =>
                      updateFormData("fluxoCompraAta", e.target.value)
                    }
                    placeholder="Descreva o passo a passo..."
                    className="min-h-[80px]"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-6 pt-4 border-t">
                <div className="space-y-2">
                  <Label className="font-bold">
                    Etapas Obrigatórias (Todas)
                  </Label>
                  <Input
                    value={formData.etapasObrigatorias}
                    onChange={(e) =>
                      updateFormData("etapasObrigatorias", e.target.value)
                    }
                    placeholder="Quais etapas nunca podem pular?"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">
                    Etapas Inexistentes (Exceções)
                  </Label>
                  <Input
                    value={formData.etapasInexistentes}
                    onChange={(e) =>
                      updateFormData("etapasInexistentes", e.target.value)
                    }
                    placeholder="O que some na emergencial?"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <Label className="text-lg font-bold">Pontos Críticos</Label>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label className="text-sm text-slate-500">
                      Até quando pode cancelar sem gerar problema?
                    </Label>
                    <Input
                      value={formData.pontoCancelamentoSemDano}
                      onChange={(e) =>
                        updateFormData(
                          "pontoCancelamentoSemDano",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-slate-500">
                      Em qual etapa gera compromisso financeiro?
                    </Label>
                    <Input
                      value={formData.pontoCompromissoFinanceiro}
                      onChange={(e) =>
                        updateFormData(
                          "pontoCompromissoFinanceiro",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-slate-500">
                      Quando vira "Oficial" (não pode apagar)?
                    </Label>
                    <Input
                      value={formData.pontoOficialIrreversivel}
                      onChange={(e) =>
                        updateFormData(
                          "pontoOficialIrreversivel",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: WORKFLOW LOGIC */}
          {step === 2 && (
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <ArrowLeftRight className="h-5 w-5" /> Regras de "Voltar
                  Atrás"
                </h3>

                <div className="space-y-2">
                  <Label>Onde pode voltar para etapa anterior?</Label>
                  <Textarea
                    value={formData.permiteVoltarEtapa}
                    onChange={(e) =>
                      updateFormData("permiteVoltarEtapa", e.target.value)
                    }
                    placeholder="Ex: Cotação pode voltar para Solicitação? Proposta pode voltar para correção?"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Pode pedir correção de informação?</Label>
                  <Textarea
                    value={formData.permiteCorrecaoInfo}
                    onChange={(e) =>
                      updateFormData("permiteCorrecaoInfo", e.target.value)
                    }
                    placeholder="Ex: Devolver pedido para ajuste de quantidade."
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-red-700 font-bold">
                    Consequência ao Voltar
                  </Label>
                  <RadioGroup
                    value={formData.consequenciaVoltar}
                    onValueChange={(v) =>
                      updateFormData("consequenciaVoltar", v)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="perde" id="cons1" />
                      <Label htmlFor="cons1">
                        Perde o que foi feito (Refazer)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mantem" id="cons2" />
                      <Label htmlFor="cons2">
                        Mantém histórico e permite editar
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" /> Regras de Avanço
                </h3>

                <div className="space-y-2">
                  <Label>
                    Quem tem poder de avançar a etapa?(Para cada fase: Quem
                    aperta o botão?)
                  </Label>
                  <Textarea
                    value={formData.quemAvancaEtapa}
                    onChange={(e) =>
                      updateFormData("quemAvancaEtapa", e.target.value)
                    }
                    placeholder="Para cada fase: Quem aperta o botão?"
                  />
                </div>

                <div className="space-y-2">
                  <Label>
                    O que precisa estar validado para avançar?(Ex: Só cota se
                    tiver saldo no centro de custo.)
                  </Label>
                  <Textarea
                    value={formData.requisitosAvanco}
                    onChange={(e) =>
                      updateFormData("requisitosAvanco", e.target.value)
                    }
                    placeholder="Ex: Só cota se tiver saldo no centro de custo."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Existe avanço automático?</Label>
                  <Input
                    value={formData.avancoAutomatico}
                    onChange={(e) =>
                      updateFormData("avancoAutomatico", e.target.value)
                    }
                    placeholder="Alguma etapa pula sozinha?"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SOLICITAÇÃO E PRODUTO */}
          {step === 3 && (
            <div className="space-y-8">
              {/* SOLICITAÇÃO */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <FileText className="h-5 w-5" /> A Solicitação (Requisição)
                </h3>

                <div className="bg-slate-50 p-4 rounded border">
                  <Label className="font-bold mb-2 block">
                    O que obrigatoriamente precisa existir?
                  </Label>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {[
                      "Unidade",
                      "Centro de Custo",
                      "Lista de Medicamentos",
                      "Justificativa",
                      "Prioridade",
                      "Prazo",
                      "Responsável",
                    ].map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          id={`req-${item}`}
                          checked={formData.camposObrigatoriosSolicitacao.includes(
                            item,
                          )}
                          onCheckedChange={() =>
                            toggleArrayItem(
                              "camposObrigatoriosSolicitacao",
                              item,
                            )
                          }
                        />
                        <Label htmlFor={`req-${item}`}>{item}</Label>
                      </div>
                    ))}
                  </div>
                  <Label className="text-xs font-bold text-slate-500 uppercase">
                    Outros campos obrigatórios (Digite):
                  </Label>
                  <Textarea
                    value={formData.camposObrigatoriosSolicitacaoOutros}
                    onChange={(e) =>
                      updateFormData(
                        "camposObrigatoriosSolicitacaoOutros",
                        e.target.value,
                      )
                    }
                    placeholder="Ex: Local de entrega específico, código do projeto..."
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Volume</Label>
                    <RadioGroup
                      value={formData.volumeSolicitacao}
                      onValueChange={(v) =>
                        updateFormData("volumeSolicitacao", v)
                      }
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="varios" id="vol1" />
                        <Label htmlFor="vol1">Vários itens</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="unico" id="vol2" />
                        <Label htmlFor="vol2">Item único</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label>Dados por Medicamento</Label>
                    <div className="space-y-1 mt-2">
                      {[
                        "Quantidade",
                        "Aceita Substituição",
                        "Justificativa Técnica",
                      ].map((i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Checkbox
                            checked={formData.dadosItemSolicitacao.includes(i)}
                            onCheckedChange={() =>
                              toggleArrayItem("dadosItemSolicitacao", i)
                            }
                          />{" "}
                          <Label>{i}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Limite de Edição</Label>
                  <Input
                    value={formData.limiteEdicaoSolicitacao}
                    onChange={(e) =>
                      updateFormData("limiteEdicaoSolicitacao", e.target.value)
                    }
                    placeholder="Até quando pode alterar sem cancelar?"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Erro posterior</Label>
                  <Input
                    value={formData.tratamentoErroSolicitacaoPosterior}
                    onChange={(e) =>
                      updateFormData(
                        "tratamentoErroSolicitacaoPosterior",
                        e.target.value,
                      )
                    }
                    placeholder="Se percebeu erro depois que andou, o que faz?"
                  />
                </div>
              </div>

              {/* MEDICAMENTOS */}
              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Pill className="h-5 w-5" /> O Medicamento (Produto)
                </h3>

                <div className="space-y-2">
                  <Label>Existe lista oficial de padronização?</Label>
                  <Input
                    value={formData.existeListaOficial}
                    onChange={(e) =>
                      updateFormData("existeListaOficial", e.target.value)
                    }
                    placeholder="Sim/Não"
                  />
                </div>

                <div className="space-y-2">
                  <Label>O que é imutável no cadastro?</Label>
                  <Input
                    value={formData.dadosImutaveisMedicamento}
                    onChange={(e) =>
                      updateFormData(
                        "dadosImutaveisMedicamento",
                        e.target.value,
                      )
                    }
                    placeholder="Princípio ativo? Dosagem?"
                  />
                </div>

                <div className="bg-red-50 p-4 rounded border border-red-100">
                  <Label className="font-bold text-red-800 mb-2 block">
                    Casos Especiais
                  </Label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Exigem controle especial",
                      "Regras de compra diferentes",
                      "Não aceitam substituição",
                    ].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Checkbox
                          checked={formData.medicamentosEspeciais.includes(i)}
                          onCheckedChange={() =>
                            toggleArrayItem("medicamentosEspeciais", i)
                          }
                        />{" "}
                        <Label>{i}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Quando deixa de ser usado (Desativação)</Label>
                  <RadioGroup
                    value={formData.comportamentoMedicamentoDesativado}
                    onValueChange={(v) =>
                      updateFormData("comportamentoMedicamentoDesativado", v)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="some" id="des1" />
                      <Label htmlFor="des1">Some do sistema</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="oculta" id="des2" />
                      <Label htmlFor="des2">
                        Oculta p/ novos, mantém histórico
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: COTAÇÃO E PROPOSTAS */}
          {step === 4 && (
            <div className="space-y-8">
              {/* COTAÇÃO */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <FileText className="h-5 w-5" /> A Cotação
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Origem</Label>
                    <RadioGroup
                      value={formData.origemCotacao}
                      onValueChange={(v) => updateFormData("origemCotacao", v)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="individual" id="cot1" />
                        <Label htmlFor="cot1">1 Pedido = 1 Cotação</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="agrupada" id="cot2" />
                        <Label htmlFor="cot2">Junta vários pedidos</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  {formData.origemCotacao === "agrupada" && (
                    <div>
                      <Label>Agrupamento</Label>
                      <RadioGroup
                        value={formData.agrupamentoItens}
                        onValueChange={(v) =>
                          updateFormData("agrupamentoItens", v)
                        }
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="soma" id="agr1" />
                          <Label htmlFor="agr1">Soma itens iguais</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mantem" id="agr2" />
                          <Label htmlFor="agr2">
                            Mantém separado por unidade
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Situações Possíveis</Label>
                  <div className="flex flex-wrap gap-4">
                    {["Cancelada", "Deserta", "Fracassada", "Reaberta"].map(
                      (i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Checkbox
                            checked={formData.situacoesCotacao.includes(i)}
                            onCheckedChange={() =>
                              toggleArrayItem("situacoesCotacao", i)
                            }
                          />{" "}
                          <Label>{i}</Label>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Histórico Necessário</Label>
                  <div className="flex flex-wrap gap-4">
                    {[
                      "Quem participou",
                      "O que foi proposto",
                      "Motivo do erro",
                    ].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Checkbox
                          checked={formData.consultaHistoricoCotacao.includes(
                            i,
                          )}
                          onCheckedChange={() =>
                            toggleArrayItem("consultaHistoricoCotacao", i)
                          }
                        />{" "}
                        <Label>{i}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* PROPOSTAS */}
              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <FileText className="h-5 w-5" /> Propostas dos Fornecedores
                </h3>

                <div className="space-y-2">
                  <Label>O que pesa na decisão? (Critérios)</Label>
                  <div className="flex flex-wrap gap-4">
                    {["Preço", "Prazo", "Marca", "Condições Entrega"].map(
                      (i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Checkbox
                            checked={formData.criteriosDecisaoProposta.includes(
                              i,
                            )}
                            onCheckedChange={() =>
                              toggleArrayItem("criteriosDecisaoProposta", i)
                            }
                          />{" "}
                          <Label>{i}</Label>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Fornecedor pode corrigir proposta enviada?</Label>
                    <Input
                      value={formData.fornecedorPodeCorrigir}
                      onChange={(e) =>
                        updateFormData("fornecedorPodeCorrigir", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Guardar histórico de quem perdeu?</Label>
                    <Input
                      value={formData.historicoPropostasPerdedoras}
                      onChange={(e) =>
                        updateFormData(
                          "historicoPropostasPerdedoras",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: JULGAMENTO E PEDIDO */}
          {step === 5 && (
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Gavel className="h-5 w-5" /> Julgamento
                </h3>

                <div className="space-y-2">
                  <Label>Modelo de Escolha</Label>
                  <RadioGroup
                    value={formData.modeloEscolhaVencedor}
                    onValueChange={(v) =>
                      updateFormData("modeloEscolhaVencedor", v)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="item" id="julg1" />
                      <Label htmlFor="julg1">
                        Vencedor por Item (Mix de fornecedores)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="global" id="julg2" />
                      <Label htmlFor="julg2">
                        Vencedor Global (Um fornecedor leva tudo)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Registro da Decisão (Auditoria)</Label>
                  <div className="flex flex-wrap gap-4">
                    {["Por que ganhou", "Quem escolheu", "Quando escolheu"].map(
                      (i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Checkbox
                            checked={formData.registroDecisaoJulgamento.includes(
                              i,
                            )}
                            onCheckedChange={() =>
                              toggleArrayItem("registroDecisaoJulgamento", i)
                            }
                          />{" "}
                          <Label>{i}</Label>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <FileText className="h-5 w-5" /> Ordem de Compra (OC)
                </h3>

                <div className="space-y-2">
                  <Label>Nome do Documento Oficial</Label>
                  <Input
                    value={formData.nomeDocumentoOficial}
                    onChange={(e) =>
                      updateFormData("nomeDocumentoOficial", e.target.value)
                    }
                    placeholder="Ex: Ordem de Compra, Autorização de Fornecimento..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Flexibilidade da OC</Label>
                  <div className="flex flex-wrap gap-4">
                    {[
                      "Atendida em partes",
                      "Cancelada após emissão",
                      "Alterada (qtd/prazo)",
                    ].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Checkbox
                          checked={formData.flexibilidadeOC.includes(i)}
                          onCheckedChange={() =>
                            toggleArrayItem("flexibilidadeOC", i)
                          }
                        />{" "}
                        <Label>{i}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Se a ordem for alterada, o que registrar?</Label>
                  <div className="flex flex-wrap gap-4">
                    {["O que mudou", "Quando mudou", "Quem mudou"].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Checkbox
                          checked={formData.rastreabilidadeAlteracaoOC.includes(
                            i,
                          )}
                          onCheckedChange={() =>
                            toggleArrayItem("rastreabilidadeAlteracaoOC", i)
                          }
                        />{" "}
                        <Label>{i}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: LOGÍSTICA E FINANCEIRO */}
          {step === 6 && (
            <div className="space-y-8">
              {/* ENTREGA */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Truck className="h-5 w-5" /> Entrega e Recebimento
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Registrar na Entrega</Label>
                    <div className="space-y-1">
                      {["Chegou?", "Quando?", "Quem recebeu?"].map((i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Checkbox
                            checked={formData.registroEntrega.includes(i)}
                            onCheckedChange={() =>
                              toggleArrayItem("registroEntrega", i)
                            }
                          />{" "}
                          <Label>{i}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Pode entrega parcial?</Label>
                    <Input
                      value={formData.entregaParcial}
                      onChange={(e) =>
                        updateFormData("entregaParcial", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>
                    O que acontece quando dá problema? (Atraso, Falta, Erro)
                  </Label>
                  <Textarea
                    value={formData.tratamentoProblemasEntrega}
                    onChange={(e) =>
                      updateFormData(
                        "tratamentoProblemasEntrega",
                        e.target.value,
                      )
                    }
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Visibilidade (Deve mostrar:)</Label>
                  <div className="flex flex-wrap gap-4 text-sm">
                    {[
                      "O que foi pedido",
                      "O que foi contratado",
                      "O que foi entregue",
                      "O que ficou pendente",
                    ].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Checkbox
                          checked={formData.visibilidadeEntrega.includes(i)}
                          onCheckedChange={() =>
                            toggleArrayItem("visibilidadeEntrega", i)
                          }
                        />{" "}
                        <Label>{i}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* NOTA FISCAL */}
              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <FileText className="h-5 w-5" /> Nota Fiscal
                </h3>

                <div className="space-y-2">
                  <Label>Momento da NF</Label>
                  <Input
                    value={formData.momentoNF}
                    onChange={(e) =>
                      updateFormData("momentoNF", e.target.value)
                    }
                    placeholder="Sempre depois da entrega?"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Permissões</Label>
                  <div className="flex gap-4">
                    {["Mais de uma NF por compra", "NF parcial"].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Checkbox
                          checked={formData.multiplasNFs.includes(i)}
                          onCheckedChange={() =>
                            toggleArrayItem("multiplasNFs", i)
                          }
                        />{" "}
                        <Label>{i}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Workflow da NF (Situações)</Label>
                  <Input
                    value={formData.situacoesNF}
                    onChange={(e) =>
                      updateFormData("situacoesNF", e.target.value)
                    }
                    placeholder="Ex: Recebida -> Conferida -> Liberada -> Paga"
                  />
                </div>
              </div>

              {/* PAGAMENTO */}
              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <CreditCard className="h-5 w-5" /> Pagamento
                </h3>

                <div className="space-y-2">
                  <Label>Gatilho (Só paga depois de quê?)</Label>
                  <Input
                    value={formData.gatilhoPagamento}
                    onChange={(e) =>
                      updateFormData("gatilhoPagamento", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tipos</Label>
                  <div className="flex gap-4">
                    {["Parcial", "Retenção"].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Checkbox
                          checked={formData.tiposPagamento.includes(i)}
                          onCheckedChange={() =>
                            toggleArrayItem("tiposPagamento", i)
                          }
                        />{" "}
                        <Label>{i}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Visibilidade Financeira</Label>
                  <div className="flex gap-4">
                    {["Quanto pagou", "Quanto falta", "Travado"].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Checkbox
                          checked={formData.visibilidadePagamento.includes(i)}
                          onCheckedChange={() =>
                            toggleArrayItem("visibilidadePagamento", i)
                          }
                        />{" "}
                        <Label>{i}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: CADASTROS (ENTIDADES) */}
          {step === 7 && (
            <div className="space-y-8">
              {/* UNIDADES */}
              <div className="space-y-4 bg-slate-50 p-4 rounded border">
                <h3 className="text-lg font-bold flex items-center gap-2 text-blue-800">
                  <Building className="h-5 w-5" /> 13. Cadastro de Unidades /
                  Órgãos
                </h3>

                <Label className="font-semibold block">
                  Campos Obrigatórios:
                </Label>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    "Nome/Órgão",
                    "Sigla",
                    "CNPJ",
                    "Endereço",
                    "Município/Estado",
                    "Telefone",
                    "E-mail",
                    "Responsável",
                    "Setor de Compra",
                    "Centros de Custo",
                    "Código Interno",
                  ].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.camposUnidade.includes(i)}
                        onCheckedChange={() =>
                          toggleArrayItem("camposUnidade", i)
                        }
                      />{" "}
                      <Label>{i}</Label>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-slate-500">
                    Outros Campos (Digite):
                  </Label>
                  <Textarea
                    value={formData.camposUnidadeOutros}
                    onChange={(e) =>
                      updateFormData("camposUnidadeOutros", e.target.value)
                    }
                    rows={2}
                    placeholder="Campos extras da unidade..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label className="font-semibold">Regras</Label>
                    <div className="space-y-1 mt-1">
                      {[
                        "Mais de um Centro Custo",
                        "Mais de um Responsável",
                      ].map((i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Checkbox
                            checked={formData.regrasUnidade.includes(i)}
                            onCheckedChange={() =>
                              toggleArrayItem("regrasUnidade", i)
                            }
                          />{" "}
                          <Label>{i}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="font-semibold">
                      Histórico de Mudança
                    </Label>
                    <div className="space-y-1 mt-1">
                      {[
                        "Mudança de Responsável",
                        "Mudança de Centro Custo",
                      ].map((i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Checkbox
                            checked={formData.historicoUnidade.includes(i)}
                            onCheckedChange={() =>
                              toggleArrayItem("historicoUnidade", i)
                            }
                          />{" "}
                          <Label>{i}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* FORNECEDORES */}
              <div className="space-y-4 bg-slate-50 p-4 rounded border">
                <h3 className="text-lg font-bold flex items-center gap-2 text-blue-800">
                  <Truck className="h-5 w-5" /> 14. Cadastro de Fornecedores
                </h3>

                <Label className="font-semibold block">
                  Campos Obrigatórios:
                </Label>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    "Razão Social",
                    "Nome Fantasia",
                    "CNPJ",
                    "Endereço",
                    "Município/Estado",
                    "Telefone",
                    "E-mail",
                    "Pessoa Contato",
                    "Dados Bancários",
                    "Chave Pix",
                  ].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.camposFornecedor.includes(i)}
                        onCheckedChange={() =>
                          toggleArrayItem("camposFornecedor", i)
                        }
                      />{" "}
                      <Label>{i}</Label>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-slate-500">
                    Outros Campos (Digite):
                  </Label>
                  <Textarea
                    value={formData.camposFornecedorOutros}
                    onChange={(e) =>
                      updateFormData("camposFornecedorOutros", e.target.value)
                    }
                    rows={2}
                    placeholder="Campos extras do fornecedor..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label className="font-semibold">
                      Exigências Medicamentos
                    </Label>
                    <div className="space-y-1 mt-1">
                      {[
                        "Autorização ANVISA",
                        "Alvará Sanitário",
                        "Certidões",
                        "Registro Classe",
                      ].map((i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Checkbox
                            checked={formData.exigenciasFornecedor.includes(i)}
                            onCheckedChange={() =>
                              toggleArrayItem("exigenciasFornecedor", i)
                            }
                          />{" "}
                          <Label>{i}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="font-semibold">Status/Histórico</Label>
                    <div className="space-y-1 mt-1">
                      {[
                        "Ativo/Inativo",
                        "Penalizado",
                        "Histórico Cotações",
                      ].map((i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Checkbox
                            checked={formData.historicoFornecedor.includes(i)}
                            onCheckedChange={() =>
                              toggleArrayItem("historicoFornecedor", i)
                            }
                          />{" "}
                          <Label>{i}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: CAMPOS TÉCNICOS (CHECKLIST GIGANTE) */}
          {step === 8 && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded text-blue-900 mb-4 text-sm">
                <CheckCircle2 className="h-4 w-4 inline mr-2" />
                <strong>Checklist Final:</strong> Marque os campos que devem
                existir no banco de dados para cada etapa. Se faltar algo,
                digite no campo "Outros".
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 15. COTAÇÃO */}
                <div className="border p-4 rounded bg-white shadow-sm">
                  <Label className="font-bold text-lg mb-2 block">
                    15. Campos Cotação (Edital)
                  </Label>
                  <div className="grid grid-cols-1 gap-1 text-sm mb-2">
                    {[
                      "Título",
                      "Data Abertura",
                      "Data Limite",
                      "Observações",
                      "Critério",
                      "Responsável",
                      "Anexos",
                    ].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Checkbox
                          checked={formData.camposBasicosCotacao.includes(i)}
                          onCheckedChange={() =>
                            toggleArrayItem("camposBasicosCotacao", i)
                          }
                        />{" "}
                        <Label>{i}</Label>
                      </div>
                    ))}
                  </div>
                  <Input
                    className="text-xs h-8"
                    placeholder="Outros campos..."
                    value={formData.camposBasicosCotacaoOutros}
                    onChange={(e) =>
                      updateFormData(
                        "camposBasicosCotacaoOutros",
                        e.target.value,
                      )
                    }
                  />
                </div>

                {/* 16. ITENS COTAÇÃO */}
                <div className="border p-4 rounded bg-white shadow-sm">
                  <Label className="font-bold text-lg mb-2 block">
                    16. Item Cotação
                  </Label>
                  <div className="grid grid-cols-1 gap-1 text-sm mb-2">
                    {[
                      "Medicamento",
                      "Dosagem",
                      "Quantidade",
                      "Unidade Medida",
                      "Obs. Técnicas",
                      "Aceita Subst.",
                      "Valor Estimado",
                    ].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Checkbox
                          checked={formData.camposItemCotacao.includes(i)}
                          onCheckedChange={() =>
                            toggleArrayItem("camposItemCotacao", i)
                          }
                        />{" "}
                        <Label>{i}</Label>
                      </div>
                    ))}
                  </div>
                  <Input
                    className="text-xs h-8"
                    placeholder="Outros campos..."
                    value={formData.camposItemCotacaoOutros}
                    onChange={(e) =>
                      updateFormData("camposItemCotacaoOutros", e.target.value)
                    }
                  />
                </div>

                {/* 17. PROPOSTAS */}
                <div className="border p-4 rounded bg-white shadow-sm">
                  <Label className="font-bold text-lg mb-2 block">
                    17. Propostas
                  </Label>
                  <div className="grid grid-cols-1 gap-1 text-sm mb-2">
                    {[
                      "Fornecedor",
                      "Valor Total",
                      "Prazo Entrega",
                      "Validade",
                      "Obs. Fornecedor",
                    ].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Checkbox
                          checked={formData.camposProposta.includes(i)}
                          onCheckedChange={() =>
                            toggleArrayItem("camposProposta", i)
                          }
                        />{" "}
                        <Label>{i}</Label>
                      </div>
                    ))}
                    <div className="mt-2 font-semibold text-xs uppercase">
                      Por Item:
                    </div>
                    {["Valor Unitário", "Qtd Atendida", "Marca/Lab"].map(
                      (i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Checkbox
                            checked={formData.camposItemProposta.includes(i)}
                            onCheckedChange={() =>
                              toggleArrayItem("camposItemProposta", i)
                            }
                          />{" "}
                          <Label>{i}</Label>
                        </div>
                      ),
                    )}
                  </div>
                  <Input
                    className="text-xs h-8"
                    placeholder="Outros campos..."
                    value={formData.camposPropostaOutros}
                    onChange={(e) =>
                      updateFormData("camposPropostaOutros", e.target.value)
                    }
                  />
                </div>

                {/* 18. ORDEM DE COMPRA */}
                <div className="border p-4 rounded bg-white shadow-sm">
                  <Label className="font-bold text-lg mb-2 block">
                    18. Ordem de Compra
                  </Label>
                  <div className="grid grid-cols-1 gap-1 text-sm mb-2">
                    {[
                      "Número",
                      "Fornecedor",
                      "Data Emissão",
                      "Valor Total",
                      "Lista Itens",
                      "Prazo Previsto",
                      "Responsável",
                      "Anexos",
                      "Observações",
                    ].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Checkbox
                          checked={formData.camposOrdemCompra.includes(i)}
                          onCheckedChange={() =>
                            toggleArrayItem("camposOrdemCompra", i)
                          }
                        />{" "}
                        <Label>{i}</Label>
                      </div>
                    ))}
                  </div>
                  <Input
                    className="text-xs h-8"
                    placeholder="Outros campos..."
                    value={formData.camposOrdemCompraOutros}
                    onChange={(e) =>
                      updateFormData("camposOrdemCompraOutros", e.target.value)
                    }
                  />
                </div>

                {/* 19. ENTREGA */}
                <div className="border p-4 rounded bg-white shadow-sm">
                  <Label className="font-bold text-lg mb-2 block">
                    19. Registro Entrega
                  </Label>
                  <div className="grid grid-cols-1 gap-1 text-sm mb-2">
                    {[
                      "Data",
                      "Quem Recebeu",
                      "Qtd Entregue",
                      "Divergência",
                      "Observações",
                    ].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Checkbox
                          checked={formData.camposRegistroEntrega.includes(i)}
                          onCheckedChange={() =>
                            toggleArrayItem("camposRegistroEntrega", i)
                          }
                        />{" "}
                        <Label>{i}</Label>
                      </div>
                    ))}
                  </div>
                  <Input
                    className="text-xs h-8"
                    placeholder="Outros campos..."
                    value={formData.camposRegistroEntregaOutros}
                    onChange={(e) =>
                      updateFormData(
                        "camposRegistroEntregaOutros",
                        e.target.value,
                      )
                    }
                  />
                </div>

                {/* 20. NOTA FISCAL */}
                <div className="border p-4 rounded bg-white shadow-sm">
                  <Label className="font-bold text-lg mb-2 block">
                    20. Nota Fiscal
                  </Label>
                  <div className="grid grid-cols-1 gap-1 text-sm mb-2">
                    {[
                      "Número",
                      "Data Emissão",
                      "Valor Total",
                      "Chave Acesso",
                      "Obs",
                      "XML",
                      "PDF",
                    ].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Checkbox
                          checked={formData.camposRegistroNF.includes(i)}
                          onCheckedChange={() =>
                            toggleArrayItem("camposRegistroNF", i)
                          }
                        />{" "}
                        <Label>{i}</Label>
                      </div>
                    ))}
                  </div>
                  <Input
                    className="text-xs h-8"
                    placeholder="Outros campos..."
                    value={formData.camposRegistroNFOutros}
                    onChange={(e) =>
                      updateFormData("camposRegistroNFOutros", e.target.value)
                    }
                  />
                </div>

                {/* 21. PAGAMENTO */}
                <div className="border p-4 rounded bg-white shadow-sm">
                  <Label className="font-bold text-lg mb-2 block">
                    21. Pagamento
                  </Label>
                  <div className="grid grid-cols-1 gap-1 text-sm mb-2">
                    {[
                      "Data Prevista",
                      "Data Efetiva",
                      "Valor Pago",
                      "Forma Pagamento",
                      "Obs (Retenções)",
                    ].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Checkbox
                          checked={formData.camposRegistroPagamento.includes(i)}
                          onCheckedChange={() =>
                            toggleArrayItem("camposRegistroPagamento", i)
                          }
                        />{" "}
                        <Label>{i}</Label>
                      </div>
                    ))}
                  </div>
                  <Input
                    className="text-xs h-8"
                    placeholder="Outros campos..."
                    value={formData.camposRegistroPagamentoOutros}
                    onChange={(e) =>
                      updateFormData(
                        "camposRegistroPagamentoOutros",
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <div className="p-6 border-t bg-slate-50 flex justify-between rounded-b-lg">
          <Button
            onClick={prevStep}
            variant="outline"
            disabled={step === 1}
            className="cursor-pointer bg-white"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>
          <Button
            onClick={nextStep}
            className="cursor-pointer bg-blue-600 hover:bg-blue-700"
          >
            {step === totalSteps ? (
              <>
                Finalizar Levantamento
                <CheckCircle2 className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Próxima Etapa
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
