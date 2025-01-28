'use client';

import * as z from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { emailSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { LoaderIcon, SendIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { sendEmail } from '@/actions/sendEmail';
import { toast } from '@/hooks/use-toast';

const FormEmail = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      name: '',
      message: '',
      subject: '',
      senderEmail: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof emailSchema>) => {
    try {
      setLoading(true); // Set loading ke true saat proses dimulai

      const result = await sendEmail(values);

      if (result.success) {
        toast({
          title: 'Success',
          description: 'Email sent successfully',
          variant: 'success',
        });
      } else {
        toast({
          title: 'Failed',
          description: 'Email failed to send',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred in the system. Try again later.',
        variant: 'destructive',
      });
      console.error(error);
    } finally {
      setLoading(false); // Set loading ke false setelah proses selesai
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name={'name'}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal ">Name</FormLabel>
                <FormControl>
                  <Input required placeholder="Your name" {...field} disabled={loading} className="bg-black-100 border-gray-800 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'senderEmail'}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal ">Email</FormLabel>
                <FormControl>
                  <Input required placeholder="your@email.com" type="email" {...field} disabled={loading} className="bg-black-100 border-gray-800 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Subject</FormLabel>
              <FormControl>
                <Input placeholder="What's this about?" className="bg-black-100 border-gray-800 text-white" disabled={loading} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Your message..." className="bg-black-100 border-gray-800 text-white min-h-[150px]" disabled={loading} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading} className="bg-black-100 text-white hover:bg-neutral-900 border border-gray-800">
          {loading ? (
            <>
              <LoaderIcon className="size-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <SendIcon className="w-4 h-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default FormEmail;
