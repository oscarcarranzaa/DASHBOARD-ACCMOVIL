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
    disabled: false,
    permissionKeys: ['order.view'],
    items: [
      {
        name: 'Nuevo pedido',
        href: '/dash/pedidos/nuevo',
        permissionKeys: ['order:create'],
      },
      {
        name: 'Ver pedidos',
        href: '/dash/pedidos/',
        permissionKeys: ['order:view'],
      },
    ],
  },
  {
    name: 'Productos',
    icon: <ProductSVG size={iconSize} />,
    urlKey: '/dash/producto',
    permissionKeys: ['product.view'],
    disabled: false,
    items: [
      {
        name: 'Nuevo',
        href: '/dash/producto/nuevo',
        permissionKeys: ['product:create'],
      },
      {
        name: 'Ver productos',
        href: '/dash/producto/',
        permissionKeys: ['product:view'],
      },
      {
        name: 'Categorías',
        href: '/dash/producto/categorias',
        permissionKeys: ['product:categories'],
      },
      {
        name: 'Atributos',
        href: '/dash/producto/atributos',
        permissionKeys: ['product:attributes'],
      },
    ],
  },
  {
    name: 'Multimedia',
    icon: <MediaImageSVG size={iconSize} />,
    disabled: false,
    urlKey: '/dash/multimedia',
    href: '/dash/multimedia',
  },
  {
    name: 'Cliente Potencial',
    icon: <FunnnelSVG size={iconSize} />,
    urlKey: '/dash/embudo',
    href: '/dash/embudo',
    permissionKeys: ['leads:view'],
  },
  {
    name: 'Contactos',
    disabled: true,
    icon: <SquareUser size={iconSize} />,
    urlKey: '/dash/clientes/contactos',
    href: '/dash/clientes/contactos',
    permissionKeys: ['contacts:view'],
  },
  {
    name: 'Clientes',

    icon: <TeamSVG size={iconSize} />,
    urlKey: '/dash/clientes',
    permissionKeys: ['users.view'],
    items: [
      {
        name: 'Clientes',
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
    name: 'Colaboradores',
    icon: <ClientSVG size={iconSize} />,
    urlKey: '/dash/usuarios',
    href: '/dash/usuarios',
    isOwner: true,
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
    isOwner: true,
    items: [
      {
        name: 'General',
        href: '/dash/settings',
        permissionKeys: [],
      },
      {
        name: 'Tienda en línea',
        href: '/dash/settings',
        permissionKeys: [],
      },
      {
        name: 'Sucursales',
        href: '/dash/settings',
        permissionKeys: [],
      },
      {
        name: 'Pagos',
        href: '/dash/settings',
        permissionKeys: [],
      },
      {
        name: 'Integraciones',
        href: '/dash/settings',
        permissionKeys: [],
      },
      {
        name: 'Envíos',
        href: '/dash/settings',
        permissionKeys: [],
      },
      {
        name: 'Clientes potenciales',
        href: '/dash/settings',
        permissionKeys: [],
      },
      {
        name: 'Impuestos y facturación',
        href: '/dash/settings',
        permissionKeys: [],
      },
      {
        name: 'Seguridad y sistema',
        href: '/dash/settings',
        permissionKeys: [],
      },
      {
        name: 'Notificaciones',
        href: '/dash/settings',
        permissionKeys: [],
      },
    ],
    permissionKeys: [],
  },
]
