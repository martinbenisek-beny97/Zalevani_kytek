# Urban Jungle

Připomínáček zalévání rostlin (PWA) — funguje v prohlížeči a po přidání na plochu telefonu.

## Lokální spuštění

```powershell
cd "cesta\k\Cursor-projects"
python -m http.server 8080
```

Otevřete v prohlížeči: `http://localhost:8080/index.html`

Na telefonu (stejná Wi‑Fi): `http://IP-počítače:8080/index.html`

## Bezplatný hosting (GitHub Pages)

1. Vytvořte účet na [GitHub](https://github.com).
2. Nový repozitář (např. `urban-jungle`).
3. Nahrajte celou složku projektu (`index.html`, `manifest.json`, `sw.js`, `icons/`, …).
4. **Settings → Pages → Source:** Deploy from branch `main`, folder `/ (root)`.
5. Za pár minut bude adresa: `https://VASE_JMENO.github.io/urban-jungle/`

### Důležité

- Hlavní soubor musí být **`index.html`** (ne jen `index_v2.html`).
- Aplikace musí běžet přes **https://** (GitHub Pages to zajistí).

## Instalace na iPhone

1. Otevřete URL v **Safari** (ne v Náhledu souborů).
2. **Sdílet → Přidat na plochu domů**.
3. Spouštějte z ikony na ploše.

## Připomínky

1. Klepněte na **zvonek** v hlavičce.
2. Nastavte čas a **Zapnout** (povolte notifikace).
3. Při otevření appky a po nastaveném čase dostanete upozornění, pokud něco čeká na zalití.

Na iPhonu fungují nejlépe po instalaci na plochu; systémový push bez otevření appky vyžaduje další nastavení (Web Push + server).

## Soubory

| Soubor | Účel |
|--------|------|
| `index.html` | Hlavní aplikace |
| `manifest.json` | PWA metadata |
| `sw.js` | Offline cache + service worker |
| `icons/icon.svg` | Ikona aplikace |
