import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent } from "../components/ui/card.jsx"
import { Button } from "../components/ui/button.jsx"
import { Badge } from "../components/ui/badge.jsx"
import { Progress } from "../components/ui/progress.jsx"
import { Header } from "../components/ui/header.jsx"
import { 
  BookOpen, 
  Play, 
  Pause, 
  CheckCircle, 
  Lock, 
  Clock, 
  FileText, 
  Video, 
  Download,
  ArrowLeft,
  Bookmark,
  Share2,
  MessageCircle,
  Star,
  Users,
  Calendar,
  Target,
  Award
} from "lucide-react"

export default function CourseLearningPage() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [currentModule, setCurrentModule] = useState(0)
  const [currentLesson, setCurrentLesson] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [lessonProgress, setLessonProgress] = useState({})
  const [notes, setNotes] = useState("")
  const [showNotes, setShowNotes] = useState(false)

  // Mock course data - in real app this would come from API
  const mockCourse = {
    id: parseInt(courseId),
    title: "Modern JavaScript Mastery",
    category: "Web Development",
    description: "Master ES6+ features and modern development patterns",
    duration: "12h",
    students: "2.1k",
    rating: 4.8,
    instructor: "Sarah Johnson",
    level: "Intermediate",
    modules: [
      {
        id: 1,
        title: "Introduction to Modern JavaScript",
        duration: "45m",
        lessons: [
          { id: 1, title: "Welcome to the Course", type: "video", duration: "5m", completed: true },
          { id: 2, title: "Setting Up Your Environment", type: "video", duration: "10m", completed: true },
          { id: 3, title: "ES6+ Overview", type: "video", duration: "15m", completed: false },
          { id: 4, title: "Practice Exercise", type: "exercise", duration: "15m", completed: false }
        ]
      },
      {
        id: 2,
        title: "Arrow Functions and Modern Syntax",
        duration: "1h 20m",
        lessons: [
          { id: 5, title: "Arrow Function Basics", type: "video", duration: "20m", completed: false },
          { id: 6, title: "Template Literals", type: "video", duration: "15m", completed: false },
          { id: 7, title: "Destructuring", type: "video", duration: "25m", completed: false },
          { id: 8, title: "Coding Challenge", type: "exercise", duration: "20m", completed: false }
        ]
      },
      {
        id: 3,
        title: "Async Programming",
        duration: "2h 15m",
        lessons: [
          { id: 9, title: "Promises Introduction", type: "video", duration: "30m", completed: false },
          { id: 10, title: "Async/Await", type: "video", duration: "35m", completed: false },
          { id: 11, title: "Error Handling", type: "video", duration: "25m", completed: false },
          { id: 12, title: "Real-world Examples", type: "video", duration: "45m", completed: false }
        ]
      }
    ],
    progress: 25,
    enrolledAt: "2024-01-15",
    lastAccessed: "2024-01-20",
    certificate: true,
    image: "/modern-web-dev-thumbnail.png"
  }

  useEffect(() => {
    // Simulate API call to get course data
    setCourse(mockCourse)
    
    // Load lesson progress from localStorage
    const savedProgress = localStorage.getItem(`course-${courseId}-progress`)
    if (savedProgress) {
      setLessonProgress(JSON.parse(savedProgress))
    }
  }, [courseId])

  const handleLessonComplete = (moduleIndex, lessonIndex) => {
    const lessonId = course.modules[moduleIndex].lessons[lessonIndex].id
    const newProgress = { ...lessonProgress, [lessonId]: true }
    setLessonProgress(newProgress)
    localStorage.setItem(`course-${courseId}-progress`, JSON.stringify(newProgress))
    
    // Auto-advance to next lesson if available
    if (lessonIndex < course.modules[moduleIndex].lessons.length - 1) {
      setCurrentLesson(lessonIndex + 1)
    } else if (moduleIndex < course.modules.length - 1) {
      setCurrentModule(moduleIndex + 1)
      setCurrentLesson(0)
    }
  }

  const getOverallProgress = () => {
    if (!course) return 0
    const totalLessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0)
    const completedLessons = Object.keys(lessonProgress).length
    return Math.round((completedLessons / totalLessons) * 100)
  }

  const getCurrentLesson = () => {
    if (!course) return null
    return course.modules[currentModule]?.lessons[currentLesson]
  }

  const getNextLesson = () => {
    if (!course) return null
    if (currentLesson < course.modules[currentModule].lessons.length - 1) {
      return { module: currentModule, lesson: currentLesson + 1 }
    } else if (currentModule < course.modules.length - 1) {
      return { module: currentModule + 1, lesson: 0 }
    }
    return null
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading course...</p>
        </div>
      </div>
    )
  }

  const currentLessonData = getCurrentLesson()
  const nextLesson = getNextLesson()
  const overallProgress = getOverallProgress()

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title={course.title} 
        subtitle={`${course.category} • ${course.instructor}`}
        icon={<BookOpen className="w-6 h-6 text-primary-foreground" />}
      >
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>
      </Header>

      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Course Overview */}
        <section className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Course Image */}
                <div className="w-full lg:w-64 h-48 lg:h-64 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Course Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-card-foreground mb-2">{course.title}</h1>
                      <p className="text-muted-foreground mb-4">{course.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Bookmark className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium">{course.duration}</p>
                      <p className="text-xs text-muted-foreground">Duration</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Users className="w-5 h-5 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium">{course.students}</p>
                      <p className="text-xs text-muted-foreground">Students</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Star className="w-5 h-5 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium">{course.rating}</p>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Target className="w-5 h-5 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium">{course.level}</p>
                      <p className="text-xs text-muted-foreground">Level</p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm text-muted-foreground">{overallProgress}%</span>
                    </div>
                    <Progress value={overallProgress} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Enrolled: {new Date(course.enrolledAt).toLocaleDateString()}</span>
                      <span>Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Course Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Lesson */}
            {currentLessonData && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-card-foreground">
                      {currentLessonData.title}
                    </h2>
                    <Badge variant="secondary">
                      {currentLessonData.type === 'video' ? 'Video' : 'Exercise'}
                    </Badge>
                  </div>

                  {/* Video Player Placeholder */}
                  <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <Play className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Video Player</p>
                      <p className="text-sm text-muted-foreground">Duration: {currentLessonData.duration}</p>
                    </div>
                  </div>

                  {/* Lesson Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {isPlaying ? 'Pause' : 'Play'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    <Button
                      onClick={() => handleLessonComplete(currentModule, currentLesson)}
                      disabled={lessonProgress[currentLessonData.id]}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {lessonProgress[currentLessonData.id] ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark Complete
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Notes Section */}
                  <div className="mt-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowNotes(!showNotes)}
                      className="mb-3"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      {showNotes ? 'Hide Notes' : 'Show Notes'}
                    </Button>
                    {showNotes && (
                      <textarea
                        placeholder="Take notes here..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full h-32 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    disabled={currentModule === 0 && currentLesson === 0}
                    onClick={() => {
                      if (currentLesson > 0) {
                        setCurrentLesson(currentLesson - 1)
                      } else if (currentModule > 0) {
                        setCurrentModule(currentModule - 1)
                        setCurrentLesson(course.modules[currentModule - 1].lessons.length - 1)
                      }
                    }}
                  >
                    Previous
                  </Button>
                  
                  <span className="text-sm text-muted-foreground">
                    {currentModule + 1} of {course.modules.length} • {currentLesson + 1} of {course.modules[currentModule]?.lessons.length}
                  </span>

                  <Button
                    variant="outline"
                    disabled={!nextLesson}
                    onClick={() => {
                      if (nextLesson) {
                        setCurrentModule(nextLesson.module)
                        setCurrentLesson(nextLesson.lesson)
                      }
                    }}
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course Modules Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-card-foreground mb-4">Course Modules</h3>
                <div className="space-y-3">
                  {course.modules.map((module, moduleIndex) => (
                    <div key={module.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm text-card-foreground">
                          {moduleIndex + 1}. {module.title}
                        </h4>
                        <span className="text-xs text-muted-foreground">{module.duration}</span>
                      </div>
                      
                      <div className="space-y-1 ml-4">
                        {module.lessons.map((lesson, lessonIndex) => {
                          const isCompleted = lessonProgress[lesson.id]
                          const isCurrent = moduleIndex === currentModule && lessonIndex === currentLesson
                          
                          return (
                            <button
                              key={lesson.id}
                              onClick={() => {
                                setCurrentModule(moduleIndex)
                                setCurrentLesson(lessonIndex)
                              }}
                              className={`w-full text-left p-2 rounded text-sm transition-colors ${
                                isCurrent 
                                  ? 'bg-primary text-primary-foreground' 
                                  : isCompleted 
                                    ? 'text-green-600 dark:text-green-400' 
                                    : 'text-muted-foreground hover:text-card-foreground'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                {isCompleted ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : lesson.type === 'video' ? (
                                  <Video className="w-4 h-4" />
                                ) : (
                                  <FileText className="w-4 h-4" />
                                )}
                                <span className="truncate">{lesson.title}</span>
                                <span className="text-xs ml-auto">{lesson.duration}</span>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Certificate */}
            {course.certificate && (
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <Award className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold text-card-foreground mb-2">Course Certificate</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Complete all modules to earn your certificate
                    </p>
                    <Progress value={overallProgress} className="h-2 mb-3" />
                    <p className="text-xs text-muted-foreground">
                      {overallProgress}% complete
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

