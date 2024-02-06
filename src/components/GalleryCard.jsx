import { useEffect } from "react";
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/dist/photoswipe.css';
const getProductData = await fetch(`/api/info/products.json`);
const productData = await getProductData.json();

export default function GalleryCard() {
    useEffect(() => {
        const lightbox = new PhotoSwipeLightbox({
            gallery: '#gallery',
            children: 'a',
            pswpModule: () => import('photoswipe')
        });
        lightbox.init();
    }, []);

    return (
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 max-w-6xl gap-4 mx-auto py-20 pswp-gallery" id="gallery">
            {
                productData.products.map((product) => (
                    <a 
                        href={product.example} 
                        data-pswp-width="1875" 
                        data-pswp-height="2500" 
                        target="_blank"
                        class="rounded-xl shadow-xl shadow-sky-300/10 hover:shadow-2xl hover:shadow-sky-300/75 transition-all overflow-hidden hover:scale-110 m-5" 
                    >
                        <img src={product.example} class="w-full h-full"/>
                    </a>
                ))
            }
        </div>
    );
}

