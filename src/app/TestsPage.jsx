import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "../components/ui/card.jsx"
import { Button } from "../components/ui/button.jsx"
import { Badge } from "../components/ui/badge.jsx"
import { Progress } from "../components/ui/progress.jsx"
import { Header } from "../components/ui/header.jsx"
import { Trophy, Clock, AlertCircle, CheckCircle, Play, Calendar, Target, Award, Star, XCircle } from "lucide-react"

export default function TestsPage() {
  const navigate = useNavigate()
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [resultsDialog, setResultsDialog] = useState({ isOpen: false, test: null })

  const filters = [
    { id: "all", name: "All Tests", count: 8 },
    { id: "upcoming", name: "Upcoming", count: 3 },
    { id: "completed", name: "Completed", count: 5 },
  ]

  const tests = [
    {
      id: 1,
      title: "JavaScript Fundamentals Quiz",
      category: "Web Development",
      dueDate: "2 days",
      questions: 25,
      duration: "45 min",
      status: "upcoming",
      difficulty: "Intermediate",
      score: null,
    },
    {
      id: 2,
      title: "React Components Assessment",
      category: "Web Development",
      dueDate: "5 days",
      questions: 15,
      duration: "30 min",
      status: "upcoming",
      difficulty: "Advanced",
      score: null,
    },
    {
      id: 3,
      title: "CSS Layout Mastery",
      category: "Design",
      dueDate: "Completed",
      questions: 20,
      duration: "40 min",
      status: "completed",
      difficulty: "Beginner",
      score: 85,
    },
    {
      id: 4,
      title: "Python Basics Test",
      category: "Programming",
      dueDate: "Completed",
      questions: 30,
      duration: "60 min",
      status: "completed",
      difficulty: "Beginner",
      score: 92,
    },
    {
      id: 5,
      title: "UI/UX Design Principles",
      category: "Design",
      dueDate: "1 week",
      questions: 18,
      duration: "35 min",
      status: "upcoming",
      difficulty: "Intermediate",
      score: null,
    },
  ]

  const filteredTests = tests.filter((test) => {
    if (selectedFilter === "all") return true
    return test.status === selectedFilter
  })

  const handleStartTest = (test) => {
    if (test.status === "upcoming") {
      navigate(`/test/${test.id}`)
    } else {
      setResultsDialog({ isOpen: true, test })
    }
  }

  const handleViewResults = (test) => {
    setResultsDialog({ isOpen: true, test })
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "upcoming":
        return <Clock className="w-4 h-4 text-orange-500" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-blue-500" />
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Tests" subtitle="Assessments & Quizzes" icon={<Trophy className="w-6 h-6 text-primary-foreground" />} />

      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Stats Overview */}
        <section className="mb-6">
          <div className="grid grid-cols-3 gap-4">
            <Card className="text-center">
              <CardContent className="p-4">
                <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-card-foreground">8</p>
                <p className="text-xs text-muted-foreground">Total Tests</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <Target className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold text-card-foreground">3</p>
                <p className="text-xs text-muted-foreground">Upcoming</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <Award className="w-6 h-6 text-secondary mx-auto mb-2" />
                <p className="text-2xl font-bold text-card-foreground">88.5%</p>
                <p className="text-xs text-muted-foreground">Avg Score</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="mb-6">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.id)}
                className="whitespace-nowrap"
              >
                {filter.name} ({filter.count})
              </Button>
            ))}
          </div>
        </section>

        {/* Tests List */}
        <section>
          <div className="space-y-3">
            {filteredTests.map((test) => (
              <Card key={test.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                      {getStatusIcon(test.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold text-card-foreground">{test.title}</h4>
                        <Badge className={`text-xs ${getDifficultyColor(test.difficulty)}`}>
                          {test.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{test.category}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{test.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="w-3 h-3" />
                          <span>{test.questions} questions</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{test.dueDate}</span>
                        </div>
                      </div>
                      {test.status === "completed" && (
                        <div className="mb-2">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Score</span>
                            <span className="font-semibold text-card-foreground">{test.score}%</span>
                          </div>
                          <Progress value={test.score} className="h-2" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2">
                      {test.status === "upcoming" ? (
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90"
                          onClick={() => handleStartTest(test)}
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Start
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewResults(test)}
                        >
                          View Results
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTests.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-card-foreground mb-2">No tests found</h3>
              <p className="text-muted-foreground">Try selecting a different filter</p>
            </div>
          )}
        </section>
      </main>

      {/* Results Dialog */}
      {resultsDialog.isOpen && resultsDialog.test && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] flex flex-col">
            <CardContent className="p-6 overflow-y-auto flex-1">
              <div className="flex items-center justify-between mb-4 sticky top-0 bg-card pb-2">
                <h3 className="text-lg md:text-xl font-semibold text-card-foreground pr-4">
                  Test Results: {resultsDialog.test.title}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setResultsDialog({ isOpen: false, test: null })}
                  className="flex-shrink-0"
                >
                  ×
                </Button>
              </div>

              {/* Test Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{resultsDialog.test.score}%</div>
                  <div className="text-sm text-muted-foreground">Final Score</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{resultsDialog.test.questions}</div>
                  <div className="text-sm text-muted-foreground">Total Questions</div>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="mb-6">
                <h4 className="font-semibold text-card-foreground mb-3">Score Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm text-muted-foreground">Correct Answers</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="font-semibold text-card-foreground">
                        {Math.round((resultsDialog.test.score / 100) * resultsDialog.test.questions)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm text-muted-foreground">Incorrect Answers</span>
                    <div className="flex items-center space-x-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="font-semibold text-card-foreground">
                        {resultsDialog.test.questions - Math.round((resultsDialog.test.score / 100) * resultsDialog.test.questions)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Rating */}
              <div className="mb-6">
                <h4 className="font-semibold text-card-foreground mb-3">Performance Rating</h4>
                <div className="flex items-center space-x-2">
                  {resultsDialog.test.score >= 90 ? (
                    <>
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-card-foreground">Excellent! Outstanding performance</span>
                    </>
                  ) : resultsDialog.test.score >= 80 ? (
                    <>
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-card-foreground">Great! Well done</span>
                    </>
                  ) : resultsDialog.test.score >= 70 ? (
                    <>
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-card-foreground">Good! Keep improving</span>
                    </>
                  ) : (
                    <>
                      <Star className="w-5 h-5 fill-gray-400 text-gray-400" />
                      <span className="text-sm font-medium text-card-foreground">Keep practicing to improve</span>
                    </>
                  )}
                </div>
              </div>

              {/* Test Details */}
              <div className="mb-6">
                <h4 className="font-semibold text-card-foreground mb-3">Test Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-muted-foreground sm:w-20 flex-shrink-0">Category:</span>
                    <span className="font-medium text-card-foreground sm:ml-2">{resultsDialog.test.category}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-muted-foreground sm:w-20 flex-shrink-0">Difficulty:</span>
                    <span className="font-medium text-card-foreground sm:ml-2">{resultsDialog.test.difficulty}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-muted-foreground sm:w-20 flex-shrink-0">Duration:</span>
                    <span className="font-medium text-card-foreground sm:ml-2">{resultsDialog.test.duration}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-muted-foreground sm:w-20 flex-shrink-0">Completed:</span>
                    <span className="font-medium text-card-foreground sm:ml-2">{resultsDialog.test.dueDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setResultsDialog({ isOpen: false, test: null })}
                  className="w-full sm:w-auto"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setResultsDialog({ isOpen: false, test: null })
                    navigate(`/test/${resultsDialog.test.id}`)
                  }}
                  className="w-full sm:w-auto"
                >
                  Retake Test
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
