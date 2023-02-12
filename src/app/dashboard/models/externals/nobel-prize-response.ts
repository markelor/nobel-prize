/**
 * Degincion de la interfaz que hemos creado para las categorías
 */
export interface NobelPrizeResponse {
  awardYear: string;
  category: {
    en: string;
    no: string;
    se: string;
  };
  categoryFullName: {
    en: string;
    no: string;
    se: string;
  };
  dateAwarded: string;
  prizeAmount: number;
  prizeAmountAdjusted: number;
  links: {
    rel: string;
    href: string;
    action: string;
    types: string;
  };
  laureates: {
    id: string;
    knownName: {
      en: string;
    };
    fullName: {
      en: string;
    };
    orgName: {
      en: string;
    };
    portion: string;
    sortOrder: string;
    motivation: {
      en: string;
      no: string;
    };
    links: {
      rel: string;
      href: string;
      action: string;
      types: string;
    };
  }[];
  meta: {
    terms: string;
    license: string;
    disclaimer: string;
  };
}

