import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

const content = {
  en: {
    back: "Back",
    title: "Website Terms of Use",
    updated: "Last updated: July 18th, 2026 · Version 1.1",
    sections: [
      {
        h: "1. Acceptance of These Terms",
        p: "These Terms of Use (the “Terms”) govern access to and use of the website located at www.odara.lu (the “Website”), operated by Odara Capital Partners SPV, a company incorporated under the laws of the Grand Duchy of Luxembourg, with registered office at 2 Parc d'Activités Capellen, 8308 Capellen Mamer, Luxembourg, registered with the Luxembourg Trade and Companies Register (RCS Luxembourg).",
        p2: "By accessing or using the Website, you confirm that you have read, understood and agree to be bound by these Terms and by our Privacy Notice and Cookie Policy, which are incorporated by reference. If you do not agree with these Terms, you must not access or use the Website.",
        p3: "If you access the Website on behalf of a company, fund, institution or other legal entity, you represent and warrant that you are duly authorised to bind that entity, and “you” shall refer to that entity.",
      },
      {
        h: "2. Definitions",
        bullets: [
          "“Content” means all information, text, documents, presentations, data, graphics, logos, images, audiovisual material and software made available on or through the Website.",
          "“Services” means the origination, structuring and arrangement of international credit facilities and related capital-markets solutions described on the Website, which are provided exclusively under separate written agreements.",
          "“Professional Counterparty” means a person or entity qualifying as a professional client or eligible counterparty within the meaning of Annex II of Directive 2014/65/EU (MiFID II), a qualified investor within the meaning of Regulation (EU) 2017/1129 (the Prospectus Regulation), an institutional or professional investor under applicable Luxembourg law, or an equivalent category under the laws of its home jurisdiction, including, in Brazil, an “investidor profissional” or “investidor qualificado” within the meaning of CVM Resolution No. 30/2021.",
          "“Data Protection Laws” means Regulation (EU) 2016/679 (the “GDPR”), the Luxembourg Law of 1 August 2018 on the organisation of the CNPD and the general data-protection framework, Brazilian Federal Law No. 13,709/2018 (the “LGPD”), and any other applicable privacy or data-protection legislation.",
        ],
      },
      {
        h: "3. Informational Purpose Only — No Offer or Solicitation",
        p: "The Website and its Content are provided for general information purposes only. Nothing on the Website constitutes, or shall be construed as: (a) an offer, invitation, solicitation or recommendation to buy, sell, subscribe for or underwrite any security, note, financial instrument or investment; (b) an offer to provide financing, credit, lending or arranging services; or (c) the marketing of any alternative investment fund or collective investment undertaking in any jurisdiction.",
        p2: "Any securitisation notes, debt instruments or credit facilities referred to on the Website are made available exclusively to Professional Counterparties, on a private-placement basis, pursuant to definitive transaction documentation, and only in jurisdictions where such offering is lawful. In respect of Brazil, no instrument described on the Website has been or will be registered with the Brazilian Securities Commission (Comissão de Valores Mobiliários – CVM), and no public offering of securities is being made in Brazil.",
        p3: "The Content does not take into account the objectives, financial situation or needs of any particular person and must not be relied upon as the basis for any decision.",
      },
      {
        h: "4. Eligibility and Access Restrictions",
        p: "The Website is directed exclusively at Professional Counterparties and at corporate borrowers, advisers and business partners acting in a professional capacity. It is not directed at retail investors or at consumers, and no part of the Website constitutes an offer of products or services to the public.",
        p2: "The Website is not directed at any person in any jurisdiction where the publication of, or access to, the Website is prohibited or restricted. Persons who access the Website are responsible for informing themselves about, and observing, all applicable legal and regulatory restrictions in their own jurisdiction. In particular, the Content is not directed at any “U.S. person” as defined in Regulation S under the U.S. Securities Act of 1933, as amended.",
        p3: "You must be at least 18 years of age (or the age of legal majority in your jurisdiction) to use the Website.",
      },
      {
        h: "5. Regulatory Status",
        p: "Odara operates through a Luxembourg securitization vehicle established in accordance with the Luxembourg Law of 22 March 2004 on securitization, as amended (the “Securitization Law”), structured with multiple compartments, each of which is legally segregated.",
        p2: "Odara is not a licensed credit institution, investment firm, alternative investment fund manager or insurance undertaking, and does not hold client money or provide custody services. Odara does not provide investment advice, portfolio management, legal, tax, accounting or regulatory advice.",
        p3: "References on the Website to “partners”, “partnership” or similar expressions describe commercial relationships and do not imply the existence of a legal partnership, joint venture or agency between Odara and any third party.",
      },
      {
        h: "6. No Advice; Independent Assessment",
        p: "Nothing on the Website constitutes investment, legal, tax, accounting or other professional advice. Before entering into any transaction, you should conduct your own independent assessment and consult your own professional advisers regarding the legal, regulatory, tax, credit, accounting and financial suitability and consequences of the transaction.",
        p2: "Any decision to participate in a credit facility, subscribe for notes or engage the Services shall be made solely on the basis of definitive transaction documentation, including any offering memorandum, facility agreement, compartment terms and risk disclosures, and not on the basis of the Website.",
      },
      {
        h: "7. Performance, Projections and Risk Warning",
        p: "Structured credit and private-debt transactions involve significant risks, including credit risk, liquidity risk, currency and transfer risk, emerging-markets risk, legal and enforcement risk, and the risk of total loss of principal. Past performance is not indicative of future results. No representation is made, and no assurance, warranty or guarantee is given, as to the future performance, yield, repayment or outcome of any transaction, facility or instrument.",
        p2: "Any forward-looking statements, targets, scenarios or illustrative figures appearing on the Website reflect assumptions as of the date of publication, are subject to change without notice, and involve known and unknown risks and uncertainties. Actual results may differ materially. Odara undertakes no obligation to update any forward-looking statement.",
      },
      {
        h: "8. Anti-Money-Laundering, Sanctions and Know-Your-Customer",
        p: "Odara conducts its activities in compliance with applicable anti-money-laundering and counter-terrorist-financing legislation, including the Luxembourg Law of 12 November 2004, as amended, EU AML directives and regulations, and, where applicable, Brazilian Law No. 9,613/1998. Any engagement of the Services is conditional upon the satisfactory completion of client identification, verification, source-of-funds and sanctions screening procedures.",
        p2: "You represent that you are not, and are not owned or controlled by, a person subject to sanctions administered by the European Union, the United Nations, the U.S. Office of Foreign Assets Control (OFAC), His Majesty’s Treasury (UK) or any equivalent authority, and that your use of the Website and any engagement with Odara will not violate applicable sanctions or export-control laws.",
      },
      {
        h: "9. Intellectual Property",
        p: "The Website and all Content — including the Odara name, logo, brand elements, texts, methodologies, analyses, presentations, graphics and design — are owned by or licensed to Odara and are protected by copyright, trademark and other intellectual-property laws of Luxembourg, the European Union, Brazil and international treaties.",
        p2: "You are granted a limited, non-exclusive, non-transferable and revocable licence to access the Website and to view, download and print Content solely for your internal, non-commercial evaluation of the Services, provided that all proprietary notices are retained. Any other use — including reproduction, modification, distribution, republication, framing, scraping, text and data mining, or the training of artificial-intelligence models on the Content — is prohibited without our prior written consent.",
      },
      {
        h: "10. Acceptable Use",
        p: "When using the Website, you agree not to:",
        bullets: [
          "use the Website in violation of any applicable law or regulation, or for any fraudulent or unlawful purpose;",
          "attempt to gain unauthorised access to the Website, its servers, or any connected database or system, or to test its vulnerability without authorisation;",
          "introduce viruses, malware or other technologically harmful material, or take any action that imposes an unreasonable load on our infrastructure;",
          "use robots, crawlers, scrapers or other automated means to access or extract Content, except standard search-engine indexing;",
          "misrepresent your identity, professional status or eligibility, or impersonate any person or entity; or",
          "use the Website to transmit unsolicited commercial communications.",
        ],
        p2: "We may suspend or terminate access to the Website, without notice, in case of breach of these Terms.",
      },
      {
        h: "11. Electronic Communications and Contact Forms",
        p: "Information submitted through contact forms, e-mail or other electronic channels is not guaranteed to be secure, confidential or received. Do not transmit sensitive, confidential or price-sensitive information through the Website. Sending information to Odara does not create any advisory, fiduciary, mandate or client relationship, which may only be established through a duly executed written agreement and completion of onboarding procedures.",
      },
      {
        h: "12. Data Protection — GDPR and LGPD",
        p: "Odara processes personal data in accordance with the Data Protection Laws. This Section provides a summary; the full details are set out in our Privacy Notice available at [link], which prevails in case of divergence.",
        subsections: [
          {
            h: "12.1 Controller and contact",
            p: "The controller of personal data collected through the Website is Odara Capital Partners SPV, registered office at 2 Parc d'Activités Capellen, 8308 Capellen Mamer, Luxembourg, e-mail: contact@odaracapital.com.",
          },
          {
            h: "12.2 Categories of data and purposes",
            p: "We process identification and professional contact data (name, e-mail, entity, role, jurisdiction), correspondence content, technical data (IP address, device and browser information, logs) and, in the context of onboarding, KYC/AML data. Purposes include: responding to enquiries; assessing eligibility as a Professional Counterparty; performing pre-contractual and contractual steps; complying with legal obligations (including AML/CFT and sanctions screening); ensuring the security of the Website; and, subject to consent where required, sending institutional communications.",
          },
          {
            h: "12.3 Legal bases",
            p: "Depending on the context, processing is based on: performance of a contract or pre-contractual measures (Art. 6(1)(b) GDPR; Art. 7, V LGPD); compliance with legal obligations (Art. 6(1)(c) GDPR; Art. 7, II LGPD); our legitimate interests in operating, securing and promoting our business (Art. 6(1)(f) GDPR; Art. 7, IX LGPD), subject to a balancing assessment; and consent where required, in particular for non-essential cookies and marketing (Art. 6(1)(a) GDPR; Art. 7, I LGPD). Consent may be withdrawn at any time without affecting prior processing.",
          },
          {
            h: "12.4 International transfers",
            p: "Given the international nature of our activities, personal data may be transferred between the European Union, Brazil and other jurisdictions. Transfers out of the EEA are carried out under Chapter V GDPR, using adequacy decisions or Standard Contractual Clauses with supplementary measures where required. Transfers out of Brazil comply with Articles 33 et seq. LGPD and ANPD Resolution CD/ANPD No. 19/2024, including, where applicable, the ANPD standard contractual clauses.",
          },
          {
            h: "12.5 Retention",
            p: "Personal data is retained only as long as necessary for the purposes described, and thereafter as required by law — including Luxembourg AML record-keeping obligations (in principle five years after the end of the business relationship) and applicable limitation periods — after which it is deleted or anonymised.",
          },
          {
            h: "12.6 Your rights",
            p: "Subject to legal conditions and exemptions, you have the rights of access, rectification, erasure/deletion, restriction, portability and objection under the GDPR, and the corresponding rights under Article 18 LGPD, including confirmation of processing, anonymisation or blocking of unnecessary data, information on sharing, and review of automated decisions. Requests may be addressed to contact@odaracapital.com. You may also lodge a complaint with the Luxembourg Commission Nationale pour la Protection des Données (CNPD), with the supervisory authority of your habitual residence in the EU, or with the Brazilian Autoridade Nacional de Proteção de Dados (ANPD).",
          },
          {
            h: "12.7 Security",
            p: "We implement appropriate technical and organisational measures — including encryption in transit, access controls and logging — designed to protect personal data against unauthorised access, loss, alteration or disclosure, consistent with Article 32 GDPR and Articles 46–49 LGPD.",
          },
        ],
      },
      {
        h: "13. Cookies",
        p: "The Website uses strictly necessary cookies and, subject to your prior consent, analytics and functionality cookies. Consent is collected through a cookie banner and may be modified or withdrawn at any time through the cookie-preferences panel. Details of each cookie, its purpose and duration are set out in the Cookie Policy at [link].",
      },
      {
        h: "14. Third-Party Websites and Content",
        p: "The Website may contain links to third-party websites, including those of partners, service providers and market-data sources. Such links are provided for convenience only. Odara does not control, endorse or assume any responsibility for the content, security or privacy practices of third-party websites, which are governed by their own terms and policies.",
      },
      {
        h: "15. Disclaimer of Warranties",
        p: "The Website and the Content are provided on an “as is” and “as available” basis. To the fullest extent permitted by applicable law, Odara disclaims all warranties, express or implied, including as to accuracy, completeness, timeliness, merchantability, fitness for a particular purpose, non-infringement, availability and freedom from errors or harmful components. Odara does not warrant that the Website will be uninterrupted, secure or error-free, and may modify, suspend or discontinue the Website at any time without notice.",
      },
      {
        h: "16. Limitation of Liability",
        p: "To the fullest extent permitted by applicable law, Odara, its shareholders, directors, officers, employees, agents and advisers shall not be liable for any indirect, incidental, special, consequential or punitive damages, or for any loss of profits, revenue, business, opportunity, goodwill or data, arising out of or in connection with the use of, or inability to use, the Website or reliance on any Content, whether in contract, tort (including negligence) or otherwise, even if advised of the possibility of such damages.",
        p2: "Nothing in these Terms excludes or limits liability for fraud, willful misconduct or gross negligence, or any other liability that cannot be excluded or limited under mandatory provisions of applicable law, including, where applicable to consumers, mandatory rules of the Brazilian Civil Code and Consumer Protection Code.",
      },
      {
        h: "17. Indemnification",
        p: "You agree to indemnify and hold harmless Odara and its affiliates, directors, officers and employees from and against any claims, liabilities, damages, losses and expenses (including reasonable legal fees) arising out of or related to your breach of these Terms, your misuse of the Website, or your violation of any law or the rights of any third party.",
      },
      {
        h: "18. Amendments",
        p: "We may amend these Terms at any time by publishing a revised version on the Website with an updated “Last updated” date. Amendments take effect upon publication. Your continued use of the Website after publication constitutes acceptance of the amended Terms. We encourage you to review these Terms periodically.",
      },
      {
        h: "19. General Provisions",
        provisions: [
          {
            label: "Severability.",
            text: "If any provision of these Terms is held invalid or unenforceable, the remaining provisions shall remain in full force and effect, and the invalid provision shall be replaced by a valid provision that most closely reflects its intent.",
          },
          {
            label: "No waiver.",
            text: "Failure or delay by Odara in exercising any right under these Terms shall not constitute a waiver of that right.",
          },
          {
            label: "Assignment.",
            text: "You may not assign your rights or obligations under these Terms. Odara may assign these Terms to an affiliate or successor.",
          },
          {
            label: "Entire agreement.",
            text: "These Terms, together with the Privacy Notice and the Cookie Policy, constitute the entire agreement between you and Odara regarding the use of the Website, and supersede any prior understandings on that subject. They do not govern the Services, which are subject to separate written agreements.",
          },
          {
            label: "Languages.",
            text: "These Terms may be made available in English, Portuguese and French. In case of divergence, the English version shall prevail, except where mandatory law provides otherwise.",
          },
        ],
      },
      {
        h: "20. Governing Law and Jurisdiction",
        p: "These Terms, and any non-contractual obligations arising out of or in connection with them, are governed by the laws of the Grand Duchy of Luxembourg. The courts of the district of Luxembourg City shall have exclusive jurisdiction over any dispute arising out of or in connection with these Terms or the use of the Website, without prejudice to mandatory jurisdiction and consumer-protection rules that may apply in favor of users domiciled in other jurisdictions, including Brazil.",
      },
      {
        h: "21. Contact",
        p: "Odara Capital Partners",
        p2: "Registered office: 2 Parc d'Activités Capellen, 8308 Capellen Mamer, Luxembourg, Grand Duchy of Luxembourg — RCS Luxembourg.",
        p3: "General enquiries and data protection: contact@odaracapital.com",
      },
    ],
  },
  pt: {
    back: "Voltar",
    title: "Termos de Uso do Website",
    updated: "Última atualização: 18 de julho de 2026 · Versão 1.1",
    sections: [
      {
        h: "1. Aceitação destes Termos",
        p: "Estes Termos de Uso (os \"Termos\") regem o acesso e a utilização do website www.odara.lu (o \"Website\"), operado pela Odara Capital Partners SPV, sociedade constituída segundo as leis do Grão-Ducado de Luxemburgo, com sede em 2 Parc d'Activités Capellen, 8308 Capellen Mamer, Luxemburgo, registrada no Registro de Comércio e Sociedades de Luxemburgo (RCS Luxembourg).",
        p2: "Ao acessar ou utilizar o Website, você confirma que leu, entendeu e concorda em se vincular a estes Termos e à nossa Política de Privacidade, incorporada por referência. Caso não concorde com estes Termos, não acesse nem utilize o Website.",
        p3: "Caso acesse o Website em nome de uma empresa, fundo, instituição ou outra pessoa jurídica, você declara e garante estar devidamente autorizado a vincular essa entidade, e \"você\" passa a se referir a essa entidade.",
      },
      {
        h: "2. Definições",
        bullets: [
          "\"Conteúdo\" significa toda informação, texto, documentos, apresentações, dados, gráficos, logotipos, imagens, material audiovisual e software disponibilizados no ou através do Website.",
          "\"Serviços\" significa a originação, estruturação e arranjo de operações internacionais de crédito e soluções correlatas de mercado de capitais descritas no Website, prestadas exclusivamente sob acordos escritos específicos.",
          "\"Contraparte Profissional\" significa pessoa ou entidade que se qualifique como cliente profissional ou contraparte elegível nos termos do Anexo II da Diretiva 2014/65/UE (MiFID II), investidor qualificado nos termos do Regulamento (UE) 2017/1129, investidor institucional ou profissional segundo a legislação luxemburguesa aplicável, ou categoria equivalente na sua jurisdição de origem, incluindo, no Brasil, \"investidor profissional\" ou \"investidor qualificado\" nos termos da Resolução CVM nº 30/2021.",
          "\"Leis de Proteção de Dados\" significa o Regulamento (UE) 2016/679 (\"GDPR\"), a Lei de Luxemburgo de 1º de agosto de 2018 sobre a organização da CNPD e o arcabouço geral de proteção de dados, a Lei Federal brasileira nº 13.709/2018 (\"LGPD\"), e qualquer outra legislação de privacidade ou proteção de dados aplicável.",
        ],
      },
      {
        h: "3. Finalidade Informativa — Sem Oferta ou Solicitação",
        p: "O Website e seu Conteúdo são fornecidos apenas para fins informativos gerais. Nada no Website constitui, ou deve ser interpretado como: (a) oferta, convite, solicitação ou recomendação de compra, venda, subscrição ou colocação de qualquer valor mobiliário, título, instrumento financeiro ou investimento; (b) oferta de serviços de financiamento, crédito, empréstimo ou intermediação; ou (c) comercialização de fundo de investimento alternativo ou veículo de investimento coletivo em qualquer jurisdição.",
        p2: "Quaisquer notas de securitização, instrumentos de dívida ou operações de crédito mencionados no Website são disponibilizados exclusivamente a Contrapartes Profissionais, em regime de colocação privada, mediante documentação definitiva de transação, e apenas nas jurisdições em que tal oferta seja lícita. Em relação ao Brasil, nenhum instrumento descrito no Website foi ou será registrado na Comissão de Valores Mobiliários (CVM), e nenhuma oferta pública de valores mobiliários está sendo realizada no Brasil.",
        p3: "O Conteúdo não considera os objetivos, a situação financeira ou as necessidades de qualquer pessoa em particular e não deve ser utilizado como base para qualquer decisão.",
      },
      {
        h: "4. Elegibilidade e Restrições de Acesso",
        p: "O Website destina-se exclusivamente a Contrapartes Profissionais e a tomadores corporativos, assessores e parceiros de negócio atuando em caráter profissional. Não se destina a investidores de varejo ou consumidores, e nenhuma parte do Website constitui oferta de produtos ou serviços ao público em geral.",
        p2: "O Website não se destina a pessoas em jurisdições onde sua publicação ou acesso sejam proibidos ou restritos. Cabe a quem acessa o Website informar-se e observar as restrições legais e regulatórias aplicáveis em sua própria jurisdição. Em particular, o Conteúdo não se destina a nenhuma \"U.S. person\" conforme definido no Regulation S do U.S. Securities Act de 1933, conforme alterado.",
        p3: "Você deve ter ao menos 18 anos de idade (ou a maioridade legal em sua jurisdição) para utilizar o Website.",
      },
      {
        h: "5. Status Regulatório",
        p: "A Odara opera por meio de um veículo de securitização luxemburguês constituído nos termos da Lei de Luxemburgo de 22 de março de 2004 sobre securitização, conforme alterada (a \"Lei de Securitização\"), estruturado em múltiplos compartimentos, cada um legalmente segregado.",
        p2: "A Odara não é instituição de crédito licenciada, empresa de investimento, gestora de fundos de investimento alternativos ou seguradora, e não detém dinheiro de clientes nem presta serviços de custódia. A Odara não presta consultoria de investimento, gestão de carteiras, ou assessoria jurídica, tributária, contábil ou regulatória.",
        p3: "Referências no Website a \"parceiros\", \"parceria\" ou expressões semelhantes descrevem relações comerciais e não implicam a existência de sociedade, joint venture ou mandato entre a Odara e qualquer terceiro.",
      },
      {
        h: "6. Ausência de Aconselhamento; Avaliação Independente",
        p: "Nada no Website constitui consultoria de investimento, jurídica, tributária, contábil ou de outra natureza profissional. Antes de celebrar qualquer operação, você deve realizar sua própria avaliação independente e consultar seus próprios assessores profissionais quanto aos aspectos jurídicos, regulatórios, tributários, de crédito, contábeis e financeiros e às consequências da operação.",
        p2: "Qualquer decisão de participar de uma operação de crédito, subscrever notas ou contratar os Serviços deve ser tomada exclusivamente com base na documentação definitiva da transação, incluindo memorando de oferta, contrato de operação, termos do compartimento e divulgações de risco, e não com base no Website.",
      },
      {
        h: "7. Desempenho, Projeções e Aviso de Risco",
        p: "Operações de crédito estruturado e dívida privada envolvem riscos relevantes, incluindo risco de crédito, risco de liquidez, risco cambial e de transferência, risco de mercados emergentes, risco jurídico e de execução, e risco de perda total do principal. Desempenho passado não é indicativo de resultados futuros. Nenhuma declaração é feita, e nenhuma garantia é dada, quanto ao desempenho futuro, rendimento, pagamento ou resultado de qualquer operação, facilidade ou instrumento.",
        p2: "Quaisquer declarações prospectivas, metas, cenários ou números ilustrativos no Website refletem premissas na data de publicação, estão sujeitos a alteração sem aviso prévio, e envolvem riscos e incertezas conhecidos e desconhecidos. Resultados reais podem divergir materialmente. A Odara não assume obrigação de atualizar qualquer declaração prospectiva.",
      },
      {
        h: "8. Prevenção à Lavagem de Dinheiro, Sanções e Conheça Seu Cliente",
        p: "A Odara conduz suas atividades em conformidade com a legislação aplicável de prevenção à lavagem de dinheiro e ao financiamento do terrorismo, incluindo a Lei de Luxemburgo de 12 de novembro de 2004, conforme alterada, diretivas e regulamentos da UE sobre AML, e, quando aplicável, a Lei brasileira nº 9.613/1998. Qualquer contratação dos Serviços está condicionada à conclusão satisfatória dos procedimentos de identificação, verificação, origem de recursos e triagem de sanções.",
        p2: "Você declara que não está sujeito, nem é controlado por pessoa sujeita, a sanções administradas pela União Europeia, pelas Nações Unidas, pelo U.S. Office of Foreign Assets Control (OFAC), pelo His Majesty's Treasury (Reino Unido) ou por autoridade equivalente, e que sua utilização do Website e qualquer relação com a Odara não violará leis de sanções ou controle de exportação aplicáveis.",
      },
      {
        h: "9. Propriedade Intelectual",
        p: "O Website e todo o Conteúdo — incluindo o nome Odara, logotipo, elementos de marca, textos, metodologias, análises, apresentações, gráficos e design — pertencem ou são licenciados à Odara e são protegidos por direitos autorais, marcas registradas e demais leis de propriedade intelectual de Luxemburgo, da União Europeia, do Brasil e de tratados internacionais.",
        p2: "É concedida a você licença limitada, não exclusiva, intransferível e revogável para acessar o Website e visualizar, baixar e imprimir Conteúdo exclusivamente para sua avaliação interna e não comercial dos Serviços, desde que mantidos todos os avisos de propriedade. Qualquer outro uso — incluindo reprodução, modificação, distribuição, republicação, enquadramento (framing), raspagem (scraping), mineração de texto e dados, ou treinamento de modelos de inteligência artificial com o Conteúdo — é proibido sem nosso consentimento prévio por escrito.",
      },
      {
        h: "10. Uso Aceitável",
        p: "Ao utilizar o Website, você concorda em não:",
        bullets: [
          "utilizar o Website em violação de qualquer lei ou regulamento aplicável, ou para fins fraudulentos ou ilícitos;",
          "tentar obter acesso não autorizado ao Website, seus servidores, ou qualquer banco de dados ou sistema conectado, ou testar sua vulnerabilidade sem autorização;",
          "introduzir vírus, malware ou outro material tecnologicamente nocivo, ou tomar qualquer ação que imponha carga excessiva à nossa infraestrutura;",
          "utilizar robôs, crawlers, raspadores ou outros meios automatizados para acessar ou extrair Conteúdo, exceto indexação padrão de mecanismos de busca;",
          "falsificar sua identidade, condição profissional ou elegibilidade, ou se passar por qualquer pessoa ou entidade; ou",
          "utilizar o Website para transmitir comunicações comerciais não solicitadas.",
        ],
        p2: "Poderemos suspender ou encerrar o acesso ao Website, sem aviso prévio, em caso de violação destes Termos.",
      },
      {
        h: "11. Comunicações Eletrônicas e Formulários de Contato",
        p: "Informações enviadas por meio de formulários de contato, e-mail ou outros canais eletrônicos não têm garantia de segurança, confidencialidade ou recebimento. Não transmita informações sensíveis, confidenciais ou preço-sensíveis através do Website. O envio de informações à Odara não cria qualquer relação de assessoria, fiduciária, de mandato ou de cliente, que somente pode ser estabelecida por meio de acordo escrito devidamente firmado e conclusão dos procedimentos de onboarding.",
      },
      {
        h: "12. Proteção de Dados — GDPR e LGPD",
        p: "A Odara trata dados pessoais em conformidade com as Leis de Proteção de Dados. Esta Seção apresenta um resumo; os detalhes completos constam da nossa Política de Privacidade, disponível em www.odara.lu/privacy, que prevalece em caso de divergência.",
        subsections: [
          {
            h: "12.1 Controlador e contato",
            p: "O controlador dos dados pessoais coletados através do Website é a Odara Capital Partners SPV, com sede em 2 Parc d'Activités Capellen, 8308 Capellen Mamer, Luxemburgo, e-mail: contact@odaracapital.com.",
          },
          {
            h: "12.2 Categorias de dados e finalidades",
            p: "Tratamos dados de identificação e contato profissional (nome, e-mail, empresa, cargo, jurisdição), conteúdo de correspondência, dados técnicos (endereço IP, informações de dispositivo e navegador, logs) e, no contexto de onboarding, dados de KYC/AML. As finalidades incluem: responder a solicitações; avaliar elegibilidade como Contraparte Profissional; realizar procedimentos pré-contratuais e contratuais; cumprir obrigações legais (incluindo AML/CFT e triagem de sanções); garantir a segurança do Website; e, mediante consentimento quando exigido, enviar comunicações institucionais.",
          },
          {
            h: "12.3 Bases legais",
            p: "Conforme o contexto, o tratamento se baseia em: execução de contrato ou medidas pré-contratuais (Art. 6(1)(b) GDPR; Art. 7, V LGPD); cumprimento de obrigação legal (Art. 6(1)(c) GDPR; Art. 7, II LGPD); nossos legítimos interesses em operar, proteger e promover nosso negócio (Art. 6(1)(f) GDPR; Art. 7, IX LGPD), sujeitos a teste de balanceamento; e consentimento quando exigido, em particular para cookies não essenciais e marketing (Art. 6(1)(a) GDPR; Art. 7, I LGPD). O consentimento pode ser retirado a qualquer momento, sem afetar o tratamento anterior.",
          },
          {
            h: "12.4 Transferências internacionais",
            p: "Dada a natureza internacional de nossas atividades, dados pessoais podem ser transferidos entre a União Europeia, o Brasil e outras jurisdições. Transferências para fora do EEE seguem o Capítulo V do GDPR, mediante decisões de adequação ou Cláusulas Contratuais Padrão com medidas suplementares quando necessário. Transferências para fora do Brasil observam os artigos 33 e seguintes da LGPD e a Resolução CD/ANPD nº 19/2024, incluindo, quando aplicável, as cláusulas-padrão da ANPD.",
          },
          {
            h: "12.5 Retenção",
            p: "Os dados pessoais são retidos apenas pelo tempo necessário às finalidades descritas, e após isso conforme exigido por lei — incluindo obrigações luxemburguesas de guarda de registros AML (em regra cinco anos após o fim da relação comercial) e prazos prescricionais aplicáveis — após o que são apagados ou anonimizados.",
          },
          {
            h: "12.6 Seus direitos",
            p: "Sujeito a condições e exceções legais, você possui os direitos de acesso, retificação, eliminação, restrição, portabilidade e oposição sob o GDPR, e os direitos correspondentes do Artigo 18 da LGPD, incluindo confirmação do tratamento, anonimização ou bloqueio de dados desnecessários, informação sobre compartilhamento, e revisão de decisões automatizadas. Solicitações podem ser enviadas a contact@odaracapital.com. Você também pode apresentar reclamação à Commission Nationale pour la Protection des Données (CNPD) de Luxemburgo, à autoridade supervisora de sua residência habitual na UE, ou à Autoridade Nacional de Proteção de Dados (ANPD) do Brasil.",
          },
          {
            h: "12.7 Segurança",
            p: "Implementamos medidas técnicas e organizacionais apropriadas — incluindo criptografia em trânsito, controles de acesso e registro de logs — destinadas a proteger dados pessoais contra acesso não autorizado, perda, alteração ou divulgação, em linha com o Artigo 32 do GDPR e os Artigos 46 a 49 da LGPD.",
          },
        ],
      },
      {
        h: "13. Cookies",
        p: "O Website utiliza cookies estritamente necessários e, mediante seu consentimento prévio, cookies de análise e funcionalidade. O consentimento é coletado por meio de um banner de cookies e pode ser modificado ou retirado a qualquer momento através do painel de preferências de cookies.",
      },
      {
        h: "14. Websites e Conteúdo de Terceiros",
        p: "O Website pode conter links para websites de terceiros, incluindo parceiros, prestadores de serviço e fontes de dados de mercado. Tais links são fornecidos apenas por conveniência. A Odara não controla, endossa nem assume responsabilidade pelo conteúdo, segurança ou práticas de privacidade de websites de terceiros, regidos por seus próprios termos e políticas.",
      },
      {
        h: "15. Isenção de Garantias",
        p: "O Website e o Conteúdo são fornecidos \"no estado em que se encontram\" e \"conforme disponibilidade\". Na máxima extensão permitida pela lei aplicável, a Odara isenta-se de todas as garantias, expressas ou implícitas, incluindo quanto a precisão, integralidade, tempestividade, comercialização, adequação a finalidade específica, não violação, disponibilidade e ausência de erros ou componentes nocivos. A Odara não garante que o Website será ininterrupto, seguro ou livre de erros, e pode modificar, suspender ou descontinuar o Website a qualquer momento, sem aviso prévio.",
      },
      {
        h: "16. Limitação de Responsabilidade",
        p: "Na máxima extensão permitida pela lei aplicável, a Odara, seus acionistas, diretores, dirigentes, funcionários, agentes e assessores não serão responsáveis por danos indiretos, incidentais, especiais, consequenciais ou punitivos, ou por perda de lucros, receita, negócios, oportunidade, fundo de comércio ou dados, decorrentes do uso ou impossibilidade de uso do Website ou de confiança em qualquer Conteúdo, seja em contrato, responsabilidade civil (incluindo negligência) ou de outra forma, mesmo que avisados da possibilidade de tais danos.",
        p2: "Nada nestes Termos exclui ou limita a responsabilidade por fraude, conduta dolosa ou culpa grave, ou qualquer outra responsabilidade que não possa ser excluída ou limitada por disposições legais imperativas, incluindo, quando aplicável a consumidores, regras imperativas do Código Civil e do Código de Defesa do Consumidor brasileiros.",
      },
      {
        h: "17. Indenização",
        p: "Você concorda em indenizar e isentar a Odara e suas afiliadas, diretores, dirigentes e funcionários de quaisquer reclamações, responsabilidades, danos, perdas e despesas (incluindo honorários advocatícios razoáveis) decorrentes de violação destes Termos, uso indevido do Website, ou violação de qualquer lei ou direito de terceiro por sua parte.",
      },
      {
        h: "18. Alterações",
        p: "Podemos alterar estes Termos a qualquer momento, publicando versão revisada no Website com data de \"última atualização\" atualizada. As alterações produzem efeito a partir da publicação. O uso continuado do Website após a publicação constitui aceitação dos Termos alterados. Recomendamos revisar estes Termos periodicamente.",
      },
      {
        h: "19. Disposições Gerais",
        provisions: [
          {
            label: "Independência das cláusulas.",
            text: "Caso alguma disposição destes Termos seja considerada inválida ou inexequível, as demais disposições permanecem em pleno vigor, e a disposição inválida será substituída por disposição válida que melhor reflita sua intenção.",
          },
          {
            label: "Não renúncia.",
            text: "A falha ou demora da Odara em exercer qualquer direito previsto nestes Termos não constitui renúncia a esse direito.",
          },
          {
            label: "Cessão.",
            text: "Você não pode ceder seus direitos ou obrigações sob estes Termos. A Odara pode ceder estes Termos a uma afiliada ou sucessora.",
          },
          {
            label: "Acordo integral.",
            text: "Estes Termos, em conjunto com a Política de Privacidade, constituem o acordo integral entre você e a Odara quanto ao uso do Website, substituindo entendimentos anteriores sobre a matéria. Não regem os Serviços, sujeitos a acordos escritos específicos.",
          },
          {
            label: "Idiomas.",
            text: "Estes Termos podem estar disponíveis em inglês, português e francês. Em caso de divergência, prevalece a versão em inglês, exceto onde lei imperativa disponha de outra forma.",
          },
        ],
      },
      {
        h: "20. Lei Aplicável e Foro",
        p: "Estes Termos, e quaisquer obrigações extracontratuais deles decorrentes, são regidos pelas leis do Grão-Ducado de Luxemburgo. Os tribunais do distrito da Cidade de Luxemburgo têm jurisdição exclusiva sobre qualquer disputa decorrente destes Termos ou do uso do Website, sem prejuízo de regras imperativas de foro e de proteção ao consumidor que possam se aplicar em favor de usuários domiciliados em outras jurisdições, incluindo o Brasil.",
      },
      {
        h: "21. Contato",
        p: "Odara Capital Partners",
        p2: "Sede: 2 Parc d'Activités Capellen, 8308 Capellen Mamer, Luxemburgo, Grão-Ducado de Luxemburgo — RCS Luxembourg.",
        p3: "Contato geral e proteção de dados: contact@odaracapital.com",
      },
    ],
  },
  es: {
    back: "Volver",
    title: "Términos de Uso del Sitio Web",
    updated: "Última actualización: 18 de julio de 2026 · Versión 1.1",
    sections: [
      {
        h: "1. Aceptación de estos Términos",
        p: "Estos Términos de Uso (los \"Términos\") rigen el acceso y la utilización del sitio web www.odara.lu (el \"Sitio Web\"), operado por Odara Capital Partners SPV, sociedad constituida conforme a las leyes del Gran Ducado de Luxemburgo, con domicilio social en 2 Parc d'Activités Capellen, 8308 Capellen Mamer, Luxemburgo, inscrita en el Registro Mercantil y de Sociedades de Luxemburgo (RCS Luxembourg).",
        p2: "Al acceder o utilizar el Sitio Web, usted confirma que ha leído, comprendido y acepta quedar vinculado por estos Términos y por nuestro Aviso de Privacidad y nuestra Política de Cookies, incorporados por referencia. Si no está de acuerdo con estos Términos, no debe acceder ni utilizar el Sitio Web.",
        p3: "Si accede al Sitio Web en nombre de una sociedad, fondo, institución u otra persona jurídica, usted declara y garantiza estar debidamente autorizado para vincular a dicha entidad, y el término \"usted\" se referirá a esa entidad.",
      },
      {
        h: "2. Definiciones",
        bullets: [
          "\"Contenido\" significa toda información, texto, documentos, presentaciones, datos, gráficos, logotipos, imágenes, material audiovisual y software puestos a disposición en el Sitio Web o a través de él.",
          "\"Servicios\" significa la originación, estructuración y organización de operaciones internacionales de crédito y soluciones conexas de mercado de capitales descritas en el Sitio Web, que se prestan exclusivamente en virtud de acuerdos escritos independientes.",
          "\"Contraparte Profesional\" significa toda persona o entidad que califique como cliente profesional o contraparte elegible en el sentido del Anexo II de la Directiva 2014/65/UE (MiFID II), inversor cualificado en el sentido del Reglamento (UE) 2017/1129 (el Reglamento de Folletos), inversor institucional o profesional conforme al derecho luxemburgués aplicable, o una categoría equivalente conforme a las leyes de su jurisdicción de origen, incluyendo, en Brasil, un \"investidor profissional\" o \"investidor qualificado\" en el sentido de la Resolución CVM n.º 30/2021.",
          "\"Leyes de Protección de Datos\" significa el Reglamento (UE) 2016/679 (el \"RGPD\"), la Ley de Luxemburgo de 1 de agosto de 2018 sobre la organización de la CNPD y el marco general de protección de datos, la Ley Federal brasileña n.º 13.709/2018 (la \"LGPD\"), y cualquier otra legislación aplicable en materia de privacidad o protección de datos.",
        ],
      },
      {
        h: "3. Finalidad Meramente Informativa — Sin Oferta ni Solicitud",
        p: "El Sitio Web y su Contenido se proporcionan únicamente con fines informativos generales. Nada en el Sitio Web constituye, ni debe interpretarse como: (a) una oferta, invitación, solicitud o recomendación de compra, venta, suscripción o colocación de cualquier valor, título, instrumento financiero o inversión; (b) una oferta de servicios de financiación, crédito, préstamo o intermediación; o (c) la comercialización de un fondo de inversión alternativo o vehículo de inversión colectiva en cualquier jurisdicción.",
        p2: "Cualquier nota de titulización, instrumento de deuda u operación de crédito mencionados en el Sitio Web se pone a disposición exclusivamente de Contrapartes Profesionales, en régimen de colocación privada, mediante la documentación definitiva de la operación, y únicamente en las jurisdicciones en las que dicha oferta sea lícita. En relación con Brasil, ningún instrumento descrito en el Sitio Web ha sido ni será registrado ante la Comissão de Valores Mobiliários (CVM), y no se está realizando ninguna oferta pública de valores en Brasil.",
        p3: "El Contenido no tiene en cuenta los objetivos, la situación financiera ni las necesidades de ninguna persona en particular, y no debe utilizarse como base para ninguna decisión.",
      },
      {
        h: "4. Elegibilidad y Restricciones de Acceso",
        p: "El Sitio Web está destinado exclusivamente a Contrapartes Profesionales y a prestatarios corporativos, asesores y socios comerciales que actúen en carácter profesional. No está destinado a inversores minoristas ni a consumidores, y ninguna parte del Sitio Web constituye una oferta de productos o servicios al público en general.",
        p2: "El Sitio Web no está destinado a personas ubicadas en jurisdicciones donde su publicación o acceso esté prohibido o restringido. Corresponde a quien accede al Sitio Web informarse y observar las restricciones legales y reglamentarias aplicables en su propia jurisdicción. En particular, el Contenido no está destinado a ninguna \"U.S. person\" según se define en el Regulation S de la U.S. Securities Act de 1933, en su versión modificada.",
        p3: "Usted debe tener al menos 18 años de edad (o la mayoría de edad legal en su jurisdicción) para utilizar el Sitio Web.",
      },
      {
        h: "5. Estatus Regulatorio",
        p: "Odara opera a través de un vehículo de titulización luxemburgués constituido conforme a la Ley de Luxemburgo de 22 de marzo de 2004 sobre titulización, en su versión modificada (la \"Ley de Titulización\"), estructurado en múltiples compartimentos, cada uno de ellos legalmente segregado.",
        p2: "Odara no es una entidad de crédito autorizada, una empresa de inversión, una gestora de fondos de inversión alternativos ni una aseguradora, y no mantiene fondos de clientes ni presta servicios de custodia. Odara no presta asesoramiento en materia de inversión, gestión de carteras, ni asesoramiento jurídico, fiscal, contable o regulatorio.",
        p3: "Las referencias en el Sitio Web a \"socios\", \"asociación\" o expresiones similares describen relaciones comerciales y no implican la existencia de una sociedad, empresa conjunta (joint venture) o mandato entre Odara y cualquier tercero.",
      },
      {
        h: "6. Ausencia de Asesoramiento; Evaluación Independiente",
        p: "Nada en el Sitio Web constituye asesoramiento de inversión, jurídico, fiscal, contable o de otra naturaleza profesional. Antes de concertar cualquier operación, usted debe realizar su propia evaluación independiente y consultar a sus propios asesores profesionales en cuanto a los aspectos jurídicos, regulatorios, fiscales, crediticios, contables y financieros, y a las consecuencias de la operación.",
        p2: "Cualquier decisión de participar en una operación de crédito, suscribir notas o contratar los Servicios debe adoptarse exclusivamente sobre la base de la documentación definitiva de la transacción, incluyendo el memorando de oferta, el contrato de la operación, los términos del compartimento y las divulgaciones de riesgo, y no sobre la base del Sitio Web.",
      },
      {
        h: "7. Rendimiento, Proyecciones y Advertencia de Riesgo",
        p: "Las operaciones de crédito estructurado y deuda privada implican riesgos significativos, incluyendo riesgo de crédito, riesgo de liquidez, riesgo cambiario y de transferencia, riesgo de mercados emergentes, riesgo jurídico y de ejecución, y riesgo de pérdida total del principal. La rentabilidad pasada no es indicativa de resultados futuros. No se realiza declaración alguna, ni se otorga garantía alguna, en cuanto al rendimiento futuro, la rentabilidad, el pago o el resultado de cualquier operación, línea o instrumento.",
        p2: "Cualquier declaración prospectiva, meta, escenario o cifra ilustrativa contenida en el Sitio Web refleja premisas vigentes en la fecha de publicación, está sujeta a modificación sin previo aviso, y conlleva riesgos e incertidumbres conocidos y desconocidos. Los resultados reales podrán diferir sustancialmente. Odara no asume obligación alguna de actualizar ninguna declaración prospectiva.",
      },
      {
        h: "8. Prevención del Blanqueo de Capitales, Sanciones y Conocimiento del Cliente",
        p: "Odara desarrolla sus actividades en cumplimiento de la legislación aplicable en materia de prevención del blanqueo de capitales y de la financiación del terrorismo, incluyendo la Ley de Luxemburgo de 12 de noviembre de 2004, en su versión modificada, las directivas y reglamentos de la UE en materia de PBC/FT, y, cuando resulte aplicable, la Ley brasileña n.º 9.613/1998. Toda contratación de los Servicios está condicionada a la conclusión satisfactoria de los procedimientos de identificación, verificación, origen de fondos y control de sanciones.",
        p2: "Usted declara que no está sujeto, ni controlado por una persona sujeta, a sanciones administradas por la Unión Europea, las Naciones Unidas, la U.S. Office of Foreign Assets Control (OFAC), el His Majesty's Treasury (Reino Unido) o cualquier autoridad equivalente, y que su utilización del Sitio Web y cualquier relación con Odara no infringirá las leyes de sanciones o de control de exportaciones aplicables.",
      },
      {
        h: "9. Propiedad Intelectual",
        p: "El Sitio Web y todo el Contenido — incluyendo el nombre Odara, el logotipo, los elementos de marca, textos, metodologías, análisis, presentaciones, gráficos y diseño — pertenecen a Odara o le son licenciados, y están protegidos por derechos de autor, marcas registradas y demás leyes de propiedad intelectual de Luxemburgo, de la Unión Europea, de Brasil y de los tratados internacionales.",
        p2: "Se le concede una licencia limitada, no exclusiva, intransferible y revocable para acceder al Sitio Web y visualizar, descargar e imprimir Contenido exclusivamente para su evaluación interna y no comercial de los Servicios, siempre que se mantengan todos los avisos de propiedad. Cualquier otro uso — incluyendo la reproducción, modificación, distribución, republicación, encuadre (framing), extracción (scraping), minería de texto y datos, o el entrenamiento de modelos de inteligencia artificial con el Contenido — está prohibido sin nuestro consentimiento previo por escrito.",
      },
      {
        h: "10. Uso Aceptable",
        p: "Al utilizar el Sitio Web, usted se compromete a no:",
        bullets: [
          "utilizar el Sitio Web en violación de cualquier ley o reglamento aplicable, o con fines fraudulentos o ilícitos;",
          "intentar obtener acceso no autorizado al Sitio Web, a sus servidores, o a cualquier base de datos o sistema conectado, o poner a prueba su vulnerabilidad sin autorización;",
          "introducir virus, malware u otro material tecnológicamente dañino, o realizar cualquier acción que imponga una carga excesiva a nuestra infraestructura;",
          "utilizar robots, rastreadores (crawlers), programas de extracción (scrapers) u otros medios automatizados para acceder al Contenido o extraerlo, salvo la indexación estándar de motores de búsqueda;",
          "falsear su identidad, condición profesional o elegibilidad, o hacerse pasar por cualquier persona o entidad; o",
          "utilizar el Sitio Web para transmitir comunicaciones comerciales no solicitadas.",
        ],
        p2: "Podremos suspender o cancelar el acceso al Sitio Web, sin previo aviso, en caso de incumplimiento de estos Términos.",
      },
      {
        h: "11. Comunicaciones Electrónicas y Formularios de Contacto",
        p: "La información enviada a través de formularios de contacto, correo electrónico u otros canales electrónicos no cuenta con garantía de seguridad, confidencialidad o recepción. No transmita información sensible, confidencial o sensible al precio a través del Sitio Web. El envío de información a Odara no crea relación de asesoramiento, fiduciaria, de mandato o de cliente, la cual únicamente puede establecerse mediante acuerdo escrito debidamente formalizado y la conclusión de los procedimientos de incorporación (onboarding).",
      },
      {
        h: "12. Protección de Datos — RGPD y LGPD",
        p: "Odara trata los datos personales de conformidad con las Leyes de Protección de Datos. Esta Sección constituye un resumen; los detalles completos figuran en nuestro Aviso de Privacidad, disponible en www.odara.lu/privacy, que prevalecerá en caso de discrepancia.",
        subsections: [
          {
            h: "12.1 Responsable del tratamiento y contacto",
            p: "El responsable del tratamiento de los datos personales recabados a través del Sitio Web es Odara Capital Partners SPV, con domicilio social en 2 Parc d'Activités Capellen, 8308 Capellen Mamer, Luxemburgo, correo electrónico: contact@odaracapital.com.",
          },
          {
            h: "12.2 Categorías de datos y finalidades",
            p: "Tratamos datos de identificación y contacto profesional (nombre, correo electrónico, empresa, cargo, jurisdicción), contenido de la correspondencia, datos técnicos (dirección IP, información del dispositivo y del navegador, registros) y, en el contexto de la incorporación (onboarding), datos de KYC/PBC. Las finalidades incluyen: responder a solicitudes; evaluar la elegibilidad como Contraparte Profesional; llevar a cabo procedimientos precontractuales y contractuales; cumplir obligaciones legales (incluyendo PBC/FT y control de sanciones); garantizar la seguridad del Sitio Web; y, mediante consentimiento cuando así se exija, remitir comunicaciones institucionales.",
          },
          {
            h: "12.3 Bases jurídicas",
            p: "Según el contexto, el tratamiento se basa en: la ejecución de un contrato o medidas precontractuales (art. 6.1.b RGPD; art. 7.V LGPD); el cumplimiento de una obligación legal (art. 6.1.c RGPD; art. 7.II LGPD); nuestros intereses legítimos en operar, proteger y promover nuestro negocio (art. 6.1.f RGPD; art. 7.IX LGPD), sujetos a una prueba de ponderación; y el consentimiento cuando se exija, en particular para cookies no esenciales y actividades de marketing (art. 6.1.a RGPD; art. 7.I LGPD). El consentimiento puede retirarse en cualquier momento, sin afectar al tratamiento previamente realizado.",
          },
          {
            h: "12.4 Transferencias internacionales",
            p: "Dada la naturaleza internacional de nuestras actividades, los datos personales pueden transferirse entre la Unión Europea, Brasil y otras jurisdicciones. Las transferencias fuera del EEE se rigen por el Capítulo V del RGPD, mediante decisiones de adecuación o Cláusulas Contractuales Tipo con medidas suplementarias cuando resulte necesario. Las transferencias fuera de Brasil observan los artículos 33 y siguientes de la LGPD y la Resolución CD/ANPD n.º 19/2024, incluyendo, cuando resulte aplicable, las cláusulas estándar de la ANPD.",
          },
          {
            h: "12.5 Conservación",
            p: "Los datos personales se conservan únicamente durante el tiempo necesario para las finalidades descritas, y con posterioridad conforme lo exija la ley — incluyendo las obligaciones luxemburguesas de conservación de registros en materia de PBC (por regla general, cinco años desde la finalización de la relación comercial) y los plazos de prescripción aplicables — tras lo cual se suprimen o anonimizan.",
          },
          {
            h: "12.6 Sus derechos",
            p: "Sujeto a las condiciones y excepciones legales, usted dispone de los derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición conforme al RGPD, y de los derechos correspondientes del Artículo 18 de la LGPD, incluyendo la confirmación del tratamiento, la anonimización o el bloqueo de datos innecesarios, la información sobre las cesiones de datos, y la revisión de decisiones automatizadas. Las solicitudes pueden dirigirse a contact@odaracapital.com. Usted también puede presentar una reclamación ante la Commission Nationale pour la Protection des Données (CNPD) de Luxemburgo, ante la autoridad de control de su residencia habitual en la UE, o ante la Autoridade Nacional de Proteção de Dados (ANPD) de Brasil.",
          },
          {
            h: "12.7 Seguridad",
            p: "Aplicamos medidas técnicas y organizativas apropiadas — incluyendo cifrado en tránsito, controles de acceso y registro de actividad — destinadas a proteger los datos personales frente al acceso no autorizado, la pérdida, la alteración o la divulgación, en línea con el Artículo 32 del RGPD y los Artículos 46 a 49 de la LGPD.",
          },
        ],
      },
      {
        h: "13. Cookies",
        p: "El Sitio Web utiliza cookies estrictamente necesarias y, previo su consentimiento, cookies analíticas y de funcionalidad. El consentimiento se recaba mediante un banner de cookies y puede modificarse o retirarse en cualquier momento a través del panel de preferencias de cookies.",
      },
      {
        h: "14. Sitios Web y Contenido de Terceros",
        p: "El Sitio Web puede contener enlaces a sitios web de terceros, incluyendo socios, proveedores de servicios y fuentes de datos de mercado. Dichos enlaces se facilitan únicamente por conveniencia. Odara no controla, avala ni asume responsabilidad alguna por el contenido, la seguridad o las prácticas de privacidad de los sitios web de terceros, los cuales se rigen por sus propios términos y políticas.",
      },
      {
        h: "15. Exclusión de Garantías",
        p: "El Sitio Web y el Contenido se proporcionan \"tal cual\" y \"según disponibilidad\". En la máxima medida permitida por la ley aplicable, Odara renuncia a toda garantía, expresa o implícita, incluyendo en cuanto a exactitud, integridad, oportunidad, comerciabilidad, idoneidad para un fin determinado, no vulneración, disponibilidad y ausencia de errores o componentes dañinos. Odara no garantiza que el Sitio Web será ininterrumpido, seguro o estará libre de errores, y podrá modificar, suspender o discontinuar el Sitio Web en cualquier momento, sin previo aviso.",
      },
      {
        h: "16. Limitación de Responsabilidad",
        p: "En la máxima medida permitida por la ley aplicable, Odara, sus accionistas, administradores, directivos, empleados, agentes y asesores no serán responsables de daños indirectos, incidentales, especiales, consecuenciales o punitivos, ni de la pérdida de beneficios, ingresos, negocio, oportunidad, fondo de comercio o datos, derivados del uso o de la imposibilidad de uso del Sitio Web o de la confianza depositada en cualquier Contenido, ya sea en virtud de contrato, responsabilidad extracontractual (incluida la negligencia) o de otro modo, incluso si se hubiera advertido de la posibilidad de tales daños.",
        p2: "Nada en estos Términos excluye o limita la responsabilidad por fraude, dolo o culpa grave, ni cualquier otra responsabilidad que no pueda excluirse o limitarse conforme a disposiciones legales imperativas, incluyendo, cuando resulten aplicables a consumidores, las normas imperativas del Código Civil y del Código de Defensa del Consumidor brasileños.",
      },
      {
        h: "17. Indemnización",
        p: "Usted se compromete a indemnizar y mantener indemne a Odara y a sus afiliadas, administradores, directivos y empleados frente a cualquier reclamación, responsabilidad, daño, pérdida y gasto (incluyendo honorarios de abogados razonables) derivados del incumplimiento de estos Términos, del uso indebido del Sitio Web, o de la infracción por su parte de cualquier ley o derecho de terceros.",
      },
      {
        h: "18. Modificaciones",
        p: "Podremos modificar estos Términos en cualquier momento, publicando una versión revisada en el Sitio Web con una fecha de \"última actualización\" actualizada. Las modificaciones surtirán efecto desde su publicación. El uso continuado del Sitio Web tras dicha publicación constituye la aceptación de los Términos modificados. Le recomendamos revisar estos Términos periódicamente.",
      },
      {
        h: "19. Disposiciones Generales",
        provisions: [
          {
            label: "Divisibilidad.",
            text: "Si alguna disposición de estos Términos fuera considerada inválida o inaplicable, las restantes disposiciones permanecerán en pleno vigor, y la disposición inválida será sustituida por una disposición válida que refleje mejor su intención.",
          },
          {
            label: "No renuncia.",
            text: "La falta de ejercicio o el retraso de Odara en el ejercicio de cualquier derecho previsto en estos Términos no constituirá una renuncia a dicho derecho.",
          },
          {
            label: "Cesión.",
            text: "Usted no podrá ceder sus derechos u obligaciones en virtud de estos Términos. Odara podrá ceder estos Términos a una afiliada o sucesora.",
          },
          {
            label: "Acuerdo íntegro.",
            text: "Estos Términos, junto con el Aviso de Privacidad, constituyen el acuerdo íntegro entre usted y Odara en relación con el uso del Sitio Web, y sustituyen cualquier entendimiento previo sobre la materia. No rigen los Servicios, que están sujetos a acuerdos escritos independientes.",
          },
          {
            label: "Idiomas.",
            text: "Estos Términos podrán estar disponibles en inglés, portugués, español y francés. En caso de discrepancia, prevalecerá la versión en inglés, salvo que la ley imperativa disponga lo contrario.",
          },
        ],
      },
      {
        h: "20. Ley Aplicable y Jurisdicción",
        p: "Estos Términos, así como cualquier obligación extracontractual derivada de ellos, se rigen por las leyes del Gran Ducado de Luxemburgo. Los tribunales del distrito de la Ciudad de Luxemburgo tendrán jurisdicción exclusiva sobre cualquier controversia derivada de estos Términos o del uso del Sitio Web, sin perjuicio de las normas imperativas de jurisdicción y de protección al consumidor que puedan resultar aplicables en favor de usuarios domiciliados en otras jurisdicciones, incluyendo Brasil.",
      },
      {
        h: "21. Contacto",
        p: "Odara Capital Partners",
        p2: "Domicilio social: 2 Parc d'Activités Capellen, 8308 Capellen Mamer, Luxemburgo, Gran Ducado de Luxemburgo — RCS Luxembourg.",
        p3: "Consultas generales y protección de datos: contact@odaracapital.com",
      },
    ],
  },
  fr: {
    back: "Retour",
    title: "Conditions d'Utilisation du Site Internet",
    updated: "Dernière mise à jour : 18 juillet 2026 · Version 1.1",
    sections: [
      {
        h: "1. Acceptation des présentes Conditions",
        p: "Les présentes Conditions d'Utilisation (les « Conditions ») régissent l'accès au site internet www.odara.lu (le « Site Internet ») et son utilisation, exploité par Odara Capital Partners SPV, société constituée selon les lois du Grand-Duché de Luxembourg, dont le siège social est établi au 2 Parc d'Activités Capellen, 8308 Capellen Mamer, Luxembourg, immatriculée au Registre de Commerce et des Sociétés de Luxembourg (RCS Luxembourg).",
        p2: "En accédant au Site Internet ou en l'utilisant, vous confirmez avoir lu et compris les présentes Conditions ainsi que notre Avis de Confidentialité et notre Politique en matière de Cookies, incorporés par référence, et accepter d'y être lié. Si vous n'acceptez pas les présentes Conditions, vous ne devez pas accéder au Site Internet ni l'utiliser.",
        p3: "Si vous accédez au Site Internet pour le compte d'une société, d'un fonds, d'une institution ou de toute autre personne morale, vous déclarez et garantissez être dûment autorisé à engager cette entité, et le terme « vous » désignera alors cette entité.",
      },
      {
        h: "2. Définitions",
        bullets: [
          "« Contenu » désigne l'ensemble des informations, textes, documents, présentations, données, graphiques, logos, images, matériels audiovisuels et logiciels mis à disposition sur le Site Internet ou par son intermédiaire.",
          "« Services » désigne l'origination, la structuration et l'arrangement d'opérations internationales de crédit et des solutions connexes de marchés de capitaux décrites sur le Site Internet, fournis exclusivement dans le cadre de conventions écrites distinctes.",
          "« Contrepartie Professionnelle » désigne toute personne ou entité répondant à la qualification de client professionnel ou de contrepartie éligible au sens de l'Annexe II de la Directive 2014/65/UE (MiFID II), d'investisseur qualifié au sens du Règlement (UE) 2017/1129 (le Règlement Prospectus), d'investisseur institutionnel ou professionnel au sens du droit luxembourgeois applicable, ou d'une catégorie équivalente au sens des lois de sa juridiction d'origine, y compris, au Brésil, un « investidor profissional » ou « investidor qualificado » au sens de la Résolution CVM n° 30/2021.",
          "« Lois sur la Protection des Données » désigne le Règlement (UE) 2016/679 (le « RGPD »), la loi luxembourgeoise du 1er août 2018 portant organisation de la CNPD et le cadre général de protection des données, la loi fédérale brésilienne n° 13.709/2018 (la « LGPD »), ainsi que toute autre législation applicable en matière de vie privée ou de protection des données.",
        ],
      },
      {
        h: "3. Finalité Purement Informative — Absence d'Offre ou de Sollicitation",
        p: "Le Site Internet et son Contenu sont fournis à titre d'information générale uniquement. Rien sur le Site Internet ne constitue, ni ne saurait être interprété comme : (a) une offre, une invitation, une sollicitation ou une recommandation d'achat, de vente, de souscription ou de placement de toute valeur mobilière, titre, instrument financier ou investissement ; (b) une offre de services de financement, de crédit, de prêt ou de courtage ; ou (c) la commercialisation d'un fonds d'investissement alternatif ou d'un organisme de placement collectif dans quelque juridiction que ce soit.",
        p2: "Toute note de titrisation, tout instrument de dette ou toute opération de crédit mentionnés sur le Site Internet sont mis à disposition exclusivement des Contreparties Professionnelles, dans le cadre d'un placement privé, au moyen de la documentation définitive de l'opération, et uniquement dans les juridictions où une telle offre est licite. S'agissant du Brésil, aucun instrument décrit sur le Site Internet n'a été ni ne sera enregistré auprès de la Comissão de Valores Mobiliários (CVM), et aucune offre publique de valeurs mobilières n'est réalisée au Brésil.",
        p3: "Le Contenu ne tient pas compte des objectifs, de la situation financière ou des besoins d'une personne en particulier et ne saurait servir de fondement à une quelconque décision.",
      },
      {
        h: "4. Éligibilité et Restrictions d'Accès",
        p: "Le Site Internet est destiné exclusivement aux Contreparties Professionnelles ainsi qu'aux emprunteurs corporatifs, conseillers et partenaires commerciaux agissant à titre professionnel. Il n'est pas destiné aux investisseurs de détail ou aux consommateurs, et aucune partie du Site Internet ne constitue une offre de produits ou de services au grand public.",
        p2: "Le Site Internet n'est pas destiné aux personnes situées dans des juridictions où sa publication ou son accès seraient interdits ou restreints. Il incombe à toute personne accédant au Site Internet de s'informer et de respecter les restrictions légales et réglementaires applicables dans sa propre juridiction. En particulier, le Contenu n'est destiné à aucune « U.S. person » au sens du Regulation S du U.S. Securities Act de 1933, tel que modifié.",
        p3: "Vous devez être âgé d'au moins 18 ans (ou avoir atteint la majorité légale dans votre juridiction) pour utiliser le Site Internet.",
      },
      {
        h: "5. Statut Réglementaire",
        p: "Odara opère par l'intermédiaire d'un véhicule de titrisation luxembourgeois constitué en vertu de la loi luxembourgeoise du 22 mars 2004 relative à la titrisation, telle que modifiée (la « Loi sur la Titrisation »), structuré en plusieurs compartiments, chacun juridiquement isolé.",
        p2: "Odara n'est ni un établissement de crédit agréé, ni une entreprise d'investissement, ni un gestionnaire de fonds d'investissement alternatifs, ni une entreprise d'assurance, et ne détient pas de fonds de clients ni ne fournit de services de garde. Odara ne fournit pas de conseil en investissement, de gestion de portefeuille, ni de conseil juridique, fiscal, comptable ou réglementaire.",
        p3: "Les références sur le Site Internet à des « partenaires », « partenariat » ou expressions similaires décrivent des relations commerciales et n'impliquent l'existence d'aucune société, coentreprise (joint venture) ou mandat entre Odara et un tiers quelconque.",
      },
      {
        h: "6. Absence de Conseil ; Évaluation Indépendante",
        p: "Rien sur le Site Internet ne constitue un conseil en investissement, juridique, fiscal, comptable ou de toute autre nature professionnelle. Avant de conclure toute opération, vous devez procéder à votre propre évaluation indépendante et consulter vos propres conseillers professionnels quant aux aspects juridiques, réglementaires, fiscaux, de crédit, comptables et financiers, ainsi qu'aux conséquences de l'opération.",
        p2: "Toute décision de participer à une opération de crédit, de souscrire des notes ou de recourir aux Services doit être prise exclusivement sur la base de la documentation définitive de la transaction, comprenant le mémorandum d'offre, le contrat d'opération, les modalités du compartiment et les informations sur les risques, et non sur la base du Site Internet.",
      },
      {
        h: "7. Performance, Projections et Avertissement sur les Risques",
        p: "Les opérations de crédit structuré et de dette privée comportent des risques importants, notamment un risque de crédit, un risque de liquidité, un risque de change et de transfert, un risque lié aux marchés émergents, un risque juridique et d'exécution, ainsi qu'un risque de perte totale du principal. Les performances passées ne préjugent pas des résultats futurs. Aucune déclaration n'est faite et aucune garantie n'est donnée quant à la performance future, au rendement, au paiement ou au résultat de toute opération, facilité ou instrument.",
        p2: "Toute déclaration prospective, tout objectif, scénario ou chiffre illustratif figurant sur le Site Internet reflète des hypothèses en vigueur à la date de publication, est susceptible d'être modifié sans préavis, et comporte des risques et incertitudes connus et inconnus. Les résultats réels pourraient différer sensiblement. Odara n'assume aucune obligation de mise à jour de toute déclaration prospective.",
      },
      {
        h: "8. Lutte Anti-Blanchiment, Sanctions et Connaissance du Client",
        p: "Odara exerce ses activités dans le respect de la législation applicable en matière de lutte contre le blanchiment de capitaux et le financement du terrorisme, notamment la loi luxembourgeoise du 12 novembre 2004, telle que modifiée, les directives et règlements de l'UE en matière de LBC, et, le cas échéant, la loi brésilienne n° 9.613/1998. Tout recours aux Services est subordonné à l'achèvement satisfaisant des procédures d'identification, de vérification, d'origine des fonds et de filtrage des sanctions.",
        p2: "Vous déclarez ne pas être soumis, ni contrôlé par une personne soumise, à des sanctions administrées par l'Union européenne, les Nations Unies, l'U.S. Office of Foreign Assets Control (OFAC), le His Majesty's Treasury (Royaume-Uni) ou toute autorité équivalente, et que votre utilisation du Site Internet ainsi que toute relation avec Odara n'enfreindra pas les lois applicables en matière de sanctions ou de contrôle des exportations.",
      },
      {
        h: "9. Propriété Intellectuelle",
        p: "Le Site Internet et l'ensemble du Contenu — y compris le nom Odara, le logo, les éléments de marque, les textes, méthodologies, analyses, présentations, graphiques et éléments de conception — appartiennent à Odara ou lui sont concédés sous licence, et sont protégés par le droit d'auteur, le droit des marques et les autres lois relatives à la propriété intellectuelle du Luxembourg, de l'Union européenne, du Brésil et des traités internationaux.",
        p2: "Il vous est concédé une licence limitée, non exclusive, incessible et révocable pour accéder au Site Internet et consulter, télécharger et imprimer le Contenu à des fins exclusives d'évaluation interne et non commerciale des Services, sous réserve du maintien de toutes les mentions de propriété. Tout autre usage — y compris la reproduction, la modification, la distribution, la republication, l'encadrement (framing), l'extraction (scraping), la fouille de textes et de données, ou l'entraînement de modèles d'intelligence artificielle à partir du Contenu — est interdit sans notre consentement préalable écrit.",
      },
      {
        h: "10. Utilisation Acceptable",
        p: "En utilisant le Site Internet, vous vous engagez à ne pas :",
        bullets: [
          "utiliser le Site Internet en violation de toute loi ou réglementation applicable, ou à des fins frauduleuses ou illicites ;",
          "tenter d'obtenir un accès non autorisé au Site Internet, à ses serveurs, ou à toute base de données ou système connexe, ou tester sa vulnérabilité sans autorisation ;",
          "introduire des virus, logiciels malveillants ou autres éléments technologiquement nuisibles, ou entreprendre toute action imposant une charge excessive à notre infrastructure ;",
          "utiliser des robots, crawlers, outils d'extraction (scrapers) ou tout autre moyen automatisé pour accéder au Contenu ou l'extraire, à l'exception de l'indexation standard par les moteurs de recherche ;",
          "usurper votre identité, votre statut professionnel ou votre éligibilité, ou vous faire passer pour toute personne ou entité ; ou",
          "utiliser le Site Internet pour transmettre des communications commerciales non sollicitées.",
        ],
        p2: "Nous pourrons suspendre ou résilier l'accès au Site Internet, sans préavis, en cas de manquement aux présentes Conditions.",
      },
      {
        h: "11. Communications Électroniques et Formulaires de Contact",
        p: "Les informations transmises par l'intermédiaire de formulaires de contact, de courrier électronique ou d'autres canaux électroniques ne bénéficient d'aucune garantie de sécurité, de confidentialité ou de réception. Ne transmettez pas d'informations sensibles, confidentielles ou sensibles au regard du prix par l'intermédiaire du Site Internet. La transmission d'informations à Odara ne crée aucune relation de conseil, fiduciaire, de mandat ou de clientèle, laquelle ne peut être établie que par voie de convention écrite dûment signée et l'achèvement des procédures d'entrée en relation.",
      },
      {
        h: "12. Protection des Données — RGPD et LGPD",
        p: "Odara traite les données à caractère personnel conformément aux Lois sur la Protection des Données. La présente Section constitue un résumé ; les détails complets figurent dans notre Avis de Confidentialité, disponible sur www.odara.lu/privacy, qui prévaudra en cas de divergence.",
        subsections: [
          {
            h: "12.1 Responsable du traitement et contact",
            p: "Le responsable du traitement des données à caractère personnel collectées par l'intermédiaire du Site Internet est Odara Capital Partners SPV, dont le siège social est établi au 2 Parc d'Activités Capellen, 8308 Capellen Mamer, Luxembourg, adresse électronique : contact@odaracapital.com.",
          },
          {
            h: "12.2 Catégories de données et finalités",
            p: "Nous traitons des données d'identification et de contact professionnel (nom, adresse électronique, société, fonction, juridiction), le contenu de la correspondance, des données techniques (adresse IP, informations relatives à l'appareil et au navigateur, journaux) et, dans le cadre de l'entrée en relation, des données KYC/LBC. Les finalités comprennent : répondre aux demandes ; évaluer l'éligibilité en tant que Contrepartie Professionnelle ; mener les démarches précontractuelles et contractuelles ; se conformer aux obligations légales (notamment en matière de LBC/FT et de filtrage des sanctions) ; assurer la sécurité du Site Internet ; et, sur consentement lorsque celui-ci est requis, adresser des communications institutionnelles.",
          },
          {
            h: "12.3 Bases juridiques",
            p: "Selon le contexte, le traitement repose sur : l'exécution d'un contrat ou des mesures précontractuelles (art. 6, § 1, b) du RGPD ; art. 7, V de la LGPD) ; le respect d'une obligation légale (art. 6, § 1, c) du RGPD ; art. 7, II de la LGPD) ; nos intérêts légitimes à exploiter, protéger et développer notre activité (art. 6, § 1, f) du RGPD ; art. 7, IX de la LGPD), sous réserve d'une mise en balance des intérêts ; et le consentement lorsqu'il est requis, en particulier pour les cookies non essentiels et le marketing (art. 6, § 1, a) du RGPD ; art. 7, I de la LGPD). Le consentement peut être retiré à tout moment, sans incidence sur les traitements antérieurs.",
          },
          {
            h: "12.4 Transferts internationaux",
            p: "Compte tenu du caractère international de nos activités, des données à caractère personnel peuvent être transférées entre l'Union européenne, le Brésil et d'autres juridictions. Les transferts hors de l'EEE sont régis par le Chapitre V du RGPD, au moyen de décisions d'adéquation ou de Clauses Contractuelles Types assorties, le cas échéant, de mesures supplémentaires. Les transferts hors du Brésil respectent les articles 33 et suivants de la LGPD ainsi que la Résolution CD/ANPD n° 19/2024, y compris, le cas échéant, les clauses types de l'ANPD.",
          },
          {
            h: "12.5 Conservation",
            p: "Les données à caractère personnel ne sont conservées que pendant la durée nécessaire aux finalités décrites, puis, le cas échéant, conformément aux exigences légales — notamment les obligations luxembourgeoises de conservation des documents en matière de LBC (en principe cinq ans à compter de la fin de la relation d'affaires) et les délais de prescription applicables — à l'issue desquels elles sont supprimées ou anonymisées.",
          },
          {
            h: "12.6 Vos droits",
            p: "Sous réserve des conditions et exceptions légales, vous disposez des droits d'accès, de rectification, d'effacement, de limitation, de portabilité et d'opposition au titre du RGPD, ainsi que des droits correspondants prévus à l'Article 18 de la LGPD, notamment la confirmation de l'existence d'un traitement, l'anonymisation ou le blocage des données inutiles, l'information relative au partage des données, et le réexamen des décisions automatisées. Les demandes peuvent être adressées à contact@odaracapital.com. Vous pouvez également introduire une réclamation auprès de la Commission Nationale pour la Protection des Données (CNPD) du Luxembourg, de l'autorité de contrôle de votre résidence habituelle dans l'UE, ou de l'Autoridade Nacional de Proteção de Dados (ANPD) du Brésil.",
          },
          {
            h: "12.7 Sécurité",
            p: "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées — notamment le chiffrement en transit, des contrôles d'accès et la journalisation — destinées à protéger les données à caractère personnel contre tout accès non autorisé, toute perte, altération ou divulgation, conformément à l'Article 32 du RGPD et aux Articles 46 à 49 de la LGPD.",
          },
        ],
      },
      {
        h: "13. Cookies",
        p: "Le Site Internet utilise des cookies strictement nécessaires et, sous réserve de votre consentement préalable, des cookies analytiques et fonctionnels. Le consentement est recueilli au moyen d'une bannière de cookies et peut être modifié ou retiré à tout moment via le panneau de préférences relatif aux cookies.",
      },
      {
        h: "14. Sites Internet et Contenus de Tiers",
        p: "Le Site Internet peut contenir des liens vers des sites internet de tiers, notamment des partenaires, prestataires de services et fournisseurs de données de marché. Ces liens sont fournis uniquement à titre de commodité. Odara ne contrôle, n'approuve ni n'assume de responsabilité quant au contenu, à la sécurité ou aux pratiques de confidentialité des sites internet de tiers, lesquels sont régis par leurs propres conditions et politiques.",
      },
      {
        h: "15. Exclusion de Garanties",
        p: "Le Site Internet et le Contenu sont fournis « en l'état » et « selon leur disponibilité ». Dans toute la mesure permise par la loi applicable, Odara décline toute garantie, expresse ou implicite, notamment quant à l'exactitude, l'exhaustivité, l'actualité, la qualité marchande, l'adéquation à un usage particulier, l'absence de contrefaçon, la disponibilité et l'absence d'erreurs ou de composants nuisibles. Odara ne garantit pas que le Site Internet sera ininterrompu, sécurisé ou exempt d'erreurs, et pourra modifier, suspendre ou interrompre le Site Internet à tout moment, sans préavis.",
      },
      {
        h: "16. Limitation de Responsabilité",
        p: "Dans toute la mesure permise par la loi applicable, Odara, ses actionnaires, administrateurs, dirigeants, employés, mandataires et conseillers ne pourront être tenus responsables des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs, ni de la perte de bénéfices, de revenus, d'activité, d'opportunité, de clientèle ou de données, résultant de l'utilisation ou de l'impossibilité d'utiliser le Site Internet ou de la confiance accordée à tout Contenu, que ce soit sur le fondement contractuel, délictuel (y compris la négligence) ou autre, même s'ils ont été informés de la possibilité de tels dommages.",
        p2: "Rien dans les présentes Conditions n'exclut ni ne limite la responsabilité en cas de fraude, de faute intentionnelle ou de faute lourde, ni toute autre responsabilité ne pouvant être exclue ou limitée en vertu de dispositions légales impératives, y compris, lorsqu'elles sont applicables aux consommateurs, les règles impératives du Code civil et du Code de la consommation brésiliens.",
      },
      {
        h: "17. Indemnisation",
        p: "Vous vous engagez à indemniser Odara et ses affiliés, administrateurs, dirigeants et employés, et à les tenir quittes de toute réclamation, responsabilité, dommage, perte et dépense (y compris les honoraires d'avocat raisonnables) résultant d'un manquement aux présentes Conditions, d'une utilisation abusive du Site Internet, ou de la violation par vous de toute loi ou de tout droit d'un tiers.",
      },
      {
        h: "18. Modifications",
        p: "Nous pourrons modifier les présentes Conditions à tout moment, en publiant une version révisée sur le Site Internet accompagnée d'une date de « dernière mise à jour » actualisée. Les modifications prendront effet dès leur publication. La poursuite de l'utilisation du Site Internet après cette publication vaut acceptation des Conditions modifiées. Nous vous recommandons de consulter régulièrement les présentes Conditions.",
      },
      {
        h: "19. Dispositions Générales",
        provisions: [
          {
            label: "Divisibilité.",
            text: "Si une disposition des présentes Conditions est jugée invalide ou inapplicable, les autres dispositions demeureront pleinement en vigueur, et la disposition invalide sera remplacée par une disposition valide reflétant au mieux son intention initiale.",
          },
          {
            label: "Absence de renonciation.",
            text: "Le fait pour Odara de ne pas exercer, ou de retarder l'exercice, d'un droit prévu par les présentes Conditions ne saurait constituer une renonciation à ce droit.",
          },
          {
            label: "Cession.",
            text: "Vous ne pouvez céder vos droits ou obligations au titre des présentes Conditions. Odara peut céder les présentes Conditions à une société affiliée ou à un successeur.",
          },
          {
            label: "Intégralité de l'accord.",
            text: "Les présentes Conditions, conjointement avec l'Avis de Confidentialité, constituent l'intégralité de l'accord entre vous et Odara relatif à l'utilisation du Site Internet, et remplacent tout accord antérieur portant sur le même objet. Elles ne régissent pas les Services, qui font l'objet de conventions écrites distinctes.",
          },
          {
            label: "Langues.",
            text: "Les présentes Conditions pourront être disponibles en anglais, portugais, espagnol et français. En cas de divergence, la version anglaise prévaudra, sauf dispositions légales impératives contraires.",
          },
        ],
      },
      {
        h: "20. Droit Applicable et Juridiction Compétente",
        p: "Les présentes Conditions, ainsi que toute obligation extracontractuelle en découlant, sont régies par les lois du Grand-Duché de Luxembourg. Les tribunaux de l'arrondissement de Luxembourg-Ville sont exclusivement compétents pour connaître de tout litige découlant des présentes Conditions ou de l'utilisation du Site Internet, sans préjudice des règles impératives de compétence et de protection des consommateurs pouvant s'appliquer en faveur d'utilisateurs domiciliés dans d'autres juridictions, y compris le Brésil.",
      },
      {
        h: "21. Contact",
        p: "Odara Capital Partners",
        p2: "Siège social : 2 Parc d'Activités Capellen, 8308 Capellen Mamer, Luxembourg, Grand-Duché de Luxembourg — RCS Luxembourg.",
        p3: "Demandes générales et protection des données : contact@odaracapital.com",
      },
    ],
  },
};

