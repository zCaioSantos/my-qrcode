// Comunicação com a API do electron
const aplicativo = {
    close() {
        app.close();
    },
    resize() {
        app.resize();
    },
    min() {
        app.min();
    },
    save() {
        const qr = qrcode.pegarUrl();
        if (qr !== false) {
            app.saveQrcode(qr);
        }

        return
    }
};

// Gerador de Qrcode
const qrcode = {
    pegarUrl () {
        const option =
        options.whichOneIsActive() === true
            ? "input-website"
            : "input-texto";
        const url = document.getElementById(option).value;

        if (url !== "") {
            return url;
        }

        return false
    },
    create() {
        const api =
        "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chld=H|1&chl=";

        const qr = api + qrcode.pegarUrl();

        if (qr !== false) {
            options.qrPreviewOpen();
            const img = document.getElementById("previu__qr");
            img.src = "../../public/Image/loop.gif";
            setTimeout(() => {
                img.src = qr;
            }, 1000);
        } else {
            document.getElementById("previu__qr").src =
                "../../public/Image/Qr code.png";
        }
    },
};

const options = {
    toggle() {
        const optionActive = document.getElementById("option__url");
        if (optionActive.checked == true) {
            document.getElementById("form-website").classList.remove("hidden");
            document.getElementById("form-text").classList.add("hidden");
            document.getElementById("previu__qr").src =
                "../../public/Image/Qr code.png";
            document.getElementById("input-website").value = "";
        } else {
            document.getElementById("form-text").classList.remove("hidden");
            document.getElementById("form-website").classList.add("hidden");
            document.getElementById("previu__qr").src =
                "../../public/Image/Qr code.png";
            document.getElementById("input-texto").value = "";
        }
    },
    whichOneIsActive() {
        const optionActive = document.getElementById("option__url");
        if (optionActive.checked === true) {
            return true;
        } else {
            return false;
        }
    },
    qrPreviewOpen() {
        const menu = document.getElementById("container__section__2");
        menu.classList.add("animacaoEntradaEsquerda")
    },
    qrPreviewClose() {
        const menu = document.getElementById("container__section__2");
        menu.classList.remove("animacaoEntradaEsquerda")
    }
};

// Toggle options
document
    .getElementById("card-url")
    .addEventListener("click", () => options.toggle());
document
    .getElementById("card-text")
    .addEventListener("click", () => options.toggle());

// document
//     .getElementById("container__section__2")
//     .addEventListener("click", () => options.qrPrevieClose());

// Cancelar evento padrao do form
document.getElementById("form-website").addEventListener("submit", (event) => {
    event.preventDefault();
    qrcode.create();
});

document.getElementById("form-text").addEventListener("submit", (event) => {
    event.preventDefault();
    qrcode.create();
});
