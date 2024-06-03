# Intro til React Workshop

Denne workshopen består av flere oppgaver. De første oppgavene er de enkleste, men også de viktigste å mestre. Mye av koden som trengs for å klare oppgavene gis i starten, men dette blir det mindre av etterhvert i de senere oppgavene. Det er også oppfordret å prøve å løse oppgavene uten å se på kode-snuttene.

## Oppgave 1 - CounterButton.tsx

I denne oppgaven skal vi lage en `CounterButton` komponent, som skal brukes i `App.tsx` som har props for å lese og sette count. `App.tsx` skal da opptre som en container-komponent, og `CounterButton` komponenten opptrer som en state-less komponent.

1. Kjør `npm install` for å installere alle dependencies.

2. Lag en ny fil i mappen `./src/components` kalt `CounterButton.tsx` og fyll inn boilerplaten for en ny React-komponent:

```tsx
export const CounterButton = () => {
  return <button>The count is {count}</button>
}
```

3. Lag en `type` som sier hvilke props `CounterButton` har:

```ts
type Props = {
  count: number
  onClick: () => void
}
```

4. Ta imot de nye propsene som argumenter:

```tsx
export const CounterButton = ({ count, onClick }: Props) => {
```

5. Kall `onClick` funksjonen som kommer inn som en prop når brukeren klikker på knappen:

```tsx
<button onClick={onClick}>The count is {count}</button>
```

6. Bruk den nye komponenten i `App.tsx`:

```tsx
<CounterButton count={count} onClick={increaseCount} />
<br/>
<CounterButton count={count} onClick={increaseCount} />
```

## Oppgave 2 - `useContext`

Denne oppgaven baserer seg på samme mål som i oppgave 1, men hvor vi heller skal bruke `useContext` for å holde på og distribuere state. Dette er et alternativt pattern til props og kan være en fin måte å administrate state når komponent-treet og/eller staten begynner å bli kompleks.

1. Lag en ny fil `CounterContext.ts` i mappen `./src/contexts` for å holde på konteksten:

```ts
import { createContext } from "react"

type CounterState = {
  count: number
  increaseCount: () => void
}

export const CounterContext = createContext<CounterState>({
  count: 0,
  increaseCount: () => {},
})
```

2. Bruk den nye contexten i `App.tsx`. Gjør dette ved å erstatte fragment-elementet (`<>`) som wrapper innholdet med `<CounterContext.Provider>` elementet.

3. Fyll ut `value` propen som er påkrevd på `CounterContext.Provider` elementet. Her vil vi da gi en referanse til `count` staten vi har, samt funksjonen vi allerede har for å øke count:

<details>
  <summary>Fasit</summary>
  
  ```tsx
  <CounterContext.Provider value={{ count, increaseCount }}>
  ```
</details>

4. Fjern propsene `count` og `onClick` fra `CounterButton` elementet i `App.tsx`.

5. Bruk `useContext` hooken i `CounterButton.tsx` for å hente counter contexten:

```tsx
const { count, increaseCount } = useContext(CounterContext)
```

## Oppgave 3 - CSS Modules

I denne oppgaven ønsker vi å øve på å style en React komponent, ved hjelp av CSS-moduler. Dette scoper CSSen til å kun fungere innenfor en komponent, og vil dermed forhindre at CSS ligger globalt i applikasjonen.

1. Legg til en ny css fil for `CounterButton`, kalt `CounterButton.module.css`.

2. Fyll inn CSS for knappen:

```css
.counterButton {
  border-radius: 8px;
  border: 1px solid rgb(var(--color-primary));
  padding: 0.5rem 1rem;
  background-color: rgb(var(--color-white));
  color: rgb(var(--color-primary));
  transition: all 0.2s;
}

.counterButton:hover {
  background-color: rgb(var(--color-primary));
  color: rgb(var(--color-white));
}

```

3. Importer den nye CSS-filen i `CounterButton.tsx`:

```tsx
import styling from "./CounterButton.module.css"
```

4. Bruk denne stylingen på knappen:

```tsx
<button onClick={increaseCount} className={styling.counterButton}>
```

## Oppgave 4 - Tailwind CSS

I denne oppgaven skal vi se på hvordan vi kan bruke Tailwind CSS og hvordan det er annerledes fra CSS Modules.

