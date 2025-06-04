Dokumentacja projektu Case Opener
1. Opis aplikacji
Case Opener to aplikacja internetowa typu „loot box simulator” stworzona jako projekt edukacyjny w ramach kursu Programowania Aplikacji Webowych (PAW). Celem aplikacji jest symulowanie procesu otwierania wirtualnych skrzynek, które zawierają losowe przedmioty o różnej wartości i rzadkości. Użytkownicy mogą się zarejestrować, zalogować, przeglądać dostępne skrzynki, otwierać je i kolekcjonować zdobyte przedmioty.

Kluczowe funkcjonalności:
Rejestracja i logowanie użytkowników – bezpieczne zarządzanie sesjami.

Wyświetlanie listy dostępnych skrzynek z opisami i statystykami.

Możliwość otwierania skrzynek i losowego przydzielania przedmiotów.

Zarządzanie kolekcją przedmiotów zdobytych przez użytkownika. (work in progress)

System rzadkości i szans na zdobycie konkretnego przedmiotu. (work in progress)

Technologia:
Frontend: React + Tailwind CSS + TypeScript.

Backend: Node.js + Express + TypeScript.

Baza danych: relacyjna (np. PostgreSQL lub MySQL).

Komunikacja REST API.

2. Podział pracy

Aleks:
Projektowanie i implementacja frontend:

Tworzenie interfejsu użytkownika z React i Tailwind CSS.

Implementacja widoków: lista skrzynek, otwieranie skrzynki, kolekcja przedmiotów.

Obsługa formularzy logowania i rejestracji.

Integracja z backendem za pomocą fetch/axios.

Testowanie i poprawki UI.

Przygotowanie dokumentacji użytkownika.

Bartek:
Projektowanie i implementacja backend:

Projektowanie API REST (punkty końcowe do zarządzania użytkownikami, skrzynkami, przedmiotami).

Logika biznesowa przydzielania przedmiotów po otwarciu skrzynki.

Integracja z bazą danych (modelowanie, zapytania).

Bezpieczeństwo (haszowanie haseł, autoryzacja JWT).

Testy jednostkowe backendu.

Projektowanie struktury bazy danych.

Przygotowanie diagramu bazy danych.

3. Szczegółowy diagram bazy danych
Opis tabel:
Nazwa tabeli	Opis	Najważniejsze pola
Users	Przechowuje dane użytkowników	id, username, email, passwordHash, createdAt
Boxes	Definicje skrzynek (loot boxes)	id, name, description, imageUrl
Items	Definicje przedmiotów możliwych do zdobycia w skrzynkach	id, name, rarity, imageUrl, description
BoxItems	Powiązanie skrzynek z przedmiotami, określa jakie przedmioty mogą wystąpić w danej skrzynce wraz z ich szansą	id, boxId (FK), itemId (FK), dropChance (float)
UserItems	Kolekcja przedmiotów zdobytych przez użytkownika	id, userId (FK), itemId (FK), acquiredAt
UserBoxes	Historia otwartych skrzynek przez użytkownika	id, userId (FK), boxId (FK), openedAt

Relacje między tabelami:
Users do UserItems – relacja 1 do wielu: jeden użytkownik może mieć wiele przedmiotów.

Users do UserBoxes – relacja 1 do wielu: jeden użytkownik może otworzyć wiele skrzynek.

Boxes do BoxItems – relacja 1 do wielu: jedna skrzynka może zawierać wiele różnych przedmiotów.

Items do BoxItems – relacja 1 do wielu: jeden przedmiot może występować w wielu skrzynkach.

Diagram ER (Entity-Relationship)
pgsql
Copy
Edit
+------------+          +-------------+          +------------+
|   Users    |1        *|  UserItems  |          |   Items    |
|------------|----------|-------------|*        1|------------|
| id (PK)    |          | id (PK)     |          | id (PK)    |
| username   |          | userId (FK) |          | name       |
| email      |          | itemId (FK) |          | rarity     |
| password   |          | acquiredAt  |          | imageUrl   |
+------------+          +-------------+          +------------+
       |                          ^
       |                          |
       |                          |
       |1                         |*
+------------+          +-------------+          +------------+
| UserBoxes  |          |  BoxItems   |          |   Boxes    |
|------------|          |-------------|*        1|------------|
| id (PK)    |          | id (PK)     |          | id (PK)    |
| userId(FK) |          | boxId (FK)  |          | name       |
| boxId (FK) |          | itemId (FK) |          | description|
| openedAt   |          | dropChance  |          | imageUrl   |
+------------+          +-------------+          +------------+
Legenda:

PK – klucz podstawowy

FK – klucz obcy

1 – jeden

– wiele

4. Opis techniczny bazy danych
Tabela Users przechowuje podstawowe informacje o użytkownikach. Hasła są przechowywane w formie hashowanej, co zwiększa bezpieczeństwo.

Tabela Boxes zawiera metadane dotyczące skrzynek: nazwa, opis, oraz opcjonalne zdjęcie.

Tabela Items przechowuje informacje o wszystkich dostępnych przedmiotach, ich rzadkości oraz opisy.

Tabela BoxItems to tabela łącznikowa, która mapuje jakie przedmioty występują w której skrzynce i z jakim prawdopodobieństwem (dropChance).

Tabela UserBoxes zapisuje historię otwarć skrzynek przez użytkownika – kiedy i którą skrzynkę otworzył.

Tabela UserItems to lista przedmiotów zdobytych przez użytkownika w wyniku otwarcia skrzynek.
