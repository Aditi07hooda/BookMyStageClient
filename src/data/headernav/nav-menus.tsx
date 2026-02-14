import { NavMenuItem } from "@/interFace/interFace";

const nav_menus_list:NavMenuItem[] = [
  // {id:1,
  //   link: '/',
  //   title: 'Home',
  //   hasDropdown: true,
  //   megamenu: false,
  //   dropdownItems: [
  //     { link: '/', title: 'Home Style 01' },
  //     { link: '/home-two', title: 'Home Style 02' },
  //     { link: '/home-three', title: 'Home Style 03' },
  //   ]
  // },
  // commenting services and shop from navbar
  // {id:1,
  //   link: '',
  //   title: 'Services',
  //   hasDropdown: true,
  //   megamenu: false,
  //   dropdownItems: [
  //     { link: '/repair', title: 'Repair' },
  //     { link: '/customize', title: 'Customize' },
  //     { link: '/donate', title: 'Donate' },
  //   ]
  // },
  // {id:2,
  //   link: '',
  //   title: 'Shop',
  //   hasDropdown: true,
  //   megamenu: false,
  //   dropdownItems: [
  //     { link: '/shop', title: 'Shop' },
  //     { link: '/wishlist', title: 'Wishlist' },
  //     { link: '/cart', title: 'Cart' },
  //     { link: '/checkout', title: 'Checkout' },
  //     {
  //       link: '/track-order',
  //       title: 'Track Order',
  //     },
  //   ]
  // },
  {id:2,
    link: '/shop',
    title: 'Performances',
    dropdownItems: []
  },
  {
    id:3,
    link: '/shop',
    title: 'Age Categories',
    hasDropdown: false,
    megamenu: false,
    dropdownItems: []
  },
  {id:4,
    link: '/blog',
    title: 'Blog',
    dropdownItems: []
  },
  {id:5,
    link: '/about',
    title: 'About Us',
    dropdownItems: []
  },
  {id:6,
    link: '/contact',
    title: 'Contact',
    dropdownItems: []
  },
  
]

export default nav_menus_list;