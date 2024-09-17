"use client"
import Loading from "@/components/custom/loading";
import NavigationBar from "@/components/mentors/navigation-bar"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Guardian from "@/utils/mentor/guardian";

export default function Mentor() {

    return (
        <Guardian>
            <div className="flex flex-col min-h-[100dvh] bg-white text-black">

                {/* navigation bar */}
                <NavigationBar />

                {/* profile */}
                <div className="flex-1 grid grid-cols-3 gap-4 p-6">
                    <div className="col-span-1 bg-white rounded-lg border">
                        <h2 className="text-lg font-medium mb-4 p-5 border-b">My Profile</h2>
                        <div className="p-4">
                            <div className="flex items-center gap-4 mb-4">
                                <Avatar className="shrink-0">
                                    <AvatarImage src="/placeholder-user.jpg" alt="Mentor" />
                                    <AvatarFallback>M</AvatarFallback>
                                </Avatar>
                                <div className="text-sm">
                                    <div className="font-medium ">John Doe</div>
                                    <div className="text-muted-foreground text-xs">Mentor</div>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <div className="flex flex-col gap-1">
                                    <div className="text-muted-foreground text-sm">Email</div>
                                    <div className="text-xs">john@example.com</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-muted-foreground text-sm">Expertise</div>
                                    <div className="text-xs">Software Engineering, UI/UX Design</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-muted-foreground text-sm">Bio</div>
                                    <div className="text-xs">
                                        I&apos;m a seasoned mentor with over 10 years of experience in the tech industry. I&apos;m passionate about
                                        helping students achieve their career goals.
                                    </div>
                                </div>
                                <Button variant={'outline'} className="w-full !text-sm mt-10">Edit Profile</Button>
                            </div>
                        </div>
                    </div>

                    {/* Connections */}
                    <div className="col-span-2 bg-white rounded-lg  border">

                        <h2 className="text-lg font-medium mb-4 p-5 border-b">Connections</h2>

                        <div className="grid gap-4 p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Avatar className="shrink-0">
                                        <AvatarImage src="/placeholder-user.jpg" alt="Student" />
                                        <AvatarFallback>S</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium text-sm">Jane Doe</div>
                                        <div className="text-muted-foreground text-xs">Software Engineering</div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" className="text-xs">Chat</Button>
                                    <Button className="text-xs bg-blue-700 hover:bg-blue-500  transition-colors ease-linear duration-100">Connect</Button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Avatar className="shrink-0">
                                        <AvatarImage src="/placeholder-user.jpg" alt="Student" />
                                        <AvatarFallback>S</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium text-sm">Sarah Lee</div>
                                        <div className="text-muted-foreground text-xs">Data Science</div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" className="text-xs">Chat</Button>
                                    <Button className="text-xs bg-blue-700 hover:bg-blue-500  transition-colors ease-linear duration-100">Connect</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Guardian>
    )
}