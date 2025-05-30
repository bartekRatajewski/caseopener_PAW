# caseopener_PAW
Dokumentacja projektu – Case Opener
(Uwaga, niestety projekt przerósł nasze umiętności i funkcjonalnośc z otwieraniem skrzynek nie dziala, tak naprawde potrzebujemy oceny z wykładu, więc liczymy wspólnie, że da Pan nam szansę ze względu na to że programowanie to nie jest nasz konik i każdy z nas robi w życiu coś innego, liczymy że cokolwiek z naszego projektu zostanie ocenione i spełni Pana oczekiwania. Pozdrawiamy!)

Rozłożenie pracy:
  Aleks:
  - Praca nad tworzeniem skrzynek dodawaniem do nich przedmiotow i wrzucenie ich do frontendu.
  - Stworzenie bazy danych pod projekt
  - Poprawki dot. frontendu, takie jak poprawienie dzialania fronendu (nie działała rejestracja po czym problem udało się rozwiązać)
    
  Bartek:
  - Utworzenie bazowego projektu wraz ze strukturą plików/danych
  - Dodanie backendu do funkcji stworzonych przez Aleksa
  - Dodanie funkcji rejestracji, logowania balansu konta i ekwipunku

  (Większość commitów jest z konta Bartka, ponieważ spotykaliśmy się u niego i pracowaliśmy na jednym komputerze)
  
📌 Opis projektu

Projekt przedstawia uproszczoną wersję aplikacji webowej typu „case opening”, inspirowanej popularnymi systemami skrzynek z gry Counter-Strike2. Użytkownik może się zarejestrować, logować, otwierać skrzynki, zdobywać skiny (przedmioty), przeglądać ekwipunek oraz sprzedawać zdobyte przedmioty za wirtualne środki.

🛠 Wykorzystane technologie

Backend

Node.js

Express.js

Sequelize (ORM)

SQLite (baza danych)

JWT (uwierzytelnianie tokenowe)

Frontend

React.js

Vite

Context API (zarządzanie stanem uwierzytelnienia)

🔐 Funkcjonalności

Autoryzacja

Rejestracja i logowanie użytkownika (/auth/register, /auth/login)

Obsługa tokenów JWT

Pobieranie profilu użytkownika (/auth/profile)

Dodawanie środków do konta (/auth/add-balance)

Skrzynki i przedmioty

Lista dostępnych skrzynek (GET /api/cases)

Dane konkretnej skrzynki (GET /api/case/:name)

Otwieranie skrzynki (POST /cases/open/:id) (tu występuje problem)

Losowanie przedmiotu ze skrzynki

Zapisywanie przedmiotu do ekwipunku

Ekwipunek

Pobieranie zawartości (GET /inventory)

Sprzedawanie przedmiotów (POST /inventory/sell/:id)

Aktualizacja stanu konta po sprzedaży

🗃 Schemat bazy danych

Użytkownicy (User)

Kolumna    Typ          Opis
id         INTEGER(PK)  Identyfikator użytkownika
username   TEXT         Nazwa użytkownika
password   TEXT         Zahashowane hasło
balance    INTEGER      Saldo (coins)

Relacje: 1:N z InventoryItem
User.id => InventoryItem.User.id

Skrzynki (Case)

Kolumna    Typ          Opis
id         INTEGER(PK)  Identyfikator skrzynki
name       TEXT         Nazwa skrzynki
price      INTEGER      Koszt otwarcia skrzynki
skins      INTEGER[]    Lista ID możliwych skinów

Relacje: N:M z Skin
Case.skins => Skin.id

Skiny (Skin)

Kolumna    Typ          Opis
id         INTEGER(PK)  Identyfikator skinu
name       TEXT         Nazwa przedmiotu
image      TEXT         URL do obrazkapriceINTEGERCena sprzedaży

Relacje: 1:N z InventoryItem
Skin.id => InventoryItem.skinId
N:M z Case

Przedmioty w ekwipunku (InventoryItem)

Kolumna    Typ          Opis
id         INTEGER(PK)  Identyfikator przedmiotu
userId     INTEGER(FK)  ID właściciela
skinId     INTEGER(FK)  ID skina

Relacje: N:1 do User
userId => User.id
N:1 do Skin
skinId => Skin.id
🔁 Przepływ aplikacji

Użytkownik rejestruje się lub loguje. (dziala)

Po zalogowaniu otrzymuje token JWT i dostęp do swojego profilu. (dziala)

Może otwierać skrzynki, za co pobierane są środki i losowany jest skin.

Skin trafia do ekwipunku użytkownika.

Użytkownik może sprzedać skiny, odzyskując część środków.

Możliwe jest też dodanie 100 coinsów przyciskiem Add Balance. (dziala)
