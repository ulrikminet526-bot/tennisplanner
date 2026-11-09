# Tennisplanlægger – app til mobil med øvelser fra Google Sheets

Mappen er en installerbar web-app. Den virker i Safari, Chrome og Firefox, kan lægges på hjemmeskærmen og virker uden net på banen. Øvelsesbanken kan redigeres i Google Sheets, uden at du rører appens kode.

## Hvad ligger hvor

| Fil | Hvad den gør | Hvornår du ændrer den |
|---|---|---|
| `index.html` | Selve appen | Når der kommer nye funktioner |
| `sw.js` | Gemmer appen på telefonen til brug uden net | Ret `VERSION` hver gang `index.html` skiftes ud |
| `config.json` | Adressen på dit Google-regneark | Én gang, når regnearket er udgivet |
| `ovelser-skabelon.csv` | Alle 226 øvelser som regneark | Bruges kun til at oprette regnearket |
| `manifest.webmanifest`, `icons/`, `fonts/` | Navn, ikoner og skrifttyper | Aldrig |

Statistik, gemte programmer og din egen kategorisering ligger på hver telefon, ikke på hjemmesiden. Derfor påvirkes de ikke, når du lægger nye filer op.

## 1. Læg appen på nettet (gratis med GitHub Pages)
1. Opret en gratis konto på github.com.
2. Opret et nyt repository, fx `tennisplanlaegger`, og vælg **Public**.
3. Klik **uploading an existing file**, og træk alt indholdet af mappen ind. Tryk **Commit changes**.
4. Gå til **Settings → Pages**. Under **Branch** vælger du `main` og `/ (root)` og trykker **Save**.
5. Efter et par minutter står adressen øverst, fx `https://ditnavn.github.io/tennisplanlaegger/`.

Behold altid den samme adresse. Ny adresse betyder, at telefonerne starter med tomt lager.

## 2. Opret øvelsesbanken i Google Sheets
1. Gå til sheets.google.com og opret et tomt regneark.
2. Vælg **Filer → Importér → Upload**, og vælg `ovelser-skabelon.csv`. Vælg **Erstat regneark** og **Registrer automatisk** som separator.
3. Vælg **Filer → Del → Udgiv på nettet**. Vælg arket med øvelserne og formatet **Kommaseparerede værdier (.csv)**, og tryk **Udgiv**. Kopiér linket.
4. Åbn `config.json` i dit GitHub-repository (klik på filen og på blyanten), og indsæt linket mellem anførselstegnene:
   `"ovelsesark": "https://docs.google.com/spreadsheets/d/e/…/pub?output=csv"`
   Tryk **Commit changes**. Nu får alle, der bruger appen, øvelserne fra regnearket.

Du kan også indsætte linket direkte i appen under **Øvelser → Øvelsesbank fra Google Sheets**. Det gælder kun den telefon og er praktisk til at prøve et ark af.

## 3. Rediger øvelser
Hver række er en øvelse. Kolonnerne er:

- **id**: Øvelsens faste nøgle. Statistikken hænger på id'et, så det må aldrig ændres. Giv nye øvelser et nyt id, fx `egen-001`, `egen-002`.
- **navn**: Kan ændres frit uden at miste statistik.
- **kategori**: Hvor øvelsen bruges i programmet. Flere kategorier adskilles med semikolon. Se listen nedenfor.
- **kurveøvelse**: `ja`, hvis øvelsen kræver træner og kurv, ellers `nej`.
- **aktiv**: Skriv `nej` for at holde en øvelse ude af programmerne. Slet ikke rækker for de indbyggede øvelser, for så bliver de bare brugt i deres oprindelige form.
- **opstilling**, **formål**, **trænerfokus**, **kilde**: Teksterne i appen.
- **tekniktip**: 1-2 korte tips, der gør slaget bedre. Tom: appen viser et generelt tip for slagets type.
- **placering**: Hvor på banen spilleren står, og hvornår split-step laves.
- **specialslag**: `slice`, `smash` eller `stopbold`, hvis øvelsen træner et specialslag.
- **igangsætning**: `håndfodring`, `drop-feed`, `ketcherfodring`, `makkerfeed`, `serv`, `levende rally`, `hånd tæt på`, `ketcher ved net`, `ketcher fra baglinje` eller `spillerne selv`. Tom: følger niveauet.
- **opvarmningstype**: `bevægelse-bold`, `bevægelse-ketcher`, `forhindringsbane` eller `reaktion`.
- **fodringstempo**: `meget langsomt`, `langsomt`, `moderat`, `moderat til højt` eller `kamprealistisk`. Tom: følger niveauet.
- **familie**, **begynder**, **øvet**, **turnering**: Tips og tricks til at tilpasse øvelsen til hvert niveau. Vises som »På dette niveau« på kortet. En gammel kolonne `let øvet` bruges til Øvet, hvis kolonnen `øvet` er tom.
- **bane**: `servefelt`, `små baner`, `halv bane`, `¾-bane` eller `fuld bane`. Tom: følger niveauet.
- **bold**: `skum`, `rød`, `orange`, `grøn` eller `gul`. Tom: den bold, der er valgt i indstillingerne. Små baner kan kun bruges med rød bold eller skumbold.
- **blandede niveauer**: Hvordan øvelsen gennemføres, når holdet har stærkere og mindre stærke spillere.
- **lettere** og **sværere**: Øvelsens egne punkter, adskilt af semikolon. Vises før standardpunkterne.
- **familietype**: 1-10, hvilken type i familiemenuen øvelsen hører til (1 Leg og bevægelse, 2 Fangeleg eller reaktion, 3 Kast og grib, 4 Trille- og boldkontrol, 5 Balance med ketcher, 6 Første slag til mål, 7 Barn-voksen-samarbejde, 8 Lille rallyaktivitet, 9 Tennisleg eller stafet, 10 Fælles afslutningschallenge).
- **barnets opgave** og **den voksnes rolle**: Tekster til familiekortene.
- **varighed**: `kort` (3-5 min), `normal` (5-8 min) eller `lang` (op til 10 min).
- **variationer**: Variationer af øvelsen, adskilt af semikolon.
- **instruktion**: Målet i én sætning, som træneren siger, før øvelsen starter.
- **opbygning**: Slagopbygningen, fx `Skyggeslag → Drop-feed → Fodring → Rally`.
- **vis det**: Hvad træneren viser, fx `Træf foran kroppen, afslut over skulderen`.
- **trin 1** til **trin 5**: Trin-for-trin vejledningen under »Sådan gør I«.

