export interface Pokemon {
  forms: { name: string }[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: {
    slot: number;
    type: { name: string };
  }[];
}
