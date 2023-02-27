document.getElementById("box1").contents = "plaintext"
document.getElementById("box2").contents = "encrypted"

window.onload = (event) => {
    var domKey = document.getElementById("key")
    globalThis.chrome.storage.sync.get("key", function(res) {
        if (res.key == "undefined") {
            globalThis.chrome.storage.sync.set({key: ""})
            domKey.value = ""
        }
        else {
            domKey.value = res.key
        }
    })
};


function encrypt() {
    var e = CryptoJS.AES.encrypt(document.getElementById("box1").value,document.getElementById("key").value)
    document.getElementById("box2").value = e
}
function decrypt() {
    var d = CryptoJS.AES.decrypt(document.getElementById("box1").value, document.getElementById("key").value).toString(CryptoJS.enc.Utf8)
    document.getElementById("box2").value = d
}

function checkAndUpdate() {
    let box1 = document.getElementById("box1")
    console.log(box1.contents)
    if (box1.contents == "plaintext") {
        encrypt()
    } else {
        decrypt()
    }
}

document.getElementById("switch").onclick = function (){
    let temp2 = document.getElementById("box1").contents
    document.getElementById("box1").contents = document.getElementById("box2").contents
    document.getElementById("box2").contents = temp2
    let temp = document.getElementById("box1").value
    document.getElementById("box1").value = document.getElementById("box2").value
    document.getElementById("box2").value = temp
    let temp3 = document.getElementById("box1Label").innerHTML
    document.getElementById("box1Label").innerHTML = document.getElementById("box2Label").innerHTML
    document.getElementById("box2Label").innerHTML = temp3
}

document.getElementById("box1").addEventListener("input", e => {
    checkAndUpdate()
})
document.getElementById("key").addEventListener('input', (event) => {
    globalThis.chrome.storage.sync.set({key : document.getElementById("key").value})
    checkAndUpdate()
})