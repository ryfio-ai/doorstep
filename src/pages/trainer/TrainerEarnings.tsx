import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { IndianRupee, ArrowUpRight } from 'lucide-react';
import { Button } from '../../components/ui/button';

const TrainerEarnings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-heading-xl font-poppins font-bold text-accent">Earnings & Payouts</h1>
        <p className="text-muted-foreground">Track your income and request withdrawals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm bg-accent text-white">
          <CardContent className="p-6">
            <p className="text-sm font-medium opacity-90 mb-2">Available Balance</p>
            <h3 className="text-4xl font-bold mb-4">₹0</h3>
            <Button variant="secondary" className="w-full text-accent font-bold" disabled>
              Withdraw Funds
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6 flex flex-col justify-center h-full">
            <div className="flex items-center gap-3 text-muted-foreground mb-2">
              <IndianRupee className="w-5 h-5" />
              <p className="text-sm font-medium">Pending Clearance</p>
            </div>
            <h3 className="text-2xl font-bold text-primary">₹0</h3>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6 flex flex-col justify-center h-full">
            <div className="flex items-center gap-3 text-muted-foreground mb-2">
              <ArrowUpRight className="w-5 h-5 text-green-500" />
              <p className="text-sm font-medium">Lifetime Earnings</p>
            </div>
            <h3 className="text-2xl font-bold text-primary">₹0</h3>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrainerEarnings;
