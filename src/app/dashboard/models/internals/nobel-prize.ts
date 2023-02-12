/**
 * Definición de la interfaz que hemos creado para los premios nobel
 */
export interface NobelPrize {
  awardYear: number;
  laureates: PersonalInfo[];
}

export interface PersonalInfo {
  knownName: string;
  portion: string;
  motivation: string;
}
