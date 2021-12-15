const API_KEY = '25b615bb60b2ac8cacc56ec4d7a98ba1';
const API = 'https://api.themoviedb.org/3';


//pega a url e devolve o resultado do json
//async= retorna uma "promise" e quando a função retornar um valor, ela será resolvida com tal valor.
//await= espera a resolução da 'promise'.
const Fetch = async (final) => {
    const requisição = await fetch(`${API}${final}`);
    const json = await requisição.json();
    return json;
}


export default {
    getHomeList: async () => {
        return [
            {
                slug: 'principal',
                id: 'famosos',
                title: 'Mais Famosos',
                items: await Fetch(`/discover/movie?sort_by=popularity.desc&language=pt-BR&api_key=${API_KEY}`)
                        //(await Fetch(`/discover/movie?sort_by=popularity.desc&language=pt-BR&api_key=${API_KEY}`)).results
            },
            {
                slug: 'principal',
                id: 'recomendados',
                title: 'Top Recomendações',
                items: await Fetch(`/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'principal',
                id: 'romance',
                title: 'Romance',
                items: await Fetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'principal',
                id: 'comedia',
                title: 'Comédia',
                items: await Fetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
        ];
    },

    getFilmeInfo: async (FilmeId) => {
        let info = {};
        info = await Fetch(`/movie/${FilmeId}?language=pt-BR&api_key=${API_KEY}`);
    return info;
}
}