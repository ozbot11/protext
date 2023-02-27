import CryptoJS from 'crypto-js';


globalThis.chrome.contextMenus.create(
    {
        id: "encrypt",
        title: "Encrypt Text",
        contexts: [ "selection" ]
    }
)

globalThis.chrome.contextMenus.create(
    {
        id: "decrypt",
        title: "Decrypt Text",
        contexts: [ "selection" ]
    }
)


globalThis.chrome.contextMenus.onClicked.addListener(
    function(info, tab) {
        switch (info.menuItemId) {
            case "encrypt":
                globalThis.chrome.storage.sync.get("key", function(res) {
                    if ((!(res.key === "undefined")) || res.key != "") {
                        var e = CryptoJS.AES.encrypt(info.selectedText, res.key)
                        alert(info.selectedText + " = " + e)
                    }
                })
                break
            case "decrypt":
                break
        }
    }
)