Tomme felter betyder »brug det, appen har i forvejen«.

Der er ingen kolonne til sværhedsgrad. Nye øvelser gælder for alle niveauer, og det er kategorien, der afgør, hvilke niveauer der bruger øvelsen. Selve sværheden styres af igangsætning, tempo, bane og bold. Har dit ark stadig kolonnen sværhedsgrad, virker den fortsat.

Telefonerne henter regnearket, hver gang appen åbnes med net, og igen når den har været lukket i mere end 30 minutter. Google kan være et par minutter om at opdatere den udgivne udgave. Første gang bruges øvelserne med det samme. Ændringer derefter kræver et tryk på **Genindlæs appen** under Øvelser.

Rækker med fejl, fx en ukendt kategori, springes over, og resten virker som normalt. Fejlene står under **Øvelser → Øvelsesbank fra Google Sheets** med linjenummer.

### Kategorier og blokke (version 11)
- **Familietennis:** 10 typer i familiemenuen (kolonnen `familietype`). Kategorierne Leg & bevægelse, Boldleg, Ketcher & bold, Spil sammen, Tennislege og Fælles afslutning.
- **Alle andre niveauer:** Velkomst, Opvarmning: bevægelse (løb og bevægelse), Opvarmning: ketcher og bold (boldføling), Hånd-øje (Begynder), Hård bevægelse (tempobevægelse ved 90 min), Evaluering.
- **Teknik og justering, Begynder:** Dagens færdighed, Rally, Boldkontrol, Spilsituation.
- **Teknik og justering, Øvet:** Rally & kontrol, Dagens tema, Slagkvalitet, Spilsituation. Spilsituation og pointspil fra Spilsituation, Taktisk situation og Pointspil.
- **Teknik og justering, Turnering:** Slagkvalitet, Dagens tema, Spillemønster, Taktisk situation. Pointspil også fra Point under pres.
- **Spillege:** Tennislege og Pointspil.
- **Tema:** Valget af tema er fjernet i version 12. Øvelser i kategorierne »Tema: …« bruges nu også i almindelige kategorier, og kategorierne kan stadig skrives i arket.
- **Pointspilstræning:** Hentes fra Pointspil, for Begynder også Tennislege og for Turnering også Point under pres.

## 4. Læg appen på telefonen
**iPhone:** Åbn adressen i Safari, Chrome eller Firefox, tryk **Del** og vælg **Føj til hjemmeskærm**. Åbn appen fra ikonet én gang med net. Derefter virker den uden net.
**Android:** Åbn adressen i Chrome, tryk ⋮ og vælg **Installér app**.

## 5. Nye funktioner i appen
Når du får en ny `index.html`, så upload den i stedet for den gamle, og ret `VERSION` øverst i `sw.js`, fx fra `v3` til `v4`. Statistik, programmer og regnearket påvirkes ikke.

## 6. Backup og flytning af data
Under **Statistik → Denne enhed** kan du **Eksportere data** til en fil og **Importere data** igen, fx på en ny telefon eller fra udgaven på claude.ai. Lav en backup en gang imellem.

## Hvis regnearket ikke kan hentes
Hvis appen skriver, at regnearket ikke kan hentes, kan du i stedet hente arket som CSV (**Filer → Download → Kommaseparerede værdier**), omdøbe filen til `ovelser.csv` og uploade den til GitHub ved siden af `index.html`. Lad `ovelsesark` i `config.json` være tom. Så bruger appen filen i stedet.

Skrifttyperne Barlow og Barlow Condensed er under SIL Open Font License (se `fonts/LICENSE-OFL.txt`).
