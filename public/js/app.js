
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msgone = document.querySelector("#msg-1");
const msgtwo = document.querySelector("#msg-2");

msgone.textContent = "";
msgtwo.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  msgone.textContent = "Loading...";
  fetch("/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          msgone.textContent = data.error;
          msgtwo.textContent = "";
        } else {
          msgone.textContent = data.location;
          msgtwo.textContent = data.forecast;
        }
      });
    }
  );
});