const SUPPORTED_LANGS = ["en", "pt", "es", "fr"] as const;
const LANG_STORAGE_KEY = "odara_lang";

function detectInitialLang(): "en" | "pt" | "es" | "fr" {
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  if (saved && (SUPPORTED_LANGS as readonly string[]).includes(saved)) return saved as "en" | "pt" | "es" | "fr";

  for (const browserLang of navigator.languages || [navigator.language]) {
    const primary = browserLang.split("-")[0].toLowerCase();
    if ((SUPPORTED_LANGS as readonly string[]).includes(primary)) return primary as "en" | "pt" | "es" | "fr";
  }
  return "en";
}

const Terms = () => {
  const navigate = useNavigate();
  const [lang, setLangState] = useState<"en" | "pt" | "es" | "fr">(detectInitialLang);

  const setLang = (next: "en" | "pt" | "es" | "fr") => {
    localStorage.setItem(LANG_STORAGE_KEY, next);
    setLangState(next);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const c = content[lang];

  return (
    <div className="min-h-screen" style={{ background: "hsl(36,18%,96%)", color: "hsl(0,0%,10%)" }}>
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-10 md:py-16">
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-[0.7rem] md:text-[0.75rem] tracking-[0.2em] uppercase transition-opacity hover:opacity-70"
            style={{ color: "hsl(232,25%,30%)" }}
          >
            <ArrowLeft size={16} /> {c.back}
          </button>
          <div className="flex items-center gap-3">
            {SUPPORTED_LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`text-[0.7rem] tracking-[0.2em] uppercase transition-opacity ${
                  lang === l ? "opacity-100 font-semibold" : "opacity-40 hover:opacity-70"
                }`}
                style={{ color: "hsl(232,25%,30%)" }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <p className="text-[0.7rem] tracking-[0.25em] uppercase mb-4 font-semibold" style={{ color: "hsl(232,25%,40%)" }}>
            Odara Capital Partners
          </p>
          <h1 className="font-['Cormorant_Garamond',serif] font-light text-4xl md:text-5xl leading-tight mb-3" style={{ color: "hsl(232,25%,20%)" }}>
            {c.title}
          </h1>
          <p className="text-[0.75rem] tracking-[0.15em] uppercase opacity-50">{c.updated}</p>
        </div>

        <div className="space-y-8">
          {c.sections.map((s: any, i: number) => (
            <section key={i}>
              <h2 className="font-['Cormorant_Garamond',serif] text-2xl md:text-[1.75rem] mb-3" style={{ color: "hsl(232,25%,25%)" }}>
                {s.h}
              </h2>
              {s.p && (
                <p className="text-[0.95rem] md:text-[1rem] leading-relaxed mb-3" style={{ color: "hsl(0,0%,25%)" }}>
                  {s.p}
                </p>
              )}
              {s.p2 && (
                <p className="text-[0.95rem] md:text-[1rem] leading-relaxed mb-3" style={{ color: "hsl(0,0%,25%)" }}>
                  {s.p2}
                </p>
              )}
              {s.p3 && (
                <p className="text-[0.95rem] md:text-[1rem] leading-relaxed mb-3" style={{ color: "hsl(0,0%,25%)" }}>
                  {s.p3}
                </p>
              )}
              {s.p4 && (
                <p className="text-[0.95rem] md:text-[1rem] leading-relaxed mb-3" style={{ color: "hsl(0,0%,25%)" }}>
                  {s.p4}
                </p>
              )}
              {s.bullets && (
                <ul className="list-disc pl-5 space-y-2 mb-3">
                  {s.bullets.map((b: string, idx: number) => (
                    <li key={idx} className="text-[0.95rem] md:text-[1rem] leading-relaxed" style={{ color: "hsl(0,0%,25%)" }}>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {s.subsections && (
                <div className="space-y-4 mt-4">
                  {s.subsections.map((sub: any, idx: number) => (
                    <div key={idx}>
                      <h3 className="font-semibold text-[1rem] mb-1" style={{ color: "hsl(232,25%,25%)" }}>
                        {sub.h}
                      </h3>
                      <p className="text-[0.95rem] md:text-[1rem] leading-relaxed" style={{ color: "hsl(0,0%,25%)" }}>
                        {sub.p}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {s.provisions && (
                <div className="space-y-3 mt-2">
                  {s.provisions.map((prov: any, idx: number) => (
                    <p key={idx} className="text-[0.95rem] md:text-[1rem] leading-relaxed" style={{ color: "hsl(0,0%,25%)" }}>
                      <strong>{prov.label}</strong> {prov.text}
                    </p>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-black/10">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.2em] uppercase transition-opacity hover:opacity-70"
            style={{ color: "hsl(232,25%,30%)" }}
          >
            <ArrowLeft size={16} /> {c.back}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terms;
