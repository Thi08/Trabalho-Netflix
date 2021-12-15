import React, {useEffect, useState} from 'react';
import Filmes from './Filmes';
import './App.css';
import LinhaFilmes from './Componentes/Linha/Index';
import Destaque from './Componentes/Destaque/Index';
import Topo from './Componentes/Header/Index';


export default App => {

  const [listaFilmes, setlistaFilmes] = useState([]);
  const [DestaqueData, setDestaqueData] = useState(null);
  const [HeaderPreto, setHeaderPreto] = useState(false);

  //executa a função assim que a tela carregar
  useEffect(() => {
    const carregar = async () => {
      //pega a lista completa de filmes
      let lista = await Filmes.getHomeList();
      for(let item of lista[0].items.results){
        item.Curtido = false;
        item.Descurtido = true;
        item.Comprado = true;
      }
      setlistaFilmes(lista);

      //pega o filme em destaque
      let principal = lista.filter(i=>i.slug === 'principal');
      let escolhaAleatoria = Math.floor(Math.random() * (principal[0].items.results.length - 1));
      let escolhido = principal[0].items.results[escolhaAleatoria];
      let escolhidoInfo = await Filmes.getFilmeInfo(escolhido.id);
      escolhidoInfo.Curtido = true;
      escolhidoInfo.Descurtido = true;
      escolhidoInfo.Comprado = true;
      setDestaqueData(escolhidoInfo);
    }

    carregar();
  },[]); 

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) setHeaderPreto(true);
      else setHeaderPreto(false);   
    }
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  },[]);

  return (
    <div className = 'pagina'>

      <Topo preto={HeaderPreto}/>

      {DestaqueData && <Destaque item={DestaqueData} />
      }
      <section className='listas'>
        {listaFilmes.map((item, key) => (
          <LinhaFilmes key={key} title={item.title} items={item.items} id={item.id} />
          ))}
        </section>  

        <footer>
          Trabalho integrador Be pupa
          <br></br>
          <br></br>
          Feito por: Thiago Albino, Reginaldo Moreira, Jacques David e Jônatha Santos
          <br></br>
          <br></br>
          2021
        </footer>

        {listaFilmes.length <=0 &&
        <div className='carregamento'>
          <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b6e0b072897469.5bf6e79950d23.gif" alt='Carregando' />
        </div>
        }
    </div>
  );
}
