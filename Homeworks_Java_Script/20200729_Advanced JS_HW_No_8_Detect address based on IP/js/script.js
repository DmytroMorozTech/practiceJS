function init() {
    let getAddressBtn = document.querySelector(".get-address-btn");
    getAddressBtn.addEventListener("click", onClickGetAddressBtn);
}

async function onClickGetAddressBtn() {
    let resultParagraph = document.querySelector(".result");
    try {
        let ipInfo = await fetch('https://api.ipify.org/?format=json').then(res => res.json());
        // получаем вычисленный ip-адрес пользователя.

        const {ip:ipAddress} = ipInfo;
        const data = await fetch(`http://ip-api.com/json/${ipAddress}?fields=continent,country,regionName,city,district&lang=ru`).then(response => response.json())

        let finalInfo = {};
        finalInfo["Континент"] = data["continent"];
        finalInfo["Страна"] = data["country"];
        finalInfo["Регион"] = data["regionName"];
        finalInfo["Город"] = data["city"];
        finalInfo["Район"] = data["district"];

        let finalInfoReadable = Object.entries(finalInfo).map(entry => entry.join(":")).join(", ");
        resultParagraph.textContent = finalInfoReadable;
        // console.log(finalInfoReadable);
    }
    catch (error) {
        console.log(`An error ${error} has occurred.`)
    }
}

init();

// --------------------------------------
function findAnyIp() {
    let getAnyIpBtn = document.querySelector(".get-any-ip-btn");
    getAnyIpBtn.addEventListener("click", onClickAnyIp);
}

async function onClickAnyIp() {
    let resultAnyIpParagraph = document.querySelector(".result-any-ip");
    let ipInput = document.querySelector("input[name='ip']");
    let inputValue = ipInput.value;
    const regexIp4 = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm;
    if (!inputValue) {return false};
    if (!inputValue.match(regexIp4)) {
        alert(`You've entered wrong IP-address: "${inputValue}". Please enter valid IPv4 address.`);
        ipInput.value = "";
        return false;
    }

    try {
        const data = await fetch(`http://ip-api.com/json/${inputValue}?fields=continent,country,regionName,city,district&lang=ru`).then(response => response.json())

        let finalInfo = {};
        finalInfo["Континент"] = data["continent"];
        finalInfo["Страна"] = data["country"];
        finalInfo["Регион"] = data["regionName"];
        finalInfo["Город"] = data["city"];
        finalInfo["Район"] = data["district"];

        // console.log(finalInfo);

        let finalInfoReadable = Object.entries(finalInfo).map(entry => entry.join(":")).join(", ");
        resultAnyIpParagraph.textContent = finalInfoReadable;
    }
    catch (error) {
        console.log(`An error ${error} has occurred.`)
    }
}

findAnyIp();