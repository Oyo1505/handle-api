import React, { useEffect, useState } from 'react'

function AsideMovie(props){

    const [providers, setProviders] = useState(null);
    const [externalIDs, setExternal] = useState(null);
    const [keywords, setKeywords] = useState(null)

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3${props.url}/watch/providers?api_key=${process.env.REACT_APP_MOVIESDB_API_KEY}&language=fr-FR`)
        .then(response => response.json())
        .then(json => setProviders(json));


        /*External ID*/
        fetch(`https://api.themoviedb.org/3${props.url}/external_ids?api_key=${process.env.REACT_APP_MOVIESDB_API_KEY}&language=fr-FR`)
        .then(response => response.json())
        .then(json => setExternal(json));

        /*Keyword ID*/
        fetch(`https://api.themoviedb.org/3${props.url}/keywords?api_key=${process.env.REACT_APP_MOVIESDB_API_KEY}&language=fr-FR`)
        .then(response => response.json())
        .then(json => setKeywords(json));
    
    },[]);

    if(providers){
        var provider = Object.values(providers.results.FR);
        var providerLogo=  provider[1].map(pop =>{return   <li><a href={provider[0]}><img src={`https://www.themoviedb.org/t/p/original${pop.logo_path}`} className="logo-provider" /></a></li>})
        
    }
    if(keywords){ 
       var keywordsValue = Object.values(keywords.keywords)
       var words= keywordsValue.map(word=>{
            return <li>{word.name}</li>
        });
    }
    const {show} = props
 return(
    <div className="aside-movie">
     <div className=''>
        <div className="externalIDs">
            {externalIDs &&
            <>
                {externalIDs.facebook_id && <span><a href={`https://www.facebook.com/${externalIDs.facebook_id}`} ><i className={externalIDs.facebook_id ? 'icon icon-fb' : ''}></i></a></span>}
                {externalIDs.imdb_id && <span><a  href={`https://www.imdb.com/title/${externalIDs.imdb_id }`}><i className={externalIDs.imdb_id ? 'icon icon-imdb' : ''}></i></a></span>}
                {externalIDs.instagram_id &&<span><a href={`https://www.instagram.com/${externalIDs.instagram_id }`}><i className={externalIDs.instagram_id ? 'icon icon-instagram' : ''}></i></a></span>}
                {externalIDs.twitter_id &&  <span><a  href={`https://www.twitter.com/${externalIDs.twitter_id }`}><i className={externalIDs.twitter_id ? 'icon icon-twitter' : ''}></i></a></span> }
               
                </>
            } 
             {!externalIDs &&
             <span>Pas de liens</span>
             }
          
        </div>
        <div className="providers">
            <h3>Disponible sur</h3>
            <ul>
            {providers && providerLogo}
            </ul>
           {!providers && <p>Indisponible</p>}
        </div>
        <div className="info-movie">
        <p style={{color:"#000"}}>
               <strong><bdi>Langue d'origine</bdi></strong><br />
               {show.original_language}
           </p>
           <p style={{color:"#000"}}>
               <strong><bdi>Budget</bdi></strong><br />
               ${show.budget}
           </p>
           <p style={{color:"#000"}}>
               <strong><bdi>Recette</bdi></strong><br />
               ${show.revenue}
           </p>
        </div>
        <div className="keywords">
            <h3>Mots-clés</h3>
            <ul>
            {keywords && 
                words
            }
            </ul>
            {!keywords && <p>Pas de mot clés</p>}
        </div>
        <div>
            
        </div>
    </div>
    </div>
    
 )
}

export default AsideMovie;