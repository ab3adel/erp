import { useQuery } from "@apollo/client";
import { query } from "../graphql/queries/countries";

interface CountriesQueryInput {
  first: number;
}

interface Language {
  id: number;
  name: string;
}

interface Currency {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
}

interface Country {
  id: number;
  name: string;
  languages: Language[];
  currencies: Currency[];
  cities: City[];
}

interface CountriesData {
  countries: {
    data: Country[];
  };
}

export const useCountries = (params: CountriesQueryInput) => {
  return useQuery<CountriesData, CountriesQueryInput>(query, {
    variables: params,
  });
};
