import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { getSession } from "@auth0/nextjs-auth0"
import { UserProfile } from "@auth0/nextjs-auth0/client"
import { getMyMentors } from "@/utils/actions"
import { ChevronRight, Plus, Search, Briefcase, GraduationCap, TrendingUp, MessageCircle } from "lucide-react"
import { SelectSeparator } from "@/components/ui/select"

export default async function CareerGuidanceDashboard() {
  const session = await getSession()
  const user: UserProfile | undefined = session?.user
  const mentors = await getMyMentors()

  return (
    <main className="flex-1 p-4 sm:p-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#1D58B0]">Welcome, {user?.name}</h1>
              <p className="text-gray-600">Your career journey starts here</p>
            </div>
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.picture || ''} alt={user?.name || 'User'} />
              <AvatarFallback className="bg-[#1D58B0] text-white">{user?.name?.[0] || 'U'}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Career Progress */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Career Progress</CardTitle>
              <TrendingUp className="h-5 w-5 text-[#1D58B0]" />
            </CardHeader>
            <SelectSeparator />
            <CardContent>
              <div className="space-y-4 py-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Skills Development</span>
                    <span className="text-sm font-medium text-[#1D58B0]">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Networking with mentors</span>
                    <span className="text-sm font-medium text-[#1D58B0]">60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Personal Training</span>
                    <span className="text-sm font-medium text-[#1D58B0]">80%</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Career Events</CardTitle>
              <GraduationCap className="h-5 w-5 text-[#1D58B0]" />
            </CardHeader>
            <SelectSeparator />
            <CardContent className="space-y-4">
              <div className="space-y-4 h-52 py-5 px-2 overflow-y-auto w-full">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium capitalize">Nikonekti Africa Scholarship Campain</h3>
                    <p className="text-sm text-gray-500">Virtual Event</p>
                  </div>
                  <Button variant="outline" size="sm">Join</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium capitalize">Umoja na ndoto zangu</h3>
                    <p className="text-sm text-gray-500">Online Webinar</p>
                  </div>
                  <Button variant="outline" size="sm">Register</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mentorship Groups */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Career Mentorship Groups</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Join Group
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link
                  href="#"
                  className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-3 hover:bg-gray-200 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-[#1D58B0] text-white">FD</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Frontend Developers</div>
                      <div className="text-sm text-gray-500">10 members</div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                </Link>
                <Link
                  href="#"
                  className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-3 hover:bg-gray-200 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-[#1D58B0] text-white">PM</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Product Managers</div>
                      <div className="text-sm text-gray-500">15 members</div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Personal Mentors */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Your Career Mentors</CardTitle>
              <Link href="/student/mentors">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Find Mentor
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mentors.map((mentor: any, index: number) => (
                  <Link
                    key={index}
                    href={`/student/messages?mentor=${mentor.email}`}	
                    className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-3 hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={mentor.image_path} alt={mentor.name} />
                        <AvatarFallback className="bg-[#1D58B0] text-white">
                          {mentor.name ? mentor.name.slice(0, 2) : 'M'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{mentor.name}</div>
                        <div className="text-sm text-gray-500">{mentor.email}</div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Career Community */}
        <Card className="mt-6">
          <CardHeader className="flex items-center justify-between py-6">
            <CardTitle className="text-2xl">Global Career Community</CardTitle>
            <Button variant="outline">
              <MessageCircle className="h-4 w-4 mr-2" />
              Join Discussion
            </Button>
          </CardHeader>
          <CardContent className="py-4">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-[#1D58B0] text-white">JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-gray-500">10:30 AM</div>
                  </div>
                  <div className="mt-1 text-gray-700">
                    Any tips for transitioning from frontend to full-stack development?
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-[#1D58B0] text-white">SA</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Sarah Adams</div>
                    <div className="text-sm text-gray-500">11:15 AM</div>
                  </div>
                  <div className="mt-1 text-gray-700">
                    Start with learning a backend language like Node.js and practice building APIs. It&apos;s a great first step!
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center gap-2 pt-4">
            <Input placeholder="Share your thoughts or ask a question..." className="flex-1" />
            <Button>Post</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}