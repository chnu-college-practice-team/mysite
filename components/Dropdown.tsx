import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { LogoutIcon } from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Dropdown() {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <Menu as="div" className="relative flex h-12 w-24 items-center">
      <div className="group absolute right-1 w-full">
        <Menu.Button className="flex w-full items-center rounded-full bg-[#1A1A1A] px-4 py-3 text-sm font-medium text-white hover:bg-[#3E3E3E]">
          <ChevronDownIcon className="h-6 text-[#686868]" aria-hidden="true" />
          <Image
            src={user.image}
            width={44}
            height={44}
            alt="image"
            className="absolute -right-1 h-11 w-11 rounded-full object-cover"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-24 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-[#1A1A1A] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active && 'bg-white/10'
                  } group flex w-full cursor-default items-center rounded-md px-2 py-2 text-sm font-semibold tracking-wide text-white`}
                  onClick={() => signOut({ redirect: false })}
                >
                  <LogoutIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                  Log out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
