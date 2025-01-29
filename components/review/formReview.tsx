'use client';

import * as z from 'zod';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { reviewSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { StarRating } from '@/components/review/startRating';
import { createReview } from '@/actions/createReview';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const FormReview = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      reviewer: '',
      email: '',
      rating: 0,
      comment: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof reviewSchema>) => {
    try {
      setIsSubmitting(true); // Set loading ke true saat proses dimulai
      const result = await createReview(values);
      if (result.success) {
        toast({
          title: 'Sukses',
          description: 'Review berhasil dikirim',
          variant: 'success',
        });
      } else {
        toast({
          title: 'Gagal',
          description: 'Review gagal dikirim',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Terjadi kesalahan pada sistem. Coba lagi nanti.',
        variant: 'destructive',
      });
      console.error(error);
    } finally {
      setIsSubmitting(false); // Set loading ke false setelah proses selesai
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <div className="flex justify-center">
                  <StarRating field={field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Review</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us what you think..." className="min-h-[100px] resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reviewer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email (optional)</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" effect="shineHover" disabled={isSubmitting}>
          {isSubmitting ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center space-x-2">
              <span className="animate-spin">⏳</span>
              <span>Submitting...</span>
            </motion.div>
          ) : (
            'Submit Review'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default FormReview;
