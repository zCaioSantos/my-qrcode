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
        const qrcode = {
            url: input.getLink(),
            tamanho: input.getTamanho(),
            corP: input.getColorP(),
            corS: input.getColorS(),
        }
        

        if (qrcode.url) {
            app.saveQrcode(qrcode);
        }

        return
    },
    async createQr() {
        const qrcode = {
            url: input.getLink(),
            tamanho: input.getTamanho()
        }

        if (qrcode.url) {
            const result = await app.createQrcode(qrcode);
            return result
        }

        return
    }
};

/* 
===========================================================================
===========================================================================
=========================================================================== 
*/

// Gerador de Qrcode
const qrcode = {
    create() {
        const api =
            "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chld=H|1&chl=";
        const url = input.getLink();
        const qr = api + url;

        if (!url) {
            document.getElementById("previu__qr").src =
                "../../public/Image/Qr code.png";
        } else {
            options.qrPreviewOpen();
            const img = document.getElementById("previu__qr");
            img.src = "../../public/Image/loop.gif";
            setTimeout(() => {
                img.src = qr;
            }, 1000);
        }
    },
};

/* 
===========================================================================
===========================================================================
=========================================================================== 
*/

// Opções Texto e Url
const options = {
    toggle() {
        const optionActive = document.getElementById("option__url");
        if (optionActive.checked) {
            //Animação de entrada de preview
            document.getElementById("input__urlCard").classList.remove("hidden");
            document.getElementById("input__textoCard").classList.add("hidden");

            //Mostrar imagem de previa
            document.getElementById("previu__qr").src =
                "../../public/Image/Qr code.png";

            //Limpar input
            document.getElementById("input__website").value = "";
        } else {
            //Animação de entrada de preview
            document.getElementById("input__textoCard").classList.remove("hidden");
            document.getElementById("input__urlCard").classList.add("hidden");

            //Mostrar imagem de previa
            document.getElementById("previu__qr").src =
                "../../public/Image/Qr code.png";

            //Limpar input
            document.getElementById("input__texto").value = "";
        }
    },
    whichOneIsActive() {
        const optionActive = document.getElementById("option__url");
        if (optionActive.checked) {
            return true;
        } else {
            return false;
        }
    },
    qrPreviewOpen() {
        const menu = document.getElementById("container__section__2");
        menu.classList.add("animacaoEntradaEsquerda");
    },
    qrPreviewClose() {
        const menu = document.getElementById("container__section__2");
        menu.classList.remove("animacaoEntradaEsquerda");
    },
};

/* 
===========================================================================
===========================================================================
=========================================================================== 
*/

// Pegar e limpar values de inputs
const input = {
    getTamanho() {
        document
            .getElementById("input__tamanho")
            .addEventListener("change", () => {
                const tamanho = document.getElementById("input__tamanho").value;
                return tamanho;
            });
    },
    getLink() {
        const option = options.whichOneIsActive() ? "input__website" : "input__texto";
        const url = document.getElementById(option).value;

        if (url === "") {
            return false;
        };

        if (option === "input__website") {
            if (util.validarUrl(url)) {
                return url;
            } else {
                return false;
            }
        };

        return url;
    },
    getColorP() {
        let corP = document.getElementById('input__color_p').value;
        return corP;
    },
    getColorS() {
        let corS = document.getElementById('input__color_s').value;
        return corS;
    },
    getTamanho() {
        let tamanho = document.getElementById('input__tamanho').value;
        return tamanho;
    },
    setTamanho() {
        let tamanho = document.getElementById("input__tamanho").value
        document.getElementById('value__inputTamanho').value = tamanho + "px"
    }
};

/* 
===========================================================================
===========================================================================
=========================================================================== 
*/

// Utils

const util = {
    validarUrl(url) {
        if (url !== null && url !== "") {
            return url
        };
        return false;
    },
};

/* 
===========================================================================
===========================================================================
=========================================================================== 
*/

// EventListenerS Padrões

// Toggle options

document
    .getElementById("card__url")
    .addEventListener("click", () => options.toggle());
document
    .getElementById("card__text")
    .addEventListener("click", () => options.toggle());

// Cancelar evento padrao do form
document.getElementById("form__principal").addEventListener("submit", (event) => {
    event.preventDefault();
    qrcode.create();
});

document.getElementById("value__inputTamanho").addEventListener('input', () => {
    let tamanho = document.getElementById('value__inputTamanho').value
    tamanho = tamanho.replace("px", "")
    if (tamanho => 100 && tamanho <= 500) {
        document.getElementById('input__tamanho').value = tamanho
        document.getElementById('value__inputTamanho').value = tamanho + "px"
        return
    } 
    document.getElementById('input__tamanho').value = 0
})
