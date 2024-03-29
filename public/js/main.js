//const { type } = require("express/lib/response");

function onSubmitImageDetails(e) {
    e.preventDefault();

    const prompt = document.querySelector("#prompt").value;
    const n = document.querySelector("#n").value;
    const size = document.querySelector("#size").value;

    if (prompt == '') {
        alert('Please Fill all the Fields to Generate your Image!')
    }

    //console.log(prompt, ' ', n, ' ', size)

    //console.log(type(n))

    generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
    try {
      showSpinner();
  
      const response = await fetch('/openai/generateimage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          //n,
          size,
        }),
      });
  
      if (!response.ok) {
        removeSpinner();
        throw new Error('That image could not be generated');
      }
  
      const data = await response.json();
      // console.log(data);
  
      const imageUrl = data.data;
  
      document.querySelector('#image').src = imageUrl;
  
      removeSpinner();
    } catch (error) {
      document.querySelector('.msg').textContent = error;
    }
  }
function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmitImageDetails);