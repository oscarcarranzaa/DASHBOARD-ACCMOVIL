import ClientSVG from '@/components/icons/client'
import FunnnelSVG from '@/components/icons/funnel'
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
    urlKey: '/dash/producto',
    permissionKeys: [],
    items: [
      {
        name: 'Nuevo',
        href: '/dash/producto/nuevo',
        permissionKeys: ['posts.create'],
      },
      {
        name: 'Ver productos',
        href: '/dash/producto/',
        permissionKeys: [],
      },
      {
        name: 'Categorías',
        href: '/dash/producto/categorias',
        permissionKeys: ['posts.categoriesAllActions'],
      },
      {
        name: 'Atributos',
        href: '/dash/producto/atributos',
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
    name: 'Cliente Potencial',
    icon: <FunnnelSVG size={iconSize} />,
    urlKey: '/dash/pipe',
    permissionKeys: [],
    items: [
      {
        name: 'Prospectos',
        href: '/dash/pipe/leads',
        permissionKeys: [],
      },
      {
        name: 'Tratos',
        href: '/dash/pipe/deals',
        permissionKeys: [],
      },
    ],
  },
  {
    name: 'Clientes',
    icon: <TeamSVG size={iconSize} />,
    urlKey: '/dash/clientes',
    permissionKeys: ['users.add'],
    items: [
      {
        name: 'Clientes Web',
        href: '/dash/clientes',
        permissionKeys: ['team.view'],
      },
      {
        name: 'Contactos',
        href: '/dash/clientes/contactos',
        permissionKeys: [],
      },
    ],
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
        name: 'Puntos (Muy pronto)',
        href: '/dash/ofertas/puntos',
        permissionKeys: ['offers.points'],
      },
    ],
  },
]
