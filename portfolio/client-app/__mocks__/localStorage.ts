var localStorageMock = (function () {
	var store: any = {};
	return {
		getItem: function (key: string) {
			return store[key];
		},
		setItem: function (key: string, value: string) {
			store[key] = value.toString();
		},
		clear: function () {
			store = {};
		},
		removeItem: function (key: string) {
			delete store[key];
		},
	};
})();
export default Object.defineProperty(window, 'localStorage', {
	value: localStorageMock,
});
