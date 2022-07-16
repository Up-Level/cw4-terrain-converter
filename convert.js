const output = document.getElementById("output");

document.addEventListener('submit', event => {
    event.preventDefault();

    const formData = Array.from(new FormData(event.target));

    const reader = new FileReader();
    reader.onload = e => {
        convert(e.target.result)
    }
    reader.readAsText(formData[0][1])
});

function convert(rawData) {
    const arrayStart = rawData.indexOf("[[");
    let data = "";
    try {
        data = JSON.parse(rawData.substring(arrayStart));

        let arrString = "";
        for (let z = 0; z < data.length; z++) {
            let xString = "";
            for (let x = 0; x < data[z].length; x++) {
                xString += `${data[z][x]} `
            }
        
            arrString = arrString + xString + (data[0].length + 1) + " ListN\n";
        }
        arrString += "List ->heightmap";
    
        output.textContent = arrString;
    }
    catch(e) {
        output.textContent = "Failed to convert\n" + e;
    }
}

function copy() {
    navigator.clipboard.writeText(output.textContent);
}
