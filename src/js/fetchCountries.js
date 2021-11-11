
export function fetchCountries(name) {
     fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response => response.json())
        .then(countries => countries.forEach(({name, capital, population, flags, languages}) => console.log(capital)))
        .catch(error => console.log(error))
    }

// () => console.log(capital)




   