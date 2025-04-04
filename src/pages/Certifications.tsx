
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  description: string;
  image?: string;
}

const certificationSchema = z.object({
  name: z.string().min(2, "Certification name is required"),
  issuer: z.string().min(2, "Issuer name is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  expiryDate: z.string().optional(),
  description: z.string().optional(),
});

const Certifications: React.FC = () => {
  const { toast } = useToast();
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: "1",
      name: "Green Business Certified",
      issuer: "Green Business Alliance",
      issueDate: "2024-06-15",
      expiryDate: "2025-06-15",
      description: "Certifies businesses that follow environmentally friendly practices and operations."
    },
    {
      id: "2",
      name: "Zero Waste Certification",
      issuer: "Environmental Standards Board",
      issueDate: "2024-03-03",
      expiryDate: "2025-03-03",
      description: "Awarded to businesses that divert at least 90% of waste from landfills and incinerators."
    },
    {
      id: "3",
      name: "Sustainable Materials",
      issuer: "Global Eco Products Association",
      issueDate: "2023-11-20",
      expiryDate: "2024-11-20",
      description: "Certifies that products are made from sustainable and renewable materials."
    }
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof certificationSchema>>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      name: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      description: "",
    },
  });

  const onSubmit = (data: z.infer<typeof certificationSchema>) => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: data.name,
      issuer: data.issuer,
      issueDate: data.issueDate,
      expiryDate: data.expiryDate || "",
      description: data.description || "",
    };
    
    setCertifications([...certifications, newCertification]);
    toast({
      title: "Certification added",
      description: `${data.name} has been added to your certifications.`,
    });
    setIsDialogOpen(false);
    form.reset();
  };

  return (
    <DashboardLayout title="Certifications">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-eco-900">Your Certifications</h2>
          <p className="text-eco-700">Manage and showcase your eco-friendly credentials.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-eco-500 hover:bg-eco-600">
              <Plus size={16} className="mr-2" /> Add Certification
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Certification</DialogTitle>
              <DialogDescription>
                Add details about a new eco-friendly certification your company has earned.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certification Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Organic Certification" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="issuer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issuing Organization</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Green Business Alliance" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="issueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issue Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date (Optional)</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe what this certification means for your business"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" className="bg-eco-500 hover:bg-eco-600">
                    Add Certification
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <div key={cert.id} className="bg-white rounded-lg shadow-sm border border-eco-100 overflow-hidden">
            <div className="p-5 border-b border-eco-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-eco-900">{cert.name}</h3>
                  <p className="text-sm text-eco-600">{cert.issuer}</p>
                </div>
                <div className="h-12 w-12 bg-eco-100 rounded-full flex items-center justify-center text-eco-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-eco-600">Issue Date:</span>
                  <span className="font-medium">
                    {new Date(cert.issueDate).toLocaleDateString()}
                  </span>
                </div>
                {cert.expiryDate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-eco-600">Expiry Date:</span>
                    <span className="font-medium">
                      {new Date(cert.expiryDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
              {cert.description && (
                <p className="text-sm text-eco-700 line-clamp-3">
                  {cert.description}
                </p>
              )}
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="text-eco-600 border-eco-200 hover:bg-eco-50 flex-1">
                  View
                </Button>
                <Button variant="outline" size="sm" className="text-eco-600 border-eco-200 hover:bg-eco-50 flex-1">
                  Edit
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Certifications;
