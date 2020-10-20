console.log("client side js is loaded");

const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const messageone = document.querySelector('#message-1');
const messagetwo = document.querySelector('#message-2');

weatherform.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageone.textContent = 'loading....'

          messagetwo.textContent = '';



  //console.log(location);

  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
        //   console.log(data.error);

          messageone.textContent = data.error;
          messagetwo.textContent = "";
        } else {
          console.log(data.location);
        //   console.log(data.forecast);

          messageone.textContent = data.location;

          messagetwo.textContent = data.forecast;
        }
      });
    }
  );
});
