'use server'
import { client } from '@/sanity/lib/client'
import { ADDRESSES_QUERY } from '@/sanity/queries/query'
import { currentUser } from '@clerk/nextjs/server'

const getMyAddresses = async () => {
  const user = await currentUser()
  const email = user?.emailAddresses[0]?.emailAddress
  if (!email) return []
  return client.fetch(ADDRESSES_QUERY, { userEmail: email })

}

export default getMyAddresses