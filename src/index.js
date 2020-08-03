var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();
//PROBLEMA 1 Y 2
/*const fetchData=(url_api, callback)=> {
  xhttp.onreadystatechange = function (event) {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200)
        callback(null, JSON.parse(xhttp.responseText))
      else {
        const error= new Error(`Error ${url_api}`)
        return callback(error, null)
      }
    }
  };
  xhttp.open('GET', url_api, false);
  xhttp.send();
};

fetchData(API, function (error1, data1) {
  if (error1) return console.error(`Error ${error1}`);
  console.log('Primer Llamado...')
  fetchData(API + data1.results[0].id, function (error2, data2) { 
    if (error2) return console.error(error1);
    console.log('Segundo Llamado...')
    fetchData(data2.origin.url, function (error3, data3) {
      if (error3) return console.error(error3);
      console.log('Tercero Llamado...')
      console.log(`Personajes: ${data1.info.count}`)
      console.log(`Primer Personaje: ${data2.name}`)
      console.log(`Dimensión: ${data3.dimension}`)
    });
  });
});*/

const  fetchData = (url_api)=>{
  return new Promise((resolve,reject)=>{       
      const xhttp= new XMLHttpRequest()
      xhttp.open('GET',url_api,true)  
          xhttp.onreadystatechange=(()=>{
          if(xhttp.readyState===4){
              (xhttp.status===200)
                  ? resolve( JSON.parse(xhttp.responseText))
                  : reject(new Error('Errror ', url_api))
          }
      });
      xhttp.send();
  });
}

fetchData(API)
    .then(data=>{
      console.log('Primer Llamado...')
      console.log(`Personajes: ${data.info.count}`)
        return fetchData(`${API}${data.results[0].id}`)
    })
    .then(data=>{
        console.log('Segundo Llamado...')
        console.log(`Primer Personaje: ${data.name}`)
        return fetchData(data.origin.url)
    })
    .then(data=>{
        console.log('Tercero Llamado...')
        console.log(`Dimensión: ${data.dimension}`)
    })
    .catch(err=>console.error(err))