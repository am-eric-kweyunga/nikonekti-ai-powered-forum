'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Eye, EyeOff } from 'lucide-react'

export default function AccountSettingsPage() {
  const [isVisible, setIsVisible] = useState(true)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 100
      }
    }
  }

  return (
    <motion.div 
      className="container mx-auto p-4 space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 className="text-3xl font-bold text-blue-900" variants={itemVariants}>
        Account Settings
      </motion.h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <motion.div variants={containerVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your profile details here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div variants={itemVariants} className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile Picture" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Button>Change Avatar</Button>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your Name" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="Tell us about yourself" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://yourwebsite.com" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button>Save Changes</Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="account">
          <motion.div variants={containerVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account settings and preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div variants={itemVariants}>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center space-x-2">
                  <Switch
                    id="visibility"
                    checked={isVisible}
                    onCheckedChange={setIsVisible}
                  />
                  <Label htmlFor="visibility">Profile Visibility</Label>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button>Update Account</Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications">
          <motion.div variants={containerVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div variants={itemVariants} className="flex items-center space-x-2">
                  <Switch id="email-notifications" />
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center space-x-2">
                  <Switch id="push-notifications" />
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center space-x-2">
                  <Switch id="message-notifications" />
                  <Label htmlFor="message-notifications">New Message Alerts</Label>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center space-x-2">
                  <Switch id="mentorship-notifications" />
                  <Label htmlFor="mentorship-notifications">Mentorship Updates</Label>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button>Save Preferences</Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="mentorship">
          <motion.div variants={containerVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Mentorship Settings</CardTitle>
                <CardDescription>Configure your mentorship preferences and availability.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div variants={itemVariants}>
                  <Label htmlFor="expertise">Areas of Expertise</Label>
                  <Textarea id="expertise" placeholder="e.g., Web Development, Machine Learning, UX Design" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Label htmlFor="availability">Weekly Availability (hours)</Label>
                  <Input id="availability" type="number" min="0" max="40" placeholder="5" />
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center space-x-2">
                  <Switch id="open-to-mentees" />
                  <Label htmlFor="open-to-mentees">Open to New Mentees</Label>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center space-x-2">
                  <Switch id="long-term-mentorship" />
                  <Label htmlFor="long-term-mentorship">Available for Long-term Mentorship</Label>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button>Update Mentorship Settings</Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}