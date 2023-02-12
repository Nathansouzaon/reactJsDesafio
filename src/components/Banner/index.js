import styles from './Banner.module.css';


function Banner({ imagem }) {
    return (
        <div className={styles.capa}
            style={{ backgroundImage: `url('/assets/banner-${imagem}.jpeg')` }}></div>
    )
}


export default Banner;