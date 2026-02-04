import type { BaseErrorMetadata } from "@/server/utils/errors/base";
import { ErrorName } from "@/server/utils/errors/type";
import type { ErrorMessageMapper } from "./type";

export const getPolishErrorMessageByMetadata = <T extends ErrorName = ErrorName>(
	metadata?: BaseErrorMetadata<T>
): string => (metadata === undefined ? "" : polishErrorMessages[metadata.name](metadata.value));

const polishErrorMessages: ErrorMessageMapper = {
	[ErrorName.ALREADY_LOGGED_IN]: () => {
		return "Jesteś już zalogowany. Wyloguj się oraz spróbuj ponownie.";
	},
	[ErrorName.USER_NOT_FOUND]: (metadata) => {
		if (metadata.fieldName === "mail") return `Użytkownik z adresem e-mail ${metadata.value} nie istnieje!`;

		return "Nie znaleziono podanego użytkownika";
	},
	[ErrorName.ASSORTMENT_NOT_FOUND]: (metadata) => {
		return "Nie znaleziono asortymentu.";
	},
	[ErrorName.UNAUTHORIZED]: () => {
		return "Nie posiadasz wystarczających permisji, aby wykonać tę akcję.";
	},
	[ErrorName.INVALID_BACKUP]: () => {
		return "Wybrana kopia zapasowa jest nieprawidłowa. Mogło dojść do uszkodzenia danych, czym prędzej przywróć inną kopie.";
	},
	[ErrorName.BACKUP_NOT_FOUND]: (metadata) => {
		return "Nie znaleziono wybranej kopii zapasowej.";
	},
	[ErrorName.NO_BACKUP_UTILITIES]: (metadata) => {
		return `Na serwerze brakuje narzędzi (${metadata.binary}) wymaganych do sporządzenia lub zastosowania kopii zapasowej. Skontaktuj się z administratorem serwisu.`;
	},
	[ErrorName.INVALID_TWO_FACTOR_AUTHENTICATION_SESSION]: (metadata) => {
		return "Użyta sesja dwuetapowej weryfikacji nie posiada powiązanego użytkownika. Spróbuj wygenerować nową.";
	},
	[ErrorName.TWO_FACTOR_AUTHENTICATION_SESSION_NOT_FOUND]: (metadata) => {
		return "Nie udało się znaleść wybranej sesji dwuetapowej weryfikacji.";
	},
	[ErrorName.INVALID_EMAIL]: (metadata) => {
		return `${metadata.email} nie jest prawidłowym e-mail'em!`;
	},
	[ErrorName.WRONG_PASSWORD]: (metadata) => {
		return "Podane hasło jest nieprawidłowe.";
	},
	[ErrorName.WRONG_TWO_FACTOR_AUTHENTICATION_VALUE]: (metadata) => {
		return "Podany kod weryfikacji dwuetapowej jest niepoprawny. Spróbuj ponownie.";
	},
	[ErrorName.INVALID_AUTHENTICATION_TOKEN]: (metadata) => {
		return "Twoje ciasteczko autoryzacji jest nieprawidłowe. Wyczyść pamięć przeglądarki oraz zaloguj się ponownie.";
	},
	[ErrorName.INVALID_NOTIFICATION_TYPE_VALUE]: (metadata) => {
		return `${metadata.type} nie jest prawidłową wartością określającą typ powiadomienia.`;
	},
	[ErrorName.INVALID_REPORT_TYPE_VALUE]: (metadata) => {
		return `${metadata.type} nie jest prawidłową wartością określającą typ raportu.`;
	},
	[ErrorName.ASSORTMENT_NO_CELL]: (metadata) => {
		return "Asortyment nie posiada swojej komórki. Skontaktuj się z administratorem serwisu.";
	},
	[ErrorName.ASSORTMENT_NO_SPACE]: (metadata) => {
		return "W magazynie nie ma miejsca na następny asortyment tego typu.";
	},
	[ErrorName.CELL_ALREADY_TAKEN]: (metadata) => {
		return "Ten element jest już zajęty.";
	},
	[ErrorName.NOT_ENOUGH_SHELVES]: (metadata) => {
		return `W magazynie muszą być conajmniej ${metadata.minimalAmountOfShelves} regały. Dalsze ich usuwanie jest niedozwolone.`;
	},
	[ErrorName.SHELF_NOT_FOUND]: (metadata) => {
		return "Ten regał nie istnieje.";
	},
	[ErrorName.SHELF_UNEVEN]: () => {
		return "Regał jest nierówny. Skontaktuj się z administratorem serwisu.";
	},
	[ErrorName.ASSORTMENT_IS_HAZARDOUS]: (metadata) => {
		return "Wybrany regał nie wspiera przechowywania niebezpiecznego asortymentu.";
	},
	[ErrorName.SHELF_TOO_HOT_FOR_ASSORTMENT]: (metadata) => {
		return `Wybrany regał jest zbyt gorący dla asortymentu. Jego minimalna temperatura to ${metadata.shelfMinimalTemperatureCelsius}, maksymalna temperatura asortymentu natomiast to ${metadata.assortmentMaximalTemperatureCelsius}.`;
	},
	[ErrorName.SHELF_TOO_COLD_FOR_ASSORTMENT]: (metadata) => {
		return `Wybrany regał jest zbyt zimny dla asortymentu. Jego maksymalna temperatura to ${metadata.shelfMaximalTemperatureCelsius}, minimalna temperatura asortymentu natomiast to ${metadata.assortmentMinimalTemperatureCelsius}.`;
	},
	[ErrorName.ASSORTMENT_TOO_LONG]: (metadata) => {
		return `Asortyment jest zbyt długi. Posiada on ${metadata.passedLengthMillimeters} gdy maksymalna długość to ${metadata.maxLengthMillimeters}.`;
	},
	[ErrorName.ASSORTMENT_TOO_TALL]: (metadata) => {
		return `Asortyment jest zbyt wysoki. Posiada on ${metadata.passedHeightMillimeters} gdy maksymalna wysokość to ${metadata.maxHeightMillimeters}.`;
	},
	[ErrorName.ASSORTMENT_TOO_WIDE]: (metadata) => {
		return `Asortyment jest zbyt szeroki. Posiada on ${metadata.passedWidthMillimeters} gdy maksymalna szerokość to ${metadata.maxWidthMillimeters}.`;
	},
	[ErrorName.CELL_NOT_FOUND]: (metadata) => {
		return "Ten element nie istnieje.";
	},
	[ErrorName.SHELF_FULL]: (metadata) => {
		return "Regał jest pełny.";
	},
	[ErrorName.SHELF_OVERLOADED]: (metadata) => {
		return `Regał jest przeciążony. Może on ważyć maksymalnie ${metadata.maxWeightKg}, próbowano przechować na nim ${metadata.attemptedWeightKg}.`;
	},
	[ErrorName.SCHEDULER_AUTHORIZATION]: (metadata) => {
		return `Nie udało się zautoryzować do usługi harmonogramu. Klucz "${metadata.passedPassphrase}" nie jest poprawny.`;
	},
	[ErrorName.SCHEDULER_TASK_NOT_FOUND]: (metadata) => {
		return `W harmonogramie nie ma zadania "${metadata.name}". Dostępne zadania to: ${metadata.availableTasks}.`;
	},
	[ErrorName.INVALID_BASE_64]: (metadata) => {
		return "Dodano nieprawidłowy plik.";
	},
	[ErrorName.NEGATIVE_DISTANCE]: (metadata) => {
		return `Dystans nie może być negatywny. Otrzymano: ${metadata.value}.`;
	},
	[ErrorName.FILE_NOT_FOUND]: (metadata) => {
		if (metadata.field === "path") return `Plik "${metadata.value}" nie istnieje.`;

		return "Ten plik nie istnieje.";
	},
	[ErrorName.INVALID_PRIVATE_VISIBILITY_VALUE]: () => {
		return "Prywatny plik nie może posiadać publicznego linku.";
	},
	[ErrorName.INVALID_PUBLIC_VISIBILITY_VALUE]: (metadata) => {
		return "Pubiczny plik musi posiadać link.";
	},
	[ErrorName.INVALID_STORAGE_TYPE_VALUE]: (metadata) => {
		return `"${metadata.type}" nie jest poprawna wartością typu systemu przechowywania plików.`;
	},
	[ErrorName.INVALID_TEMPERATURE_RANGE]: (metadata) => {
		return `Zakres tempeartur ${metadata.minimalTemperatureCelsius}-${metadata.maximalTemperatureCelsius} nie jest prawidłowy.`;
	},
	[ErrorName.INVALID_TIME_FRAME]: (metadata) => {
		return "Podano nieprawidłowy zakres czasu.";
	},
	[ErrorName.INVALID_UUID]: (metadata) => {
		return `"${metadata.value}" nie jest poprawnym UUID.`;
	},
	[ErrorName.NEGATIVE_NUMBER]: (metadata) => {
		return `${metadata.value} nie jest liczbą dodatnią.`;
	},
	[ErrorName.INVALID_TEMPERATURE]: (metadata) => {
		return `Temperatura ${metadata.celsius} nie jest prawidłowa.`;
	},
	[ErrorName.NEGATIVE_WEIGHT]: (metadata) => {
		return `Waga nie może być ujemna. Otrzymano: ${metadata.grams}.`;
	},
	[ErrorName.ASSORTMENT_DEFINITION_NOT_FOUND]: (metadata) => {
		return "Ta definicja asortymentu nie istnieje.";
	},
	[ErrorName.NO_ASSORTMENT_TO_TAKE_DOWN]: (metadata) => {
		return "W magazynie nie istnieje już żaden asortyment tego typu.";
	},
};
