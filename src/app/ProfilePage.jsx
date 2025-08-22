import React, { useState } from "react"
import { Card, CardContent } from "../components/ui/card.jsx"
import { Button } from "../components/ui/button.jsx"
import { Badge } from "../components/ui/badge.jsx"
import { Progress } from "../components/ui/progress.jsx"
import { Header } from "../components/ui/header.jsx"
import { Input } from "../components/ui/input.jsx"
import { Dialog, DialogContent, DialogFooter } from "../components/ui/dialog.jsx"
import { User, Settings, LogOut, Trophy, Target, Award, BookOpen, Calendar, Star, Edit, Camera, CreditCard, Shield, Bell, Palette, Globe, Lock, Download, Upload, HelpCircle, MessageCircle, Phone, Mail, FileText, Video, ExternalLink } from "lucide-react"

export default function ProfilePage() {
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [activeSettingsTab, setActiveSettingsTab] = useState("profile")
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  const userProfile = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder-user.jpg",
    level: 12,
    experience: 2450,
    nextLevelExp: 3000,
    joinDate: "March 2024",
    bio: "Passionate learner focused on web development and design. Always eager to explore new technologies and improve my skills.",
    location: "San Francisco, CA",
    timezone: "Pacific Time (PT)",
    language: "English",
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: false
    },
    privacy: {
      profilePublic: true,
      showProgress: true,
      showAchievements: true,
      allowMessages: true
    }
  }

  const bankDetails = {
    accountHolder: "Alex Johnson",
    accountNumber: "**** **** **** 1234",
    bankName: "Chase Bank",
    routingNumber: "021000021",
    accountType: "Checking"
  }

  const achievements = [
    { id: 1, name: "First Course", description: "Completed your first course", icon: <BookOpen className="w-4 h-4" />, unlocked: true },
    { id: 2, name: "Streak Master", description: "Maintained a 7-day study streak", icon: <Target className="w-4 h-4" />, unlocked: true },
    { id: 3, name: "Perfect Score", description: "Achieved 100% on any test", icon: <Star className="w-4 h-4" />, unlocked: false },
    { id: 4, name: "Course Collector", description: "Enrolled in 10 courses", icon: <Award className="w-4 h-4" />, unlocked: false },
  ]

  const stats = [
    { label: "Courses Completed", value: "8", icon: <BookOpen className="w-4 h-4" /> },
    { label: "Tests Passed", value: "12", icon: <Trophy className="w-4 h-4" /> },
    { label: "Study Hours", value: "156", icon: <Calendar className="w-4 h-4" /> },
    { label: "Certificates", value: "5", icon: <Award className="w-4 h-4" /> },
  ]

  const handleEditProfile = () => {
    setShowEditProfile(true)
  }

  const handleSaveProfile = () => {
    alert("Profile updated successfully!")
    setShowEditProfile(false)
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      alert("Logged out successfully!")
    }
  }

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setIsUploadingPhoto(true)
      // Simulate upload
      setTimeout(() => {
        setIsUploadingPhoto(false)
        alert("Profile photo updated successfully!")
      }, 2000)
    }
  }

  const experienceProgress = (userProfile.experience / userProfile.nextLevelExp) * 100

  const SettingsTab = ({ id, icon, title, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
        active === id 
          ? 'bg-primary text-primary-foreground' 
          : 'hover:bg-muted text-muted-foreground hover:text-card-foreground'
      }`}
    >
      {icon}
      <span className="font-medium">{title}</span>
    </button>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header title="Profile" subtitle="Your Learning Journey" icon={<User className="w-6 h-6 text-primary-foreground" />} />

      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Profile Header */}
        <section className="mb-6">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-20 h-20 rounded-full border-4 border-white/20 group-hover:opacity-80 transition-opacity cursor-pointer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <label className="cursor-pointer">
                      <Camera className="w-8 h-8 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {isUploadingPhoto && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  {/* Edit button overlay */}
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute -bottom-1 -right-1 w-8 h-8 p-0 rounded-full bg-white/90 hover:bg-white text-primary border-2 border-white"
                    onClick={() => document.getElementById('header-photo-upload').click()}
                  >
                    <Edit className="w-4 h-4" />
                    <input
                      id="header-photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </Button>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-1">{userProfile.name}</h2>
                  <p className="text-primary-foreground/80 mb-2">{userProfile.email}</p>
                  <div className="flex items-center space-x-4 text-sm mb-2">
                    <div className="flex items-center space-x-1">
                      <Trophy className="w-4 h-4" />
                      <span>Level {userProfile.level}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {userProfile.joinDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Globe className="w-4 h-4" />
                      <span>{userProfile.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Bell className="w-4 h-4" />
                      <span>{userProfile.timezone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Experience Progress */}
        <section className="mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-card-foreground">Experience Progress</h3>
                <span className="text-sm text-muted-foreground">
                  {userProfile.experience} / {userProfile.nextLevelExp} XP
                </span>
              </div>
              <Progress value={experienceProgress} className="mb-2" />
              <p className="text-xs text-muted-foreground">
                {userProfile.nextLevelExp - userProfile.experience} XP needed for next level
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Stats Grid */}
        <section className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <CardContent className="p-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2 text-primary">
                    {stat.icon}
                  </div>
                  <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Bio */}
        <section className="mb-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-card-foreground mb-2">About Me</h3>
              <p className="text-sm text-muted-foreground">{userProfile.bio}</p>
            </CardContent>
          </Card>
        </section>

        {/* Achievements */}
        <section className="mb-6">
          <h3 className="font-heading text-lg font-semibold text-card-foreground mb-4">Achievements</h3>
          <div className="grid grid-cols-1 gap-3">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={`${achievement.unlocked ? 'opacity-100' : 'opacity-50'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      achievement.unlocked ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-card-foreground">{achievement.name}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Unlocked
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Settings & Actions */}
        <section>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={() => setShowSettings(true)}>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => setShowHelp(true)}>
              <HelpCircle className="w-4 h-4 mr-2" />
              Help & Support
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </section>

        {/* Edit Profile Modal */}
        {showEditProfile && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardContent className="p-6">
                <h3 className="font-heading text-lg font-semibold mb-4">Edit Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Display Name
                    </label>
                    <Input
                      type="text"
                      defaultValue={userProfile.name}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Bio
                    </label>
                    <textarea
                      defaultValue={userProfile.bio}
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-card-foreground"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" className="flex-1" onClick={() => setShowEditProfile(false)}>
                      Cancel
                    </Button>
                    <Button className="flex-1" onClick={handleSaveProfile}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Settings Dialog */}
        <Dialog isOpen={showSettings} onClose={() => setShowSettings(false)}>
          <DialogContent className="max-w-4xl h-full max-h-[95vh] overflow-hidden">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-border shrink-0">
              <h3 className="font-semibold text-lg text-card-foreground">Settings</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowSettings(false)}>
                ×
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row flex-1 min-h-0">
              {/* Settings Sidebar - Hidden on mobile, shown on desktop */}
              <div className="hidden md:block w-64 border-r border-border pr-4 space-y-2 shrink-0">
                <h3 className="font-semibold text-lg text-card-foreground mb-4 px-2">Settings</h3>
                <SettingsTab
                  id="profile"
                  icon={<User className="w-4 h-4" />}
                  title="Profile"
                  active={activeSettingsTab}
                  onClick={setActiveSettingsTab}
                />
                <SettingsTab
                  id="account"
                  icon={<Shield className="w-4 h-4" />}
                  title="Account & Security"
                  active={activeSettingsTab}
                  onClick={setActiveSettingsTab}
                />
                <SettingsTab
                  id="banking"
                  icon={<CreditCard className="w-4 h-4" />}
                  title="Banking & Payments"
                  active={activeSettingsTab}
                  onClick={setActiveSettingsTab}
                />
                <SettingsTab
                  id="notifications"
                  icon={<Bell className="w-4 h-4" />}
                  title="Notifications"
                  active={activeSettingsTab}
                  onClick={setActiveSettingsTab}
                />
                <SettingsTab
                  id="privacy"
                  icon={<Lock className="w-4 h-4" />}
                  title="Privacy"
                  active={activeSettingsTab}
                  onClick={setActiveSettingsTab}
                />
                <SettingsTab
                  id="appearance"
                  icon={<Palette className="w-4 h-4" />}
                  title="Appearance"
                  active={activeSettingsTab}
                  onClick={setActiveSettingsTab}
                />
                <SettingsTab
                  id="language"
                  icon={<Globe className="w-4 h-4" />}
                  title="Language & Region"
                  active={activeSettingsTab}
                  onClick={setActiveSettingsTab}
                />
              </div>

              {/* Mobile Tab Navigation */}
              <div className="md:hidden border-b border-border shrink-0">
                <div className="flex overflow-x-auto space-x-1 p-2">
                  {[
                    { id: "profile", icon: <User className="w-4 h-4" />, title: "Profile" },
                    { id: "banking", icon: <CreditCard className="w-4 h-4" />, title: "Banking" },
                    { id: "notifications", icon: <Bell className="w-4 h-4" />, title: "Notifications" },
                    { id: "privacy", icon: <Lock className="w-4 h-4" />, title: "Privacy" },
                    { id: "language", icon: <Globe className="w-4 h-4" />, title: "Language" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSettingsTab(tab.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                        activeSettingsTab === tab.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted text-muted-foreground hover:text-card-foreground'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Settings Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 md:pl-6 md:pr-0 min-h-0">
                {activeSettingsTab === "profile" && (
                  <div className="space-y-6 pb-4">
                    <h4 className="text-xl font-semibold text-card-foreground">Profile Settings</h4>
                    
                    {/* Profile Photo */}
                    <div className="space-y-4">
                      <h5 className="font-medium text-card-foreground">Profile Photo</h5>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <img
                          src={userProfile.avatar}
                          alt="Profile"
                          className="w-20 h-20 rounded-full border-2 border-border mx-auto sm:mx-0"
                        />
                        <div className="space-y-2 flex-1 text-center sm:text-left">
                          <Button 
                            onClick={() => document.getElementById('photo-upload').click()}
                            className="w-full sm:w-auto"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload New Photo
                          </Button>
                          <input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                          <p className="text-sm text-muted-foreground">
                            JPG, PNG or GIF. Max size 2MB.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h5 className="font-medium text-card-foreground">Personal Information</h5>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-card-foreground mb-2">
                            Full Name
                          </label>
                          <Input defaultValue={userProfile.name} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-card-foreground mb-2">
                            Email
                          </label>
                          <Input type="email" defaultValue={userProfile.email} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-card-foreground mb-2">
                            Phone
                          </label>
                          <Input defaultValue={userProfile.phone} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-card-foreground mb-2">
                            Location
                          </label>
                          <Input defaultValue={userProfile.location} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Bio
                        </label>
                        <textarea
                          defaultValue={userProfile.bio}
                          rows={4}
                          className="w-full px-3 py-2 border border-border rounded-md bg-background text-card-foreground resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeSettingsTab === "banking" && (
                  <div className="space-y-6 pb-4">
                    <h4 className="text-xl font-semibold text-card-foreground">Banking & Payments</h4>
                    
                    {/* Current Bank Details */}
                    <div className="space-y-4">
                      <h5 className="font-medium text-card-foreground">Current Bank Account</h5>
                      <Card>
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                              <span className="text-sm text-muted-foreground">Account Holder</span>
                              <p className="font-medium">{bankDetails.accountHolder}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                              <span className="text-sm text-muted-foreground">Account Number</span>
                              <p className="font-medium">{bankDetails.accountNumber}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                              <span className="text-sm text-muted-foreground">Bank Name</span>
                              <p className="font-medium">{bankDetails.bankName}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                              <span className="text-sm text-muted-foreground">Account Type</span>
                              <p className="font-medium">{bankDetails.accountType}</p>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
                            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                              <Download className="w-4 h-4 mr-2" />
                              Download Statement
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Add New Bank Account */}
                    <div className="space-y-4">
                      <h5 className="font-medium text-card-foreground">Add New Bank Account</h5>
                      <Card>
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-card-foreground mb-2">
                                Account Holder Name
                              </label>
                              <Input placeholder="Enter full name" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-card-foreground mb-2">
                                Account Number
                              </label>
                              <Input placeholder="Enter account number" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-card-foreground mb-2">
                                Bank Name
                              </label>
                              <Input placeholder="Enter bank name" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-card-foreground mb-2">
                                Routing Number
                              </label>
                              <Input placeholder="Enter routing number" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-card-foreground mb-2">
                                Account Type
                              </label>
                              <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-card-foreground">
                                <option>Checking</option>
                                <option>Savings</option>
                                <option>Business</option>
                              </select>
                            </div>
                          </div>
                          <Button className="w-full mt-4">
                            <CreditCard className="w-4 h-4 mr-2" />
                            Add Bank Account
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Add UPI ID */}
                    <div className="space-y-4">
                      <h5 className="font-medium text-card-foreground">Add UPI ID</h5>
                      <Card>
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-card-foreground mb-2">
                                UPI ID
                              </label>
                              <Input placeholder="Enter UPI ID (e.g., username@bank)" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-card-foreground mb-2">
                                UPI App
                              </label>
                              <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-card-foreground">
                                <option>Google Pay</option>
                                <option>PhonePe</option>
                                <option>Paytm</option>
                                <option>BHIM</option>
                                <option>Amazon Pay</option>
                                <option>Other</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-card-foreground mb-2">
                                Account Holder Name
                              </label>
                              <Input placeholder="Enter account holder name" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-card-foreground mb-2">
                                Mobile Number
                              </label>
                              <Input placeholder="Enter registered mobile number" />
                            </div>
                          </div>
                          <Button className="w-full mt-4">
                            <CreditCard className="w-4 h-4 mr-2" />
                            Add UPI ID
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {activeSettingsTab === "notifications" && (
                  <div className="space-y-6 pb-4">
                    <h4 className="text-xl font-semibold text-card-foreground">Notification Preferences</h4>
                    
                    <div className="space-y-4">
                      {Object.entries(userProfile.notifications).map(([key, value]) => (
                        <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-border rounded-lg space-y-3 sm:space-y-0">
                          <div className="flex-1">
                            <h6 className="font-medium text-card-foreground capitalize">
                              {key === 'push' ? 'Push Notifications' : key === 'sms' ? 'SMS' : key === 'marketing' ? 'Marketing Emails' : 'Email Notifications'}
                            </h6>
                            <p className="text-sm text-muted-foreground">
                              {key === 'push' ? 'Receive notifications on your device' : 
                               key === 'sms' ? 'Get updates via text message' : 
                               key === 'marketing' ? 'Receive promotional content' : 
                               'Get important updates via email'}
                            </p>
                          </div>
                          <Button
                            variant={value ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              // Toggle notification setting
                              userProfile.notifications[key] = !value
                            }}
                            className="w-full sm:w-auto"
                          >
                            {value ? "Enabled" : "Disabled"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSettingsTab === "privacy" && (
                  <div className="space-y-6 pb-4">
                    <h4 className="text-xl font-semibold text-card-foreground">Privacy Settings</h4>
                    
                    <div className="space-y-4">
                      {Object.entries(userProfile.privacy).map(([key, value]) => (
                        <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-border rounded-lg space-y-3 sm:space-y-0">
                          <div className="flex-1">
                            <h6 className="font-medium text-card-foreground capitalize">
                              {key === 'profilePublic' ? 'Public Profile' : 
                               key === 'showProgress' ? 'Show Learning Progress' : 
                               key === 'showAchievements' ? 'Show Achievements' : 
                               'Allow Messages'}
                            </h6>
                            <p className="text-sm text-muted-foreground">
                              {key === 'profilePublic' ? 'Make your profile visible to other users' : 
                               key === 'showProgress' ? 'Display your course progress publicly' : 
                               key === 'showAchievements' ? 'Show your unlocked achievements' : 
                               'Allow other users to send you messages'}
                            </p>
                          </div>
                          <Button
                            variant={value ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              // Toggle privacy setting
                              userProfile.privacy[key] = !value
                            }}
                            className="w-full sm:w-auto"
                          >
                            {value ? "Public" : "Private"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSettingsTab === "language" && (
                  <div className="space-y-6 pb-4">
                    <h4 className="text-xl font-semibold text-card-foreground">Language & Region</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Language
                        </label>
                        <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-card-foreground">
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                          <option>Chinese</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Timezone
                        </label>
                        <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-card-foreground">
                          <option>Pacific Time (PT)</option>
                          <option>Mountain Time (MT)</option>
                          <option>Central Time (CT)</option>
                          <option>Eastern Time (ET)</option>
                          <option>UTC</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Date Format
                        </label>
                        <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-card-foreground">
                          <option>MM/DD/YYYY</option>
                          <option>DD/MM/YYYY</option>
                          <option>YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Default content for other tabs */}
                {!["profile", "banking", "notifications", "privacy", "language"].includes(activeSettingsTab) && (
                  <div className="space-y-6 pb-4">
                    <h4 className="text-xl font-semibold text-card-foreground capitalize">
                      {activeSettingsTab} Settings
                    </h4>
                    <p className="text-muted-foreground">
                      Settings for {activeSettingsTab} will be available soon.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettings(false)} className="flex-1 sm:flex-none">
              Close
            </Button>
            <Button onClick={() => {
              alert("Settings saved successfully!")
              setShowSettings(false)
            }} className="flex-1 sm:flex-none">
              Save Changes
            </Button>
          </DialogFooter>
        </Dialog>

        {/* Help & Support Dialog */}
        <Dialog isOpen={showHelp} onClose={() => setShowHelp(false)}>
          <DialogContent className="max-w-4xl h-full max-h-[95vh] overflow-hidden">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-border shrink-0">
              <h3 className="font-semibold text-lg text-card-foreground">Help & Support</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowHelp(false)}>
                ×
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 md:p-6 min-h-0">
              {/* Quick Help Options */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-card-foreground">Quick Help</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <HelpCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h6 className="font-medium text-card-foreground">FAQ</h6>
                          <p className="text-sm text-muted-foreground">Find answers to common questions</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <BookOpen className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h6 className="font-medium text-card-foreground">User Guide</h6>
                          <p className="text-sm text-muted-foreground">Learn how to use the platform</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Video className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h6 className="font-medium text-card-foreground">Video Tutorials</h6>
                          <p className="text-sm text-muted-foreground">Watch step-by-step guides</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <FileText className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <h6 className="font-medium text-card-foreground">Documentation</h6>
                          <p className="text-sm text-muted-foreground">Technical documentation</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact Support */}
              <div className="space-y-4 mt-8">
                <h5 className="font-medium text-card-foreground">Contact Support</h5>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <MessageCircle className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h6 className="font-medium text-card-foreground">Live Chat</h6>
                        <p className="text-sm text-muted-foreground">Chat with support team</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Start Chat
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Mail className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h6 className="font-medium text-card-foreground">Email Support</h6>
                        <p className="text-sm text-muted-foreground">support@skillup.com</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Send Email
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Phone className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <h6 className="font-medium text-card-foreground">Phone Support</h6>
                        <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Call Now
                    </Button>
                  </div>
                </div>
              </div>

              {/* Support Ticket */}
              <div className="space-y-4 mt-8">
                <h5 className="font-medium text-card-foreground">Create Support Ticket</h5>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Subject
                        </label>
                        <Input placeholder="Brief description of your issue" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Category
                        </label>
                        <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-card-foreground">
                          <option>Technical Issue</option>
                          <option>Billing Question</option>
                          <option>Course Content</option>
                          <option>Account Access</option>
                          <option>General Inquiry</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Priority
                        </label>
                        <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-card-foreground">
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                          <option>Urgent</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Description
                        </label>
                        <textarea
                          placeholder="Please describe your issue in detail..."
                          rows={4}
                          className="w-full px-3 py-2 border border-border rounded-md bg-background text-card-foreground resize-none"
                        />
                      </div>
                      <Button className="w-full">
                        <FileText className="w-4 h-4 mr-2" />
                        Submit Ticket
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Helpful Links */}
              <div className="space-y-4 mt-8">
                <h5 className="font-medium text-card-foreground">Helpful Links</h5>
                <div className="space-y-2">
                  <a href="#" className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                    <div className="flex items-center space-x-3">
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      <span className="text-card-foreground">Community Forum</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </a>
                  
                  <a href="#" className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                    <div className="flex items-center space-x-3">
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      <span className="text-card-foreground">Video Library</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </a>
                  
                  <a href="#" className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                    <div className="flex items-center space-x-3">
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      <span className="text-card-foreground">Knowledge Base</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </a>
                </div>
              </div>
            </div>
          </DialogContent>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowHelp(false)} className="flex-1 sm:flex-none">
              Close
            </Button>
          </DialogFooter>
        </Dialog>
      </main>
    </div>
  )
}
