'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function BookmarkList({ user }: any) {
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch bookmarks
  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (!error) {
      setBookmarks(data || [])
    }

    setLoading(false)
  }

  useEffect(() => {
    if (!user?.id) return

    fetchBookmarks()

    // Realtime subscription
    const channel = supabase
      .channel('bookmarks-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchBookmarks()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user?.id])

  const deleteBookmark = async (id: string) => {
    await supabase.from('bookmarks').delete().eq('id', id)
  }

  if (loading) {
    return (
      <p className="text-center text-gray-400 mt-6">
        Loading bookmarks...
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {bookmarks.length === 0 && (
        <p className="text-gray-400 text-center mt-6">
          No bookmarks yet. Add one above 🚀
        </p>
      )}

      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-xl shadow-md flex justify-between items-center hover:bg-white/10 transition"
        >
          <div className="space-y-1">
            <p className="font-semibold text-lg">
              {bookmark.title}
            </p>
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 text-sm hover:underline break-all"
            >
              {bookmark.url}
            </a>
          </div>

          <button
            onClick={() => deleteBookmark(bookmark.id)}
            className="text-red-400 hover:text-red-500 transition text-sm"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
