import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "../components/ui/card.jsx"
import { Button } from "../components/ui/button.jsx"
import { Badge } from "../components/ui/badge.jsx"
import { Progress } from "../components/ui/progress.jsx"
import { Input } from "../components/ui/input.jsx"
import { Dialog, DialogContent, DialogFooter } from "../components/ui/dialog.jsx"
import { Header } from "../components/ui/header.jsx"
import {
  BookOpen,
  Wallet,
  Trophy,
  User,
  Search,
  Star,
  Clock,
  Users,
  TrendingUp,
  Award,
  Play,
  Calendar,
  Target,
  Zap,
  Phone,
  Lock,
  ArrowLeft,
  UserPlus,
  Mail
} from "lucide-react"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showEnrollModal, setShowEnrollModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [loginStep, setLoginStep] = useState('phone') // 'phone' or 'otp'
  const [mobileNumber, setMobileNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [showRegisterDialog, setShowRegisterDialog] = useState(false)
  const [registerStep, setRegisterStep] = useState('details') // 'details' | 'otp'
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regMobile, setRegMobile] = useState('')
  const [regOtp, setRegOtp] = useState('')
  const [regLoading, setRegLoading] = useState(false)
  const [regCountdown, setRegCountdown] = useState(0)
  const [studyStreak, setStudyStreak] = useState(67)
  const [dailyQuizCompleted, setDailyQuizCompleted] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')

  const handleContinueLearning = () => {
    // Navigate to course learning page
    console.log('Continue learning clicked')
  }

  const handleEnrollCourse = (courseName) => {
    console.log("[v0] Enrolling in course:", courseName)
    setSelectedCourse(courseName)
    setShowEnrollModal(true)
  }

  const handleStartTest = (testName) => {
    console.log("[v0] Starting test:", testName)
    alert(`Starting ${testName}. Good luck!`)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    console.log("[v0] Searching for:", searchQuery)
    alert(`Searching for: ${searchQuery}`)
  }

  const handleCompleteGoal = () => {
    if (studyStreak < 100) {
      setStudyStreak((prev) => Math.min(prev + 33, 100))
      alert("Great! You completed 1 lesson. Keep going!")
    }
  }

  const handleSendOTP = async () => {
    if (mobileNumber.length === 10) {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        setLoginStep('otp')
        setCountdown(30)
        startCountdown()
      }, 1000)
    }
  }

  const startCountdown = () => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleResendOTP = () => {
    setCountdown(30)
    startCountdown()
    // Simulate resending OTP
    alert('OTP resent successfully!')
  }

  const handleVerifyOTP = async () => {
    if (otp.length === 6) {
      setIsLoading(true)
      // Simulate OTP verification
      setTimeout(() => {
        setIsLoading(false)
        // Set login state and user info
        setIsLoggedIn(true)
        setUserName(mobileNumber) // Use mobile number as user identifier
        // Close dialog after successful login
        setShowLoginDialog(false)
        setLoginStep('phone')
        setMobileNumber('')
        setOtp('')
        setCountdown(0)
        alert('Login successful!')
      }, 1000)
    }
  }

  const handleBackToPhone = () => {
    setLoginStep('phone')
    setOtp('')
    setCountdown(0)
  }

  // Register dialog helpers
  const startRegCountdown = () => {
    const timer = setInterval(() => {
      setRegCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleSendRegisterOTP = () => {
    const emailValid = /.+@.+\..+/.test(regEmail)
    if (!regName || !emailValid || regMobile.length !== 10) return
    setRegLoading(true)
    setTimeout(() => {
      setRegLoading(false)
      setRegisterStep('otp')
      setRegCountdown(30)
      startRegCountdown()
    }, 1000)
  }

  const handleResendRegisterOTP = () => {
    setRegCountdown(30)
    startRegCountdown()
    alert('OTP resent successfully!')
  }

  const handleVerifyRegisterOTP = () => {
    if (regOtp.length !== 6) return
    setRegLoading(true)
    setTimeout(() => {
      setRegLoading(false)
      setIsLoggedIn(true)
      setUserName(regName || regMobile)
      setShowRegisterDialog(false)
      setRegisterStep('details')
      setRegName('')
      setRegEmail('')
      setRegMobile('')
      setRegOtp('')
      setRegCountdown(0)
      alert('Registration successful!')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="SkillUp" subtitle="Learn, Grow, Succeed" icon={<BookOpen className="w-6 h-6 text-primary-foreground" />} />

      <main className="container mx-auto px-4 py-6 pb-20">
        
        {/* Welcome Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground">
            {!isLoggedIn ? (
              <div className="text-center">
                <h2 className="font-heading text-2xl font-bold mb-2">Welcome to SkillUp!</h2>
                <p className="text-primary-foreground/90 mb-4">Start your learning journey today</p>
                <div className="flex justify-center gap-3">
                  <Button 
                    onClick={() => setShowLoginDialog(true)} 
                    variant="secondary" 
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                  <Button 
                    onClick={() => setShowRegisterDialog(true)} 
                    className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md shadow-black/10"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Register
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="font-heading text-2xl font-bold mb-2">Welcome back, Alex!</h2>
                <p className="text-primary-foreground/90 mb-4">Continue your learning journey</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm">Level 12</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">85% Progress</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4" />
                    <span className="text-sm">5 Day Streak</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Search */}
        <section className="mb-6">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search courses, tests, or topics..."
              className="pl-10 bg-card border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-3 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-card-foreground">12</p>
              <p className="text-xs text-muted-foreground">Courses</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <Award className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-card-foreground">8</p>
              <p className="text-xs text-muted-foreground">Certificates</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <Trophy className="w-6 h-6 text-secondary mx-auto mb-2" />
              <p className="text-2xl font-bold text-card-foreground">2,450</p>
              <p className="text-xs text-muted-foreground">Points</p>
            </CardContent>
          </Card>
        </section>

        {/* Today's Goals */}
        <section className="mb-8">
          <h3 className="font-heading text-lg font-semibold text-card-foreground mb-4">Today's Goals</h3>
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-accent/10 to-accent/5 cursor-pointer" onClick={handleCompleteGoal}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Zap className="w-5 h-5 text-accent" />
                  <Badge variant="secondary" className="text-xs">
                    {studyStreak >= 100 ? "3/3" : "2/3"}
                  </Badge>
                </div>
                <h4 className="font-semibold text-card-foreground mb-1">Study Streak</h4>
                <Progress value={studyStreak} className="mb-2" />
                <p className="text-xs text-muted-foreground">
                  {studyStreak >= 100 ? "Goal completed! 🎉" : "Complete 1 more lesson"}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="w-5 h-5 text-secondary" />
                  <Badge variant="outline" className="text-xs">
                    1/1
                  </Badge>
                </div>
                <h4 className="font-semibold text-card-foreground mb-1">Daily Quiz</h4>
                <Progress value={dailyQuizCompleted ? 100 : 0} className="mb-2" />
                <p className="text-xs text-muted-foreground">
                  {dailyQuizCompleted ? "Goal completed! 🎉" : "Complete the daily quiz"}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Continue Learning */}
        <section className="mb-8">
          <h3 className="font-heading text-lg font-semibold text-card-foreground mb-4">Continue Learning</h3>
          <Card className="overflow-hidden">
            <div className="flex">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Play className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="flex-1 p-4">
                <h4 className="font-semibold text-card-foreground mb-1">React Advanced Patterns</h4>
                <p className="text-sm text-muted-foreground mb-2">Chapter 3: Custom Hooks</p>
                <Progress value={65} className="mb-2" />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">65% Complete • 2h 15m left</p>
                  <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={handleContinueLearning}>
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Featured Courses */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-lg font-semibold text-card-foreground">Featured Courses</h3>
            <Link to="/courses">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                <img
                  src="/modern-web-dev-thumbnail.png"
                  alt="Course thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    Web Development
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">4.8</span>
                  </div>
                </div>
                <h4 className="font-semibold text-card-foreground mb-1">Modern JavaScript Mastery</h4>
                <p className="text-sm text-muted-foreground mb-3">Master ES6+ features and modern development</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>12h</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>2.1k</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => handleEnrollCourse("Modern JavaScript Mastery")}
                  >
                    Enroll
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center">
                <img src="/placeholder-9wyvc.png" alt="Course thumbnail" className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    Design
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">4.9</span>
                  </div>
                </div>
                <h4 className="font-semibold text-card-foreground mb-1">UI/UX Design Fundamentals</h4>
                <p className="text-sm text-muted-foreground mb-3">Create beautiful and functional interfaces</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>8h</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>1.8k</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleEnrollCourse("UI/UX Design Fundamentals")}>
                    Enroll
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Upcoming Tests */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-lg font-semibold text-card-foreground">Upcoming Tests</h3>
            <Link to="/tests">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-card-foreground">JavaScript Fundamentals Quiz</h4>
                    <p className="text-sm text-muted-foreground">Due in 2 days • 25 questions</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleStartTest("JavaScript Fundamentals Quiz")}>
                    Start
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-card-foreground">React Components Assessment</h4>
                    <p className="text-sm text-muted-foreground">Due in 5 days • 15 questions</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      alert(
                        "Preview: React Components Assessment - 15 questions about component lifecycle, props, and state management",
                      )
                    }
                  >
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Enrollment Modal */}
        {showEnrollModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardContent className="p-6">
                <h3 className="font-heading text-lg font-semibold mb-4">Enroll in {selectedCourse}</h3>
                <p className="text-muted-foreground mb-6">
                  You're about to enroll in this course. This will cost 150 credits from your wallet.
                </p>
                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowEnrollModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      alert(`Successfully enrolled in ${selectedCourse}!`)
                      setShowEnrollModal(false)
                      setSelectedCourse(null)
                    }}
                  >
                    Enroll Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Login Dialog */}
        <Dialog isOpen={showLoginDialog} onClose={() => setShowLoginDialog(false)} size="small">
          <DialogContent className="p-6">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-card-foreground mb-1">
                {loginStep === 'phone' ? 'Login to SkillUp' : 'Verify OTP'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {loginStep === 'phone' 
                  ? 'Enter your mobile number to continue' 
                  : 'Enter the 6-digit OTP sent to your mobile'
                }
              </p>
            </div>
            
            <div className="space-y-4">
              {loginStep === 'phone' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="mobileNumber" className="block text-sm font-medium text-card-foreground mb-2">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                        +91
                      </div>
                      <Input
                        id="mobileNumber"
                        type="tel"
                        placeholder="Enter 10-digit mobile number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="pl-10"
                        maxLength={10}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={handleSendOTP}
                    disabled={isLoading || mobileNumber.length !== 10}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending OTP...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>Send OTP</span>
                      </div>
                    )}
                  </Button>
                </div>
              )}
              
              {loginStep === 'otp' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-card-foreground mb-2">
                      Enter OTP
                    </label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="text-center text-lg tracking-widest"
                      maxLength={6}
                      disabled={isLoading}
                    />
                    <p className="text-xs text-muted-foreground text-center mt-1">
                      OTP sent to +91 {mobileNumber}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    {countdown > 0 ? (
                      <span className="text-muted-foreground">Resend in {countdown}s</span>
                    ) : (
                      <span className="text-muted-foreground">OTP expired</span>
                    )}
                    <Button 
                      variant="link" 
                      size="sm" 
                      onClick={handleResendOTP} 
                      disabled={countdown > 0 || isLoading}
                      className="text-primary hover:text-primary/80 p-0 h-auto"
                    >
                      Resend OTP
                    </Button>
                  </div>
                  
                  <Button
                    className="w-full"
                    onClick={handleVerifyOTP}
                    disabled={isLoading || otp.length !== 6}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Verifying...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Lock className="w-4 h-4" />
                        <span>Verify & Login</span>
                      </div>
                    )}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleBackToPhone} 
                    disabled={isLoading}
                    className="w-full text-muted-foreground hover:text-card-foreground"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Change Mobile Number
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Register Dialog */}
        <Dialog isOpen={showRegisterDialog} onClose={() => setShowRegisterDialog(false)} size="small">
          <DialogContent className="p-6">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <UserPlus className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-card-foreground mb-1">
                {registerStep === 'details' ? 'Create your account' : 'Verify OTP'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {registerStep === 'details' 
                  ? 'Enter your details to get started' 
                  : `Enter the 6-digit OTP sent to +91 ${regMobile}`}
              </p>
            </div>

            {registerStep === 'details' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Full Name</label>
                  <Input 
                    placeholder="Your name" 
                    value={regName} 
                    onChange={(e) => setRegName(e.target.value)} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Email</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                    </div>
                    <Input 
                      type="email" 
                      placeholder="you@example.com" 
                      className="pl-9"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Mobile Number</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">+91</div>
                    <Input
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      className="pl-10"
                      maxLength={10}
                      value={regMobile}
                      onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    />
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={handleSendRegisterOTP}
                  disabled={regLoading || !regName || !/.+@.+\..+/.test(regEmail) || regMobile.length !== 10}
                >
                  {regLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending OTP...</span>
                    </div>
                  ) : (
                    <>
                      <Phone className="w-4 h-4 mr-2" />
                      Send OTP
                    </>
                  )}
                </Button>
              </div>
            )}

            {registerStep === 'otp' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Enter OTP</label>
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    className="text-center text-lg tracking-widest"
                    maxLength={6}
                    value={regOtp}
                    onChange={(e) => setRegOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  />
                </div>
                <div className="flex justify-between items-center text-sm">
                  {regCountdown > 0 ? (
                    <span className="text-muted-foreground">Resend in {regCountdown}s</span>
                  ) : (
                    <span className="text-muted-foreground">OTP expired</span>
                  )}
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={handleResendRegisterOTP} 
                    disabled={regCountdown > 0 || regLoading}
                    className="text-primary hover:text-primary/80 p-0 h-auto"
                  >
                    Resend OTP
                  </Button>
                </div>
                <Button 
                  className="w-full"
                  onClick={handleVerifyRegisterOTP}
                  disabled={regLoading || regOtp.length !== 6}
                >
                  {regLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Create Account
                    </>
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => { setRegisterStep('details'); setRegOtp(''); setRegCountdown(0) }}
                  disabled={regLoading}
                  className="w-full text-muted-foreground hover:text-card-foreground"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Details
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
