const qrcode = require("qrcode");

const myqrcode = {
    async create(url, size) {
        if (!url) {
            return null;
        }

        const options = { 
            errorCorrectionLevel: 'H', 
            width: size,
            type: 'image/png',
            color: {
                dark:"#c79b54",
                light:"#0000"
            },
            margin: 5
        }

        return qrcode.toDataURL(url, options);
    },

    async donwload(url) {

        const options = { 
            errorCorrectionLevel: 'H', 
            width: 250,
            type: 'svg',
            color: {
                dark:"#c79b54",
                light:"#0000"
            },
            margin: 5
        }

        const arquivo = await qrcode.toString(url, options);
        console.log(arquivo)

        var baixar = document.createElement('a');
        baixar.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(arquivo));
        baixar.setAttribute('download', `MyQRCode.svg`);

        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            baixar.dispatchEvent(event);
        } else {
            baixar.click();
        }
    }
};

export { myqrcode };
