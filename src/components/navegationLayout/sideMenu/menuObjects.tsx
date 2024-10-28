import ClientSVG from '@/components/icons/client'
import MediaImageSVG from '@/components/icons/mediaImage'
import MenuSquareSVG from '@/components/icons/menuSquare'
import OfferSVG from '@/components/icons/offer'
import OrdertSVG from '@/components/icons/order'
import ProductSVG from '@/components/icons/product'
import PublishSVG from '@/components/icons/publish'
import TeamSVG from '@/components/icons/team'
import WorldSVG from '@/components/icons/world'
const iconSize = 20

export const menuItems = [
  {
    name: 'Dashboard',
    icon: <MenuSquareSVG size={iconSize} />,
    urlKey: '/dash/dashboard',
    href: '/dash/dashboard',
    permissionKeys: [],
  },
  {
    name: 'Pedidos',
    icon: <OrdertSVG size={iconSize} />,
    urlKey: '/dash/pedidos',
    permissionKeys: [],
    items: [
      {
        name: 'Nuevo pedido',
        href: '/dash/pedidos/nuevo',
        permissionKeys: ['order.create'],
      },
      {
        name: 'Ver pedidos',
        href: '/dash/pedidos/',
        permissionKeys: ['order.view'],
      },
    ],
  },
  {
    name: 'Productos',
    icon: <ProductSVG size={iconSize} />,
    urlKey: '/dash/productos',
    permissionKeys: [],
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
    permissionKeys: [],
    items: [
      {
        name: 'Nuevo',
        href: '/dash/posts/nuevo',
        permissionKeys: ['posts.create'],
      },
      {
        name: 'Ver posts',
        href: '/dash/posts/',
        permissionKeys: [],
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
    permissionKeys: ['users.add'],
  },
  {
    name: 'Usuarios',
    icon: <ClientSVG size={iconSize} />,
    urlKey: '/dash/usuarios',
    permissionKeys: [],
    items: [
      {
        name: 'Usuarios',
        href: '/dash/usuarios',
        permissionKeys: ['team.view'],
      },
      {
        name: 'Roles',
        href: '/dash/usuarios/roles',
        permissionKeys: ['admin'],
      },
    ],
  },
  {
    name: 'Ofertas',
    icon: <OfferSVG size={iconSize} />,
    urlKey: '/dash/ofertas',
    permissionKeys: [],
    items: [
      {
        name: 'Cupones',
        href: '/dash/ofertas/cupones',
        permissionKeys: ['offers.coupons'],
      },
      {
        name: 'Descuentos',
        href: '/dash/ofertas/descuentos',
        permissionKeys: ['offers.discounts'],
      },
      {
        name: 'Puntos',
        href: '/dash/ofertas/puntos',
        permissionKeys: ['offers.points'],
      },
    ],
  },
  {
    name: 'Sitio',
    icon: <WorldSVG size={iconSize} />,
    urlKey: '/dash/sitio',
    permissionKeys: [],
    items: [
      {
        name: 'Análisis',
        href: '/dash/sitio/analisis',
        permissionKeys: [],
      },
      {
        name: 'Personalización',
        href: '/dash/sitio/personalizacion',
        permissionKeys: [],
      },
      {
        name: 'Configuración',
        href: '/dash/sitio/configuracion',
        permissionKeys: [],
      },
    ],
  },
]
