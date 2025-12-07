# Dijkstras algoritme for at finde den korteste vej i en graf
Eksamensprojekt for valgfaget Datastrukturer og algoritmer, Datamatiker uddannelsen på Erhvervsakademiet København, Lyngby Campus.

![Photo of visualization](/images/koerendeApplikation.png "Photo of visualization")

Link til hjemmesiden: https://rikkemariussen.github.io/DSA-eksamen/  

### Lavet af
Christoffer Aaby Leisted - https://github.com/Crispy212/DSA-Eksamen

Rikke Fruelund Walther Mariussen - https://github.com/RikkeMariussen/DSA-eksamen

## Beskrivelse af projektet
Programmet viser en visualisering af, hvordan Dijkstras algoritme finder den korteste vej fra en start node til alle de andre noder. Dette gøres ved at der i dette program er 5 punkter på en graf, med streger imellem sig, med en længde stående ovenfor, længden kaldes også for en vægt. Når der trykkes start, starter vores algoritme ud fra node “A”, som er vores standard startpunkt, derefter sammenligner den afstanden med nabo noderne. Her siger den, ud fra vores standardindstillinger, at afstanden mellem A - B er 4, og afstanden fra A - D er 2. Ud fra dette vil man sige at D har den korteste afstand men algoritmen vil fortsætte ud fra B og D, og kigge på deres nabo noder som til standard i vores kode er E og C. Så kigger den igen på afstanden mellem B - E, B - C og D - E. Når den så har aflæst afstanden mellem punkterne, vil den sammenlægge de korteste afstande mellem punkterne så vi kan se hvad der er hurtigst for at komme til f.eks. punkt E fra punkt A. Når den så har aflæst alle punkter og deres forbundne afstande, vil den i tabellen vise de korteste veje fra dit startpunkt til et givent punkt og hvad den forrige node fra dit slutpunkt er.

Man kan også sætte start noden til at være en af de andre noder. Hvis man trykker på “Randomize Nodes” så vil hver node få nogle nye tilfældige x og y koordinater på grafen, og den vægtede distance (længden) vil også blive en ny tilfældig værdi.

## Algoritmer og datastrukturer i projektet
Vi har valgt at visualisere dijkstras algoritme, og i forbindelse med denne, er det oplagt at sammenligne den med A* algoritmen, da de i grunden minder meget om hinanden, da de begge handler om at finde den korteste vej mellem forskellige noder.
Hvor Dijkstra algoritmen prøver at finde den korteste vej mellem en start node og alle andre noder i en vægtet graf. Så vil A* finde den korteste afstand mellem to punkter ved at bruge en best-first search og heuristic. Men nu er det ikke A* vi er interesserede i men Dijkstra, så hvordan fungerer den egentlig?

Dijkstra fungerer ved, at man vælger et startpunkt i en vægtet graf. Algoritmen ser først på alle naboerne til den valgte start node og beregner den samlede afstand fra start til hver af de tilhængende naboer. Derefter vælger Dijkstra altid den node, der på dette tidspunkt har den laveste kendte afstand, og fortsætter derfra på samme måde. Den undersøger nu den næste nodes naboer og opdaterer deres afstande, hvis der findes en kortere vej.

Denne proces gentages, indtil alle noder i grafen er blevet tjekket. Til sidst giver algoritmen de korteste afstande fra start noden til alle andre noder i grafen.

Dijkstras algoritme kan have forskellige tidskompleksiteter, afhængigt af hvilken datastruktur man bruger til at vælge den næste node med den mindste afstand. I vores implementering bruger vi JavaScripts indbyggede arrays til at gemme og sortere de noder, der endnu ikke er behandlet. Vi bruger det som en midlertidig priority queue, som er en form for kø, der ikke udelukkende er FIFO, men også tager prioritering i mente, så den med den højeste prioritering bliver fjernet, selv hvis den ikke var først. 

Det at vi hele tiden skal sortere vores array gør at vores kodes tidskompleksitet bliver længere end en optimal Dijkstra’s algoritme, da man normalt bare leder efter den mindste værdi.

Da vores program kun indeholder fem noder, med sleep funktioner til visualiseringen, kan det argumenteres at selvom tidskompleksiteten ikke er optimal, er den stadig acceptabel. At optimere tidskompleksiteten er vigtigere med større programmer, der skal håndtere mange flere noder og vægte, f.eks. GPS’er.

Vores brug af array og vores sortering af det array hver gang vi kigger på en nabo til en node, betyder at vores version af Dijkstra får tidskompleksiteten O(n² log n), hvor n er antallet af noder. Dette betyder at vores algoritme er væsentlig “dyrere” end hvis vi havde O(log n) eller O(n).

For eksempel, vi har fem noder, det vil sige at vores regnestykke for hvor dyrt algoritmen er, er: O((n2)log(n))  (52)  (log2(5)) 25 2,32(...) = 58 

Hvilket er meget dyrt, når man kun har fem noder, da O(n) eksempelvis ville være O(5) og derfor “koste” 5. Dog er meget af dette vores sortering af arrayet. Så ved implementering af en priority queue, kunne man undgå sorteringen af vores array og derved gøre det “billigere”. Vi har dog valgt at beholde vores sortering og acceptere prisen ved tidskompleksiteten, da vi bedre kan stå inde for den kode og forstå den. 

De andre tidskompleksiteter som Dijkstra kan have er O(V^2) og O((V+E) log V) hvor V er vertices (noder) og E er edges. Dette gøres ved at benytte andre datastrukturer til at gemme på “ruterne”.


### Datastrukturer
Her er nogle af de “vigtige” datastrukturer vi har valgt at benytte, dette er IKKE en fyldestgørende liste: 
- Array, usorteret
- Adjacency list, som er lister med objekter der har en liste af naboer
- Objekter er det vi gemmer vores noder som, hvor der gemmes deres “data”
Vi har brugt de indbyggede versioner i JavaScript. 

