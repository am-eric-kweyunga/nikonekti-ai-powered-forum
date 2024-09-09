"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/navigation"

export default function Component() {

  const { user, error, isLoading } = useUser()
  const router = useRouter()

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 md:px-6 h-full">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={`${user?.picture}`} alt={`${user?.nickname}`} />
            <AvatarFallback className=" uppercase">{user?.name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Button variant={"outline"}>Edit Profile</Button>
          <Button variant={"outline"} onClick={() => {
            router.push("https://forumnikonekti.vercel.app/api/auth/logout")
          }}>Logout</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Commented on a post</p>
                <p className="text-muted-foreground text-sm">Great article, really helpful!</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Posted a new thread</p>
                <p className="text-muted-foreground text-sm">
                  Looking for recommendations on the best JavaScript\n framework
                </p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Replied to a comment</p>
                <p className="text-muted-foreground text-sm">Thanks for the feedback, Ill try that out!</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Bio</h2>
          <Textarea placeholder="Write your bio here..." className="w-full h-32 resize-none" />
        </section>
      </div>
    </div>
  )
}