import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "../components/ui/card.jsx"
import { Button } from "../components/ui/button.jsx"
import { Badge } from "../components/ui/badge.jsx"
import { Input } from "../components/ui/input.jsx"
import { Header } from "../components/ui/header.jsx"
import { Dialog, DialogContent, DialogFooter } from "../components/ui/dialog.jsx"
import { BookOpen, Search, Star, Clock, Users, Filter, BookOpenCheck, CheckCircle, AlertCircle } from "lucide-react"

export default function CoursesPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [enrollmentDialog, setEnrollmentDialog] = useState({ isOpen: false, course: null })
  const [isEnrolling, setIsEnrolling] = useState(false)
  const [successDialog, setSuccessDialog] = useState({ isOpen: false, course: null })
  const [showEnrolledCourses, setShowEnrolledCourses] = useState(false)

  const categories = [
    { id: "all", name: "All Courses", count: 12 },
    { id: "web", name: "Web Development", count: 5 },
    { id: "design", name: "Design", count: 3 },
    { id: "mobile", name: "Mobile Development", count: 2 },
    { id: "data", name: "Data Science", count: 2 },
  ]

  const courses = [
    {
      id: 1,
      title: "Modern JavaScript Mastery",
      category: "web",
      description: "Master ES6+ features and modern development patterns",
      duration: "12h",
      students: "2.1k",
      rating: 4.8,
      price: "150 credits",
      image: "/modern-web-dev-thumbnail.png",
      progress: 0,
      instructor: "Sarah Johnson",
      level: "Intermediate",
      modules: 8,
      certificate: true,
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      category: "design",
      description: "Create beautiful and functional interfaces",
      duration: "8h",
      students: "1.8k",
      rating: 4.9,
      price: "120 credits",
      image: "/placeholder-9wyvc.png",
      progress: 0,
      instructor: "Mike Chen",
      level: "Beginner",
      modules: 6,
      certificate: true,
    },
    {
      id: 3,
      title: "React Advanced Patterns",
      category: "web",
      description: "Advanced React concepts and best practices",
      duration: "15h",
      students: "3.2k",
      rating: 4.7,
      price: "180 credits",
      image: "/placeholder-9wyvc.png",
      progress: 65,
      instructor: "Alex Rodriguez",
      level: "Advanced",
      modules: 10,
      certificate: true,
    },
    {
      id: 4,
      title: "Python Programming Course",
      category: "data",
      description: "Learn Python from basics to advanced concepts",
      duration: "20h",
      students: "4.5k",
      rating: 4.6,
      price: "200 credits",
      image: "/python-programming-course.png",
      progress: 0,
      instructor: "Dr. Emily Watson",
      level: "Beginner",
      modules: 12,
      certificate: true,
    },
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleEnroll = (course) => {
    setEnrollmentDialog({ isOpen: true, course })
  }

  const handleResume = (course) => {
    navigate(`/course/${course.id}/learn`)
  }

  const getEnrolledCourses = () => {
    return courses.filter(course => course.progress > 0)
  }

  const handleConfirmEnrollment = async () => {
    if (!enrollmentDialog.course) return
    
    setIsEnrolling(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Update course progress to indicate enrollment
      const updatedCourses = courses.map(course => 
        course.id === enrollmentDialog.course.id 
          ? { ...course, progress: 1 } 
          : course
      )
      
      // In a real app, you'd update the state here
      console.log(`Successfully enrolled in ${enrollmentDialog.course.title}`)
      
      // Close dialog and show success
      setEnrollmentDialog({ isOpen: false, course: null })
      setIsEnrolling(false)
      
      // Show success dialog
      setSuccessDialog({ isOpen: true, course: enrollmentDialog.course })
      
    } catch (error) {
      console.error('Enrollment failed:', error)
      setIsEnrolling(false)
      alert('Enrollment failed. Please try again.')
    }
  }

  const closeEnrollmentDialog = () => {
    setEnrollmentDialog({ isOpen: false, course: null })
    setIsEnrolling(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Courses" subtitle="Explore & Learn" icon={<BookOpen className="w-6 h-6 text-primary-foreground" />} />

      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Enrolled Courses Toggle */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-card-foreground">My Learning</h2>
            <Button
              variant="outline"
              onClick={() => setShowEnrolledCourses(!showEnrolledCourses)}
              className="flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>{showEnrolledCourses ? 'Show All Courses' : 'Show Enrolled Courses'}</span>
            </Button>
          </div>
          
          {showEnrolledCourses && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">Enrolled Courses</h3>
              {getEnrolledCourses().length > 0 ? (
                <div className="grid grid-cols-1 gap-4 mb-6">
                  {getEnrolledCourses().map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      <div className="flex">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {categories.find(c => c.id === course.category)?.name}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-muted-foreground">{course.rating}</span>
                            </div>
                          </div>
                          <h4 className="font-semibold text-card-foreground mb-1">{course.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{course.duration}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-3 h-3" />
                                <span>{course.students}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="text-right">
                                <div className="text-sm font-medium text-card-foreground mb-1">
                                  Progress: {course.progress}%
                                </div>
                                <div className="w-24 bg-muted rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${course.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                className="bg-primary hover:bg-primary/90"
                                onClick={() => handleResume(course)}
                              >
                                Continue Learning
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-muted/30 rounded-lg">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <h4 className="text-lg font-medium text-card-foreground mb-2">No enrolled courses yet</h4>
                  <p className="text-muted-foreground mb-4">Enroll in a course to start your learning journey!</p>
                  <Button onClick={() => setShowEnrolledCourses(false)}>
                    Browse Courses
                  </Button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Search and Filter */}
        <section className="mb-6">
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-10 bg-card border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section>
          <div className="grid grid-cols-1 gap-4">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="flex">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {categories.find(c => c.id === course.category)?.name}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">{course.rating}</span>
                      </div>
                    </div>
                    <h4 className="font-semibold text-card-foreground mb-1">{course.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{course.students}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {course.progress > 0 ? (
                          <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90"
                            onClick={() => handleResume(course)}
                          >
                            Continue Learning
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90"
                            onClick={() => handleEnroll(course)}
                          >
                            Enroll
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpenCheck className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-card-foreground mb-2">No courses found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </section>
      </main>



      {/* Enrollment Dialog */}
      <Dialog isOpen={enrollmentDialog.isOpen} onClose={closeEnrollmentDialog}>
        <DialogContent>
          {enrollmentDialog.course && (
            <>
              {/* Course Header */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg overflow-hidden">
                  <img
                    src={enrollmentDialog.course.image}
                    alt={enrollmentDialog.course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-card-foreground mb-1">
                    {enrollmentDialog.course.title}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {categories.find(c => c.id === enrollmentDialog.course.category)?.name}
                  </Badge>
                </div>
              </div>

              {/* Course Details (tighter layout) */}
              <div className="space-y-1 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground w-28">Instructor:</span>
                  <span className="font-medium">{enrollmentDialog.course.instructor}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground w-28">Level:</span>
                  <span className="font-medium">{enrollmentDialog.course.level}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground w-28">Duration:</span>
                  <span className="font-medium">{enrollmentDialog.course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground w-28">Modules:</span>
                  <span className="font-medium">{enrollmentDialog.course.modules} modules</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground w-28">Students:</span>
                  <span className="font-medium">{enrollmentDialog.course.students}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground w-28">Rating:</span>
                  <div className="flex items-center space-x-1 font-medium">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{enrollmentDialog.course.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground w-28">Certificate:</span>
                  <span className="font-medium">
                    {enrollmentDialog.course.certificate ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              {/* Price and Enrollment */}
              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Course Price:</span>
                  <span className="text-lg font-bold text-primary">{enrollmentDialog.course.price}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  This course will be added to your learning dashboard upon enrollment.
                </p>
              </div>

              {/* Confirmation Message */}
              <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg mb-6">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-blue-700 dark:text-blue-300 mb-1">
                    Ready to start learning?
                  </p>
                  <p className="text-blue-600 dark:text-blue-400">
                    By enrolling, you'll get lifetime access to this course and all its materials.
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
        
        <DialogFooter>
          <Button variant="outline" onClick={closeEnrollmentDialog} disabled={isEnrolling}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmEnrollment} 
            disabled={isEnrolling}
            className="bg-primary hover:bg-primary/90"
          >
            {isEnrolling ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Enrolling...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm Enrollment
              </>
            )}
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Success Dialog */}
      <Dialog isOpen={successDialog.isOpen} onClose={() => setSuccessDialog({ isOpen: false, course: null })}>
        <DialogContent>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">Enrollment Successful!</h3>
            <p className="text-muted-foreground mb-4">
              You have successfully enrolled in <span className="font-medium">{successDialog.course?.title}</span>.
            </p>
            <div className="bg-muted/50 rounded-lg p-3 mb-4 w-full">
              <p className="text-sm text-muted-foreground">
                Your course has been added to your learning dashboard. You can now start learning at your own pace!
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Check your email for course access details and welcome materials.
            </p>
          </div>
        </DialogContent>
        
        <DialogFooter>
          <Button 
            variant="outline"
            onClick={() => setSuccessDialog({ isOpen: false, course: null })}
          >
            Close
          </Button>
          <Button 
            onClick={() => {
              setSuccessDialog({ isOpen: false, course: null })
              handleResume(successDialog.course)
            }}
            className="bg-primary hover:bg-primary/90"
          >
            Start Learning
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}
