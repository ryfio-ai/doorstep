import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, IndianRupee } from 'lucide-react';
import { toast } from 'sonner';

const EnrollPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate Paytm API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Payment successful! Course enrolled.');
      navigate('/student/dashboard');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-heading-xl font-poppins font-bold text-primary mb-8 text-center">Complete Enrollment</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div>
          <Card className="shadow-sm h-full">
            <CardHeader>
              <CardTitle className="text-xl font-poppins font-bold">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4 items-center pb-6 border-b">
                <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center text-accent">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Python Programming Masterclass</h3>
                  <p className="text-sm text-muted-foreground">Standard Plan • 3 Months</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Course Fee</span>
                  <span className="font-medium">₹7,999</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platform Discount</span>
                  <span className="font-medium text-green-600">-₹3,000</span>
                </div>
                <div className="flex justify-between pt-3 border-t text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-primary">₹4,999</span>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg flex gap-3 text-sm border border-accent/20">
                <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
                <p className="text-muted-foreground">Safe & secure payments powered by 100% encrypted Paytm gateway.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Form */}
        <div>
          <Card className="shadow-lg border-t-4 border-t-accent h-full">
            <CardHeader>
              <CardTitle className="text-xl font-poppins font-bold">Payment Details</CardTitle>
              <CardDescription>Enter details to process via Paytm Checkout</CardDescription>
            </CardHeader>
            <form onSubmit={handlePayment}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (for invoice)</Label>
                  <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" required />
                </div>
                
                <div className="p-4 border rounded-lg bg-gray-50 flex items-center justify-between mt-6">
                  <div className="flex items-center gap-3">
                    <IndianRupee className="w-6 h-6 text-primary" />
                    <span className="font-semibold">Paytm Secure Checkout</span>
                  </div>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" alt="Paytm" className="h-6" />
                </div>
              </CardContent>
              <CardFooter className="pt-6">
                <Button type="submit" className="w-full bg-primary hover:bg-primary-600 text-lg py-6" disabled={loading}>
                  {loading ? 'Processing Payment...' : 'Pay ₹4,999'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnrollPage;
