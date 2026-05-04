import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { BookOpen, Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';

const CourseManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-heading-xl font-poppins font-bold text-navy-dark">Courses</h1>
          <p className="text-muted-foreground">Manage subjects, curriculums, and pricing.</p>
        </div>
        <Button className="bg-primary hover:bg-primary-600 gap-2">
          <Plus className="w-4 h-4" /> Add Course
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="text-center py-16 text-muted-foreground">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-muted/50" />
            <p>No courses found in the database. Please add seed data or create a new course.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseManagement;
