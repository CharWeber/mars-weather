import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import anime from 'animejs/lib/anime.es.js'


$(document).ready(function () {
  $('#pictureOfTheDay').click(function (e) {
    e.preventDefualt;
    let promise = new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`;
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function (response) {
      const body = JSON.parse(response);
      $("#Img").after(`<img src='${body.hdurl}'></img>'`);
      $("#apodList").append(`<li>title: <strong>${body.title}</strong></li>
      <li> explanation: ${body.explanation}</li>`);
    }, function (error) {
      console.log(error);
    });
  });

  $('#roverPicture').click(function (e) {
    e.preventDefualt;
    let promise = new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=${process.env.API_KEY}`;
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function (response) {
      const bRover = JSON.parse(response);
      $("#ImgRover").after(`<img src='${bRover.photos[1].img_src}'></img>'`);
      $("#rover").append(`<li>title: <strong>${bRover.title}</strong></li>
      <li> Camera name: ${bRover.photos[1].camera.full_name}</li>`);

      $("#ImgRover2").after(`<img src='${bRover.photos[0].img_src}'></img>'`);
      $("#rover2").append(`<li>title: <strong>Rover Picture!</strong></li>
      <li> Camera name: ${bRover.photos[0].camera.full_name}</li>`);
    }, function (error) {
      console.log(error);
    });
  });
  $('#libSearchBtn').click(function (e) {
    e.preventDefualt;
    let promise = new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      let query = $("#nasaSearch").val();
      const url = `https://images-api.nasa.gov/search?q=${query}`;
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
    
    let asset = []
    promise.then(function (response) {
      const library = JSON.parse(response);
      library.collections.forEach(element  => asset.push(`${element.data[0].nasaid}`))
    }, function (error) {
      console.log(error);
    });

    let promise = new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      asset.forEach(element){
        const url = `https://images-api.nasa.gov/search?q=${element}`;
        request.onload = function () {
          if (this.status === 200) {
            resolve(request.response);
          } else {
            reject(request.response);
          }
        };
        request.open("GET", url, true);
        request.send();
      }
    });
  });
});