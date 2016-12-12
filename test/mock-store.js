export const mockStore = ( state ) => {
	return {
		default: () => {},

		subscribe: () => {},

		dispatch: () => {},

		getState: () => {
			return state;
		},
	};
}
