import { API_URL } from "config.json";

export const fetchApi = (
	path = "/",
	method = "GET",
	params = {},
	accessToken = null
) => {
	return new Promise((resolve, reject) => {
		let http = new XMLHttpRequest();

		http.open(method, API_URL + "/" + path, true);

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
