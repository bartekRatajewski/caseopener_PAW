# Case Opener

## Opis aplikacji

**Case Opener** to aplikacja webowa typu „loot box simulator” stworzona jako projekt edukacyjny w ramach kursu Programowanie Aplikacji Webowych (PAW). Aplikacja pozwala użytkownikom otwierać wirtualne skrzynki zawierające losowe przedmioty o różnej wartości i rzadkości.

### Kluczowe funkcjonalności:
- Rejestracja i logowanie użytkowników
- Przeglądanie dostępnych skrzynek (loot boxes)
- Otwieranie skrzynek i losowe przydzielanie przedmiotów
- Zarządzanie kolekcją zdobytych przedmiotów
- System rzadkości i szans na zdobycie konkretnych przedmiotów

### Technologie:
- Frontend: React + Tailwind CSS + TypeScript  
- Backend: Node.js + Express + TypeScript  
- Baza danych: relacyjna (np. PostgreSQL lub MySQL)  
- Komunikacja przez REST API

---

## Podział pracy

### Aleks
- Projektowanie i implementacja frontendu (React + Tailwind CSS)
- Tworzenie widoków: lista skrzynek, otwieranie skrzynek, kolekcja przedmiotów
- Obsługa formularzy logowania i rejestracji
- Integracja frontendu z backendem
- Testowanie i poprawki UI
- Przygotowanie dokumentacji użytkownika

### Bartek
- Projektowanie i implementacja backendu (Node.js + Express)
- Projektowanie i implementacja API REST
- Logika biznesowa otwierania skrzynek i przydzielania przedmiotów
- Integracja z bazą danych
- Zapewnienie bezpieczeństwa (hashowanie haseł, autoryzacja JWT)
- Testy jednostkowe backendu
- Projektowanie struktury bazy danych i przygotowanie diagramu

---

## Diagram bazy danych

Opis tabel i ich relacji w bazie danych aplikacji:

| Tabela      | Opis                                                    | Najważniejsze pola                 |
|-------------|---------------------------------------------------------|----------------------------------|
| **Users**   | Dane użytkowników                                       | `id`, `username`, `email`, `passwordHash`, `createdAt` |
| **Boxes**   | Definicje skrzynek                                     | `id`, `name`, `description`, `imageUrl` |
| **Items**   | Przedmioty możliwe do zdobycia                         | `id`, `name`, `rarity`, `imageUrl`, `description` |
| **BoxItems**| Powiązanie skrzynek z przedmiotami i szansa na drop   | `id`, `boxId` (FK), `itemId` (FK), `dropChance` |
| **UserItems**| Kolekcja przedmiotów zdobytych przez użytkownika     | `id`, `userId` (FK), `itemId` (FK), `acquiredAt` |
| **UserBoxes**| Historia otwartych skrzynek przez użytkownika        | `id`, `userId` (FK), `boxId` (FK), `openedAt` |

### Relacje:

- Jeden **User** może mieć wiele **UserItems** i **UserBoxes**  
- Jedna **Box** może zawierać wiele **BoxItems**  
- Jeden **Item** może występować w wielu **BoxItems**

---

### Diagram ER (Entity-Relationship)

+------------+ +-------------+ +------------+
| Users |1 | UserItems | | Items |
|------------|----------|-------------| 1|------------|
| id (PK) | | id (PK) | | id (PK) |
| username | | userId (FK) | | name |
| email | | itemId (FK) | | rarity |
| password | | acquiredAt | | imageUrl |
+------------+ +-------------+ +------------+
| ^
| |
| |
|1 |*
+------------+ +-------------+ +------------+
| UserBoxes | | BoxItems | | Boxes |
|------------| |-------------|* 1|------------|
| id (PK) | | id (PK) | | id (PK) |
| userId(FK) | | boxId (FK) | | name |
| boxId (FK) | | itemId (FK) | | description|
| openedAt | | dropChance | | imageUrl |
+------------+ +-------------+ +------------+

Legenda:  
`PK` – klucz podstawowy  
`FK` – klucz obcy  
`1` – relacja „jeden”  
`*` – relacja „wiele”


