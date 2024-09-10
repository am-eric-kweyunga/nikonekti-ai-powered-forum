import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { JSX, SVGProps } from "react"
import { getSession } from "@auth0/nextjs-auth0"
import { UserProfile } from "@auth0/nextjs-auth0/client"

export default async function Component() {
  const session = await getSession()

  const user: UserProfile | undefined = session?.user

  return (
    <main className="flex-1 p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Mentorship Groups */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Mentorship Groups</CardTitle>
            <Button variant="outline" size="sm">
              <PlusIcon className="h-4 w-4" />
              Join Mentorship Groups
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link
                href="#"
                className="flex items-center justify-between rounded-md bg-gray-100 px-3 py-2 hover:bg-gray-200"
                prefetch={false}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-blue-700 text-white">
                    <AvatarFallback className='bg-blue-700/20 text-white animate-pulse'>GC</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Frontend Developers</div>
                    <div className="text-sm text-gray-500">10 members</div>
                  </div>
                </div>
                <ChevronRightIcon className="h-5 w-5 text-gray-500" />
              </Link>
            </div>
          </CardContent>
        </Card>
        {/* Mentorship Individuals */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Personal Mentors</CardTitle>
            <Button variant="outline" size="sm">
              <PlusIcon className="h-4 w-4" />
              Find Mentor
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link
                href={`/${user?.email}/chat`}
                className="flex items-center justify-between rounded-md bg-gray-100 px-3 py-2 hover:bg-gray-200"
                prefetch={false}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-blue-700 text-white">
                    <AvatarFallback className='bg-blue-700/20 text-white animate-pulse'>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-gray-500">Frontend Developer</div>
                  </div>
                </div>
                <ChevronRightIcon className="h-5 w-5 text-gray-500" />
              </Link>
            </div>
          </CardContent>
        </Card>


        {/* Global Mentorship Community */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="flex items-center justify-between py-10">
            <CardTitle className="text-2xl text-center py-2">Global Mentorship Community</CardTitle>
            <div className="flex flex-col items-center gap-2 w-full">
              <Button variant="outline" size="sm">
                Request to join
              </Button>
            </div>
          </CardHeader>
          <div className="w-full h-[1px] bg-black/10" ></div>
          <CardContent className="py-10">
            <div className="space-y-8">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 bg-blue-700 text-white">
                  <AvatarFallback className='bg-blue-700/20 text-white animate-pulse'>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-gray-500">10:30 AM</div>
                  </div>
                  <div className="mt-1 text-gray-700">
                    Hey everyone, I have a question about the new design system. Can someone help me out?
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 bg-blue-700 text-white">
                  <AvatarFallback className='bg-blue-700/20 text-white animate-pulse'>JA</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Jane Appleseed</div>
                    <div className="text-sm text-gray-500">11:15 AM</div>
                  </div>
                  <div className="mt-1 text-gray-700">
                    Sure, John. Id be happy to help. What specific questions do you have?
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 bg-blue-700 text-white">
                  <AvatarFallback className='bg-blue-700/20 text-white animate-pulse'>SM</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Sarah Michaels</div>
                    <div className="text-sm text-gray-500">11:30 AM</div>
                  </div>
                  <div className="mt-1 text-gray-700">
                    Hey guys, I just pushed an update to the design system. Let me know if you have any issues with
                    it.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          {/* <CardFooter className="flex items-center gap-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button>Send</Button>
              </CardFooter> */}
        </Card>
      </div>
    </main>
  )
}
function ChevronRightIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}


function HomeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function MoveHorizontalIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  )
}


function PlusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function SettingsIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}


function WebcamIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="10" r="8" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 22h10" />
      <path d="M12 22v-4" />
    </svg>
  )
}