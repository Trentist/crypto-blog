import { NextResponse } from 'next/server'
import { selectedPostIds } from '@/data/selected-posts'

export async function GET() {
  try {
    return NextResponse.json({ selectedPostIds })
  } catch (error) {
    console.error('Error reading selected posts:', error)
    return NextResponse.json(
      { error: 'Failed to read selected posts' },
      { status: 500 }
    )
  }
}

