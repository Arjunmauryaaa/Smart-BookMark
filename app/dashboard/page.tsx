
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import AddBookmark from '@/components/AddBookmark'
import BookmarkList from '@/components/BookmarkList'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/')
      } else {
        setUser(data.user)
      }
    })
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (!user) return null

 return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-6 py-10">
    <div className="max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          My Bookmarks
        </h1>
        <button
          onClick={logout}
          className="text-sm px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {/* Add Bookmark */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-lg mb-8">
        <AddBookmark user={user} />
      </div>

      {/* Bookmark List */}
      <BookmarkList user={user} />
    </div>
  </div>
)

}
