import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { UserCheck, ShieldAlert } from 'lucide-react';

const TrainerManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-heading-xl font-poppins font-bold text-navy-dark">Trainers</h1>
          <p className="text-muted-foreground">Manage and verify trainer applications.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border-t-4 border-t-green-500">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-green-500" />
              Verified Trainers
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="text-center py-8 text-muted-foreground">
              <p>No active trainers on the platform yet.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-t-4 border-t-orange-500">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-orange-500" />
              Pending Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="text-center py-8 text-muted-foreground">
              <p>No pending applications at the moment.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrainerManagement;
