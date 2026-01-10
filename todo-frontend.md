# co trzeba dac na frontend:

## Regaly:
-  mozliwosc dodania
-  mozliwosc edytowania
-  mozliwosc usuniecia
-  wczytanie definicji magazynu z CSV
-  statystyki regalow:
    - temperatura min/max
    - max waga
    - max wielkosc asortymentu
    - oznaczenie
    - komentarz

## Asortyment:
-  nadanie nowym paczkom:
    - nazwy
    - ID
    - zdjecia
    - zakresu temperatury
    - wagi(kg)
    - wymiarow(mm)
    - wymiarow(X x Y x Z mm)
    - komentarz
    - termin awznosci od momentu przyjecia na magazyn (dni)
    - informacja bezpieczny/niebezpieczny
-  mozliwosc zdefiniowania z CSV

### Przyjmowanie asortymentu do magazynu przez stale ID:
-  dodac do magazynu ze statystyka o dacie i godzinie 
-  wskazac regal jesli paczka spelnia warunki
-  w przypadku braku spelniania kryteria, wyswietlić błąd

## Monitorowanie:
-  przypomnienia o zblizaniu sie koncu daty waznosci i przekroczeniu tej daty
-  informowanie o nieautoryzowanym zdjeciu paczek przez monitorowanie wagi


### Wizualizacja magazynu i jego stanu;

## Backupy:
-  ustawienie takiego poprzez harmonogram lub przez przycisk
-  przywrocenie z danego backupa

## Uzytkownik:
-  login, haslo, email
-  typy uzytkownikow:
    - admin:
      1. dodawanie i usuwanie innych
      2. tylko admin moze definiowac(zmieniac?) magazyn
    - uzytkownik zwykly:
      1. zmiany swojego hasla
      2. wszystko tylko nie to co jest napisane u admina

-  logowanie na podstawie loginu i hasla
-  2FA (2 factor authentication)