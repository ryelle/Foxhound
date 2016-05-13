const getCurrentPage = function( state ) {
	return state.ui.page || 1;
};

export { getCurrentPage };
