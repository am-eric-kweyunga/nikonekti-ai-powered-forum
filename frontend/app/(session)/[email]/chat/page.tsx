import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex flex-col container max-w-5xl mx-auto h-full">
      <header className="border-b py-4 px-6 flex items-center gap-4">
        <Avatar className="w-10 h-10 border">
          <AvatarImage src="/placeholder-user.jpg" alt="Mentor" />
          <AvatarFallback className='bg-blue-700/20 text-white animate-pulse'>JD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-medium">John Doe</h2>
          <p className="text-sm">Mentor</p>
        </div>
      </header>
      <div className="flex-1 overflow-auto p-6 grid gap-4">
        <div className="flex items-start gap-4">
          <Avatar className="w-8 h-8 border">
            <AvatarImage src="/placeholder-user.jpg" alt="Student" />
            <AvatarFallback className='bg-blue-700/20 text-white animate-pulse'>AS</AvatarFallback>
          </Avatar>
          <div className="bg-muted rounded-lg p-3 max-w-[75%]">
            <p className="font-medium">Student</p>
            <p className="text-sm">
              Hi John, Im struggling with the React project we discussed earlier. Could you please help me understand
              the issue Im facing?
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Avatar className="w-8 h-8 border">
            <AvatarImage src="/placeholder-user.jpg" alt="Student" />
            <AvatarFallback className='bg-blue-700/20 text-white animate-pulse'>AS</AvatarFallback>
          </Avatar>
          <div className="bg-muted rounded-lg p-3 max-w-[75%]">
            <p className="font-medium">Student</p>
            <p className="text-sm">
              Hi John, Im struggling with the React project we discussed earlier. Could you please help me understand
              the issue Im facing?
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Avatar className="w-8 h-8 border">
            <AvatarImage src="/placeholder-user.jpg" alt="Student" />
            <AvatarFallback className='bg-blue-700/20 text-white animate-pulse'>AS</AvatarFallback>
          </Avatar>
          <div className="bg-muted rounded-lg p-3 max-w-[75%]">
            <p className="font-medium">Student</p>
            <p className="text-sm">
              Hi John, Im struggling with the React project we discussed earlier. Could you please help me understand
              the issue Im facing?
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Avatar className="w-8 h-8 border">
            <AvatarImage src="/placeholder-user.jpg" alt="Student" />
            <AvatarFallback className='bg-blue-700/20 text-white animate-pulse'>AS</AvatarFallback>
          </Avatar>
          <div className="bg-muted rounded-lg p-3 max-w-[75%]">
            <p className="font-medium">Student</p>
            <p className="text-sm">
              Hi John, Im struggling with the React project we discussed earlier. Could you please help me understand
              the issue Im facing?
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Avatar className="w-8 h-8 border">
            <AvatarImage src="/placeholder-user.jpg" alt="Student" />
            <AvatarFallback className='bg-blue-700/20 text-white animate-pulse'>AS</AvatarFallback>
          </Avatar>
          <div className="bg-muted rounded-lg p-3 max-w-[75%]">
            <p className="font-medium">Student</p>
            <p className="text-sm">
              Hi John, Im struggling with the React project we discussed earlier. Could you please help me understand
              the issue Im facing?
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 justify-end">
          <div className="bg-primary rounded-lg p-3 max-w-[75%]">
            <p className="font-medium">John Doe</p>
            <p className="text-sm">
              Sure, let me take a look. Can you please share the code or describe the issue in more detail?
            </p>
          </div>
          <Avatar className="w-8 h-8 border">
            <AvatarImage src="/placeholder-user.jpg" alt="Mentor" />
            <AvatarFallback className='bg-blue-700/20 text-white animate-pulse'>JD</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex items-start gap-4">
          <Avatar className="w-8 h-8 border">
            <AvatarImage src="/placeholder-user.jpg" alt="Student" />
            <AvatarFallback className='bg-blue-700/20 text-white animate-pulse'>AS</AvatarFallback>
          </Avatar>
          <div className="bg-muted rounded-lg p-3 max-w-[75%]">
            <p className="font-medium">Student</p>
            <p className="text-sm">
              The issue is with the useEffect hook. It seems to be causing an infinite loop, and Im not sure why. Can
              you please take a look?
            </p>
          </div>
        </div>
      </div>
      <div className="bg-background border-t px-6 py-4 flex gap-4">
        <Input
          type="text"
          placeholder="Type your message..."
          className="flex-1 rounded-full px-4 py-2 bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <Button className="rounded-full px-4 py-2">Send</Button>
      </div>
    </div>
  )
}