import { useState } from 'react';
import './App.css';

function App() {
  // 1. Estados de Navegação e Dados
  const [telaAtual, setTelaAtual] = useState('vitrine'); // 'vitrine' ou 'checkout'
  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  
  // 2. Estados internos da tela de Checkout
  const [quantidadeCartoes, setQuantidadeCartoes] = useState(1);
  const [menuAberto, setMenuAberto] = useState('credito'); // 'credito', 'pix', 'boleto'
  const [carregando, setCarregando] = useState(false);

  // Banco de dados simulado da nossa vitrine de serviços do Pet Shop
  const servicosDisponiveis = [
    {
      id: 101,
      nome: "Plano Mensal Ultimate + Estética",
      descricao: "Acesso livre a consultas, banho semanal, tosa higiênica e transporte leva-e-traz incluso.",
      preco: 76.90,
      icone: "💎"
    },
    {
      id: 102,
      nome: "Hospedagem Familiar Premium (Diária)",
      descricao: "Ambiente climatizado, monitoramento por câmera 24h e socialização supervisionada para o seu pet.",
      preco: 45.00,
      icone: "🏨"
    },
    {
      id: 103,
      nome: "Combo Banho, Tosa e Hidratação",
      descricao: "Estética completa com produtos hipoalergênicos, corte de unhas e limpeza de ouvidos inclusos.",
      preco: 120.00,
      icone: "✂️"
    }
  ];

  // Ação de selecionar o serviço e ir para o checkout
  const iniciarContratacao = (servico) => {
    setServicoSelecionado(servico);
    setTelaAtual('checkout');
    setMenuAberto('credito'); // Reset padrão ao entrar
    setQuantidadeCartoes(1);
  };

  // Envio final para o backend Node.js (Gravação no MySQL)
  const processarPagamentoBanco = async (metodoPagamento) => {
    const dataHoraAtual = new Date().toLocaleString('pt-BR');
    const confirmar = window.confirm(`Confirmar o pagamento de R$ ${servicoSelecionado.preco.toFixed(2)} via [${metodoPagamento}]?`);
    if (!confirmar) return;

    setCarregando(true);

    // Mapeamento correto para as colunas do seu banco (nome, idade, cpf)
    const payloadTransacao = {
      nome: "Bruninho Almeida", // Nome do usuário logado
      idade: quantidadeCartoes, // Campo numérico aproveitado para salvar o formato do cartão
      cpf: `Pedido #${servicoSelecionado.id} | ${servicoSelecionado.nome} | Método: ${metodoPagamento} | Data: ${dataHoraAtual} | Total: R$ ${servicoSelecionado.preco.toFixed(2)}`
    };

    try {
      const resposta = await fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloadTransacao),
      });

      if (resposta.ok) {
        alert(`🎉 Transação autorizada com sucesso!\nO pagamento via ${metodoPagamento} foi registrado no banco de dados.`);
        setTelaAtual('vitrine'); // Retorna à vitrine após sucesso
      } else {
        alert('❌ Erro: O servidor recusou a gravação do pagamento.');
      }
    } catch (erro) {
      console.error(erro);
      alert('⚠️ Servidor backend offline! Verifique se seu script do Node na porta 3001 está rodando.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="petcare-app">
      
      {/* ==========================================================================
         TELA 1: VITRINE DE SERVIÇOS (CATÁLOGO)
         ========================================================================== */}
      {telaAtual === 'vitrine' && (
        <div className="vitrine-screen">
          <header className="main-navbar">
            <div className="brand-logo">🐾 PetCare</div>
            <div className="user-profile-badge">Olá, Bruninho</div>
          </header>

          <section className="hero-section">
            <h1>Nossa Vitrine de Serviços</h1>
            <p>Escolha o melhor cuidado para o seu amigo e pague com total segurança.</p>
          </section>

          <main className="catalog-grid">
            {servicosDisponiveis.map((item) => (
              <div key={item.id} className="service-catalog-card">
                <div className="card-badge-icon">{item.icone}</div>
                <h3>{item.nome}</h3>
                <p className="service-desc">{item.descricao}</p>
                <div className="card-footer-price">
                  <span className="price-tag">R$ {item.preco.toFixed(2).replace('.', ',')}</span>
                  <button className="btn-buy-service" onClick={() => iniciarContratacao(item)}>
                    Contratar
                  </button>
                </div>
              </div>
            ))}
          </main>
        </div>
      )}

      {/* ==========================================================================
         TELA 2: GATEWAY DE PAGAMENTO (ESTILO E-SITEF VERMELHO)
         ========================================================================== */}
      {telaAtual === 'checkout' && servicoSelecionado && (
        <div className="gateway-page">
          
          <div className="gateway-top-bar">
            <div className="gateway-logo">
              🐾 <span>PetCare</span> <small>Solução Inteligente</small>
            </div>
          </div>

          <div className="gateway-steps-banner">
            <div className="gateway-steps-container">
              <div className="step-item step-active">
                <span className="step-icon">💳</span>
                <span className="step-text">1. SELECIONE A FORMA DE PAGAMENTO</span>
              </div>
              <div className="step-item step-disabled">
                <span className="step-icon">📝</span>
                <span className="step-text">2. AUTENTICAÇÃO</span>
              </div>
              <div className="step-item step-disabled">
                <span className="step-icon">✓</span>
                <span className="step-text">3. CONFIRMAÇÃO</span>
              </div>
              
              <div className="secure-badge-box">
                <div className="secure-lock-icon">🔒</div>
                <div className="secure-badge-text">
                  <strong>SITE 100%</strong>
                  <span>SEGURO</span>
                </div>
              </div>
            </div>
          </div>

          <main className="gateway-main-content">
            
            {/* Coluna da Esquerda: Métodos Interativos */}
            <div className="gateway-left-column">
              <div className="payment-title-row">
                <span className="red-dollar-circle">$</span>
                <h2>Escolha a forma de pagamento</h2>
              </div>

              {/* Seleção de Abas Funcional */}
              <div className="payment-tabs-row">
                <button 
                  className={`tab-btn ${quantidadeCartoes === 1 ? 'active' : ''}`}
                  onClick={() => setQuantidadeCartoes(1)}
                >
                  PAGAR COM 1 CARTÃO
                </button>
                <button 
                  className={`tab-btn ${quantidadeCartoes === 2 ? 'active' : ''}`}
                  onClick={() => setQuantidadeCartoes(2)}
                >
                  PAGAR COM 2 CARTÕES
                </button>
              </div>

              <div className="accordion-group">
                
                {/* Sanfona 1: Cartão de Crédito */}
                <div className={`accordion-panel ${menuAberto === 'credito' ? 'is-open' : ''}`}>
                  <div className="accordion-header" onClick={() => setMenuAberto(menuAberto === 'credito' ? '' : 'credito')}>
                    <span>CARTÃO DE CRÉDITO {quantidadeCartoes === 2 && '(CARTÃO 1)'}</span>
                    <span className="accordion-arrow">{menuAberto === 'credito' ? '▲' : '▼'}</span>
                  </div>
                  
                  {menuAberto === 'credito' && (
                    <div className="accordion-body">
                      <p className="select-brand-instruction">Selecione a bandeira do seu cartão para processar:</p>
                      <div className="brands-grid">
                        <button className="brand-card-button" disabled={carregando} onClick={() => processarPagamentoBanco('Crédito - Mastercard')}>
                          <div className="brand-logo-placeholder mc-colors">
                            <span className="circle-red"></span>
                            <span className="circle-orange"></span>
                          </div>
                          <span className="brand-name">Mastercard</span>
                        </button>

                        <button className="brand-card-button" disabled={carregando} onClick={() => processarPagamentoBanco('Crédito - Visa')}>
                          <div className="brand-logo-placeholder visa-text">VISA</div>
                          <span className="brand-name">Visa</span>
                        </button>

                        <button className="brand-card-button" disabled={carregando} onClick={() => processarPagamentoBanco('Crédito - Elo')}>
                          <div className="brand-logo-placeholder elo-text">elo</div>
                          <span className="brand-name">Elo</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sanfona 2: PIX */}
                <div className={`accordion-panel ${menuAberto === 'pix' ? 'is-open' : ''}`}>
                  <div className="accordion-header" onClick={() => setMenuAberto(menuAberto === 'pix' ? '' : 'pix')}>
                    <span>PIX À VISTA</span>
                    <span className="accordion-arrow">{menuAberto === 'pix' ? '▲' : '▼'}</span>
                  </div>
                  
                  {menuAberto === 'pix' && (
                    <div className="accordion-body">
                      <p className="select-brand-instruction">Clique abaixo para gerar o QR Code dinâmico do PIX.</p>
                      <button className="btn-gateway-action" disabled={carregando} onClick={() => processarPagamentoBanco('PIX')}>
                        {carregando ? 'Gerando PIX...' : 'Gerar Código PIX'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Sanfona 3: Boleto */}
                <div className={`accordion-panel ${menuAberto === 'boleto' ? 'is-open' : ''}`}>
                  <div className="accordion-header" onClick={() => setMenuAberto(menuAberto === 'boleto' ? '' : 'boleto')}>
                    <span>BOLETO BANCÁRIO</span>
                    <span className="accordion-arrow">{menuAberto === 'boleto' ? '▲' : '▼'}</span>
                  </div>
                  
                  {menuAberto === 'boleto' && (
                    <div className="accordion-body">
                      <p className="select-brand-instruction">Gere o boleto para pagamento em qualquer banco ou casa lotérica.</p>
                      <button className="btn-gateway-action" disabled={carregando} onClick={() => processarPagamentoBanco('Boleto')}>
                        {carregando ? 'Gerando Boleto...' : 'Gerar Código de Barras'}
                      </button>
                    </div>
                  )}
                </div>

              </div>

              {/* Botão Cancelar que Volta para a Vitrine */}
              <div className="cancel-row">
                <button className="cancel-btn-link" onClick={() => setTelaAtual('vitrine')}>
                  ← Cancelar transação e voltar para a vitrine
                </button>
              </div>
            </div>

            {/* Coluna da Direita: Resumo Real Baseado no Item Escolhido */}
            <div className="gateway-right-column">
              <div className="summary-red-card">
                <h3>RESUMO DA COMPRA / SERVIÇO</h3>
                
                <div className="summary-details">
                  <p className="summary-item-name"><strong>Item:</strong> {servicoSelecionado.nome}</p>
                  <p><strong>Pedido:</strong> #{servicoSelecionado.id}</p>
                  <p><strong>Modo:</strong> {quantidadeCartoes === 1 ? '1 Cartão único' : 'Dividido em 2 Cartões'}</p>
                </div>

                <hr className="summary-divider" />

                <div className="summary-total-section">
                  <span className="total-label-text">VALOR TOTAL</span>
                  <h2 className="total-price-text">R$ {servicoSelecionado.preco.toFixed(2).replace('.', ',')}</h2>
                </div>
              </div>
            </div>

          </main>

          <footer className="gateway-footer">
            <p>PetCare Express © 1986-2026 | Todos os direitos reservados. Processado via Gateway PetCare.</p>
          </footer>
        </div>
      )}

    </div>
  );
}

export default App;