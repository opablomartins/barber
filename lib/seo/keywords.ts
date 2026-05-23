export const seoKeywords = {
  home: [
    "barbeiro a domicilio",
    "barbeiro delivery",
    "barbeiro em casa",
    "corte masculino em domicilio",
  ],
  city: (cityName: string) => [
    `barbeiro a domicilio ${cityName.toLowerCase()}`,
    `barbeiro delivery ${cityName.toLowerCase()}`,
    `corte masculino em domicilio ${cityName.toLowerCase()}`,
  ],
  neighborhood: (neighborhood: string, cityName: string) => [
    `barbeiro a domicilio ${neighborhood.toLowerCase()}`,
    `barbeiro em casa ${neighborhood.toLowerCase()}`,
    `corte masculino ${neighborhood.toLowerCase()} ${cityName.toLowerCase()}`,
  ],
  barber: (name: string) => [
    `${name.toLowerCase()} barbeiro`,
    "barbeiro a domicilio",
    "corte masculino em domicilio",
  ],
} as const;
