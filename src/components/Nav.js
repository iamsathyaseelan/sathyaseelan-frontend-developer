import {Fragment} from 'react';
import {Popover, Transition} from '@headlessui/react';
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const menuItems = [
  {
    name: 'Capsules',
    href: '#',
    icon: ChartBarIcon,
  },
  {
    name: 'Rockets',
    href: '#',
    icon: CursorArrowRaysIcon,
  },
  {
    name: 'Launching Pad',
    href: '#',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Missions',
    href: '#',
    icon: Squares2X2Icon,
  },
  {
    name: 'Land Pad',
    href: '#',
    icon: ArrowPathIcon,
  },
];

export default function Nav() {
  return (
      <Popover className="relative bg-white">
        <div className="px-4 sm:px-6">
          <div
              className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <div>
                <span className="sr-only">Your Company</span>
                <img
                    className="h-8 w-auto sm:h-10"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                />
              </div>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button
                  className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden space-x-10 md:flex">
              <Popover className="relative">
                {({open}) => (
                    <>
                      <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel
                            className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                          <div
                              className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                )}
              </Popover>
              {menuItems.map((item) => (
                  <a
                      key={item.name}
                      href={item.href}
                      className="text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
              ))}
            </Popover.Group>
          </div>
        </div>

        <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel focus
                         className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
            <div
                className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button
                        className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    {menuItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                        >
                          <item.icon
                              className="h-6 w-6 flex-shrink-0 text-indigo-600"
                              aria-hidden="true"/>
                          <span
                              className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                        </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
  );
}
