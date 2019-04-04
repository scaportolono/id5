console.log("hello")


let getJson = () => {
    var xmlHttpRequest = new XMLHttpRequest();

    xmlHttpRequest.onreadystatechange = () => {
        if (xmlHttpRequest.readyState === 4 || xmlHttpRequest.status === 200) {

            console.log("get");
        }
    }

}

getJson();
