/* eslint-disable @next/next/no-img-element */
"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MapPinIcon, UserIcon, BriefcaseIcon, BookOpenIcon, ClockIcon, ImageIcon, Loader2, CheckCircle2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { UploadButton } from '@/utils/uploadthing'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'


export default function NikonektiMentorshipForm() {

    const router = useRouter()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        location: '',
        occupation: '',
        experience: '',
        interests: '',
        goals: '',
        availability: '',
        additionalInfo: '',
        privacyAccepted: false,
        image: '',
        ratings: 0,
    });
    // loading
    const [loading, setLoading] = useState(false)


    const handleChange = (e: { target: any }) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevState => ({ ...prevState, privacyAccepted: e.target.checked }))
    }

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        if (!formData?.privacyAccepted) {
            toast({
                title: 'Error',
                description: 'You must accept the privacy policy to submit the form.',
                variant: 'destructive',
            })
            return
        }

        const formDataToSubmit = new FormData();

        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('email', formData.email);
        formDataToSubmit.append('location', formData.location);
        formDataToSubmit.append('occupation', formData.occupation);
        formDataToSubmit.append('experience', formData.experience);
        formDataToSubmit.append('interests', formData.interests);
        formDataToSubmit.append('goals', formData.goals);
        formDataToSubmit.append('availability', formData.availability);
        formDataToSubmit.append('additionalInfo', formData.additionalInfo);
        formDataToSubmit.append('ratings', formData.ratings.toString());

        if (formData.image) {
            formDataToSubmit.append('image', formData.image);
        }

        try {
            setLoading(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/add_mentor`, {
                method: 'POST',
                body: formDataToSubmit,
            });
            console.log('Response:', response);
            if (!response.ok) {
                setLoading(false)
                toast({
                    title: 'Error',
                    description: 'There was an error submitting your application. Please try again.',
                    variant: 'destructive',
                })
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            if (result.status === 'success') {

                const emailData = {
                    email: formData.email,
                }

                try {
                    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/mailer/send-verification-email`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(emailData),
                    }).then(async response => {
                        if (!response.ok) {
                            toast({
                                title: 'Error',
                                description: 'There was an error during regisration process. Please try again.',
                                variant: 'destructive',
                            })
                        }

                        const result = await response.json();

                        if (result.status === 'success') {
                            toast({
                                title: 'Success',
                                description: 'Your application has been submitted successfully! You will receive a confirmation email within 1-2 days.',
                            })

                            // clear the form
                            setFormData({
                                name: '',
                                email: '',
                                location: '',
                                occupation: '',
                                experience: '',
                                interests: '',
                                goals: '',
                                availability: '',
                                additionalInfo: '',
                                privacyAccepted: false,
                                image: '',
                                ratings: 0,
                            })
                            setLoading(false)

                            // redirect to the verification challenge page
                            router.push('/mentorship/application/verification')
                        } else {
                            toast({
                                title: 'Error',
                                description: 'There was an error during regisration process. Please try again.',
                                variant: 'destructive',
                            })
                        }
                    })
                } catch (error) {
                    setLoading(false)
                    toast({
                        title: 'Error',
                        description: 'There was an error during regisration process. Please try again.',
                        variant: 'destructive',
                    })
                }

            } else if (result.authorization) {
                setLoading(false)
                toast({
                    title: 'Error',
                    description: result.authorization,
                    variant: 'destructive',
                })
            } else if (result.error) {
                setLoading(false)
                toast({
                    title: 'Error',
                    description: result.error,
                    variant: 'destructive',
                })
            } else {
                setLoading(false)
                toast({
                    title: 'Error',
                    description: 'There was an error submitting your application. Please try again.',
                    variant: 'destructive',
                })
            }

        } catch (error) {
            setLoading(false)
            console.error('Error submitting form:', error);
            toast({
                title: 'Error',
                description: 'There was an error submitting your application. Please try again.',
                variant: 'destructive',
            })
        }
    };

    const handleImageUploadComplete = (res: any) => {
        if (res?.length > 0) {
            setFormData(prevState => ({
                ...prevState,
                image: res[0].url
            }));
            toast({
                title: 'Success',
                description: 'Image uploaded successfully.',
            });
        }
    };

    const handleImageUploadError = (error: Error) => {
        toast({
            title: 'Upload Error',
            description: error.message,
            variant: 'destructive',
        });
    };

    return (
        <div className="min-h-screen p-2 md:p-6">
            <Card className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg border-t-4 border-blue-500">
                <CardHeader className="border-b text-black p-6 flex flex-col items-center">
                    <CardTitle className="text-xl md:text-2xl font-bold items-center flex flex-col gap-4">
                        <img src="/images/nikonekti/nikonekti.svg" alt="Nikonekti Logo" className="mr-2" />
                        Nikonekti Mentorship Registration
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-center py-4">
                        Join the Nikonekti community and help students and young professionals shape their careers in Tanzania&apo;s education and workforce.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="py-6 md:!p-6 space-y-6">

                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center">
                                <UserIcon className="w-4 h-4 mr-2 text-blue-600" />
                                Full Name
                            </Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border-gray-300 rounded-md focus:border-blue-700 focus:ring focus:ring-blue-200"
                                placeholder="e.g., Juma Mwangi"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center">
                                <MapPinIcon className="w-4 h-4 mr-2 text-blue-600" />
                                Email Address
                            </Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border-gray-300 rounded-md focus:border-blue-700 focus:ring focus:ring-blue-200"
                                placeholder="e.g., juma@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location" className="flex items-center">
                                <MapPinIcon className="w-4 h-4 mr-2 text-blue-600" />
                                Location
                            </Label>
                            <Select name="location" onValueChange={(value) => handleChange({ target: { name: 'location', value } })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select your location in Tanzania" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dar-es-salaam">Dar es Salaam</SelectItem>
                                    <SelectItem value="dodoma">Dodoma</SelectItem>
                                    <SelectItem value="arusha">Arusha</SelectItem>
                                    <SelectItem value="mwanza">Mwanza</SelectItem>
                                    <SelectItem value="zanzibar">Zanzibar</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="occupation" className="flex items-center">
                                <BriefcaseIcon className="w-4 h-4 mr-2 text-blue-600" />
                                Current Occupation
                            </Label>
                            <Input
                                type="text"
                                id="occupation"
                                name="occupation"
                                value={formData.occupation}
                                onChange={handleChange}
                                required
                                className="w-full border-gray-300 rounded-md focus:border-blue-700 focus:ring focus:ring-blue-200"
                                placeholder="e.g., Software Developer, Student"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="experience" className="flex items-center">
                                <ClockIcon className="w-4 h-4 mr-2 text-blue-600" />
                                Years of Experience
                            </Label>
                            <Select name="experience" onValueChange={(value) => handleChange({ target: { name: 'experience', value } })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select years of experience" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0-2">1-3 years</SelectItem>
                                    <SelectItem value="3-5">4-6 years</SelectItem>
                                    <SelectItem value="6-10">7-10 years</SelectItem>
                                    <SelectItem value="10+">10+ years</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="interests" className="flex items-center">
                                <BookOpenIcon className="w-4 h-4 mr-2 text-blue-600" />
                                Areas of Interest
                            </Label>
                            <Textarea
                                id="interests"
                                name="interests"
                                value={formData.interests}
                                onChange={handleChange}
                                required
                                className="w-full border-gray-300 rounded-md focus:border-blue-700 focus:ring focus:ring-blue-200"
                                placeholder="e.g., Mobile App Development, AI, Blockchain"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="goals" className="flex items-center">
                                <BookOpenIcon className="w-4 h-4 mr-2 text-blue-600" />
                                Mentorship Goals
                            </Label>
                            <Textarea
                                id="goals"
                                name="goals"
                                value={formData.goals}
                                onChange={handleChange}
                                required
                                className="w-full border-gray-300 rounded-md focus:border-blue-700 focus:ring focus:ring-blue-200"
                                placeholder="Describe your goals for mentoring and what you'd like to achieve"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="availability" className="flex items-center">
                                <ClockIcon className="w-4 h-4 mr-2 text-blue-600" />
                                Availability
                            </Label>
                            <Select name="availability" onValueChange={(value) => handleChange({ target: { name: 'availability', value } })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select your availability" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1-2">1-2 hours per week</SelectItem>
                                    <SelectItem value="3-5">3-5 hours per week</SelectItem>
                                    <SelectItem value="5+">5+ hours per week</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="additionalInfo" className="flex items-center">
                                <BookOpenIcon className="w-4 h-4 mr-2 text-blue-600" />
                                Additional Information
                            </Label>
                            <Textarea
                                id="additionalInfo"
                                name="additionalInfo"
                                value={formData.additionalInfo}
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded-md focus:border-blue-700 focus:ring focus:ring-blue-200"
                                placeholder="Any extra details you'd like to share?"
                            />
                        </div>


                        <div className="space-y-2">
                            <Label htmlFor="privacy" className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="privacy"
                                    name="privacy"
                                    checked={formData.privacyAccepted}
                                    onChange={handleCheckboxChange}
                                    required
                                    className="mr-2"
                                />
                                I accept the <a href="/privacy-policy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer"> Privacy Policy</a> and <a href="/terms-of-service" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Terms of Service</a>.
                            </Label>
                        </div>

                        <div className="space-y-2 text-center flex flex-col gap-2 justify-center items-center">
                            <Label htmlFor="image" className="flex items-center justify-center w-full">
                                <ImageIcon className="w-4 h-4 mr-2 text-blue-600" />
                                Profile Image
                            </Label>

                            <div className='w-full flex justify-center items-center'>
                                <Avatar className='w-24 h-24'>
                                    <AvatarImage src={formData.image} />
                                    <AvatarFallback className='text-xs'>Upload</AvatarFallback>
                                </Avatar>
                            </div>

                            <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={handleImageUploadComplete}
                                onUploadError={handleImageUploadError}
                            />
                            <p className="text-xs text-gray-500 mt-1">Upload a profile image (optional, max 4MB)</p>
                        </div>

                        <Dialog open={loading} onOpenChange={setLoading}>
                            <DialogTrigger
                                disabled={
                                    !formData.name ||
                                    !formData.email ||
                                    !formData.availability ||
                                    !formData.additionalInfo ||
                                    !formData.privacyAccepted ||
                                    !formData.image ? true : false
                                }
                                className="w-full bg-blue-700 disabled:bg-blue-700/40 disabled:cursor-not-allowed hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={handleSubmit}
                            >
                                Submit Application
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className='text-center'>Nikonekti Mentorship Application</DialogTitle>
                                    <DialogDescription className='text-center py-10'>
                                        {
                                            loading ?
                                                (<div className="flex items-center justify-center">
                                                    <Loader2 className="animate-spin h-5 w-5 mr-3" />
                                                </div>)
                                                :
                                                (<div className="flex items-center justify-center">
                                                    <CheckCircle2 className="text-green-500 h-5 w-5 mr-3" />
                                                </div>)
                                        }
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>


                        <p className="text-sm text-gray-600 mt-4">
                            It may take one to two days or less for your application to be processed. A confirmation will be sent to your email.
                        </p>

                        <p className="text-sm text-gray-600 mt-2">
                            For more details, please refer to our <a href="/nikonekti-mentors-guidebook" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Mentors Guidebook</a>.
                        </p>
                    </form>
                </CardContent>
            </Card>
            <footer className="mt-8 text-center text-sm text-gray-600">
                <p>© 2024 Nikonekti - Empowering Tanzania&apos;s Future for Youth</p>
            </footer>
        </div>
    )
}

