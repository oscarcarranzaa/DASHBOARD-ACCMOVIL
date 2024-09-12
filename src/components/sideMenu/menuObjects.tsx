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
    urlKey: '/dash/dashboard',
    href: '/dash/dashboard',
  },
  {
    name: 'Pedidos',
    icon: <OrdertSVG size={iconSize} />,
    urlKey: '/dash/pedidos',
    items: [
      {
        name: 'Ver pedidos',
        href: '/dash/pedidos/',
        permissionKeys: ['order.view'],
      },
      {
        name: 'Historial',
        href: '/dash/pedidos/historial',
        permissionKeys: ['order.history'],
      },
    ],
  },
  {
    name: 'Productos',
    icon: <ProductSVG size={iconSize} />,
    urlKey: '/dash/productos',
    items: [
      {
        name: 'Nuevo',
        href: '/dash/productos/nuevo',
        permissionKeys: ['product.create'],
      },

      {
        name: 'Ver productos',
        href: '/dash/productos/',
        permissionKeys: ['product.view'],
      },
    ],
  },
  {
    name: 'Posts',
    icon: <PublishSVG size={iconSize} />,
    urlKey: '/dash/posts',
    items: [
      {
        name: 'Nuevo',
        href: '/dash/posts/nuevo',
        permissionKeys: ['posts.create'],
      },
      {
        name: 'Ver posts',
        href: '/dash/posts/',
      },
      {
        name: 'Categorías',
        href: '/dash/posts/categories',
        permissionKeys: ['posts.categoriesAllActions'],
      },
      {
        name: 'Atributos',
        href: '/dash/posts/atributos',
        permissionKeys: ['posts.attributesAllActions'],
      },
    ],
  },
  {
    name: 'Multimedia',
    icon: <MediaImageSVG size={iconSize} />,
    urlKey: '/dash/multimedia',
    href: '/dash/multimedia',
  },
  {
    name: 'Clientes',
    icon: <TeamSVG size={iconSize} />,
    urlKey: '/dash/clientes',
    href: '/dash/clientes',
  },
  {
    name: 'Usuarios',
    icon: <ClientSVG size={iconSize} />,
    urlKey: '/dash/usuarios',
    items: [
      {
        name: 'Usuarios',
        href: '/dash/usuarios',
      },
      {
        name: 'Roles',
        href: '/dash/usuarios/roles',
        permissionKeys: ['team.roles'],
      },
    ],
  },
  {
    name: 'Ofertas',
    icon: <OfferSVG size={iconSize} />,
    urlKey: '/dash/ofertas',
    items: [
      {
        name: 'Cupones',
        href: '/dash/ofertas/cupones',
        permissionKey: ['offers.coupons'],
      },
      {
        name: 'Descuentos',
        href: '/dash/ofertas/descuentos',
        permissionKey: ['offers.discounts'],
      },
      {
        name: 'Puntos',
        href: '/dash/ofertas/puntos',
        permissionKey: ['offers.points'],
      },
    ],
  },
  {
    name: 'Sitio',
    icon: <WorldSVG size={iconSize} />,
    urlKey: '/dash/sitio',
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
