'use client';

import * as z from 'zod';
import { TechStack } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { techStackSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import FileUpload from '@/components/fileUpload';
import { LoaderIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { updateTech } from '@/actions/admin/updateTech';
import { createTech } from '@/actions/admin/createTech';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface Props {
  techStack?: TechStack;
}

const TechStackForm = ({ techStack }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof techStackSchema>>({
    resolver: zodResolver(techStackSchema),
    defaultValues: {
      title: techStack?.title || '',
      image: techStack?.image || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof techStackSchema>) => {
    try {
      setLoading(true); // Set loading ke true saat proses dimulai
      let result;
      if (techStack?.id) {
        // Jika ada ID, lakukan update
        result = await updateTech(techStack.id, values);
      } else {
        // Jika tidak ada ID, lakukan insert
        result = await createTech(values);
      }
      if (result.success) {
        toast({
          title: 'Sukses',
          description: techStack?.id ? 'Tech Stack berhasil diperbarui' : 'Tech Stack berhasil dibuat',
          variant: 'success',
        });
        router.push(`/admin/techstack`);
      } else {
        toast({
          title: 'Gagal',
          description: techStack?.id ? 'Tech Stack gagal diperbarui' : 'Tech Stack gagal dibuat',
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
      setLoading(false); // Set loading ke false setelah proses selesai
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6  p-4 rounded-lg">
        <FormField
          control={form.control}
          name={'title'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal ">Title</FormLabel>
              <FormControl>
                <Input required placeholder="Input title" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'image'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal ">Image</FormLabel>
              <FormControl>
                <FileUpload type="image" accept="image/*" placeholder="Upload Image" folder="admin/techstack" variant="dark" onFileChange={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" effect="shineHover" className="w-full" disabled={loading}>
          {techStack ? (
            loading ? (
              <>
                <LoaderIcon className="size-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Update'
            )
          ) : loading ? (
            <>
              <LoaderIcon className="size-4 animate-spin" />
              Loading...
            </>
          ) : (
            'Submit'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default TechStackForm;
