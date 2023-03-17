const setCookie = (name: string, value: string, milliseconds: number) => {
	let expires = '';
	if (milliseconds) {
		const date = new Date();
		date.setTime(milliseconds);
		expires = '; expires=' + date.toUTCString();
	}
	document.cookie = name + '=' + (value || '') + expires + '; path=/';
};
const getCookie = (name: string) => {
	const nameEQ = name + '=';
	const ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
};
const eraseCookie = (name: string) => {
	document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export { setCookie, getCookie, eraseCookie };
