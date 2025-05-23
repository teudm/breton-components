import { ImageWidget } from "apps/admin/widgets.ts";

export interface BretonVersatilityCarouselProps {
  /** @title Título do Carrossel */
  title: string;
  
  /** @title Subtítulo do Carrossel */
  subtitle: string;
  
  /** @title Lista de Locais */
  places: PlaceProps[];

  /** @title Limite de Slides por página */
  limitPerPage?: number;
}

/** @title {{{cover.title}}} */
export interface PlaceProps {
  /** @title Tipo de Local */
  type: string;
  
  /** @title Capa do Local */
  cover: CoverSlideProps & CommonSlideProps;
  
  /** @title História do Local */
  history: HistorySlideProps;
  
  /** @title Slide Normal (Somente Imagens) */
  normalSlide: CommonSlideProps[];
  
  /** @title Slide de Produtos */
  productsSlide: ProductSlideProps;
}

export interface CommonSlideProps {
  /** @title Imagem para Desktop */
  desktopImage: CommonImageProps;
  
  /** @title Imagem para Mobile */
  mobileImage: CommonImageProps;
}

export interface CoverSlideProps {
  /** @title Título da Capa */
  title: string;
  
  /** @title Rótulo da Capa */
  label: string;

  /** @hide true */
  type?: string;

  /** @hide true */
  preload?: boolean;
}

export interface HistorySlideProps {
  /** @title Título da História */
  title: string;
  
  /** @title Subtítulo da História */
  subtitle: string;
  
  /** @title Tópicos da História */
  topics: TopicsSlideProps[];
}

export interface TopicsSlideProps {
  /** @title Título do Tópico */
  title: string;
  
  /** @title Texto do Tópico */
  text: string;
}

export interface OnlyImage {
  /** @title Imagem */
  image: ImageWidget;
  
  /** @title Texto Alternativo da Imagem */
  alt: string;
}

export interface CommonImageProps {
  /** @title Imagem */
  image: ImageWidget;
  
  /** @title Texto Alternativo da Imagem */
  alt: string;
  
  /** @title Largura da Imagem */
  width: number;
  
  /** @title Altura da Imagem */
  height: number;
}

export interface ProductSlideProps {
  /** @title Título do Slide de Produtos */
  title: string;
  
  /** @title Produtos do Slide */
  products: ProductsProps | CollectionProps;
  
  /** @title Ativação de Slides de produtos */
  /** @default True */  
  active: boolean;
}

export interface ProductsProps {
  /** @title IDs dos Produtos */
  /** @maximum 5 */
  productIds: string[];
}

export interface CollectionProps {
  /** @title ID da Coleção */
  collectionId: string;
}
