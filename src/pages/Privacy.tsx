import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

type Bullet = { label?: string; text: string };
type Section = { h: string; paragraphs?: string[]; bullets?: Bullet[] };

const content: Record<"en" | "pt" | "es" | "fr", { back: string; pageEyebrow: string; title: string; updated: string; sections: Section[] }> = {
  en: {
    back: "Back",
    pageEyebrow: "Odara Capital Partners",
    title: "Our Policies — Privacy Policy",
    updated: "Last updated: July 18th, 2026",
    sections: [
      {
        h: "1. Introduction",
        paragraphs: [
          'Odara Capital Partners SPV ("Odara," "we," "us," "our") is a securitization company incorporated under the laws of the Grand Duchy of Luxembourg, with registered office at 2 Parc d\'Activités Capellen, 8308 Capellen, Luxembourg, and an office at Av. Paulista, 726, São Paulo, Brazil. Odara is committed to safeguarding the personal data of the professional counterparties, corporate partners, and website visitors it interacts with.',
          "This Privacy Policy, accessible at www.odara.lu/privacy and subject to periodic updates, describes how Odara collects, uses, shares and protects personal data in connection with our website and the Services described in our Terms of Use.",
        ],
      },
      {
        h: "2. Acknowledgement and Agreement",
        paragraphs: [
          "By visiting our website or otherwise engaging with Odara, you acknowledge that you have read and understood this Privacy Policy. Where processing is based on your consent, you may withdraw it at any time as described in Section 13 below, without affecting the lawfulness of processing carried out before withdrawal.",
        ],
      },
      {
        h: "3. Applicability",
        paragraphs: [
          "This Privacy Policy applies to personal data collected through the Odara website and in the course of our business relationships with professional counterparties, corporate borrowers, advisers and business partners. It does not extend to personal data collected by third-party websites or services that we do not control — please refer to their own privacy policies.",
        ],
      },
      {
        h: "4. Definitions",
        bullets: [
          { label: "Personal Data:", text: "Any information relating to an identified or identifiable natural person." },
          { label: "Data Subject:", text: "The natural person to whom Personal Data relates." },
          { label: "Processing:", text: "Any operation performed on Personal Data, whether automated or not, including collection, storage, use, disclosure, restriction, erasure or destruction." },
          { label: "Controller:", text: "The entity that determines the purposes and means of Processing." },
          { label: "Processor:", text: "The entity that processes Personal Data on behalf of the Controller." },
          { label: "Data Protection Laws:", text: "Regulation (EU) 2016/679 (GDPR), the Luxembourg Law of 1 August 2018 on data protection, Brazilian Federal Law No. 13,709/2018 (LGPD), and any other applicable privacy legislation." },
        ],
      },
      {
        h: "5. What Personal Data do we collect",
        paragraphs: ["Depending on your interaction with us, we may collect:"],
        bullets: [
          { label: "Identification and contact data:", text: "Name, business e-mail address, phone number, company, role and jurisdiction." },
          { label: "Professional and eligibility data:", text: "Information required to assess your status as a Professional Counterparty, including institutional affiliation and, where applicable, professional qualifications." },
          { label: "KYC/AML data:", text: "Where you or your organisation engage with our Services, identification documents, source-of-funds information and sanctions-screening data, collected as part of client onboarding." },
          { label: "Correspondence:", text: "The content of enquiries, messages and communications you send us through the contact form, e-mail or other channels." },
          { label: "Technical data:", text: "IP address, device and browser information, pages viewed, and similar data collected automatically through cookies (see Section 14)." },
        ],
      },
      {
        h: "6. How and from where do we collect your Personal Data",
        paragraphs: [
          "We collect Personal Data that you provide directly (through the contact form, e-mail, meetings or onboarding documentation), and technical data collected automatically when you use our website through cookies and similar technologies.",
        ],
      },
      {
        h: "7. How we use your Personal Data",
        paragraphs: ["We use Personal Data to:"],
        bullets: [
          { text: "Respond to your enquiries and requests for information." },
          { text: "Assess your eligibility as a Professional Counterparty." },
          { text: "Perform client identification, verification, source-of-funds and sanctions-screening procedures (KYC/AML)." },
          { text: "Manage and administer our business relationship with you." },
          { text: "Comply with applicable legal, regulatory and tax obligations." },
          { text: "Maintain the security and proper functioning of our website." },
          { text: "Where you have given consent, send you institutional communications." },
        ],
      },
      {
        h: "8. Legal Basis for processing your Personal Data",
        paragraphs: ["Under the GDPR and the LGPD, we process your Personal Data on one of the following bases:"],
        bullets: [
          { text: "Performance of a contract or pre-contractual steps taken at your request." },
          { text: "Compliance with a legal obligation, including AML/CFT and sanctions-screening obligations." },
          { text: "Our legitimate interests in operating, securing and promoting our business, provided these do not override your fundamental rights." },
          { text: "Your consent, which you may withdraw at any time, in particular for non-essential cookies and marketing communications." },
        ],
      },
      {
        h: "9. With whom do we share your Personal Data",
        paragraphs: ["We share Personal Data only where necessary, with:"],
        bullets: [
          { text: "Service providers and sub-contractors that support our IT, legal and administrative operations, under confidentiality obligations." },
          { text: "Professional advisers involved in a specific transaction (legal counsel, auditors)." },
          { text: "Competent regulatory authorities and law enforcement agencies, where legally required, including the Luxembourg CSSF and the Brazilian ANPD." },
        ],
      },
      {
        h: "10. Cross-border data transfers",
        paragraphs: [
          "Given the international nature of our activities, Personal Data may be transferred between the European Union, Brazil and other jurisdictions. Transfers out of the EEA rely on adequacy decisions or Standard Contractual Clauses under Chapter V GDPR, with supplementary measures where required. Transfers out of Brazil comply with Articles 33 et seq. of the LGPD, including ANPD standard contractual clauses where applicable.",
        ],
      },
      {
        h: "11. Storage of your Personal Data",
        bullets: [
          { text: "We retain Personal Data only for as long as necessary for the purposes described in this Policy." },
          { text: "Where onboarding/KYC data has been collected, Luxembourg AML rules generally require retention for five years after the end of the business relationship." },
          { text: "We may retain data longer where required to comply with a legal obligation or to establish, exercise or defend legal claims." },
        ],
        paragraphs: [
          "Personal Data is deleted or anonymised once it is no longer required for the purposes for which it was collected.",
        ],
      },
      {
        h: "12. Security of your Personal Data",
        bullets: [
          { text: "We implement technical and organisational measures — including encryption in transit, access controls and logging — designed to protect Personal Data against unauthorised access, loss, alteration or disclosure." },
          { text: "These measures are consistent with Article 32 GDPR and Articles 46–49 LGPD." },
          { text: "We apply appropriate contractual safeguards when sharing Personal Data with third parties." },
        ],
      },
      {
        h: "13. Your Rights",
        bullets: [
          { label: "Right of Access:", text: "Request confirmation of, and a copy of, the Personal Data we hold about you." },
          { label: "Right to Rectification:", text: "Request correction of inaccurate or incomplete Personal Data." },
          { label: "Right to Erasure:", text: "Request deletion of your Personal Data when it is no longer necessary, when you withdraw consent, or where processed unlawfully." },
          { label: "Right to Restrict Processing:", text: "Request restriction where accuracy is contested or processing is unlawful." },
          { label: "Right to Data Portability:", text: "Request transfer of your Personal Data in a machine-readable format, where technically feasible." },
          { label: "Right to Object:", text: "Object to processing based on our legitimate interests or to direct marketing at any time." },
          { label: "Right regarding Automated Decisions:", text: "Request review of decisions based solely on automated processing." },
        ],
        paragraphs: [
          "Requests may be sent to contact@odaracapital.com. Subject to legal exemptions, we aim to respond within the timeframes required by applicable law. You may also lodge a complaint with the Luxembourg Commission Nationale pour la Protection des Données (CNPD) or the Brazilian Autoridade Nacional de Proteção de Dados (ANPD).",
        ],
      },
      {
        h: "14. Cookies and similar technologies",
        paragraphs: [
          "Our website uses strictly necessary cookies and, subject to your consent, analytics and functionality cookies. Consent is collected through a cookie banner and may be withdrawn at any time through your browser settings.",
        ],
      },
      {
        h: "15. Third-party links",
        paragraphs: [
          "Our website may contain links to third-party websites. Information you share with those third parties is governed by their own privacy policies, which we do not control.",
        ],
      },
      {
        h: "16. Amendments to this Privacy Policy",
        paragraphs: [
          "We may revise this Privacy Policy from time to time. Revisions take effect upon publication on our website. Where changes are material, we will take reasonable steps to notify you.",
        ],
      },
      {
        h: "17. Reporting concerns",
        paragraphs: [
          "Odara is committed to conducting its business with integrity. If you have concerns regarding the conduct of Odara, its officers or employees, you may report them in confidence to contact@odaracapital.com. Every report will be reviewed and addressed appropriately.",
        ],
      },
      {
        h: "18. How to contact us",
        paragraphs: [
          "For any question about this Privacy Policy or to exercise your rights, contact us at contact@odaracapital.com.",
          "Odara Capital Partners SPV — Registered office: 2 Parc d'Activités Capellen, 8308 Capellen, Luxembourg. Brazil office: Av. Paulista, 726, São Paulo, SP.",
        ],
      },
    ],
  },
  pt: {
    back: "Voltar",
    pageEyebrow: "Odara Capital Partners",
    title: "Nossas Políticas — Política de Privacidade",
    updated: "Última atualização: 18 de julho de 2026",
    sections: [
      {
        h: "1. Introdução",
        paragraphs: [
          'A Odara Capital Partners SPV ("Odara", "nós", "nosso") é uma sociedade de securitização constituída segundo as leis do Grão-Ducado de Luxemburgo, com sede em 2 Parc d\'Activités Capellen, 8308 Capellen, Luxemburgo, e escritório na Av. Paulista, 726, São Paulo, Brasil. A Odara está comprometida em proteger os dados pessoais das contrapartes profissionais, parceiros corporativos e visitantes do website com quem interage.',
          "Esta Política de Privacidade, disponível em www.odara.lu/privacy e sujeita a atualizações periódicas, descreve como a Odara coleta, utiliza, compartilha e protege dados pessoais em conexão com nosso website e os Serviços descritos em nossos Termos de Uso.",
        ],
      },
      {
        h: "2. Ciência e Concordância",
        paragraphs: [
          "Ao visitar nosso website ou de outra forma interagir com a Odara, você reconhece que leu e entendeu esta Política de Privacidade. Quando o tratamento se basear em seu consentimento, você pode retirá-lo a qualquer momento, conforme descrito na Seção 13 abaixo, sem afetar a licitude do tratamento realizado antes da retirada.",
        ],
      },
      {
        h: "3. Aplicabilidade",
        paragraphs: [
          "Esta Política de Privacidade aplica-se aos dados pessoais coletados através do website da Odara e no curso de nossos relacionamentos comerciais com contrapartes profissionais, tomadores corporativos, assessores e parceiros de negócio. Não se estende a dados pessoais coletados por websites ou serviços de terceiros que não controlamos — consulte as respectivas políticas de privacidade.",
        ],
      },
      {
        h: "4. Definições",
        bullets: [
          { label: "Dados Pessoais:", text: "Qualquer informação relacionada a pessoa natural identificada ou identificável." },
          { label: "Titular dos Dados:", text: "A pessoa natural a quem os Dados Pessoais se referem." },
          { label: "Tratamento:", text: "Qualquer operação realizada com Dados Pessoais, automatizada ou não, incluindo coleta, armazenamento, uso, divulgação, restrição, eliminação ou destruição." },
          { label: "Controlador:", text: "A entidade que determina as finalidades e os meios do Tratamento." },
          { label: "Operador:", text: "A entidade que trata Dados Pessoais em nome do Controlador." },
          { label: "Leis de Proteção de Dados:", text: "O Regulamento (UE) 2016/679 (GDPR), a Lei de Luxemburgo de 1º de agosto de 2018 sobre proteção de dados, a Lei Federal brasileira nº 13.709/2018 (LGPD), e qualquer outra legislação de privacidade aplicável." },
        ],
      },
      {
        h: "5. Quais Dados Pessoais coletamos",
        paragraphs: ["Dependendo da sua interação conosco, podemos coletar:"],
        bullets: [
          { label: "Dados de identificação e contato:", text: "Nome, e-mail profissional, telefone, empresa, cargo e jurisdição." },
          { label: "Dados profissionais e de elegibilidade:", text: "Informações necessárias para avaliar sua condição de Contraparte Profissional, incluindo vínculo institucional e, quando aplicável, qualificações profissionais." },
          { label: "Dados de KYC/AML:", text: "Quando você ou sua organização contratam nossos Serviços, documentos de identificação, informações sobre origem de recursos e dados de triagem de sanções, coletados no âmbito do onboarding de clientes." },
          { label: "Correspondência:", text: "O conteúdo de solicitações, mensagens e comunicações enviadas por meio do formulário de contato, e-mail ou outros canais." },
          { label: "Dados técnicos:", text: "Endereço IP, informações de dispositivo e navegador, páginas visitadas e dados semelhantes coletados automaticamente por meio de cookies (ver Seção 14)." },
        ],
      },
      {
        h: "6. Como e de onde coletamos seus Dados Pessoais",
        paragraphs: [
          "Coletamos Dados Pessoais fornecidos diretamente por você (através do formulário de contato, e-mail, reuniões ou documentação de onboarding), e dados técnicos coletados automaticamente quando você utiliza nosso website, por meio de cookies e tecnologias semelhantes.",
        ],
      },
      {
        h: "7. Como utilizamos seus Dados Pessoais",
        paragraphs: ["Utilizamos Dados Pessoais para:"],
        bullets: [
          { text: "Responder às suas solicitações e pedidos de informação." },
          { text: "Avaliar sua elegibilidade como Contraparte Profissional." },
          { text: "Realizar procedimentos de identificação, verificação, origem de recursos e triagem de sanções (KYC/AML)." },
          { text: "Gerenciar e administrar nosso relacionamento comercial com você." },
          { text: "Cumprir obrigações legais, regulatórias e tributárias aplicáveis." },
          { text: "Manter a segurança e o bom funcionamento do nosso website." },
          { text: "Quando você tiver consentido, enviar comunicações institucionais." },
        ],
      },
      {
        h: "8. Base Legal para o tratamento de seus Dados Pessoais",
        paragraphs: ["Sob o GDPR e a LGPD, tratamos seus Dados Pessoais com base em uma das seguintes hipóteses:"],
        bullets: [
          { text: "Execução de contrato ou medidas pré-contratuais realizadas a seu pedido." },
          { text: "Cumprimento de obrigação legal, incluindo obrigações de AML/CFT e triagem de sanções." },
          { text: "Nossos legítimos interesses em operar, proteger e promover nosso negócio, desde que não prevaleçam sobre seus direitos fundamentais." },
          { text: "Seu consentimento, que pode ser retirado a qualquer momento, em particular para cookies não essenciais e comunicações de marketing." },
        ],
      },
      {
        h: "9. Com quem compartilhamos seus Dados Pessoais",
        paragraphs: ["Compartilhamos Dados Pessoais apenas quando necessário, com:"],
        bullets: [
          { text: "Prestadores de serviço e subcontratados que apoiam nossas operações de TI, jurídicas e administrativas, sujeitos a obrigações de confidencialidade." },
          { text: "Assessores profissionais envolvidos em uma transação específica (advogados, auditores)." },
          { text: "Autoridades regulatórias e órgãos de aplicação da lei competentes, quando legalmente exigido, incluindo a CSSF de Luxemburgo e a ANPD brasileira." },
        ],
      },
      {
        h: "10. Transferências internacionais de dados",
        paragraphs: [
          "Dada a natureza internacional de nossas atividades, os Dados Pessoais podem ser transferidos entre a União Europeia, o Brasil e outras jurisdições. Transferências para fora do EEE seguem decisões de adequação ou Cláusulas Contratuais Padrão do Capítulo V do GDPR, com medidas suplementares quando necessário. Transferências para fora do Brasil observam os artigos 33 e seguintes da LGPD, incluindo as cláusulas-padrão da ANPD quando aplicável.",
        ],
      },
      {
        h: "11. Armazenamento de seus Dados Pessoais",
        bullets: [
          { text: "Retemos Dados Pessoais apenas pelo tempo necessário às finalidades descritas nesta Política." },
          { text: "Quando dados de onboarding/KYC forem coletados, as regras de AML de Luxemburgo geralmente exigem retenção por cinco anos após o fim da relação comercial." },
          { text: "Podemos reter dados por período maior quando exigido para cumprir obrigação legal ou para estabelecer, exercer ou defender direitos em processos." },
        ],
        paragraphs: [
          "Os Dados Pessoais são eliminados ou anonimizados quando deixam de ser necessários para as finalidades para as quais foram coletados.",
        ],
      },
      {
        h: "12. Segurança de seus Dados Pessoais",
        bullets: [
          { text: "Implementamos medidas técnicas e organizacionais — incluindo criptografia em trânsito, controles de acesso e registro de logs — destinadas a proteger os Dados Pessoais contra acesso não autorizado, perda, alteração ou divulgação." },
          { text: "Essas medidas estão em linha com o Artigo 32 do GDPR e os Artigos 46 a 49 da LGPD." },
          { text: "Aplicamos salvaguardas contratuais apropriadas ao compartilhar Dados Pessoais com terceiros." },
        ],
      },
      {
        h: "13. Seus Direitos",
        bullets: [
          { label: "Direito de Acesso:", text: "Solicitar confirmação e cópia dos Dados Pessoais que possuímos sobre você." },
          { label: "Direito de Retificação:", text: "Solicitar a correção de Dados Pessoais incompletos ou incorretos." },
          { label: "Direito de Eliminação:", text: "Solicitar a exclusão de seus Dados Pessoais quando não forem mais necessários, quando você retirar o consentimento, ou quando tratados de forma ilícita." },
          { label: "Direito de Restrição do Tratamento:", text: "Solicitar a restrição quando a exatidão for contestada ou o tratamento for ilícito." },
          { label: "Direito à Portabilidade dos Dados:", text: "Solicitar a transferência de seus Dados Pessoais em formato interoperável, quando tecnicamente viável." },
          { label: "Direito de Oposição:", text: "Opor-se ao tratamento baseado em nossos legítimos interesses ou a comunicações de marketing direto, a qualquer momento." },
          { label: "Direito quanto a Decisões Automatizadas:", text: "Solicitar revisão de decisões tomadas com base unicamente em tratamento automatizado." },
        ],
        paragraphs: [
          "Solicitações podem ser enviadas para contact@odaracapital.com. Sujeito a exceções legais, buscamos responder dentro dos prazos exigidos pela lei aplicável. Você também pode apresentar reclamação à Commission Nationale pour la Protection des Données (CNPD) de Luxemburgo ou à Autoridade Nacional de Proteção de Dados (ANPD) do Brasil.",
        ],
      },
      {
        h: "14. Cookies e tecnologias semelhantes",
        paragraphs: [
          "Nosso website utiliza cookies estritamente necessários e, mediante seu consentimento, cookies de análise e funcionalidade. O consentimento é coletado por meio de um banner de cookies e pode ser retirado a qualquer momento nas configurações do seu navegador.",
        ],
      },
      {
        h: "15. Links de terceiros",
        paragraphs: [
          "Nosso website pode conter links para websites de terceiros. As informações que você compartilha com esses terceiros são regidas por suas próprias políticas de privacidade, que não controlamos.",
        ],
      },
      {
        h: "16. Alterações a esta Política de Privacidade",
        paragraphs: [
          "Podemos revisar esta Política de Privacidade periodicamente. As revisões produzem efeito a partir da publicação em nosso website. Quando as alterações forem substanciais, tomaremos medidas razoáveis para notificá-lo.",
        ],
      },
      {
        h: "17. Relato de preocupações",
        paragraphs: [
          "A Odara está comprometida em conduzir seus negócios com integridade. Se você tiver preocupações quanto à conduta da Odara, de seus dirigentes ou funcionários, pode relatá-las em confidencialidade para contact@odaracapital.com. Todo relato será analisado e tratado adequadamente.",
        ],
      },
      {
        h: "18. Como entrar em contato conosco",
        paragraphs: [
          "Para qualquer dúvida sobre esta Política de Privacidade ou para exercer seus direitos, entre em contato pelo e-mail contact@odaracapital.com.",
          "Odara Capital Partners SPV — Sede: 2 Parc d'Activités Capellen, 8308 Capellen, Luxemburgo. Escritório no Brasil: Av. Paulista, 726, São Paulo, SP.",
        ],
      },
    ],
  },
  es: {
    back: "Volver",
    pageEyebrow: "Odara Capital Partners",
    title: "Nuestras Políticas — Política de Privacidad",
    updated: "Última actualización: 18 de julio de 2026",
    sections: [
      {
        h: "1. Introducción",
        paragraphs: [
          'Odara Capital Partners SPV ("Odara", "nosotros", "nuestro") es una sociedad de titulización constituida conforme a las leyes del Gran Ducado de Luxemburgo, con domicilio social en 2 Parc d\'Activités Capellen, 8308 Capellen, Luxemburgo, y una oficina en Av. Paulista, 726, São Paulo, Brasil. Odara está comprometida con la protección de los datos personales de las contrapartes profesionales, socios corporativos y visitantes del sitio web con los que interactúa.',
          "Esta Política de Privacidad, disponible en www.odara.lu/privacy y sujeta a actualizaciones periódicas, describe cómo Odara recopila, utiliza, comparte y protege los datos personales en relación con nuestro sitio web y los Servicios descritos en nuestros Términos de Uso.",
        ],
      },
      {
        h: "2. Reconocimiento y Aceptación",
        paragraphs: [
          "Al visitar nuestro sitio web o interactuar de cualquier otra forma con Odara, usted reconoce que ha leído y comprendido esta Política de Privacidad. Cuando el tratamiento se base en su consentimiento, podrá retirarlo en cualquier momento, según se describe en la Sección 13 más adelante, sin que ello afecte la licitud del tratamiento realizado antes de la retirada.",
        ],
      },
      {
        h: "3. Aplicabilidad",
        paragraphs: [
          "Esta Política de Privacidad se aplica a los datos personales recopilados a través del sitio web de Odara y en el curso de nuestras relaciones comerciales con contrapartes profesionales, prestatarios corporativos, asesores y socios de negocio. No se extiende a los datos personales recopilados por sitios web o servicios de terceros que no controlamos; le rogamos consultar sus respectivas políticas de privacidad.",
        ],
      },
      {
        h: "4. Definiciones",
        bullets: [
          { label: "Datos Personales:", text: "Cualquier información relativa a una persona física identificada o identificable." },
          { label: "Titular de los Datos:", text: "La persona física a quien se refieren los Datos Personales." },
          { label: "Tratamiento:", text: "Cualquier operación realizada sobre Datos Personales, automatizada o no, incluida la recopilación, el almacenamiento, el uso, la divulgación, la restricción, la supresión o la destrucción." },
          { label: "Responsable del Tratamiento:", text: "La entidad que determina los fines y los medios del Tratamiento." },
          { label: "Encargado del Tratamiento:", text: "La entidad que trata Datos Personales por cuenta del Responsable del Tratamiento." },
          { label: "Leyes de Protección de Datos:", text: "El Reglamento (UE) 2016/679 (RGPD), la Ley de Luxemburgo de 1 de agosto de 2018 sobre protección de datos, la Ley Federal brasileña n.º 13.709/2018 (LGPD) y cualquier otra legislación de privacidad aplicable." },
        ],
      },
      {
        h: "5. Qué Datos Personales recopilamos",
        paragraphs: ["Dependiendo de su interacción con nosotros, podemos recopilar:"],
        bullets: [
          { label: "Datos de identificación y contacto:", text: "Nombre, dirección de correo electrónico profesional, número de teléfono, empresa, cargo y jurisdicción." },
          { label: "Datos profesionales y de elegibilidad:", text: "Información necesaria para evaluar su condición de Contraparte Profesional, incluida la afiliación institucional y, cuando corresponda, las cualificaciones profesionales." },
          { label: "Datos de KYC/AML:", text: "Cuando usted o su organización contratan nuestros Servicios, documentos de identificación, información sobre el origen de los fondos y datos de verificación de sanciones, recopilados como parte del proceso de incorporación de clientes." },
          { label: "Correspondencia:", text: "El contenido de las consultas, mensajes y comunicaciones que nos envíe a través del formulario de contacto, correo electrónico u otros canales." },
          { label: "Datos técnicos:", text: "Dirección IP, información del dispositivo y del navegador, páginas visitadas y datos similares recopilados automáticamente mediante cookies (véase la Sección 14)." },
        ],
      },
      {
        h: "6. Cómo y de dónde recopilamos sus Datos Personales",
        paragraphs: [
          "Recopilamos los Datos Personales que usted nos proporciona directamente (a través del formulario de contacto, correo electrónico, reuniones o documentación de incorporación), así como datos técnicos recopilados automáticamente cuando utiliza nuestro sitio web mediante cookies y tecnologías similares.",
        ],
      },
      {
        h: "7. Cómo utilizamos sus Datos Personales",
        paragraphs: ["Utilizamos los Datos Personales para:"],
        bullets: [
          { text: "Responder a sus consultas y solicitudes de información." },
          { text: "Evaluar su elegibilidad como Contraparte Profesional." },
          { text: "Realizar procedimientos de identificación, verificación, origen de fondos y verificación de sanciones (KYC/AML) de clientes." },
          { text: "Gestionar y administrar nuestra relación comercial con usted." },
          { text: "Cumplir con las obligaciones legales, regulatorias y fiscales aplicables." },
          { text: "Mantener la seguridad y el correcto funcionamiento de nuestro sitio web." },
          { text: "Cuando usted haya otorgado su consentimiento, enviarle comunicaciones institucionales." },
        ],
      },
      {
        h: "8. Base Legal para el tratamiento de sus Datos Personales",
        paragraphs: ["En virtud del RGPD y de la LGPD, tratamos sus Datos Personales sobre la base de uno de los siguientes fundamentos:"],
        bullets: [
          { text: "La ejecución de un contrato o de medidas precontractuales adoptadas a solicitud suya." },
          { text: "El cumplimiento de una obligación legal, incluidas las obligaciones de AML/CFT y de verificación de sanciones." },
          { text: "Nuestros intereses legítimos en operar, proteger y promover nuestro negocio, siempre que no prevalezcan sobre sus derechos fundamentales." },
          { text: "Su consentimiento, que puede retirar en cualquier momento, en particular respecto de las cookies no esenciales y las comunicaciones de marketing." },
        ],
      },
      {
        h: "9. Con quién compartimos sus Datos Personales",
        paragraphs: ["Compartimos Datos Personales únicamente cuando es necesario, con:"],
        bullets: [
          { text: "Proveedores de servicios y subcontratistas que apoyan nuestras operaciones de TI, jurídicas y administrativas, sujetos a obligaciones de confidencialidad." },
          { text: "Asesores profesionales involucrados en una transacción específica (asesores jurídicos, auditores)." },
          { text: "Autoridades regulatorias competentes y organismos encargados de la aplicación de la ley, cuando así lo exija la ley, incluidas la CSSF de Luxemburgo y la ANPD de Brasil." },
        ],
      },
      {
        h: "10. Transferencias internacionales de datos",
        paragraphs: [
          "Dada la naturaleza internacional de nuestras actividades, los Datos Personales pueden transferirse entre la Unión Europea, Brasil y otras jurisdicciones. Las transferencias fuera del EEE se basan en decisiones de adecuación o en las Cláusulas Contractuales Tipo previstas en el Capítulo V del RGPD, con medidas adicionales cuando resulte necesario. Las transferencias fuera de Brasil cumplen con los artículos 33 y siguientes de la LGPD, incluidas las cláusulas contractuales estándar de la ANPD cuando corresponda.",
        ],
      },
      {
        h: "11. Almacenamiento de sus Datos Personales",
        bullets: [
          { text: "Conservamos los Datos Personales únicamente durante el tiempo necesario para los fines descritos en esta Política." },
          { text: "Cuando se hayan recopilado datos de incorporación/KYC, las normas de AML de Luxemburgo generalmente exigen su conservación durante cinco años tras la finalización de la relación comercial." },
          { text: "Podemos conservar los datos por un período más prolongado cuando sea necesario para cumplir con una obligación legal o para formular, ejercer o defender reclamaciones legales." },
        ],
        paragraphs: [
          "Los Datos Personales se eliminan o se anonimizan una vez que dejan de ser necesarios para los fines para los que fueron recopilados.",
        ],
      },
      {
        h: "12. Seguridad de sus Datos Personales",
        bullets: [
          { text: "Implementamos medidas técnicas y organizativas —incluidas la cifrado en tránsito, los controles de acceso y el registro de actividad— diseñadas para proteger los Datos Personales frente al acceso no autorizado, la pérdida, la alteración o la divulgación." },
          { text: "Estas medidas son coherentes con el artículo 32 del RGPD y los artículos 46 a 49 de la LGPD." },
          { text: "Aplicamos salvaguardas contractuales apropiadas al compartir Datos Personales con terceros." },
        ],
      },
      {
        h: "13. Sus Derechos",
        bullets: [
          { label: "Derecho de Acceso:", text: "Solicitar la confirmación y una copia de los Datos Personales que conservamos sobre usted." },
          { label: "Derecho de Rectificación:", text: "Solicitar la corrección de Datos Personales inexactos o incompletos." },
          { label: "Derecho de Supresión:", text: "Solicitar la eliminación de sus Datos Personales cuando ya no sean necesarios, cuando retire su consentimiento, o cuando hayan sido tratados de forma ilícita." },
          { label: "Derecho a la Limitación del Tratamiento:", text: "Solicitar la limitación cuando se impugne la exactitud de los datos o el tratamiento sea ilícito." },
          { label: "Derecho a la Portabilidad de los Datos:", text: "Solicitar la transferencia de sus Datos Personales en un formato estructurado y de uso común, cuando sea técnicamente viable." },
          { label: "Derecho de Oposición:", text: "Oponerse al tratamiento basado en nuestros intereses legítimos o al marketing directo en cualquier momento." },
          { label: "Derecho relativo a Decisiones Automatizadas:", text: "Solicitar la revisión de decisiones basadas únicamente en el tratamiento automatizado." },
        ],
        paragraphs: [
          "Las solicitudes pueden enviarse a contact@odaracapital.com. Sujeto a las excepciones legales, procuramos responder dentro de los plazos exigidos por la legislación aplicable. Asimismo, usted puede presentar una reclamación ante la Commission Nationale pour la Protection des Données (CNPD) de Luxemburgo o ante la Autoridade Nacional de Proteção de Dados (ANPD) de Brasil.",
        ],
      },
      {
        h: "14. Cookies y tecnologías similares",
        paragraphs: [
          "Nuestro sitio web utiliza cookies estrictamente necesarias y, sujeto a su consentimiento, cookies analíticas y funcionales. El consentimiento se recopila mediante un banner de cookies y puede retirarse en cualquier momento a través de la configuración de su navegador.",
        ],
      },
      {
        h: "15. Enlaces a terceros",
        paragraphs: [
          "Nuestro sitio web puede contener enlaces a sitios web de terceros. La información que usted comparta con dichos terceros se rige por sus propias políticas de privacidad, que no controlamos.",
        ],
      },
      {
        h: "16. Modificaciones de esta Política de Privacidad",
        paragraphs: [
          "Podremos revisar esta Política de Privacidad periódicamente. Las revisiones surtirán efecto a partir de su publicación en nuestro sitio web. Cuando los cambios sean sustanciales, adoptaremos medidas razonables para notificárselo.",
        ],
      },
      {
        h: "17. Comunicación de inquietudes",
        paragraphs: [
          "Odara está comprometida con la conducción de sus negocios con integridad. Si tiene alguna inquietud respecto de la conducta de Odara, de sus directivos o empleados, puede comunicarla de manera confidencial a contact@odaracapital.com. Cada comunicación será revisada y atendida de manera adecuada.",
        ],
      },
      {
        h: "18. Cómo contactarnos",
        paragraphs: [
          "Para cualquier pregunta sobre esta Política de Privacidad o para ejercer sus derechos, contáctenos en contact@odaracapital.com.",
          "Odara Capital Partners SPV — Domicilio social: 2 Parc d'Activités Capellen, 8308 Capellen, Luxemburgo. Oficina en Brasil: Av. Paulista, 726, São Paulo, SP.",
        ],
      },
    ],
  },
  fr: {
    back: "Retour",
    pageEyebrow: "Odara Capital Partners",
    title: "Nos Politiques — Politique de Confidentialité",
    updated: "Dernière mise à jour : 18 juillet 2026",
    sections: [
      {
        h: "1. Introduction",
        paragraphs: [
          'Odara Capital Partners SPV (« Odara », « nous », « notre ») est une société de titrisation constituée conformément aux lois du Grand-Duché de Luxembourg, dont le siège social est situé au 2 Parc d\'Activités Capellen, 8308 Capellen, Luxembourg, et disposant d\'un bureau Av. Paulista, 726, São Paulo, Brésil. Odara s\'engage à protéger les données personnelles des contreparties professionnelles, partenaires institutionnels et visiteurs du site web avec lesquels elle interagit.',
          "La présente Politique de Confidentialité, accessible à l'adresse www.odara.lu/privacy et susceptible d'être mise à jour périodiquement, décrit la manière dont Odara collecte, utilise, partage et protège les données personnelles dans le cadre de notre site web et des Services décrits dans nos Conditions d'Utilisation.",
        ],
      },
      {
        h: "2. Prise de connaissance et acceptation",
        paragraphs: [
          "En visitant notre site web ou en interagissant de toute autre manière avec Odara, vous reconnaissez avoir lu et compris la présente Politique de Confidentialité. Lorsque le traitement repose sur votre consentement, vous pouvez le retirer à tout moment, comme décrit à la Section 13 ci-dessous, sans que cela n'affecte la licéité du traitement effectué avant ce retrait.",
        ],
      },
      {
        h: "3. Champ d'application",
        paragraphs: [
          "La présente Politique de Confidentialité s'applique aux données personnelles collectées via le site web de Odara et dans le cadre de nos relations commerciales avec des contreparties professionnelles, emprunteurs institutionnels, conseillers et partenaires commerciaux. Elle ne s'étend pas aux données personnelles collectées par des sites web ou services tiers que nous ne contrôlons pas — veuillez vous référer à leurs propres politiques de confidentialité.",
        ],
      },
      {
        h: "4. Définitions",
        bullets: [
          { label: "Données Personnelles :", text: "Toute information se rapportant à une personne physique identifiée ou identifiable." },
          { label: "Personne Concernée :", text: "La personne physique à laquelle se rapportent les Données Personnelles." },
          { label: "Traitement :", text: "Toute opération effectuée sur des Données Personnelles, automatisée ou non, y compris la collecte, le stockage, l'utilisation, la divulgation, la limitation, l'effacement ou la destruction." },
          { label: "Responsable du Traitement :", text: "L'entité qui détermine les finalités et les moyens du Traitement." },
          { label: "Sous-traitant :", text: "L'entité qui traite les Données Personnelles pour le compte du Responsable du Traitement." },
          { label: "Lois sur la Protection des Données :", text: "Le Règlement (UE) 2016/679 (RGPD), la loi luxembourgeoise du 1er août 2018 relative à la protection des données, la loi fédérale brésilienne n° 13 709/2018 (LGPD), ainsi que toute autre législation applicable en matière de protection de la vie privée." },
        ],
      },
      {
        h: "5. Quelles Données Personnelles collectons-nous",
        paragraphs: ["Selon la nature de votre interaction avec nous, nous pouvons collecter :"],
        bullets: [
          { label: "Données d'identification et de contact :", text: "Nom, adresse e-mail professionnelle, numéro de téléphone, société, fonction et juridiction." },
          { label: "Données professionnelles et d'éligibilité :", text: "Informations nécessaires pour évaluer votre statut de Contrepartie Professionnelle, y compris votre rattachement institutionnel et, le cas échéant, vos qualifications professionnelles." },
          { label: "Données KYC/AML :", text: "Lorsque vous ou votre organisation recourez à nos Services, documents d'identification, informations relatives à l'origine des fonds et données de filtrage des sanctions, collectées dans le cadre de l'entrée en relation avec les clients." },
          { label: "Correspondance :", text: "Le contenu des demandes, messages et communications que vous nous adressez via le formulaire de contact, l'e-mail ou d'autres canaux." },
          { label: "Données techniques :", text: "Adresse IP, informations relatives à l'appareil et au navigateur, pages consultées et données similaires collectées automatiquement au moyen de cookies (voir Section 14)." },
        ],
      },
      {
        h: "6. Comment et d'où collectons-nous vos Données Personnelles",
        paragraphs: [
          "Nous collectons les Données Personnelles que vous nous fournissez directement (via le formulaire de contact, l'e-mail, des réunions ou la documentation d'entrée en relation), ainsi que les données techniques collectées automatiquement lorsque vous utilisez notre site web, au moyen de cookies et de technologies similaires.",
        ],
      },
      {
        h: "7. Comment utilisons-nous vos Données Personnelles",
        paragraphs: ["Nous utilisons les Données Personnelles pour :"],
        bullets: [
          { text: "Répondre à vos demandes et requêtes d'information." },
          { text: "Évaluer votre éligibilité en tant que Contrepartie Professionnelle." },
          { text: "Réaliser les procédures d'identification, de vérification, d'origine des fonds et de filtrage des sanctions (KYC/AML) des clients." },
          { text: "Gérer et administrer notre relation commerciale avec vous." },
          { text: "Respecter les obligations légales, réglementaires et fiscales applicables." },
          { text: "Maintenir la sécurité et le bon fonctionnement de notre site web." },
          { text: "Lorsque vous y avez consenti, vous adresser des communications institutionnelles." },
        ],
      },
      {
        h: "8. Base juridique du traitement de vos Données Personnelles",
        paragraphs: ["En vertu du RGPD et de la LGPD, nous traitons vos Données Personnelles sur l'une des bases suivantes :"],
        bullets: [
          { text: "L'exécution d'un contrat ou de mesures précontractuelles prises à votre demande." },
          { text: "Le respect d'une obligation légale, y compris les obligations LCB-FT et de filtrage des sanctions." },
          { text: "Nos intérêts légitimes à exploiter, sécuriser et promouvoir notre activité, dans la mesure où ceux-ci ne prévalent pas sur vos droits fondamentaux." },
          { text: "Votre consentement, que vous pouvez retirer à tout moment, en particulier pour les cookies non essentiels et les communications marketing." },
        ],
      },
      {
        h: "9. Avec qui partageons-nous vos Données Personnelles",
        paragraphs: ["Nous ne partageons les Données Personnelles que lorsque cela est nécessaire, avec :"],
        bullets: [
          { text: "Des prestataires de services et sous-traitants qui appuient nos opérations informatiques, juridiques et administratives, soumis à des obligations de confidentialité." },
          { text: "Des conseillers professionnels intervenant dans une transaction spécifique (conseils juridiques, auditeurs)." },
          { text: "Les autorités réglementaires compétentes et les autorités chargées de l'application de la loi, lorsque la loi l'exige, y compris la CSSF luxembourgeoise et l'ANPD brésilienne." },
        ],
      },
      {
        h: "10. Transferts internationaux de données",
        paragraphs: [
          "Compte tenu du caractère international de nos activités, les Données Personnelles peuvent être transférées entre l'Union européenne, le Brésil et d'autres juridictions. Les transferts hors de l'EEE reposent sur des décisions d'adéquation ou sur les Clauses Contractuelles Types prévues au Chapitre V du RGPD, assorties de mesures supplémentaires lorsque cela est requis. Les transferts hors du Brésil respectent les articles 33 et suivants de la LGPD, y compris les clauses contractuelles types de l'ANPD lorsqu'applicable.",
        ],
      },
      {
        h: "11. Conservation de vos Données Personnelles",
        bullets: [
          { text: "Nous ne conservons les Données Personnelles que pendant la durée nécessaire aux finalités décrites dans la présente Politique." },
          { text: "Lorsque des données d'entrée en relation/KYC ont été collectées, la réglementation luxembourgeoise en matière de LCB-FT impose généralement une conservation de cinq ans à compter de la fin de la relation commerciale." },
          { text: "Nous pouvons conserver les données plus longtemps lorsque cela est nécessaire pour respecter une obligation légale ou pour établir, exercer ou défendre des droits en justice." },
        ],
        paragraphs: [
          "Les Données Personnelles sont supprimées ou anonymisées dès lors qu'elles ne sont plus nécessaires aux finalités pour lesquelles elles ont été collectées.",
        ],
      },
      {
        h: "12. Sécurité de vos Données Personnelles",
        bullets: [
          { text: "Nous mettons en œuvre des mesures techniques et organisationnelles — notamment le chiffrement en transit, les contrôles d'accès et la journalisation — destinées à protéger les Données Personnelles contre tout accès non autorisé, perte, altération ou divulgation." },
          { text: "Ces mesures sont conformes à l'article 32 du RGPD et aux articles 46 à 49 de la LGPD." },
          { text: "Nous appliquons des garanties contractuelles appropriées lors du partage des Données Personnelles avec des tiers." },
        ],
      },
      {
        h: "13. Vos droits",
        bullets: [
          { label: "Droit d'accès :", text: "Demander la confirmation et une copie des Données Personnelles que nous détenons à votre sujet." },
          { label: "Droit de rectification :", text: "Demander la correction de Données Personnelles inexactes ou incomplètes." },
          { label: "Droit à l'effacement :", text: "Demander la suppression de vos Données Personnelles lorsqu'elles ne sont plus nécessaires, lorsque vous retirez votre consentement, ou lorsqu'elles ont été traitées de manière illicite." },
          { label: "Droit à la limitation du traitement :", text: "Demander la limitation du traitement lorsque l'exactitude des données est contestée ou que le traitement est illicite." },
          { label: "Droit à la portabilité des données :", text: "Demander le transfert de vos Données Personnelles dans un format structuré et lisible par machine, lorsque cela est techniquement possible." },
          { label: "Droit d'opposition :", text: "Vous opposer, à tout moment, au traitement fondé sur nos intérêts légitimes ou à la prospection directe." },
          { label: "Droit relatif aux décisions automatisées :", text: "Demander le réexamen de décisions fondées exclusivement sur un traitement automatisé." },
        ],
        paragraphs: [
          "Les demandes peuvent être adressées à contact@odaracapital.com. Sous réserve des exceptions légales, nous nous efforçons de répondre dans les délais requis par la législation applicable. Vous pouvez également introduire une réclamation auprès de la Commission Nationale pour la Protection des Données (CNPD) du Luxembourg ou de l'Autoridade Nacional de Proteção de Dados (ANPD) du Brésil.",
        ],
      },
      {
        h: "14. Cookies et technologies similaires",
        paragraphs: [
          "Notre site web utilise des cookies strictement nécessaires et, sous réserve de votre consentement, des cookies analytiques et fonctionnels. Le consentement est recueilli au moyen d'un bandeau de cookies et peut être retiré à tout moment via les paramètres de votre navigateur.",
        ],
      },
      {
        h: "15. Liens vers des sites tiers",
        paragraphs: [
          "Notre site web peut contenir des liens vers des sites web tiers. Les informations que vous partagez avec ces tiers sont régies par leurs propres politiques de confidentialité, que nous ne contrôlons pas.",
        ],
      },
      {
        h: "16. Modifications de la présente Politique de Confidentialité",
        paragraphs: [
          "Nous pouvons réviser la présente Politique de Confidentialité de temps à autre. Les révisions prennent effet dès leur publication sur notre site web. Lorsque les modifications sont substantielles, nous prendrons des mesures raisonnables pour vous en informer.",
        ],
      },
      {
        h: "17. Signalement de préoccupations",
        paragraphs: [
          "Odara s'engage à conduire ses activités avec intégrité. Si vous avez des préoccupations concernant la conduite de Odara, de ses dirigeants ou de ses employés, vous pouvez les signaler en toute confidentialité à contact@odaracapital.com. Chaque signalement sera examiné et traité de manière appropriée.",
        ],
      },
      {
        h: "18. Comment nous contacter",
        paragraphs: [
          "Pour toute question relative à la présente Politique de Confidentialité ou pour exercer vos droits, contactez-nous à l'adresse contact@odaracapital.com.",
          "Odara Capital Partners SPV — Siège social : 2 Parc d'Activités Capellen, 8308 Capellen, Luxembourg. Bureau au Brésil : Av. Paulista, 726, São Paulo, SP.",
        ],
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

const Privacy = () => {
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
            {c.pageEyebrow}
          </p>
          <h1 className="font-['Cormorant_Garamond',serif] font-light text-4xl md:text-5xl leading-tight mb-3" style={{ color: "hsl(232,25%,20%)" }}>
            {c.title}
          </h1>
          <p className="text-[0.75rem] tracking-[0.15em] uppercase opacity-50">{c.updated}</p>
        </div>

        <div className="space-y-8">
          {c.sections.map((s, i) => (
            <section key={i}>
              <h2 className="font-['Cormorant_Garamond',serif] text-2xl md:text-[1.75rem] mb-3" style={{ color: "hsl(232,25%,25%)" }}>
                {s.h}
              </h2>
              {s.paragraphs?.map((p, idx) => (
                <p key={idx} className="text-[0.95rem] md:text-[1rem] leading-relaxed mb-3" style={{ color: "hsl(0,0%,25%)" }}>
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="list-disc pl-5 space-y-2 mb-3">
                  {s.bullets.map((b, idx) => (
                    <li key={idx} className="text-[0.95rem] md:text-[1rem] leading-relaxed" style={{ color: "hsl(0,0%,25%)" }}>
                      {b.label && <strong style={{ color: "hsl(232,25%,25%)" }}>{b.label} </strong>}
                      {b.text}
                    </li>
                  ))}
                </ul>
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

export default Privacy;
