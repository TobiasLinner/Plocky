# Plocky - Lokal Mat Nära Dig

En React Native-app byggd med Expo för att hitta och stödja lokala matproducenter och gårdsbutiker i din närhet.

## Projektbeskrivning

Plocky är en mobil applikation som hjälper användare att upptäcka lokala matproducenter, gårdsbutiker och självplockställen i sin närhet. Appen erbjuder funktioner som kartvisning, avståndsmätning baserat på användarens plats, samt möjlighet att lägga till nya butiker. Målet är att stödja lokal matproduktion och ge användare enkel åtkomst till närproducerad mat.

## Funktioner

- 🏪 **Hitta lokala butiker**: Visa en lista över lokala matproducenter och gårdsbutiker
- 🗺️ **Interaktiv karta**: Se alla butiker på en karta med kategorifiltrera
- 📍 **Platsbaserade tjänster**: Beräkna avstånd till butiker baserat på din position
- ➕ **Lägg till butiker**: Användare kan lägga till nya butiker med bilder och platsinformation
- 🏠 **Navigering**: Få vägbeskrivning till butiker via Google Maps
- 📱 **Telefonfunktion**: Ring butiker direkt från appen
- 🎨 **Responsiv design**: Stöd för både ljust och mörkt tema

## Byggning och Körning

### Installation

1. Klona repot:
```bash
git clone https://github.com/TobiasLinner/Plocky.git
cd Plucky
```

2. Installera beroenden:
```bash
npm install
```

3. Starta utvecklingsservern:
```bash
npm start
```

#### Expo Go (för utveckling)
1. Installera Expo Go-appen på din telefon - Om du har tur. Annars får du bygga appen och ladda ner på telefonen/emulatorn.
2. Kör `npm start` och skanna QR-koden

## Använda Komponenter

### React Native Komponenter
1. **View** - Används genomgående för layout och struktur
2. **Text** - För all textvisning i appen
3. **ScrollView** - För scrollbara listor av butiker och formulär
4. **TouchableOpacity/Pressable** - För interaktiva element som knappar
5. **TextInput** - För formulärfält vid tillägg av butiker
6. **Modal** - För kartväljare och butiksinformation
7. **Image** - För visning av butiksbilder
8. **Button** - För primära aktionsknappa

### Expo Komponenter
1. **expo-image** - Optimerad bildvisning med caching
2. **expo-router** - För navigation mellan skärmar med Drawer
3. **expo-location** - För att hämta användarens position
4. **expo-maps** - För kartvisning och markörer
5. **expo-linking** - För telefonfunktion och externa länkar
6. **expo-image-picker** - För att välja/ta bilder när man lägger till butiker
7. **expo-status-bar** - För statusbar-konfiguration
8. **@expo/vector-icons** - För ikoner i navigation och UI


### Extern Modul
- **react-hook-form** - För formulärhantering vid tillägg av butiker
- **zustand** - För state management av butiker och applikationstillstånd


## Projektstruktur

```
/app                 # Skärmar (Expo Router)
  ├── _layout.tsx    # Root layout med Drawer navigation
  ├── index.tsx      # Startsida
  ├── localshops.tsx # Lista över butiker  
  ├── mymap.tsx      # Kartvy
  └── add-shop.tsx   # Lägg till butik-formulär

/components          # Återanvändbara komponenter
  ├── local-shop-card.tsx    # Butikskort med information
  ├── local-shops-map.tsx    # Kartkomponent
  ├── map-picker.tsx         # Kartväljare för position
  └── shop-modal.tsx         # Modal för butiksinformation

/context            # React Context för state
  ├── location-context.tsx   # GPS-position
  └── map-context.tsx        # Kartfokus

/stores             # Zustand stores
  └── shops-store.ts         # Butiksdata och operationer

/data               # Seeddata
  └── localshops.ts          # Testdata för butiker

/utils              # Hjälpfunktioner
  └── distance.ts            # Avståndberäkningar
```

## Git & GitHub

Projektet använder Git för versionshantering och är publicerat på GitHub:
- Repository: [https://github.com/TobiasLinner/Plocky](https://github.com/TobiasLinner/Plocky)
- Regelbundna commits under utvecklingen
- Användning av branches för olika funktioner
- README-dokumentation uppdaterad löpande

## Uppfyllda Krav

### Godkänt ✅
1. ✅ Projektet använder 8+ React Native komponenter och 8+ Expo komponenter - om så basic
2. ✅ Komponenter dokumenterade i README med användningsområden
3. ✅ React Navigation (Drawer) för navigering mellan skärmar
4. ✅ Git & GitHub använt genomgående
5. ✅ README.md fil med all nödvändig information
6. ✅ Inlämning i tid
7. ✅ Muntlig presentation förberedd

---