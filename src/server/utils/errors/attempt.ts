// Utility function which returns an error instead of throwing it, so that
// we don't have to add the `let`, `try`/`catch` boilerplate everywhere.
export const attempt = <T, E extends Error>(fn: () => T): T | E => {
	try {
		return fn();
	} catch (error) {
		return error as E;
	}
};
