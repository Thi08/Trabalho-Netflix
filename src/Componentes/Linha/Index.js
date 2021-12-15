import React, {useState} from 'react';
import './LinhaFilmes.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import swal from 'sweetalert2';
import InfoIcon from '@material-ui/icons/Info';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export default ({title, items, id}) => {
        const [rolagem, setRolagem] = useState(0);

        //barra para o lado
        const handleLeftArrow = () => {
            let x= rolagem + Math.round(window.innerWidth/2);
            if(x>0){
                x=0;
            }
            setRolagem(x);
        }

        //barra para o outro lado
        const handleRightArrow = () => {
            let x = rolagem - Math.round(window.innerWidth/2);
            let largura = items.results.length * 190;
            if(window.innerWidth - largura > x){
                x = (window.innerWidth - largura) - 60;
            }
            setRolagem(x);
        }
        
        //mostra a descrição do filme ao ser clicar
        const mostrarDescricaoLinha=({item})=>{
            swal.fire({
                title: `${item.title}`,
                text: `${item.overview}`,
                confirmButtonText: 'Fechar',
                confirmButtonColor: 'red',
                width: 1000,
                customClass: 'swal-wide',
                padding: '3em',
                color: '#fffadd',
                background: '#111',
                imageUrl: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
                imageWidth: 400,   
              })
            }
        
            //mostra dados para finalizar a compra
            const finalizarCompraLinha=({item})=>{
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
                                    text:'Filme adquirido com sucesso'});
                        }
                        })
                    }  
                
        return(
        <div className='linhaFilme' id={`${id}`}>
            <h2>{title}</h2>
            <div className='mover-direita' onClick={handleLeftArrow}><NavigateBeforeIcon style={{fontSize:70}}/></div>
                <div className='mover-esquerda' onClick={handleRightArrow}><NavigateNextIcon style={{fontSize:70}} /></div>
            <div className='areaLinha'>
                <div className='listaLinha' style={{
                        marginLeft: rolagem,
                        width: items.results.length * 190
                }}>
                    {items.results.length > 0 && items.results.map((item, key)=>(
                    <div key={key} className="itemLinha">
                        <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt='Poster do filme'/>
                        <div className= 'Linha-botoes'>
                        <button className={item.Curtido ? 'Linha-curtido' : 'Linha-like'} disabled={item.Descurtido}><ThumbUpIcon fontSize="small"/></button>
                        <button className={item.Descurtido ? 'Linha-descurtido' : 'Linha-deslike'} disabled={item.Curtido}><ThumbDownAltIcon fontSize="small"/></button>
                        <button href= {`/descricao/${item.overview}`} className= 'Linha-overview' onClick={()=>mostrarDescricaoLinha({item})}><InfoIcon/></button>
                        <button href= {`/buy/${item.id}`} className={item.Comprado ? 'Linha-comprado' : 'Linha-comprar'} onClick={()=>finalizarCompraLinha({item})}><ShoppingCartIcon/></button>  
                        </div>
                    </div>           
                ))} 
                </div>
            </div>
        </div>
    )
}
