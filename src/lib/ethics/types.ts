export type Block =
  | { t: "p"; v: string }
  | { t: "quote"; v: string }
  | { t: "lead"; v: string }
  | { t: "list"; v: string[] }
  | { t: "sub"; h: string; v: string };

export type Section = { id: string; num?: string; title: string; blocks: Block[] };

export type EthicsContent = {
  ui: {
    back: string;
    pageTitle: string;
    docTitle: string;
    subtitle: string;
    edition: string;
    summary: string;
    messageTitle: string;
    signature: string;
    signaturePlace: string;
    whyTitle: string;
    partI: string;
    partII: string;
    ctaTitle: string;
    ctaText: string;
    closingQuote: string;
    closingTag: string;
    htmlTitle: string;
  };
  message: Block[];
  why: Block[];
  partI: Section[];
  partII: Section[];
};
