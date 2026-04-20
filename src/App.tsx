import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  ClipboardList, 
  Calendar, 
  Bell, 
  Settings, 
  LogOut,
  Menu,
  X,
  GraduationCap,
  TrendingUp,
  FileText,
  Building2,
  Search,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  Clock,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  DollarSign,
  UserCheck,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart as RePieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { mockGraduates, mockEmploymentRecords, mockSurveys, mockEvents, mockJobPostings, mockNotifications, mockDashboardStats } from '@/data/mockData';
import type { Notification, DashboardStats } from '@/types';

// Auth Types
type UserRole = 'admin' | 'graduate' | 'guest';

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  } | null;
}

// Components
const LoginPage = ({ onLogin }: { onLogin: (role: UserRole) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (email.includes('admin')) {
        onLogin('admin');
      } else {
        onLogin('graduate');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-mu p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Machakos University Graduate Tracking System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>Demo: Use "admin@machakos.ac.ke" for admin access</p>
            <p>Or the email provided by the System Admin</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ 
  role, 
  activeTab, 
  setActiveTab, 
  isOpen, 
  setIsOpen,
  onLogout
}: { 
  role: UserRole; 
  activeTab: string; 
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onLogout: () => void;
}) => {
  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'graduates', label: 'Graduates', icon: Users },
    { id: 'employment', label: 'Employment', icon: Briefcase },
    { id: 'surveys', label: 'Surveys', icon: ClipboardList },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'jobs', label: 'Job Postings', icon: Building2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const graduateMenuItems = [
    { id: 'my-profile', label: 'My Profile', icon: UserCheck },
    { id: 'employment-status', label: 'Employment Status', icon: Briefcase },
    { id: 'surveys-available', label: 'Surveys', icon: ClipboardList },
    { id: 'events-available', label: 'Events', icon: Calendar },
    { id: 'job-opportunities', label: 'Job Opportunities', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const menuItems = role === 'admin' ? adminMenuItems : graduateMenuItems;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">MksU GTS</h1>
            <p className="text-xs text-muted-foreground">Graduate Tracking</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="lg:hidden">
          <X className="w-5 h-5" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 py-4">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {role === 'admin' ? 'AD' : 'JD'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {role === 'admin' ? 'Admin User' : 'John Doe'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {role === 'admin' ? 'admin@machakos.ac.ke' : 'john.doe@email.com'}
            </p>
          </div>
        </div>
        <Button variant="outline" className="w-full" onClick={onLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-card h-screen sticky top-0">
        <SidebarContent />
      </aside>
    </>
  );
};

// Header Component
const Header = ({ 
  title, 
  onMenuClick, 
  notifications 
}: { 
  title: string; 
  onMenuClick: () => void;
  notifications: Notification[];
}) => {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card px-4 lg:px-6">
      <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
        <Menu className="w-5 h-5" />
      </Button>
      
      <h1 className="text-xl font-semibold flex-1">{title}</h1>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
};

// Admin Dashboard
const AdminDashboard = ({ stats }: { stats: DashboardStats }) => {
  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Graduates</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGraduates.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all programs</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Employment Rate</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.employmentRate}%</div>
            <Progress value={stats.employmentRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Employed</CardTitle>
            <Briefcase className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.employedCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 font-medium">+12%</span> from last year
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Salary</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageSalary}</div>
            <p className="text-xs text-muted-foreground">Based on reported data</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Employment by Sector</CardTitle>
            <CardDescription>Distribution of graduates across industries</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie
                  data={stats.sectorDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ sector, percent }) => `${sector}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="sector"
                >
                  {stats.sectorDistribution.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RePieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Year-wise Employment Trends</CardTitle>
            <CardDescription>Graduate employment statistics by year</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.yearWiseStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="hsl(var(--muted-foreground))" name="Total Graduates" />
                <Bar dataKey="employed" fill="hsl(var(--primary))" name="Employed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Employers & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Employers</CardTitle>
            <CardDescription>Companies hiring the most graduates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topEmployers.map((employer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {index + 1}
                    </div>
                    <span className="font-medium">{employer.name}</span>
                  </div>
                  <Badge variant="secondary">{employer.count} graduates</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <Users className="w-6 h-6" />
                <span className="text-sm">Add Graduate</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <ClipboardList className="w-6 h-6" />
                <span className="text-sm">Create Survey</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <Calendar className="w-6 h-6" />
                <span className="text-sm">Add Event</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <FileText className="w-6 h-6" />
                <span className="text-sm">Generate Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Graduates Management
const GraduatesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const filteredGraduates = mockGraduates.filter(graduate => {
    const matchesSearch = 
      graduate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      graduate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      graduate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      graduate.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || graduate.department === selectedDepartment;
    const matchesYear = selectedYear === 'all' || graduate.graduationYear.toString() === selectedYear;
    
    return matchesSearch && matchesDepartment && matchesYear;
  });

  const departments = [...new Set(mockGraduates.map(g => g.department))];
  const years = [...new Set(mockGraduates.map(g => g.graduationYear))].sort((a, b) => b - a);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Graduates</h2>
          <p className="text-muted-foreground">Manage and view graduate information</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Graduate
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or registration number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Graduates Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Graduate</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGraduates.map((graduate) => {
                const employment = mockEmploymentRecords.find(e => e.graduateId === graduate.id);
                return (
                  <TableRow key={graduate.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {graduate.firstName[0]}{graduate.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{graduate.firstName} {graduate.lastName}</p>
                          <p className="text-sm text-muted-foreground">{graduate.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{graduate.course}</TableCell>
                    <TableCell>{graduate.graduationYear}</TableCell>
                    <TableCell>{graduate.department}</TableCell>
                    <TableCell>
                      {employment ? (
                        <Badge variant="default" className="bg-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Employed
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <Clock className="w-3 h-3 mr-1" />
                          Unknown
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Employment Tracking
const EmploymentTracking = () => {
  const [selectedSector, setSelectedSector] = useState('all');
  
  const sectors = [...new Set(mockEmploymentRecords.map(e => e.sector))];
  
  const employmentStats = {
    fullTime: mockEmploymentRecords.filter(e => e.employmentType === 'full-time').length,
    partTime: mockEmploymentRecords.filter(e => e.employmentType === 'part-time').length,
    selfEmployed: mockEmploymentRecords.filter(e => e.employmentType === 'self-employed').length,
    unemployed: mockGraduates.length - mockEmploymentRecords.length,
  };

  const filteredRecords = selectedSector === 'all' 
    ? mockEmploymentRecords 
    : mockEmploymentRecords.filter(e => e.sector === selectedSector);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Employment Tracking</h2>
          <p className="text-muted-foreground">Monitor graduate employment status</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Employment Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Full-Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">{employmentStats.fullTime}</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Part-Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">{employmentStats.partTime}</div>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Self-Employed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-700">{employmentStats.selfEmployed}</div>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-800">Unemployed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-700">{employmentStats.unemployed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Employment Records</CardTitle>
            <CardDescription>Detailed employment information</CardDescription>
          </div>
          <Select value={selectedSector} onValueChange={setSelectedSector}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sectors</SelectItem>
              {sectors.map(sector => (
                <SelectItem key={sector} value={sector}>{sector}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Graduate</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => {
                const graduate = mockGraduates.find(g => g.id === record.graduateId);
                return (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {graduate?.firstName[0]}{graduate?.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{graduate?.firstName} {graduate?.lastName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{record.companyName}</TableCell>
                    <TableCell>{record.jobTitle}</TableCell>
                    <TableCell>{record.sector}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{record.employmentType}</Badge>
                    </TableCell>
                    <TableCell>{record.location}</TableCell>
                    <TableCell>
                      {record.verified ? (
                        <Badge className="bg-green-600">Verified</Badge>
                      ) : (
                        <Badge variant="secondary">Pending</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Surveys Management
const SurveysManagement = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Surveys & Feedback</h2>
          <p className="text-muted-foreground">Manage surveys and collect feedback</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Survey
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockSurveys.map((survey) => (
          <Card key={survey.id} className="card-hover">
            <CardHeader>
              <div className="flex items-start justify-between">
                <Badge variant={survey.isActive ? 'default' : 'secondary'}>
                  {survey.isActive ? 'Active' : 'Inactive'}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      View Results
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardTitle className="text-lg mt-2">{survey.title}</CardTitle>
              <CardDescription>{survey.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Questions:</span>
                  <span className="font-medium">{survey.questions.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Start Date:</span>
                  <span className="font-medium">{survey.startDate.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">End Date:</span>
                  <span className="font-medium">{survey.endDate.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Type:</span>
                  <Badge variant="outline">{survey.type.replace('_', ' ')}</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" className="flex-1">View Results</Button>
              <Button className="flex-1">Send Reminder</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Events Management
const EventsManagement = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Events & Engagement</h2>
          <p className="text-muted-foreground">Manage alumni events and networking opportunities</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockEvents.map((event) => (
              <Card key={event.id} className="card-hover">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge variant={event.isVirtual ? 'secondary' : 'default'}>
                      {event.isVirtual ? 'Virtual' : 'In-Person'}
                    </Badge>
                    <Badge variant="outline">{event.type}</Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{event.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{event.attendees.length} / {event.maxAttendees} registered</span>
                    </div>
                    <Progress value={(event.attendees.length / (event.maxAttendees || 100)) * 100} className="mt-2" />
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="flex-1">Edit</Button>
                  <Button className="flex-1">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="mt-6">
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Past Events</h3>
              <p className="text-muted-foreground">Past events will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Job Postings
const JobPostings = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Job Opportunities</h2>
          <p className="text-muted-foreground">Manage job postings for graduates</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Post Job
        </Button>
      </div>

      <div className="grid gap-6">
        {mockJobPostings.map((job) => (
          <Card key={job.id} className="card-hover">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Building2 className="w-4 h-4" />
                    {job.employerName}
                  </CardDescription>
                </div>
                <Badge variant={job.isActive ? 'default' : 'secondary'}>
                  {job.isActive ? 'Active' : 'Closed'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{job.jobType}</Badge>
                <Badge variant="outline">{job.sector}</Badge>
                <Badge variant="outline">{job.location}</Badge>
                {job.salaryRange && <Badge variant="outline">{job.salaryRange}</Badge>}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Requirements:</p>
                <ul className="text-sm text-muted-foreground list-disc list-inside">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Deadline: {job.applicationDeadline.toLocaleDateString()}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button size="sm">View Applications</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Analytics Dashboard
const AnalyticsDashboard = ({ stats }: { stats: DashboardStats }) => {
  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold">Analytics & Reports</h2>
        <p className="text-muted-foreground">Comprehensive data analysis and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Employment Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.employmentRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">+5% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Time to Employment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.2 months</div>
            <p className="text-xs text-muted-foreground mt-1">Average time after graduation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Salary Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">+12%</div>
            <p className="text-xs text-muted-foreground mt-1">Year-over-year increase</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Survey Response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground mt-1">Response rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Employment Trends (5 Years)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={stats.yearWiseStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="total" stackId="1" stroke="#8884d8" fill="#8884d8" name="Total Graduates" />
                <Area type="monotone" dataKey="employed" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Employed" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sector Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie
                  data={stats.sectorDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="sector"
                >
                  {stats.sectorDistribution.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RePieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
          <CardDescription>Download detailed reports in various formats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <FileText className="w-6 h-6" />
              <span className="text-sm">Employment Report</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              <span className="text-sm">Analytics Report</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <ClipboardList className="w-6 h-6" />
              <span className="text-sm">Survey Results</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <Users className="w-6 h-6" />
              <span className="text-sm">Graduate Directory</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Graduate Profile View
const GraduateProfile = () => {
  const graduate = mockGraduates[0];
  const employment = mockEmploymentRecords.find(e => e.graduateId === graduate.id);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">My Profile</h2>
          <p className="text-muted-foreground">Manage your personal information</p>
        </div>
        <Button>
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {graduate.firstName[0]}{graduate.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">{graduate.firstName} {graduate.lastName}</h3>
              <p className="text-muted-foreground">{graduate.course}</p>
              <div className="flex gap-2 mt-4">
                <Badge variant="default">Class of {graduate.graduationYear}</Badge>
              </div>
              <Separator className="my-6" />
              <div className="w-full space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{graduate.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{graduate.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{graduate.location}, {graduate.country}</span>
                </div>
                {graduate.linkedInUrl && (
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-muted-foreground" />
                    <a href={graduate.linkedInUrl} className="text-sm text-primary hover:underline">LinkedIn Profile</a>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{graduate.bio || 'No bio added yet.'}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {graduate.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Employment Information</CardTitle>
            </CardHeader>
            <CardContent>
              {employment ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Company</p>
                      <p className="font-medium">{employment.companyName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Position</p>
                      <p className="font-medium">{employment.jobTitle}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Department</p>
                      <p className="font-medium">{employment.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Employment Type</p>
                      <p className="font-medium">{employment.employmentType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Sector</p>
                      <p className="font-medium">{employment.sector}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{employment.location}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600">Employment Verified</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No employment information added yet.</p>
                  <Button className="mt-4">Add Employment</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Graduate Employment Status
const GraduateEmploymentStatus = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold">Employment Status</h2>
        <p className="text-muted-foreground">Update your current employment information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Employment Status</Label>
              <Select defaultValue="employed">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employed">Employed Full-time</SelectItem>
                  <SelectItem value="part-time">Employed Part-time</SelectItem>
                  <SelectItem value="self-employed">Self-employed</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                  <SelectItem value="studying">Further Studies</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Company/Organization</Label>
              <Input placeholder="Enter company name" defaultValue="Safaricom PLC" />
            </div>
            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input placeholder="Enter job title" defaultValue="Software Developer" />
            </div>
            <div className="space-y-2">
              <Label>Sector/Industry</Label>
              <Select defaultValue="it">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="it">Information Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input type="date" defaultValue="2023-07-01" />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input placeholder="Enter location" defaultValue="Nairobi" />
            </div>
          </div>
          <div className="flex gap-4">
            <Button>Save Changes</Button>
            <Button variant="outline">Add Previous Role</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Employment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Software Developer</h4>
                  <Badge>Current</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Safaricom PLC</p>
                <p className="text-sm text-muted-foreground">Jul 2023 - Present · Nairobi</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Available Surveys for Graduates
const AvailableSurveys = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold">Available Surveys</h2>
        <p className="text-muted-foreground">Complete surveys to help improve our programs</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {mockSurveys.filter(s => s.isActive).map((survey) => (
          <Card key={survey.id} className="card-hover">
            <CardHeader>
              <div className="flex items-start justify-between">
                <Badge>Active</Badge>
                <ClipboardList className="w-5 h-5 text-muted-foreground" />
              </div>
              <CardTitle className="text-lg mt-2">{survey.title}</CardTitle>
              <CardDescription>{survey.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Questions:</span>
                  <span className="font-medium">{survey.questions.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Deadline:</span>
                  <span className="font-medium">{survey.endDate.toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Start Survey</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Completed Surveys</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">You haven't completed any surveys yet</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Available Events for Graduates
const AvailableEvents = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold">Upcoming Events</h2>
        <p className="text-muted-foreground">Join alumni events and networking opportunities</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockEvents.map((event) => (
          <Card key={event.id} className="card-hover">
            <CardHeader>
              <div className="flex items-start justify-between">
                <Badge variant={event.isVirtual ? 'secondary' : 'default'}>
                  {event.isVirtual ? 'Virtual' : 'In-Person'}
                </Badge>
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
              <CardTitle className="text-lg mt-2">{event.title}</CardTitle>
              <CardDescription>{event.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{event.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{event.attendees.length} attending</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Register Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Job Opportunities for Graduates
const JobOpportunities = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold">Job Opportunities</h2>
        <p className="text-muted-foreground">Explore career opportunities shared by employers</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs by title, company, or location..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {mockJobPostings.map((job) => (
          <Card key={job.id} className="card-hover">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Building2 className="w-4 h-4" />
                    {job.employerName}
                  </CardDescription>
                </div>
                <Badge>{job.jobType}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{job.sector}</Badge>
                <Badge variant="outline">{job.location}</Badge>
                {job.salaryRange && <Badge variant="outline">{job.salaryRange}</Badge>}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Deadline: {job.applicationDeadline.toLocaleDateString()}
              </div>
              <Button>Apply Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Notifications View
const NotificationsView = ({ notifications }: { notifications: Notification[] }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Notifications</h2>
          <p className="text-muted-foreground">Stay updated with important information</p>
        </div>
        <Button variant="outline">Mark All as Read</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 flex items-start gap-4 ${!notification.isRead ? 'bg-primary/5' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  notification.type === 'survey' ? 'bg-blue-100 text-blue-600' :
                  notification.type === 'event' ? 'bg-green-100 text-green-600' :
                  notification.type === 'job' ? 'bg-amber-100 text-amber-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {notification.type === 'survey' && <ClipboardList className="w-5 h-5" />}
                  {notification.type === 'event' && <Calendar className="w-5 h-5" />}
                  {notification.type === 'job' && <Briefcase className="w-5 h-5" />}
                  {notification.type === 'reminder' && <Clock className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{notification.title}</h4>
                    {!notification.isRead && <Badge variant="default" className="text-xs">New</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {notification.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Settings View
const SettingsView = ({ role }: { role: UserRole }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input defaultValue={role === 'admin' ? 'Admin' : 'John'} />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input defaultValue={role === 'admin' ? 'User' : 'Doe'} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue={role === 'admin' ? 'admin@machakos.ac.ke' : 'john.doe@email.com'} />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input defaultValue="+254712345678" />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Button variant="outline">Enabled</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Survey Reminders</p>
                  <p className="text-sm text-muted-foreground">Get reminded about pending surveys</p>
                </div>
                <Button variant="outline">Enabled</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Event Notifications</p>
                  <p className="text-sm text-muted-foreground">Updates about upcoming events</p>
                </div>
                <Button variant="outline">Enabled</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <Input type="password" />
              </div>
              <Button>Change Password</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Main App Component
function App() {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    role: 'guest',
    user: null,
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = (role: UserRole) => {
    setAuth({
      isAuthenticated: true,
      role,
      user: {
        id: '1',
        name: role === 'admin' ? 'Admin User' : 'John Doe',
        email: role === 'admin' ? 'admin@machakos.ac.ke' : 'john.doe@email.com',
      },
    });
    setActiveTab(role === 'admin' ? 'dashboard' : 'my-profile');
  };

  const handleLogout = () => {
    setAuth({
      isAuthenticated: false,
      role: 'guest',
      user: null,
    });
    setActiveTab('dashboard');
  };

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      'dashboard': 'Dashboard',
      'graduates': 'Graduates Management',
      'employment': 'Employment Tracking',
      'surveys': 'Surveys & Feedback',
      'events': 'Events & Engagement',
      'jobs': 'Job Postings',
      'analytics': 'Analytics & Reports',
      'notifications': 'Notifications',
      'settings': 'Settings',
      'my-profile': 'My Profile',
      'employment-status': 'Employment Status',
      'surveys-available': 'Available Surveys',
      'events-available': 'Upcoming Events',
      'job-opportunities': 'Job Opportunities',
    };
    return titles[activeTab] || 'Dashboard';
  };

  const renderContent = () => {
    if (!auth.isAuthenticated) {
      return <LoginPage onLogin={handleLogin} />;
    }

    if (auth.role === 'admin') {
      switch (activeTab) {
        case 'dashboard':
          return <AdminDashboard stats={mockDashboardStats} />;
        case 'graduates':
          return <GraduatesManagement />;
        case 'employment':
          return <EmploymentTracking />;
        case 'surveys':
          return <SurveysManagement />;
        case 'events':
          return <EventsManagement />;
        case 'jobs':
          return <JobPostings />;
        case 'analytics':
          return <AnalyticsDashboard stats={mockDashboardStats} />;
        case 'notifications':
          return <NotificationsView notifications={mockNotifications} />;
        case 'settings':
          return <SettingsView role={auth.role} />;
        default:
          return <AdminDashboard stats={mockDashboardStats} />;
      }
    } else {
      switch (activeTab) {
        case 'my-profile':
          return <GraduateProfile />;
        case 'employment-status':
          return <GraduateEmploymentStatus />;
        case 'surveys-available':
          return <AvailableSurveys />;
        case 'events-available':
          return <AvailableEvents />;
        case 'job-opportunities':
          return <JobOpportunities />;
        case 'notifications':
          return <NotificationsView notifications={mockNotifications} />;
        case 'settings':
          return <SettingsView role={auth.role} />;
        default:
          return <GraduateProfile />;
      }
    }
  };

  if (!auth.isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar 
        role={auth.role} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header 
          title={getPageTitle()} 
          onMenuClick={() => setSidebarOpen(true)}
          notifications={mockNotifications}
        />
        
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
