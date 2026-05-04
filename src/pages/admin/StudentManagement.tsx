import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Users, UserPlus } from 'lucide-react';
import { Button } from '../../components/ui/button';

const StudentManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-heading-xl font-poppins font-bold text-navy-dark">Students</h1>
          <p className="text-muted-foreground">Manage all registered students.</p>
        </div>
        <Button className="bg-primary hover:bg-primary-600 gap-2">
          <UserPlus className="w-4 h-4" /> Add Student
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="text-center py-16 text-muted-foreground">
            <Users className="w-12 h-12 mx-auto mb-3 text-muted/50" />
            <p>No students found. Data will populate when users sign up.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentManagement;
