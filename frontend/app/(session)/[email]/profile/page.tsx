"use client"
import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Select, SelectItem, SelectTrigger, SelectContent, SelectLabel, SelectGroup } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from '@/components/ui/label'

export default function StudentProfile() {
  const { user } = useUser()
  const router = useRouter()

  // States to collect form data
  const [bio, setBio] = React.useState("")
  const [educationLevel, setEducationLevel] = React.useState("")
  const [institution, setInstitution] = React.useState("")
  const [subjects, setSubjects] = React.useState("")
  const [careerInterest, setCareerInterest] = React.useState("")
  const [dreamJob, setDreamJob] = React.useState("")
  const [softSkills, setSoftSkills] = React.useState("")
  const [mentorshipHelp, setMentorshipHelp] = React.useState("")
  const [goals, setGoals] = React.useState("")
  const [profileVisibility, setProfileVisibility] = React.useState(false)

  // Errors state to manage validation
  const [errors, setErrors] = React.useState({
    bio: false,
    educationLevel: false,
    institution: false,
    subjects: false,
    careerInterest: false,
    dreamJob: false,
    softSkills: false,
    mentorshipHelp: false,
    goals: false,
  })

  // Validate form data
  const validateForm = () => {
    const newErrors = {
      bio: bio === "",
      educationLevel: educationLevel === "",
      institution: institution === "",
      subjects: subjects === "",
      careerInterest: careerInterest === "",
      dreamJob: dreamJob === "",
      softSkills: softSkills === "",
      mentorshipHelp: mentorshipHelp === "",
      goals: goals === "",
    }
    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  // Handle form submission (collect and process the form data)
  const handleFormSubmit = async () => {
    if (validateForm()) {
      const studentProfileData = {
        email : user?.email,
        bio,
        educationLevel,
        institution,
        subjects,
        careerInterest,
        dreamJob,
        softSkills,
        mentorshipHelp,
        goals,
        profileVisibility,
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/update_student`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentProfileData),
      });

      const response = await res.json();

      if (response.status !== "success" && response.authorization === 'UnAuthorized') {
        console.error("Error:", response.message);
      } else {
        console.log("Student profile data saved successfully:", response);
        router.push(`/${user?.email}`)
      }
    }
  }

  const inputClass = (error: boolean) => error ? 'border-red-500' : ''

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 md:px-6 h-full">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={`${user?.picture}`} alt={`${user?.nickname}`} />
            <AvatarFallback className='bg-blue-700/20 text-white animate-pulse uppercase'>
              {user?.name ? user?.name.slice(0, 2) : <>U</>}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Button variant={"outline"}>Edit Profile</Button>
          <Button variant={"outline"} onClick={() => router.push("/api/auth/logout")}>Logout</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Recent Activities Section */}
        <section className="w-full border rounded-lg hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-bold p-4 border-b">Recent Activities</h2>
          <div className="space-y-4 p-4 overflow-auto max-h-96">
            {/* Example Activity */}
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback className='bg-blue-700/20 text-white animate-pulse'>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">Commented on a post</p>
                <p className="text-muted-foreground text-xs">Great article, really helpful!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bio Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Bio</h2>
          <Textarea
            placeholder="Write your bio here..."
            className={`w-full h-32 resize-none ${inputClass(errors.bio)}`}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </section>

        {/* Education and Career Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Education & Career</h2>
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="educationLevel">Education Level</Label>
              <Input
                id="educationLevel"
                placeholder="e.g., O-Level, A-Level, University"
                className={inputClass(errors.educationLevel)}
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="institution">Institution</Label>
              <Input
                id="institution"
                placeholder="Enter your institution's name"
                className={inputClass(errors.institution)}
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="subjects">Subjects</Label>
              <Input
                id="subjects"
                placeholder="e.g., Science, Business, Arts"
                className={inputClass(errors.subjects)}
                value={subjects}
                onChange={(e) => setSubjects(e.target.value)}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="careerInterest">Career Interest</Label>
              <Input
                id="careerInterest"
                placeholder="e.g., Engineering, Medicine, Business"
                className={inputClass(errors.careerInterest)}
                value={careerInterest}
                onChange={(e) => setCareerInterest(e.target.value)}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="dreamJob">Dream Job</Label>
              <Input
                id="dreamJob"
                placeholder="e.g., Software Engineer, Doctor, CEO"
                className={inputClass(errors.dreamJob)}
                value={dreamJob}
                onChange={(e) => setDreamJob(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Skills</h2>
          <div className="space-y-4">
            <Textarea
              placeholder="Add your skills here... i.e. Communication, leadership, teamwork..."
              className={`w-full h-32 resize-none ${inputClass(errors.softSkills)}`}
              value={softSkills}
              onChange={(e) => setSoftSkills(e.target.value)}
            />
          </div>
        </section>

        {/* Mentorship Needs Section */}
        <section className="mb-5 flex flex-col gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="mentorshipHelp">Mentorship Needs</Label>
            <Textarea
              id="mentorshipHelp"
              placeholder="What do you need help with?"
              className={`w-full h-32 resize-none ${inputClass(errors.mentorshipHelp)}`}
              value={mentorshipHelp}
              onChange={(e) => setMentorshipHelp(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="goals">Goals</Label>
            <Textarea
              id="goals"
              placeholder="Your short-term and long-term goals"
              className={`w-full h-24 resize ${inputClass(errors.goals)}`}
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
            />
          </div>
        </section>

        {/* Privacy Settings Section */}
        <section>
          <div className='py-4'>
            <h2 className="text-xl font-bold mb-4">Privacy Settings</h2>
            <div className="flex items-center justify-between">
              <label htmlFor="profile-visibility" className="font-medium">Profile Visibility</label>
              <Switch
                id="profile-visibility"
                checked={profileVisibility}
                onCheckedChange={() => setProfileVisibility(!profileVisibility)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <section className="col-span-full">
            <Button variant={"secondary"} className='bg-blue-700/55 hover:bg-blue-700/45 text-white' onClick={handleFormSubmit}>Save Profile</Button>
          </section>
        </section>

      </div>
    </div>
  )
}