const axios = require('axios')
exports.getActivity = function getActivity(){
    axios.get('https://www.boredapi.com/api/activity').then(function (response){
        console.log(response.data.activity);
        let newSpan = document.createElement('span')
        newSpan.innerText = response.data.activity
        document.querySelector("#activity").appendChild(newSpan)
    })
        .catch(function (error) {
            console.log(error)
        })
        .then(function (){

        })


}
