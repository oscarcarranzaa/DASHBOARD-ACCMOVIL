import ClientSVG from '../icons/client'
import MediaImageSVG from '../icons/mediaImage'
import MenuSquareSVG from '../icons/menuSquare'
import OfferSVG from '../icons/offer'
import OrdertSVG from '../icons/order'
import ProductSVG from '../icons/product'
import PublishSVG from '../icons/publish'
import TeamSVG from '../icons/team'
import WorldSVG from '../icons/world'
const iconSize = 20

export const menuItems = [
  {
    name: 'Dashboard',
    icon: <MenuSquareSVG size={iconSize} />,
    href: '/dash',
  },
  {
    name: 'Pedidos',
    icon: <OrdertSVG size={iconSize} />,
    items: [
      {
        name: 'Ver pedidos',
        href: '/pedidos/',
      },
      {
        name: 'Historial',
        href: '/Pedidos/historial',
      },
      {
        name: 'Devoluciones',
        href: '/pedidos/devoluciones',
      },
    ],
  },
  {
    name: 'Productos',
    icon: <ProductSVG size={iconSize} />,
    items: [
      {
        name: 'Agregar nuevos',
        href: '/productos/nuevo',
      },

      {
        name: 'Ver productos',
        href: '/dash/productos/',
      },
      {
        name: 'Papelera',
        href: '/productos/papelera',
      },
    ],
  },
  {
    name: 'Publicaciones',
    icon: <PublishSVG size={iconSize} />,
    items: [
      {
        name: 'Agregar nuevos',
        href: '/publicaciones/nuevo',
      },
      {
        name: 'Ver publicaciones',
        href: '/publicaciones/',
      },
      {
        name: 'Categorías',
        href: '/publicaciones/categorias',
      },
      {
        name: 'Atributos',
        href: '/publicaciones/atributos',
      },
      {
        name: 'Papelera',
        href: '/publicaciones/papelera',
      },
    ],
  },
  {
    name: 'Multimedia',
    icon: <MediaImageSVG size={iconSize} />,
    href: '/multimedia',
  },
  {
    name: 'Ofertas',
    icon: <OfferSVG size={iconSize} />,
    items: [
      {
        name: 'Ofertas',
        href: '/ofertas/',
      },
      {
        name: 'Cupones',
        href: '/ofertas/cupones',
      },
      {
        name: 'Descuentos',
        href: '/ofertas/descuentos',
      },
      {
        name: 'Puntos',
        href: '/ofertas/puntos',
      },
    ],
  },
  {
    name: 'Equipo',
    icon: <TeamSVG size={iconSize} />,
    href: '/equipo',
  },
  {
    name: 'Clientes',
    icon: <ClientSVG size={iconSize} />,
    href: '/clientes',
  },
  {
    name: 'Sitio',
    icon: <WorldSVG size={iconSize} />,
    items: [
      {
        name: 'Análisis',
        href: '/sitio/analisis',
      },
      {
        name: 'Personalización',
        href: '/sitio/personalizacion',
      },
      {
        name: 'Configuración',
        href: '/sitio/configuracion',
      },
    ],
  },
]
