import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  GlobeIcon,
  HomeIcon,
  MenuIcon,
  PlusIcon,
  SearchIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  const { data: session } = useSession()

  return (
    <div className="sticky top-0 flex items-center bg-white px-4 py-2 shadow-sm z-50">
      <div className="relative z-50 h-10 w-20 flex-shrink-0 cursor-pointer ">
        <Link href='/'>
          <Image
            src={'https://links.papareact.com/fqy'}
            layout="fill"
            objectFit="contain"
            objectPosition="center"
          />
        </Link>
      </div>
      <div className="mx-7 flex items-center xl:w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      {/* serach */}
      <form className="flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-2">
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input
          className="flex-1 bg-transparent pl-1 outline-none"
          type="text"
          name="search"
          id="search"
          placeholder="Search"
        />
        <button hidden type="submit" />
      </form>
      {/* web */}
      <div className="mx-5 hidden items-center space-x-2 text-gray-500 lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>
      {/* mobile */}
      <div className="ml-5 flex items-center text-gray-500 lg:hidden">
        <MenuIcon className="icon" />
      </div>
      {/* sign in */}
      {!session && (
        <div
          className="hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex"
          onClick={() => signIn()}
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src="https://links.papareact.com/23l"
              layout="fill"
              objectFit="contain"
              alt=""
            />
          </div>
          <p className="text-gray-500">Sign in</p>
        </div>
      )}
      {/* sign out */}
      {session && (
        <div
          className="hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex"
          onClick={() => signOut()}
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src="https://links.papareact.com/23l"
              layout="fill"
              objectFit="contain"
              alt=""
            />
          </div>
          <div className="flex-1 text-xs">
            <p className="truncate text-gray-600">{session?.user?.name}</p>
            <p className="text-gray-400">1 Karma</p>
          </div>
          <ChevronDownIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
        </div>
      )}
    </div>
  )
}

export default Header
