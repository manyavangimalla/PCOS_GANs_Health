"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Send, ImageIcon, Smile } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
}

interface Post {
  id: string
  author: string
  avatar: string
  timestamp: string
  content: string
  category: string
  likes: number
  comments: Comment[]
  isLiked: boolean
}

export default function SharePage() {
  const [newPost, setNewPost] = useState("")
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "Sarah Johnson",
      avatar: "/smiling-woman.png",
      timestamp: "2 hours ago",
      content:
        "Just wanted to share my journey with managing PCOS through diet changes. I've been following a low-GI diet for 3 months now and my cycles have become more regular! Cutting out processed sugars and adding more whole grains has made such a difference. Anyone else had success with dietary changes?",
      category: "Diet & Nutrition",
      likes: 24,
      isLiked: false,
      comments: [
        {
          id: "c1",
          author: "Emily Chen",
          avatar: "/woman-profile.jpg",
          content: "That's amazing! I've been trying to do the same. What are your go-to meals?",
          timestamp: "1 hour ago",
        },
        {
          id: "c2",
          author: "Maria Garcia",
          avatar: "/woman-happy.jpg",
          content: "So inspiring! I'm going to try this approach too.",
          timestamp: "45 minutes ago",
        },
      ],
    },
    {
      id: "2",
      author: "Priya Sharma",
      avatar: "/indian-woman.jpg",
      timestamp: "5 hours ago",
      content:
        "Started incorporating spearmint tea into my daily routine after reading about its benefits for PCOS. It's been 6 weeks and I've noticed less facial hair growth! Also helps with my stress levels. Has anyone else tried natural remedies?",
      category: "Natural Remedies",
      likes: 18,
      isLiked: false,
      comments: [
        {
          id: "c3",
          author: "Lisa Anderson",
          avatar: "/blonde-woman.jpg",
          content: "I've been drinking spearmint tea too! It really does help.",
          timestamp: "3 hours ago",
        },
      ],
    },
    {
      id: "3",
      author: "Jessica Martinez",
      avatar: "/latina-woman.jpg",
      timestamp: "1 day ago",
      content:
        "Feeling grateful today! After 2 years of trying, I'm finally pregnant! 🎉 To anyone struggling with PCOS and fertility - don't give up. Working with my endocrinologist, making lifestyle changes, and staying positive made all the difference. Sending love to everyone on this journey.",
      category: "Success Stories",
      likes: 156,
      isLiked: true,
      comments: [
        {
          id: "c4",
          author: "Amanda White",
          avatar: "/woman-glasses.jpg",
          content: "Congratulations! This gives me so much hope! 💕",
          timestamp: "20 hours ago",
        },
        {
          id: "c5",
          author: "Rachel Kim",
          avatar: "/asian-woman.jpg",
          content: "So happy for you! What lifestyle changes helped the most?",
          timestamp: "18 hours ago",
        },
      ],
    },
    {
      id: "4",
      author: "Aisha Patel",
      avatar: "/woman-hijab.jpg",
      timestamp: "2 days ago",
      content:
        "Can we talk about the mental health aspect of PCOS? The anxiety and mood swings are real. I've started therapy and it's helping me cope better. Remember, it's okay to ask for help. Your mental health matters just as much as your physical health. 💚",
      category: "Mental Health",
      likes: 89,
      isLiked: false,
      comments: [
        {
          id: "c6",
          author: "Sophie Brown",
          avatar: "/woman-curly-hair.jpg",
          content: "Thank you for sharing this. I've been struggling with anxiety too.",
          timestamp: "1 day ago",
        },
      ],
    },
  ])

  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({})

  const handlePostSubmit = () => {
    if (!newPost.trim()) return

    const post: Post = {
      id: Date.now().toString(),
      author: "You",
      avatar: "/user-avatar.jpg",
      timestamp: "Just now",
      content: newPost,
      category: "General",
      likes: 0,
      isLiked: false,
      comments: [],
    }

    setPosts([post, ...posts])
    setNewPost("")
  }

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post,
      ),
    )
  }

  const handleComment = (postId: string) => {
    const commentText = commentInputs[postId]
    if (!commentText?.trim()) return

    const newComment: Comment = {
      id: Date.now().toString(),
      author: "You",
      avatar: "/user-avatar.jpg",
      content: commentText,
      timestamp: "Just now",
    }

    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, newComment],
            }
          : post,
      ),
    )

    setCommentInputs({ ...commentInputs, [postId]: "" })
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Diet & Nutrition": "bg-green-100 text-green-800 border-green-200",
      "Natural Remedies": "bg-purple-100 text-purple-800 border-purple-200",
      "Success Stories": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Mental Health": "bg-blue-100 text-blue-800 border-blue-200",
      Exercise: "bg-orange-100 text-orange-800 border-orange-200",
      General: "bg-gray-100 text-gray-800 border-gray-200",
    }
    return colors[category] || colors.General
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] to-[#FFEFEA]">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#6B4F4F] mb-2 font-serif">Share Your Thoughts</h1>
          <p className="text-[#8B6B61]">Connect with others, share experiences, and support each other</p>
        </div>

        {/* Create Post Card */}
        <Card className="mb-6 border-2 border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#6B4F4F]">What's on your mind?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Share your thoughts, experiences, or questions about PCOS, diet, nutrition, mental health, or women's wellness..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-[120px] resize-none border-primary/30 focus:border-primary"
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-[#8B6B61] hover:text-primary">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Photo
                </Button>
                <Button variant="ghost" size="sm" className="text-[#8B6B61] hover:text-primary">
                  <Smile className="h-4 w-4 mr-2" />
                  Feeling
                </Button>
              </div>
              <Button
                onClick={handlePostSubmit}
                disabled={!newPost.trim()}
                className="bg-[#E4AFAF] hover:bg-[#E4AFAF]/90 text-white shadow-md hover:shadow-lg transition-all"
              >
                <Send className="h-4 w-4 mr-2" />
                Post
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                {/* Post Header */}
                <div className="flex items-start gap-3 mb-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                    <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                      {post.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[#6B4F4F]">{post.author}</h3>
                      <Badge variant="outline" className={`text-xs ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#8B6B61]">{post.timestamp}</p>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-[#6B4F4F] mb-4 leading-relaxed whitespace-pre-wrap">{post.content}</p>

                {/* Post Actions */}
                <div className="flex items-center gap-6 py-3 border-t border-b border-primary/10">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={`gap-2 ${post.isLiked ? "text-red-500" : "text-[#8B6B61]"} hover:text-red-500`}
                  >
                    <Heart className={`h-5 w-5 ${post.isLiked ? "fill-red-500" : ""}`} />
                    <span className="font-medium">{post.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-[#8B6B61] hover:text-primary">
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">{post.comments.length}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-[#8B6B61] hover:text-primary">
                    <Share2 className="h-5 w-5" />
                    Share
                  </Button>
                </div>

                {/* Comments Section */}
                {post.comments.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3 bg-muted/30 p-3 rounded-lg">
                        <Avatar className="h-8 w-8 border border-primary/20">
                          <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                          <AvatarFallback className="bg-primary/20 text-primary text-xs">
                            {comment.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm text-[#6B4F4F]">{comment.author}</span>
                            <span className="text-xs text-[#8B6B61]">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm text-[#6B4F4F]">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Comment */}
                <div className="mt-4 flex gap-2">
                  <Avatar className="h-8 w-8 border border-primary/20">
                    <AvatarImage src="/user-avatar.jpg" alt="You" />
                    <AvatarFallback className="bg-primary/20 text-primary text-xs">You</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex gap-2">
                    <Textarea
                      placeholder="Write a comment..."
                      value={commentInputs[post.id] || ""}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      className="min-h-[40px] resize-none border-primary/30 focus:border-primary"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleComment(post.id)}
                      disabled={!commentInputs[post.id]?.trim()}
                      className="bg-[#E4AFAF] hover:bg-[#E4AFAF]/90 text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
