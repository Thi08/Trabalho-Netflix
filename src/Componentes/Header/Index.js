import React from 'react';
import './Header.css'

export default ({preto}) => {

    //Faz com que os botões parem nas sessões desejadas ao serem clicados
    const backToTop = () => {
        window.location.href = '#'
        window.scrollTo(0,0);
    }

    const famosos = () => {
        window.location.href = '#famosos'
        window.scrollBy(0,-60);
    }

    const recomendacoes = () => {
        window.location.href = '#recomendados'
        window.scrollBy(0,-60);
    }

    const romance = () => {
        window.location.href = '#romance'
        window.scrollBy(0,-60);
    }

    const comedia = () => {
        window.location.href = '#comedia'
        window.scrollBy(0,0);
    }

    return (
        <header className={preto ? 'preto' : ''}>
            <div className = 'Header-logo'>
                <a href='/'>
                   <img src='https://media-exp1.licdn.com/dms/image/C4D0BAQHoReI8z_3s1g/company-logo_200_200/0/1618840743900?e=1646870400&v=beta&t=4AE2FOH3k5hIAhilQix-CKM2PZyaQ2M6KaxSe_anJ24' alt='Netflix' /> 
                </a>
            </div>
            <button className='inicio' onClick={backToTop}>Início</button>
            <button className='famosinhos' onClick={famosos} >Mais famosos</button>
            <button className='top' onClick={recomendacoes} >Recomendados</button>
            <button className='romance' onClick={romance} >Romance</button>
            <button className='comedia' onClick={comedia} >Comédia</button>
            <div className = 'Header-usuario'>
                <a href='/'>
                    <img src="https://i.pinimg.com/originals/af/3a/4c/af3a4cbf3ecba90c658288caa6ce5ebb.jpg" alt='Usuário' />
                </a>
            </div>    
        </header>


    );
}
