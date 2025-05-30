import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFadeInAnimation } from "@/hooks/use-gsap";
import { useConfetti } from "@/hooks/use-confetti";
import { stats } from "@/lib/data";
import { insertRegistrationSchema, type Committee, type InsertRegistration } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export default function Registration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { celebrateRegistration } = useConfetti();

  const { data: committees } = useQuery<Committee[]>({
    queryKey: ["/api/committees"],
  });

  const form = useForm<InsertRegistration>({
    resolver: zodResolver(insertRegistrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      organization: "",
      preferredCommittee: "",
    },
  });

  const registrationMutation = useMutation({
    mutationFn: async (data: InsertRegistration) => {
      const response = await apiRequest("POST", "/api/registrations", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful!",
        description: "Thank you for registering for UnitedMUN 2025. We'll be in touch soon.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/registrations"] });
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Please check your information and try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: InsertRegistration) => {
    // Redirect to Google Forms instead of submitting to our backend
    window.open('https://docs.google.com/forms/d/e/1FAIpQLScNN311FrwHdNB1sccyYySlgxHFWDI2xVDdSQ7ihECCeia7Iw/viewform?fbclid=PAQ0xDSwKcWFlleHRuA2FlbQIxMQABp1hjdJ0kSuGMh6p_nf5ZX3-2lXw-xw95ClDhzDQMEZz6-8pVXCr_zKMhFxo__aem_-zewkeRUY_ZMcYpI-K_UFA', '_blank');
  };

  useFadeInAnimation(".section-reveal");

  return (
    <section id="registration" className="py-20 bg-white section-reveal">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Join{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              UnitedMUN 2025
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Registration is now open. Secure your spot at the premier Model UN conference
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-red-500 to-orange-500 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Conference Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-calendar text-xl"></i>
                    <span className="text-lg">June 14-15, 2025</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-map-marker-alt text-xl"></i>
                    <span className="text-lg">Dubai World Trade Centre</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-dollar-sign text-xl"></i>
                    <span className="text-lg">120 AED Registration Fee</span>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          <Card className="bg-gray-50 text-center">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Ready to Join?
              </h3>
              
              <p className="text-gray-600 mb-8">
                Click the button below to register for UnitedMUN 2025
              </p>

              <Button
                onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLScNN311FrwHdNB1sccyYySlgxHFWDI2xVDdSQ7ihECCeia7Iw/viewform?fbclid=PAQ0xDSwKcWFlleHRuA2FlbQIxMQABp1hjdJ0kSuGMh6p_nf5ZX3-2lXw-xw95ClDhzDQMEZz6-8pVXCr_zKMhFxo__aem_-zewkeRUY_ZMcYpI-K_UFA', '_blank')}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-4 text-lg"
              >
                Register Now
              </Button>

              <p className="text-sm text-gray-600 text-center mt-4">
                Registration deadline: June 1st, 2025
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
