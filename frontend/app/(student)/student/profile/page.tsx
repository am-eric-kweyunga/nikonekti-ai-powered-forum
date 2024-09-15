"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { useToast } from "@/hooks/use-toast"
import { Circle, Loader2, Edit3, Save, X, LogOut, Trash2, UserPlus, BookOpen, Briefcase, Target, Shield } from 'lucide-react'
import { fetchStudent, getMyMentors } from '@/utils/actions'
import Loading from '@/components/custom/loading'
import Error500 from '@/components/errors/500'
import Link from 'next/link'

export interface Student {
  name?: string;
  email?: string;
  bio?: string;
  educationLevel?: string;
  institution?: string;
  subjects?: string;
  careerInterest?: string;
  dreamJob?: string;
  softSkills?: string;
  mentorshipHelp?: string;
  goals?: string;
  profileVisibility?: boolean;
}

export default function EnhancedStudentProfile() {
  const { user, isLoading, error } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  const [deleteLoading, setDeleteLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [logoutLoading, setLogoutLoading] = useState(false)
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [isMyMentorLoading, setIsMyMentorLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [deleteEmail, setDeleteEmail] = useState("")
  const [activeSection, setActiveSection] = useState("bio")

  const [studentProfileData, setStudentProfileData] = useState<Student>({
    name: user?.name as string,
    email: user?.email as string,
    bio: "",
    educationLevel: "",
    institution: "",
    subjects: "",
    careerInterest: "",
    dreamJob: "",
    softSkills: "",
    mentorshipHelp: "",
    goals: "",
    profileVisibility: false,
  })

  const [errors, setErrors] = useState({
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

  const fetchStudentData = async ({ user }: { user: any }) => {
    if (user?.email) {
      const response = await fetchStudent()
      if (response.status === 'success') {
        setStudentProfileData({
          ...studentProfileData,
          name: response.student.name,
          email: response.student.email,
          bio: response.student.bio,
          educationLevel: response.student.education_level,
          institution: response.student.institution,
          subjects: response.student.subjects,
          careerInterest: response.student.career_interest,
          dreamJob: response.student.dream_job,
          softSkills: response.student.soft_skills,
          mentorshipHelp: response.student.mentorship_help,
          goals: response.student.goals,
          profileVisibility: response.student.profile_visibility,
        })
      } else if (response.status === 'error') {
        setEditMode(false)
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        })
      }
    }
  }

  const handleGetMyMentors = async () => {
    setIsMyMentorLoading(true)
    const mentors = await getMyMentors()
    setMentors(mentors)
    setIsMyMentorLoading(false)
  }

  useEffect(() => {
    if (user) {
      setStudentProfileData({
        ...studentProfileData,
        name: user.name || 'Unknown',
        email: user.email || 'Unknown',
      });
      fetchStudentData({ user })
      handleGetMyMentors()
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {
      bio: studentProfileData.bio === "",
      educationLevel: studentProfileData.educationLevel === "",
      institution: studentProfileData.institution === "",
      subjects: studentProfileData.subjects === "",
      careerInterest: studentProfileData.careerInterest === "",
      dreamJob: studentProfileData.dreamJob === "",
      softSkills: studentProfileData.softSkills === "",
      mentorshipHelp: studentProfileData.mentorshipHelp === "",
      goals: studentProfileData.goals === "",
    }
    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleFormSubmit = async () => {
    if (validateForm()) {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/update_student`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentProfileData),
      });
      const response = await res.json();
      setEditMode(false)
      setLoading(false)
      if (response.status !== "success" && response.authorization === 'UnAuthorized') {
        toast({
          variant: "destructive",
          title: "Error",
          description: "You are not authorized to access this page.",
        })
      } else {
        toast({
          variant: "default",
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        })
        router.refresh()
      }
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteEmail === user?.email) {
      setDeleteLoading(true)
      setEditMode(false)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/delete_student`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email }),
      });
      const response = await res.json();
      if (response.status === 'success') {
        toast({
          variant: "destructive",
          title: "Account deleted",
          description: response.message,
        })
        setDeleteLoading(false)
        router.push('/api/auth/logout')
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: `Something went wrong. Please try again later. ${response.message}`,
        })
      }
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Email does not match. Please try again.",
      })
    }
  }

  const handleInputChange = (field: keyof Student, value: string | boolean) => {
    setStudentProfileData({
      ...studentProfileData,
      [field]: value,
    })
  }

  interface Mentor {
    name: string
    email: string
    image_path: string
  }

  const inputClass = (error: boolean) => error ? 'border-red-500' : ''

  if (isLoading) {
    return <Loading isLoading={isLoading} />
  }
  if (error) {
    return <Error500 />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-6xl mx-auto py-8 px-4 md:px-6 h-full"
    >
      <header className="flex flex-col md:flex-row gap-5 items-center justify-between mb-6">
        <motion.div 
          className="flex items-center gap-4 md:flex-row flex-col text-center md:text-start"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Avatar className="h-28 w-28 ring-4 ring-blue-500 ring-offset-4 ring-offset-white dark:ring-offset-gray-800">
            <AvatarImage src={`${user?.picture}`} alt={`${user?.nickname}`} />
            <AvatarFallback className='bg-blue-700 text-white animate-pulse uppercase'>
              {user?.name ? user?.name.slice(0, 2) : <>U</>}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300">{user?.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
          </div>
        </motion.div>
        <motion.div 
          className="flex justify-center items-center gap-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant={editMode ? "destructive" : "outline"}
            className='min-w-[120px] text-sm font-normal transition-all duration-200'
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? <><X className="mr-2 h-4 w-4" /> Cancel</> : <><Edit3 className="mr-2 h-4 w-4" /> Edit Profile</>}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              router.push("/api/auth/logout")
              setLogoutLoading(true)
            }}
          >
            {logoutLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><LogOut className="mr-2 h-4 w-4" /> Logout</>}
          </Button>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-5">
        <motion.div 
          className="md:col-span-1"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Profile Sections</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                {['bio', 'education', 'career', 'skills', 'mentorship', 'privacy'].map((section) => (
                  <Button
                    key={section}
                    variant={activeSection === section ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveSection(section)}
                  >
                    {section === 'bio' && <BookOpen className="mr-2 h-4 w-4" />}
                    {section === 'education' && <BookOpen className="mr-2 h-4 w-4" />}
                    {section === 'career' && <Briefcase className="mr-2 h-4 w-4" />}
                    {section === 'skills' && <Target className="mr-2 h-4 w-4" />}
                    {section === 'mentorship' && <UserPlus className="mr-2 h-4 w-4" />}
                    {section === 'privacy' && <Shield className="mr-2 h-4 w-4" />}
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </Button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          className="md:col-span-2 space-y-8"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <AnimatePresence mode="wait">
            {activeSection === 'bio' && (
              <motion.section
                key="bio"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">Bio</h2>
                <Textarea
                  placeholder="Write your bio here..."
                  className={`w-full h-32 resize-none text-lg ${inputClass(errors.bio)}`}
                  value={studentProfileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!editMode}
                />
              </motion.section>
            )}

            {activeSection === 'education' && (
              <motion.section
                key="education"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">Education</h2>
                <div className="space-y-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="educationLevel">Education Level</Label>
                    <Input
                      id="educationLevel"
                      placeholder="e.g., O-Level, A-Level, University"
                      className={`text-lg ${inputClass(errors.educationLevel)}`}
                      value={studentProfileData.educationLevel}
                      disabled={!editMode}
                      onChange={(e) => handleInputChange('educationLevel', e.target.value)}
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="institution">Institution</Label>
                    <Input
                      id="institution"
                      placeholder="Enter your institution's name"
                      className={`${inputClass(errors.institution)} text-lg`}
                      value={studentProfileData.institution}
                      disabled={!editMode}
                      onChange={(e) => handleInputChange('institution', e.target.value)}
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="subjects">Subjects</Label>
                    <Input
                      id="subjects"
                      placeholder="e.g., Science, Business, Arts"
                      className={`${inputClass(errors.subjects)} text-lg`}
                      value={studentProfileData.subjects}
                      disabled={!editMode}
                      onChange={(e) => handleInputChange('subjects', e.target.value)}
                    />
                  </div>
                </div>
              </motion.section>
            )}

            {activeSection === 'career' && (
              <motion.section
                key="career"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">Career</h2>
                <div className="space-y-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="careerInterest">Career Interest</Label>
                    <Input
                      id="careerInterest"
                      placeholder="e.g., Engineering, Medicine, Business"
                      className={`${inputClass(errors.careerInterest)} text-lg`}
                      value={studentProfileData.careerInterest}
                      disabled={!editMode}
                      onChange={(e) => handleInputChange('careerInterest', e.target.value)}
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="dreamJob">Dream Job</Label>
                    <Input
                      id="dreamJob"
                      placeholder="e.g., Software Engineer, Doctor, CEO"
                      className={`${inputClass(errors.dreamJob)} text-lg`}
                      value={studentProfileData.dreamJob}
                      disabled={!editMode}
                      onChange={(e) => handleInputChange('dreamJob', e.target.value)}
                    />
                  </div>
                </div>
              </motion.section>
            )}

            {activeSection === 'skills' && (
              <motion.section
                key="skills"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">Skills</h2>
                <Textarea
                  placeholder="Add your skills here... i.e. Communication, leadership, teamwork..."
                  className={`w-full h-32 resize-none text-lg ${inputClass(errors.softSkills)}`}
                  value={studentProfileData.softSkills}
                  disabled={!editMode}
                  onChange={(e) => handleInputChange('softSkills', e.target.value)}
                />
              </motion.section>
            )}

            {activeSection === 'mentorship' && (
              <motion.section
                key="mentorship"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">Mentorship Needs</h2>
                <div className="space-y-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="mentorshipHelp">What do you need help with?</Label>
                    <Textarea
                      id="mentorshipHelp"
                      placeholder="Describe your mentorship needs..."
                      className={`w-full h-32 resize-none text-lg ${inputClass(errors.mentorshipHelp)}`}
                      value={studentProfileData.mentorshipHelp}
                      disabled={!editMode}
                      onChange={(e) => handleInputChange('mentorshipHelp', e.target.value)}
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="goals">Goals</Label>
                    <Textarea
                      id="goals"
                      placeholder="Your short-term and long-term goals"
                      className={`w-full h-24 resize text-lg ${inputClass(errors.goals)}`}
                      value={studentProfileData.goals}
                      disabled={!editMode}
                      onChange={(e) => handleInputChange('goals', e.target.value)}
                    />
                  </div>
                </div>
              </motion.section>
            )}

            {activeSection === 'privacy' && (
              <motion.section
                key="privacy"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-blue-700 dark:text-blue-300">Privacy Settings</CardTitle>
                    <CardDescription>
                      Manage your privacy settings to control who can see your profile.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <label htmlFor="profile-visibility" className="font-medium">Profile Visibility</label>
                      <Switch
                        id="profile-visibility"
                        checked={studentProfileData.profileVisibility}
                        className="data-[state=checked]:bg-blue-700 data-[state=unchecked]:bg-gray-500"
                        disabled={!editMode}
                        onCheckedChange={() => handleInputChange('profileVisibility', !studentProfileData.profileVisibility)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.section>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-700 dark:text-blue-300">Save Profile</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2 flex-col sm:flex-row">
                <Button
                  variant="default"
                  className="bg-blue-700 hover:bg-blue-600 text-white min-w-28"
                  onClick={handleFormSubmit}
                  disabled={!editMode}
                >
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><Save className="mr-2 h-4 w-4" /> Save Profile</>}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/why-profile")}
                >
                  <BookOpen className="mr-2 h-4 w-4" /> Learn about your profile
                </Button>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-gray-600 dark:text-gray-400">You can always come back to update your profile information</p>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Card className="border-red-500">
              <CardHeader>
                <CardTitle className="text-red-500">Danger Zone</CardTitle>
                <CardDescription>
                  Once you delete your account, there is no going back. Please be certain.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete Account</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl w-[350px] md:w-auto sm:max-w-[425px] rounded-2xl">
                    <DialogHeader>
                      <DialogTitle>Confirm Account Deletion</DialogTitle>
                      <DialogDescription>
                        Please enter your email to confirm account deletion. This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-2">
                      <Input
                        placeholder="Enter your email"
                        value={deleteEmail}
                        onChange={(e) => setDeleteEmail(e.target.value)}
                      />
                      <Button variant="destructive" onClick={handleDeleteAccount}>
                        {deleteLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><Trash2 className="mr-2 h-4 w-4" /> Delete Account</>}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}