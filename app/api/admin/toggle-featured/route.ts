import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'selected-posts.ts')

function readSelectedPosts(): string[] {
  try {
    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8')
    // Extract the array from the TypeScript file
    const match = fileContent.match(/export const selectedPostIds: string\[\] = \[([\s\S]*?)\]/)
    if (match) {
      const arrayContent = match[1]
      // Parse the post IDs from the array
      const ids = arrayContent
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('"') || line.startsWith("'"))
        .map(line => line.replace(/[",]/g, '').trim())
        .filter(id => id.length > 0)
      return ids
    }
  } catch (error) {
    console.error('Error reading selected posts:', error)
  }
  return []
}

function writeSelectedPosts(postIds: string[]) {
  const content = `// Selected post IDs - posts that will be visible on the blog
export const selectedPostIds: string[] = [
${postIds.map(id => `  "${id}",`).join('\n')}
]
`
  fs.writeFileSync(DATA_FILE, content, 'utf-8')
}

export async function POST(request: NextRequest) {
  try {
    const { postId, featured } = await request.json()

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }

    const selectedPosts = readSelectedPosts()

    if (featured) {
      // Add to selected posts if not already there
      if (!selectedPosts.includes(postId)) {
        selectedPosts.push(postId)
      }
    } else {
      // Remove from selected posts
      const index = selectedPosts.indexOf(postId)
      if (index > -1) {
        selectedPosts.splice(index, 1)
      }
    }

    writeSelectedPosts(selectedPosts)

    return NextResponse.json({ success: true, featured })
  } catch (error) {
    console.error('Error toggling featured status:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

