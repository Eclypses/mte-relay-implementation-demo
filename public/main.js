/**
 * Use Javascript to manually collect form values and submit them
 */
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm);

  mte
    .mteFetch(
      "http://localhost:8080/login",
      {
        method: "POST",
        body: new URLSearchParams(formData),
      },
      {
        encodeType: "MTE",
      }
    )
    .then((response) => {
      if (response.redirected) {
        window.location.replace(response.url);
      } else {
        response.text().then((html) => {
          // you could parse the returned HTML and extract the error and show it to the user...
          // console.log(html);

          // Or, create a new error element
          const errorEl = document.createElement("div");
          errorEl.style.color = "red";
          errorEl.textContent = "*Invalid login credentials";
          loginForm.append(errorEl);
        });
      }
    });
});
