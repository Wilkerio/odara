import type { EthicsContent } from "./types";
import { pt } from "./pt";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";

export type { Block, Section, EthicsContent } from "./types";

export const ethicsContent: Record<string, EthicsContent> = { pt, en, es, fr };
