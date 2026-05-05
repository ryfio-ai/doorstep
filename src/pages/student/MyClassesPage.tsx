import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Video, ShieldAlert, Key, Map } from 'lucide-react';
import { Button } from '../../components/ui/button';

const mockClasses = [
  { id: 1, title: 'Python Fundamentals - Week 2', date: '2026-05-05', time: '10:00 AM', status: 'upcoming', type: 'online', tutor: 'Sarah Khan' },
  { id: 2, title: 'Data Types Deep Dive', date: '2026-05-07', time: '04:00 PM', status: 'upcoming', type: 'home', tutor: 'Sarah Khan', address: '123 Main St, Tech Park' },
  { id: 3, title: 'Intro to Python', date: '2026-05-01', time: '10:00 AM', status: 'completed', type: 'home', tutor: 'Sarah Khan' },
];

const MyClassesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-heading-xl font-poppins font-bold text-primary">My Classes</h1>
        <p className="text-muted-foreground">Manage your schedule and view past sessions.</p>
      </div>

      <div className="grid gap-6">
        {mockClasses.map((session) => (
          <Card key={session.id} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between py-4 border-b">
              <div className="space-y-1">
                <CardTitle className="text-lg font-bold">{session.title}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-medium text-primary">Tutor: {session.tutor}</span>
                </div>
              </div>
              <Badge variant={session.status === 'completed' ? 'secondary' : 'default'} className={session.status === 'upcoming' ? 'bg-accent hover:bg-accent' : ''}>
                {session.status.toUpperCase()}
              </Badge>
            </CardHeader>
            <CardContent className="py-4 flex flex-col md:flex-row gap-6 md:items-center justify-between">
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{session.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{session.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  {session.type === 'online' ? (
                    <Video className="w-4 h-4 text-blue-500" />
                  ) : (
                    <MapPin className="w-4 h-4 text-accent" />
                  )}
                  <span className="font-medium capitalize">{session.type}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {session.status === 'upcoming' && (
                  <>
                    {session.type === 'home' && (
                      <div className="flex items-center gap-2 bg-orange-50 text-orange-600 px-3 py-1 rounded-lg border border-orange-100">
                        <Key size={14} />
                        <span className="text-xs font-bold">Code: 4829</span>
                      </div>
                    )}
                    <Button variant="outline" size="sm">Reschedule</Button>
                    <Button asChild className="bg-primary hover:bg-primary-600" size="sm">
                      <Link to={`/student/course-path/${session.id}`}>View Path</Link>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                      <ShieldAlert size={16} className="mr-1" /> SOS
                    </Button>
                  </>
                )}
                {session.status === 'completed' && (
                  <Button variant="secondary" size="sm">View Notes</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyClassesPage;
