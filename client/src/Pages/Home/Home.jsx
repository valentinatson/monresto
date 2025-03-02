import style from './Home.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button} from 'antd';
import { YoutubeFilled, InstagramFilled, TikTokFilled, TwitterCircleFilled} from '@ant-design/icons';


const Home = () => {
  return (
    <div>

      <section className={style.header}>
        <aside className={style.header__aside1}>
        <YoutubeFilled />
        <InstagramFilled />
        <TikTokFilled />
        <TwitterCircleFilled />
        </aside>
        <aside className={style.header__aside2}>
            <h4>
                monresto.@valentin.com
            </h4>
        </aside>
        <aside className={style.header__aside3}>
            <h4>
                +33 6 12 34 56 78
            </h4>
        </aside>
      </section>

      <section className={style.banniere}>
        <div className={style.nav}>
            <div className="nav__logo">
                <h1>
                    Monresto
                </h1>
            </div>
            
            <div className={style.nav__ul}>
                <ul>
                    <li>Accueil</li>
                    <li>Services</li>
                    <li>Restaurants</li>
                    <li>Blog</li>
                    <li>Contact</li>
                </ul>
            </div>
            
            <div className={style.nav__btn}>
                <Button color="primary" variant="solid">
                                Se connecter
                            </Button>
                                
                            <Button color="primary" variant="outlined">
                                S'inscrire
                            </Button>
            </div>
            
        </div>

        <div className="banniere__milieu">
            <p>Bienvenu sur Monresto</p>
            <p>La plateforme de reservation de restaurant</p>
            <p>Réserver votre table en ligne en toute simplicité</p>
            <p>Vous avez acces à une pléthore de restaurants pour tout type d'activités et d'ambiances</p>
        </div>
      </section>



    </div>
  );
}
export default Home;