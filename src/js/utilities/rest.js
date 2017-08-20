//should be created in the main project folder
const API_URL = "http://192.168.178.73";
const API_VERSION = false;

export const fetchApi = (
	path = "/",
	method = "GET",
	params = {},
	accessToken = null,
	version = API_VERSION
) => {
	return new Promise((resolve, reject) => {
		let http = new XMLHttpRequest();

		http.open(
			method,
			API_URL + (version ? "/v" + API_VERSION : "") + "/" + path,
			true
		);

		if (accessToken !== null) {
			http.setRequestHeader("Authorization", "Bearer " + accessToken);
		}

		http.onreadystatechange = () => {
			if (http.readyState === 4) {
				if (http.status === 200) {
					try {
						let data = JSON.parse(http.responseText);
						resolve(data);
					} catch (e) {
						console.log("Invalid json response!");
						console.log(http.responseText);

						reject(new Error("Invalid json response!"));
					}
				} else {
					try {
						let error = JSON.parse(http.responseText);
						reject(error);
					} catch (e) {
						console.log("Invalid json response!");
						console.log(http.responseText);

						reject(new Error("Invalid json response!"));
					}
				}
			}
		};

		http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		http.send(JSON.stringify(params));
	});
};

export const uploadFile = (
	path = "/",
	method = "POST",
	formData = null,
	accessToken = null,
	version = API_VERSION
) => {
	return new Promise((resolve, reject) => {
		let http = new XMLHttpRequest();

		http.open(
			method,
			API_URL + (version ? "/v" + API_VERSION : "") + "/" + path,
			true
		);

		if (accessToken !== null) {
			http.setRequestHeader("Authorization", "Bearer " + accessToken);
		}

		http.onreadystatechange = () => {
			if (http.readyState === 4) {
				if (http.status === 200) {
					let data = JSON.parse(http.responseText);

					if (data.status && data.status != 200) {
						reject(data);
					} else {
						resolve(data);
					}
				} else {
					reject("Error Code: " + http.status);
				}
			}
		};

		//http://stackoverflow.com/questions/39280438/fetch-missing-boundary-in-multipart-form-data-post
		http.send(formData);
	});
};
