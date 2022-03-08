import React, { useState } from 'react';
import "./style.css"
import { myqrcode } from "../../Components/Qrcode/index";

function Home() {

    const [qr, setQr] = useState()
    const [size, setSize] = useState()
    const [link, setLink] = useState("");

    return (
        <div className='container-form' id="container-qr">
            <form onSubmit={(evt) => {evt.preventDefault()}}>
                <input id="input" type="text" placeholder="Informe um link ou uma frase.." onChange={(evt) => {setLink(evt.target.value)}} />
                <input type="number" defaultValue={250} placeholder='Informe o tamanho' onChange={(evt) => {setSize(evt.target.value)}}/>
                <button type="submit" onClick={async () => {setQr(await myqrcode.create(link, size))}}>Criar QrCode</button>
            </form>
            {qr && (
                <>
                    <img id='qrcode-img' src={qr} alt="QrCode" />
                    <button onClick={() => {myqrcode.donwload(link)}}>Donwload</button>
                </>
            )}
        </div>
    );
}

export default Home;