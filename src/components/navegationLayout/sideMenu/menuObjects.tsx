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
import { Settings, SquareUser } from 'lucide-react'
const iconSize = 20

export const menuItems = [
  {
    name: 'Dashboard',
    icon: <MenuSquareSVG size={iconSize} />,
    urlKey: '/dash/dashboard',
    href: '/dash/dashboard',
    disabled: false,
    permissionKeys: [],
  },
  {
    name: 'Pedidos',
    icon: <OrdertSVG size={iconSize} />,
    urlKey: '/dash/pedidos',
    disabled: true,
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
    disabled: true,
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
    disabled: true,
    urlKey: '/dash/multimedia',
    href: '/dash/multimedia',
  },
  {
    name: 'Cliente Potencial',
    icon: <FunnnelSVG size={iconSize} />,
    urlKey: '/dash/embudo',
    href: '/dash/embudo',
    permissionKeys: [],
  },
  {
    name: 'Contactos',
    icon: <SquareUser size={iconSize} />,
    urlKey: '/dash/clientes/contactos',
    href: '/dash/clientes/contactos',
    permissionKeys: [],
  },
  {
    name: 'Clientes',
    disabled: true,
    icon: <TeamSVG size={iconSize} />,
    urlKey: '/dash/clientes',
    permissionKeys: ['users.add'],
    items: [
      {
        name: 'Contactos',
        href: '/dash/clientes/contactos',
        permissionKeys: [],
      },
      {
        name: 'Clientes',
        href: '/dash/clientes',
        permissionKeys: ['team.view'],
      },
    ],
  },
  {
    name: 'Usuarios',
    icon: <ClientSVG size={iconSize} />,
    urlKey: '/dash/usuarios',
    href: '/dash/usuarios',
    permissionKeys: [],
  },
  {
    name: 'Ofertas',
    icon: <OfferSVG size={iconSize} />,
    urlKey: '/dash/ofertas',
    permissionKeys: [],
    disabled: true,
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
  {
    name: 'Configuración',
    icon: <Settings size={iconSize} />,
    urlKey: '/dash/settings',
    href: '/dash/settings',
    permissionKeys: [],
  },
]
