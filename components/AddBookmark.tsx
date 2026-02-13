'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AddBookmark({ user }: any) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addBookmark = async () => {
    if (!title || !url) return

    await supabase.from('bookmarks').insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ])

    setTitle('')
    setUrl('')
  }

return (
  <div className="space-y-4">
    <input
      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      placeholder="Bookmark Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    <input
      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      placeholder="https://example.com"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
    />
    <button
      onClick={addBookmark}
      className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition shadow-lg"
    >
      Add Bookmark
    </button>
  </div>
)

}
