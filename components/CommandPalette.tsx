import { useState, useEffect } from 'react'
import { Dialog, Combobox } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/outline'
import type { User } from '@prisma/client'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useData } from 'context/useData'

export default function CommandPalette() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { users } = useData()

  useEffect(() => {
    const onKeydown = (event) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        setIsOpen(!isOpen)
      }
    }
    window.addEventListener('keydown', onKeydown)
    return () => {
      window.removeEventListener('keydown', onKeydown)
    }
  }, [isOpen])

  const filteredUsers: User[] = query
    ? users.filter((user) =>
        user.name?.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <Dialog
      open={isOpen}
      onClose={setIsOpen}
      className="fixed inset-0 overflow-y-auto p-4 pt-[25vh]"
    >
      <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
      <Combobox
        className="relative mx-auto max-w-xl divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5"
        as="div"
        onChange={(user) => {
          setIsOpen(false)
          router.push(`/users/${user.id}`)
        }}
        value={users.find((user) => user.id === router.query.id)}
      >
        <div className="flex items-center space-x-2 px-4">
          <SearchIcon className="h-6 w-6 text-gray-500" />
          <Combobox.Input
            onChange={(event) => setQuery(event.target.value)}
            className="h-12 w-full border-0 bg-transparent text-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-0"
            placeholder="Пошук..."
          />
        </div>
        {filteredUsers.length > 0 && (
          <Combobox.Options
            static
            className="max-h-96 overflow-y-auto py-4 text-sm"
          >
            {filteredUsers.map((user) => (
              <Combobox.Option key={user.id} value={user}>
                {({ active }) => (
                  <div
                    className={`flex items-center space-x-2 px-4 py-2 ${
                      active ? 'bg-indigo-600' : 'bg-white'
                    }`}
                  >
                    <span>
                      <Image
                        src={user.image}
                        alt="user image"
                        width={40}
                        height={40}
                        className="rounded-full"
                      ></Image>
                    </span>
                    <span
                      className={`text-xl font-medium text-gray-900 ${
                        active ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {user.name}
                    </span>
                  </div>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
        {query && filteredUsers.length === 0 && (
          <p className="p-4 text-sm text-gray-500">No results found.</p>
        )}
      </Combobox>
    </Dialog>
  )
}
