// import React from 'react'

// const navigation = [
//     { name: 'Dashboard', href: '#', current: false },
//     { name: 'Team', href: '#', current: false },
//     { name: 'Projects', href: '#', current: false },
//     { name: 'Calendar', href: '#', current: false },
//     { name: 'Reports', href: '#', current: false },
//   ]
// function classNames(...classes: string[]): string {
//     return classes.filter(Boolean).join(' ')
// }
// function MainMenu() {
//   return (
//     <div className="hidden md:block">
//         <div className="ml-10 flex items-baseline space-x-4">
//         {navigation.map((item) => (
//             <a
//             key={item.name}
//             href={item.href}
//             aria-current={item.current ? 'page' : undefined}
//             className={classNames(
//                 item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                 'rounded-md px-3 py-2 text-sm font-medium',
//             )}
//             >
//             {item.name}
//             </a>
//         ))}
//         </div>
//     </div>
//   )
// }

// export default MainMenu