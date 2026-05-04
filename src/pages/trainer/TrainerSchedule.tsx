import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Calendar, Clock } from 'lucide-react';
import { Badge } from '../../components/ui/badge';

const TrainerSchedule: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-heading-xl font-poppins font-bold text-accent">My Schedule</h1>
        <p className="text-muted-foreground">Manage your availability and upcoming classes.</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Upcoming Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground border rounded-lg border-dashed">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-muted/50" />
            <p>Your schedule is clear. You have no upcoming classes.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainerSchedule;
