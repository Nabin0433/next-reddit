import { useSession } from 'next-auth/react'
import Image from 'next/image';
import React from 'react'

type Props = {
    seed?: string,
    larger?: boolean
}

const Avatar = ({ seed, larger }: Props) => {
    const { data: session } = useSession();
    return (
        <div className={`relative h-10 w-10 overflow-hidden rounded-full border-gray-300 bg-white ${larger && "w-20 h-20"}`}>
            <Image src={session?.user?.image ?? `https://avatars.dicebear.com/api/open-peeps/${seed ?? session?.user?.name ?? session?.user?.email ?? 'placeholder'}.svg`}
                layout='fill' objectPosition='center' objectFit='contain' />
        </div>
    )
}

export default Avatar