1. Lag en kopi av `CounterButton` kalt `CounterButton2`.

2. Gjør en av knappene i `App.tsx` om til `CounterButton2`.

3. Fjern styling vi la til i forrige oppgave fra `CounterButton2`.

4. Legg til klasser `className`-propen til knappen i `CounterButton2` slik at den ser lik ut som den originale knappen.

   - Man kan bruke [denne VSCode-utvidelsen](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) for å få "Intellisense" på Tailwind-klasser.
   - Bruk søkefunksjonen på [Tailwind dokumentasjonen](https://tailwindcss.com/) for å finne klassenavn.

<details>
  <summary>Fasit</summary>
  
  ```
  className="border border-primary text-base bg-white text-primary transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-primary hover:text-white"
  ```
</details>

## Oppgave 5 - Fetche data

I denne oppgaven skal vi lære hvordan man bruker `useState` og `useEffect` for å hente data fra et api. Vi skal bruke [PokèApi](https://pokeapi.co/) fordi det er åpent og gratis å bruke. Det eksisterer allerede noen filer i prosjektet som skal hjelpe med denne delen.

1. I `App.tsx` lag en ny state som kan holde dataen fra apiet. Definer typen til å være `Pokemon` fra `./src/types/pokemon.ts`.

<details>
  <summary>Fasit</summary>
  
  ```tsx
  const [data, setData] = useState<Pokemon>()
  ```
</details>

2. Opprett en `useEffect` som kjører når `App.tsx` har "mountet" (tom dependency array).

<details>
  <summary>Fasit</summary>
  
  ```tsx
  useEffect(() => {}, [])
  ```
</details>

3. I funksjonen i `useEffect`, bruk `fetch` funksjonen for å hente data fra apiet, deretter gjøre det om til JSON, deretter kalle `setData` for å sette data state til objektet fra api'et.

```tsx
useEffect(() => {
  fetch(`${POKE_API_BASE_URL}/pokemon/pikachu`)
    .then((res) => res.json())
    .then((data) => setData(data))
}, [])
```

4. Bruk "Conditional rendering" for å vise `PokemonDisplay` komponenten når `data` er definert. Send `data` som `pokemon` proppen til `PokemonDisplay`

<details>
  <summary>Fasit</summary>
  
  ```tsx
  {data && <PokemonDisplay pokemon={data} />}
  ```
  
</details>

## Oppgave 6 - Lage en egen hook

Da fikk vi hentet litt data fra et api ved hjelp av noen hooks, men hva om vi skal hente mer data? Da er det fint om vi kan gjenbruke koden vi har i flere komponenter.

1. Lag en fil i mappen `./src/hooks` kalt `usePokemon.ts`.

2. Eksporter en funksjon fra filen kalt `usePokemon`. Kopier `data`-staten og `useEffect` fra forrige oppgave inn i denne funksjonen. Til slutt, returner et objekt fra funksjonen med `data`-feltet.

<details>
  <summary>Fasit</summary>
  
  ```tsx
  export const usePokemon = () => {
    const [data, setData] = useState<Pokemon>()

    useEffect(() => {
      fetch(`${POKE_API_BASE_URL}/pokemon/pikachu`)
        .then((res) => res.json())
        .then((data) => setData(data))
    }, [])

    return { data }
  }
  ```
</details>

3. Erstatt data fetchingen i `App.tsx` med `usePokemon`-hooken.

<details>
  <summary>Fasit</summary>
  
  ```tsx
  const { data } = usePokemon()
  ```
</details>

4. Modifiser `usePokemon` til å ta argumentet `name: string` og bruk det i `fetch` funksjonen. Husk å oppdater bruken av `usePokemon` i `App.tsx`! Husk også å legge til `name` i `useEffect`'en sin dependency array, slik at hvis navnet oppdateres, vil hooken fetche data på nytt!

<details>
  <summary>Fasit</summary>
  
  ```tsx
  export const usePokemon = (name: string) => {
    const [data, setData] = useState<Pokemon>()

    useEffect(() => {
      fetch(`${POKE_API_BASE_URL}/pokemon/${name}`)
        .then((res) => res.json())
        .then((data) => setData(data))
    }, [name])

    return { data }
  }
  ```
</details>
