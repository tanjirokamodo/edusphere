"use client";

import { useCallback } from "react";
import type { Language } from "@/types";
import { translate, type TranslationKey } from "./i18n";
import { useStoredString, writeStored } from "./local-store";

const LANGUAGE_KEY = "edusphere.demo.language";

export function useLanguage() {
  const stored = useStoredString(LANGUAGE_KEY);
  const lang: Language = stored === "te" ? "te" : "en";

  const t = useCallback(
    (key: TranslationKey) => translate(lang, key),
    [lang],
  );

  const setLang = useCallback((next: Language) => {
    writeStored(LANGUAGE_KEY, next);
  }, []);

  return { lang, setLang, t };
}
