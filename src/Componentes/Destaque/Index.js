import React, { Component } from 'react';
import './Destaque.css';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import swal from 'sweetalert2';

export default ({item}) => {

    //converte a data completa em ano
    let ano = new Date(item.release_date);
    //converte os minutos em horas e minutos
    let min = (item.runtime)%60;
    let horas = ((item.runtime) - min)/60;
    if(min < 9) min = "0"+min;
    //pega todos os generos do filme
    let genres = [];
    for(let i in item.genres){
        genres.push(item.genres[i].name);
    }
    //limita a quantidade de caracteres visíveis da descrição
    let descricao = item.overview;
    if(descricao.length > 200){
        descricao = descricao.substring(0,200)+'...'
    }
    //mostra a descrição completa ao clicarem
    const mostrarDescricaoDestaque = () =>{
        swal.fire({
            title: `${item.title}`,
            text: `${item.overview}`,
            confirmButtonText: 'Fechar',
            confirmButtonColor: 'red',
            width: 1000,
            padding: '3em',
            color: '#fffadd',
            background: '#111',
            imageUrl: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
            imageWidth: 400,   
          })
    }
    //mostra a tela para finalizar a compra
    const finalizarCompraDestaque = () =>{
        swal.fire({
            title: `${item.title}`,
            text: 'Valor: 5,00 R$',
            confirmButtonText: 'Finalizar compra',
            showCancelButton: true,
            background: '#111',
            color: '#fff',
            imageUrl: `https://image.tmdb.org/t/p/w300${item.backdrop_path}`,
            input: 'select',
            inputOptions: {
                'Cartão':{
                    crédito: 'Crédito',
                    débito: 'Débito',
                },
                'Outras formas':{
                    pix: 'Pix',
                    boleto: 'Boleto',
                        }
                    },
            inputPlaceholder: 'Formas de pagamento',
                }).then((result) => {
                    if(result.isConfirmed){
                        swal.fire({
                            text:'Filme adquirido com sucesso'})
                        }
                })
            }

    return (

            <section className="destaque" style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
                       
            }}>
                
                <div className= 'Destaque-vertical'>
                   <div className= 'Destaque-horizontal'>
                        <div className= 'Destaque-nome'>{item.title}</div>
                        <div className= 'Destaque-info'>
                            <div className= 'Destaque-pontos'>Nota: {item.vote_average}</div>
                            <div className= 'Destaque-data'>{ano.getFullYear()}</div>
                            <div className= 'Destaque-duracao'>{horas}h{min}</div>
                            <div className= 'Destaque-descricao'>{descricao}</div>
                            <div className= 'Destaque-botao'>
                                <button href= {`/buy/${item.id}`} id='buy' className={item.Comprado ? 'Destaque-comprado' : 'Destaque-comprar'} onClick={()=>finalizarCompraDestaque()}>🛒Comprar</button>
                                <button href= {`/descricao/${item.overview}`} className= 'Destaque-overview' onClick={()=>mostrarDescricaoDestaque()}>🛈 Descrição </button>
                            </div>
                            <div className= 'Destaque-curtida'>
                                <button  className={item.Curtido ? 'Destaque-curtido' : 'Destaque-like'} disabled={item.Descurtido}><ThumbUpIcon /> Curtir</button>
                                <button  className={item.Descurtido ? 'Destaque-descurtido' : 'Destaque-deslike'} disabled={item.Curtido}><ThumbDownIcon /> Descurtir</button>
                            </div>
                            <div className= 'Destaque-gêneros'>Gêneros: {genres.join(', ')}</div>
                </div>
                </div>
                </div>
            </section>
    );
}
