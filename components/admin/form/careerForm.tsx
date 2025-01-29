'use client';

import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { careerSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LoaderIcon } from 'lucide-react';
import { Career } from '@prisma/client';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { updateCareer } from '@/actions/admin/updateCareer';
import { createCareer } from '@/actions/admin/createCareer';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
  career?: Career;
}

const CareerForm = ({ career }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof careerSchema>>({
    resolver: zodResolver(careerSchema),
    defaultValues: {
      title: '',
      company: '',
      period: '',
      type: '',
      careerType: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof careerSchema>) => {
    try {
      setLoading(true); // Set loading ke true saat proses dimulai
      let result;
      if (career?.id) {
        // Jika ada ID, lakukan update
        result = await updateCareer(career.id, values);
      } else {
        // Jika tidak ada ID, lakukan insert
        result = await createCareer(values);
      }
      if (result.success) {
        toast({
          title: 'Sukses',
          description: career?.id ? 'Karir berhasil diperbarui' : 'Karir berhasil dibuat',
          variant: 'success',
        });
        router.push(`/admin/career`);
      } else {
        toast({
          title: 'Gagal',
          description: career?.id ? 'Karir gagal diperbarui' : 'Karir gagal dibuat',
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
              <FormLabel className="text-base font-normal">Judul</FormLabel>
              <FormControl>
                <Input placeholder="Masukan teks" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'company'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal">Perusahaan</FormLabel>
              <FormControl>
                <Input placeholder="Masukan teks" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'period'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal">Periode</FormLabel>
              <FormControl>
                <Input placeholder="Masukan teks" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'type'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal">Tipe Kerja</FormLabel>
              <FormControl>
                <Input placeholder="Masukan teks" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="careerType"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal ">Tipe Karir</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Kategori</SelectLabel>
                    <SelectItem value="STUDY">STUDY</SelectItem>
                    <SelectItem value="WORK">WORK</SelectItem>
                    <SelectItem value="GRADUATE">GRADUATE</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" effect="shineHover" className="w-full" disabled={loading}>
          {career ? (
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

export default CareerForm;
