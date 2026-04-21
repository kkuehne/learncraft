# 📖 Konzept: Religion Lernpfad (Klasse 5 Gymnasium)

## 🎯 Zielsetzung
Unterstützung beim Lernen für die Religion-Klassenarbeit. Der Fokus liegt auf dem Alten Testament, der Schöpfungsgeschichte, dem Konzept des Bundes und den 10 Geboten. 

Der Lernpfad folgt der pädagogischen Logik: **Orientierung $\rightarrow$ Interaktive Analyse $\rightarrow$ Wissensprüfung $\rightarrow$ Transfer/Anwendung**.

---

## 🗺️ Struktur des Lernpfads

### 1. Religions-Camp (Einstieg)
*Ziel: Orientierung und Vokabular aufbauen.*
- **Bibel-Tour:** Interaktive Karte der Bibel-Bibliothek (Altes Testament, Tora).
- **Symbol-Match:** Zuordnung von religiösen Symbolen (z.B. Taube, Arche) zu ihrer Bedeutung.
- **Begriffs-Check:** Match-Spiel mit Kernbegriffen (*Bund, Schöpfung, Prophet, Offenbarung*).
- **Figuren-Steckbrief:** Interaktive Profile wichtiger Personen (z.B. Abraham, Moses).

### 2. Theologie Lab (Interaktive Analyse)
*Hier werden abstrakte Konzepte durch Interaktion greifbar gemacht.*

| Modul | Titel | Interaktives Element | Lerneffekt |
| :--- | :--- | :--- | :--- |
| 🌍 | **Schöpfungs-Werkstatt** | Zeitstrahl der 7 Tage (interaktiv aktivierbar) | Reihenfolge und Bedeutung der Schöpfungsschritte |
| 🤝 | **Bund-Generator** | Logik-Modell eines "Bundes" (Geben & Nehmen) | Verständnis des Bundes als heiliger Vertrag |
| 📜 | **Exodus-Navigator** | Pfad-Navigation mit Checkpoints (10 Gebote) | Zusammenhang zwischen Auszug aus Ägypten und Gesetz |
| 📢 | **Propheten-Stimme** | Audio-Analyse (Warnung vs. Verheißung) | Funktion und Rolle der Propheten im Alten Testament |

### 3. Glaubens-Quiz (Wissenscheck)
*Aufsteigende Schwierigkeitsgrade:*
- **🥉 Bronze (Basis):** Einfache Faktenabfragen (z.B. "Wer baute die Arche?").
- **🥈 Silber (Zusammenhänge):** Verständnisfragen (z.B. "Warum ist der Bund mit Abraham zentral?").
- **🥇 Gold (Vertiefung):** Komplexe Fragen zu Ethik und Gesetz (z.B. Bedeutung der 10 Gebote).

### 4. Boss Arena (Finale)
*Transferleistung: Vom Wissen zum Verstehen.*
- **Szenario-Quiz:** Anwendung der gelernten Prinzipien auf hypothetische Situationen.
- **Interpretation:** Verknüpfung der biblischen Texte mit heutigen Themen (z.B. Schöpfung $\rightarrow$ Klimaschutz).
- **Abschluss:** Verleihung des Titels "Bibel-Experte".

---

## 🛠️ Technische Umsetzung (LearnCraft Framework)
- **Datenstruktur:** `lib/religion-data.ts` (zentrale Quelle für Fragen, XP und Texte).
- **Container:** `TheologyLabContainer` (Tab-basiertes System analog zum Physiologie-Lab).
- **Feedback:** Audio-Unterstützung durch Prof. Eich (Erklärungen bei richtigen Antworten).
- **Progression:** XP-System zur Motivation und Freischaltung der Boss Arena.

---

## 📅 Status
- [x] Konzept erstellt
- [x] Datenstruktur (`religion-data.ts`) definiert
- [ ] Infrastruktur (Routes/Pages) implementiert
- [ ] Interaktive Lab-Module programmiert
- [ ] Quiz-System integriert
