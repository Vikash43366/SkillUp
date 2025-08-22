import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent } from "../components/ui/card.jsx"
import { Button } from "../components/ui/button.jsx"
import { Badge } from "../components/ui/badge.jsx"
import { Progress } from "../components/ui/progress.jsx"
import { Header } from "../components/ui/header.jsx"
import { 
  Clock, 
  Target, 
  CheckCircle, 
  XCircle, 
  ArrowLeft,
  AlertTriangle,
  Timer,
  BookOpen
} from "lucide-react"

export default function TestPage() {
  const { testId } = useParams()
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [isTestComplete, setIsTestComplete] = useState(false)
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false)

  // Mock test data - in real app this would come from API
  const mockTest = {
    id: parseInt(testId),
    title: "JavaScript Fundamentals Quiz",
    category: "JavaScript",
    duration: 30,
    questions: 25,
    dueDate: "2024-01-25",
    questions: [
      {
        id: 1,
        question: "What is the correct way to declare a variable in JavaScript?",
        type: "multiple-choice",
        options: [
          "var x = 5;",
          "variable x = 5;",
          "v x = 5;",
          "let x = 5;"
        ],
        correctAnswer: 3,
        explanation: "The correct way to declare a variable in modern JavaScript is using 'let' or 'const'. 'var' is the old way and has function scope issues."
      },
      {
        id: 2,
        question: "Which of the following is NOT a JavaScript data type?",
        type: "multiple-choice",
        options: [
          "String",
          "Boolean",
          "Integer",
          "Object"
        ],
        correctAnswer: 2,
        explanation: "JavaScript doesn't have a separate 'Integer' type. It only has 'Number' which represents both integers and floating-point numbers."
      },
      {
        id: 3,
        question: "What does the 'typeof' operator return for an array?",
        type: "multiple-choice",
        options: [
          "array",
          "Array",
          "object",
          "undefined"
        ],
        correctAnswer: 2,
        explanation: "In JavaScript, arrays are objects, so typeof returns 'object'. To check if something is an array, use Array.isArray()."
      },
      {
        id: 4,
        question: "How do you add a comment in JavaScript?",
        type: "multiple-choice",
        options: [
          "<!-- Comment -->",
          "// Comment",
          "/* Comment */",
          "Both B and C"
        ],
        correctAnswer: 3,
        explanation: "JavaScript supports both single-line comments (//) and multi-line comments (/* */)."
      },
      {
        id: 5,
        question: "What is the result of: console.log(2 + '2')?",
        type: "multiple-choice",
        options: [
          "4",
          "22",
          "NaN",
          "Error"
        ],
        correctAnswer: 1,
        explanation: "When you add a number and a string, JavaScript converts the number to a string and concatenates them, resulting in '22'."
      }
    ]
  }

  useEffect(() => {
    // Set initial time
    setTimeLeft(mockTest.duration * 60)
    
    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmitTest()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestion < mockTest.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleSubmitTest = () => {
    setIsTestComplete(true)
    // In real app, submit answers to API
    console.log("Test submitted with answers:", answers)
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getProgress = () => {
    return Math.round((Object.keys(answers).length / mockTest.questions.length) * 100)
  }

  const currentQuestionData = mockTest.questions[currentQuestion]

  if (isTestComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          title="Test Complete" 
          subtitle="Results Summary"
          icon={<CheckCircle className="w-6 h-6 text-primary-foreground" />}
        >
          <Button variant="ghost" size="sm" onClick={() => navigate('/tests')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tests
          </Button>
        </Header>

        <main className="container mx-auto px-4 py-6 pb-20">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-card-foreground mb-2">
                Test Submitted Successfully!
              </h2>
              <p className="text-muted-foreground mb-6">
                Your answers have been recorded. You can view your results in the tests section.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{getProgress()}%</div>
                  <div className="text-sm text-muted-foreground">Questions Answered</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{formatTime(mockTest.duration * 60 - timeLeft)}</div>
                  <div className="text-sm text-muted-foreground">Time Used</div>
                </div>
              </div>
              <Button onClick={() => navigate('/tests')} className="w-full">
                Return to Tests
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title={mockTest.title} 
        subtitle={`${mockTest.category} • ${mockTest.questions.length} questions`}
        icon={<BookOpen className="w-6 h-6 text-primary-foreground" />}
      >
        <Button variant="ghost" size="sm" onClick={() => navigate('/tests')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tests
        </Button>
      </Header>

      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Test Header */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Timer className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-card-foreground">
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">
                    Question {currentQuestion + 1} of {mockTest.questions.length}
                  </span>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowConfirmSubmit(true)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Submit Test
              </Button>
            </div>
            <Progress value={getProgress()} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Progress: {getProgress()}%</span>
              <span>{Object.keys(answers).length} of {mockTest.questions.length} answered</span>
            </div>
          </CardContent>
        </Card>

        {/* Current Question */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="mb-6">
              <Badge variant="secondary" className="mb-3">
                Question {currentQuestion + 1}
              </Badge>
              <h3 className="text-lg font-semibold text-card-foreground mb-4">
                {currentQuestionData.question}
              </h3>
            </div>

            <div className="space-y-3">
              {currentQuestionData.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                    answers[currentQuestionData.id] === index
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestionData.id}`}
                    value={index}
                    checked={answers[currentQuestionData.id] === index}
                    onChange={() => handleAnswerSelect(currentQuestionData.id, index)}
                    className="text-primary"
                  />
                  <span className="text-card-foreground">{option}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              
              <div className="flex items-center space-x-2">
                {mockTest.questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                      index === currentQuestion
                        ? 'bg-primary text-primary-foreground'
                        : answers[mockTest.questions[index].id] !== undefined
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <Button
                onClick={handleNextQuestion}
                disabled={currentQuestion === mockTest.questions.length - 1}
                className="bg-primary hover:bg-primary/90"
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Confirm Submit Dialog */}
        {showConfirmSubmit && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                  <h3 className="font-semibold text-lg text-card-foreground">
                    Submit Test?
                  </h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Are you sure you want to submit your test? You won't be able to change your answers after submission.
                </p>
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    onClick={() => setShowConfirmSubmit(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-destructive hover:bg-destructive/90"
                    onClick={handleSubmitTest}
                  >
                    Submit Test
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
