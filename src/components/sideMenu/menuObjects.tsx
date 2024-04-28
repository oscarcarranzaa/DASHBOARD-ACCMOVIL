import ClientSVG from '../icons/client'
import MediaImageSVG from '../icons/mediaImage'
import MenuSquareSVG from '../icons/menuSquare'
import OfferSVG from '../icons/offer'
import OrdertSVG from '../icons/order'
import ProductSVG from '../icons/product'
import PublishSVG from '../icons/publish'
import TeamSVG from '../icons/team'
import WorldSVG from '../icons/world'
const iconSize = 22

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
        href: '/dash/pedidos/',
      },
      {
        name: 'Historial',
        href: '/dash/Pedidos/historial',
      },
      {
        name: 'Devoluciones',
        href: '/dash/pedidos/devoluciones',
      },
    ],
  },
  {
    name: 'Productos',
    icon: <ProductSVG size={iconSize} />,
    items: [
      {
        name: 'Agregar nuevos',
        href: '/dash/productos/nuevo',
      },

      {
        name: 'Ver productos',
        href: '/dash/productos/',
      },
      {
        name: 'Papelera',
        href: '/dash/productos/papelera',
      },
    ],
  },
  {
    name: 'Publicaciones',
    icon: <PublishSVG size={iconSize} />,
    items: [
      {
        name: 'Agregar nuevos',
        href: '/dash/publicaciones/nuevo',
      },
      {
        name: 'Ver publicaciones',
        href: '/dash/publicaciones/',
      },
      {
        name: 'Categorías',
        href: '/dash/publicaciones/categorias',
      },
      {
        name: 'Atributos',
        href: '/dash/publicaciones/atributos',
      },
      {
        name: 'Papelera',
        href: '/dash/publicaciones/papelera',
      },
    ],
  },
  {
    name: 'Multimedia',
    icon: <MediaImageSVG size={iconSize} />,
    href: '/dash/multimedia',
  },
  {
    name: 'Ofertas',
    icon: <OfferSVG size={iconSize} />,
    items: [
      {
        name: 'Ofertas',
        href: '/dash/ofertas/',
      },
      {
        name: 'Cupones',
        href: '/dash/ofertas/cupones',
      },
      {
        name: 'Descuentos',
        href: '/dash/ofertas/descuentos',
      },
      {
        name: 'Puntos',
        href: '/dash/ofertas/puntos',
      },
    ],
  },
  {
    name: 'Equipo',
    icon: <TeamSVG size={iconSize} />,
    href: '/dash/equipo',
  },
  {
    name: 'Clientes',
    icon: <ClientSVG size={iconSize} />,
    href: '/dash/clientes',
  },
  {
    name: 'Sitio',
    icon: <WorldSVG size={iconSize} />,
    items: [
      {
        name: 'Análisis',
        href: '/dash/sitio/analisis',
      },
      {
        name: 'Personalización',
        href: '/dash/sitio/personalizacion',
      },
      {
        name: 'Configuración',
        href: '/dash/sitio/configuracion',
      },
    ],
  },
]
