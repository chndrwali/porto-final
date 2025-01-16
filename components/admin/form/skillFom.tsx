'use client';

import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { skillSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LoaderIcon } from 'lucide-react';
import { Skill } from '@prisma/client';
import { toast } from '@/hooks/use-toast';
import { updateSkill } from '@/actions/admin/updateSkill';
import { createSkill } from '@/actions/admin/createSkill';
import { useRouter } from 'next/navigation';

interface Props {
  skill?: Skill;
}

const SkillForm = ({ skill }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof skillSchema>>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      textOne: skill?.textOne || '',
      textTwo: skill?.textTwo || '',
      textThree: skill?.textThree || '',
      textFour: skill?.textFour || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof skillSchema>) => {
    try {
      setLoading(true); // Set loading ke true saat proses dimulai
      let result;
      if (skill?.id) {
        // Jika ada ID, lakukan update
        result = await updateSkill(skill.id, values);
      } else {
        // Jika tidak ada ID, lakukan insert
        result = await createSkill(values);
      }
      if (result.success) {
        toast({
          title: 'Sukses',
          description: skill?.id ? 'Skill berhasil diperbarui' : 'Skill berhasil dibuat',
          variant: 'success',
        });
        router.push(`/admin/skills`);
      } else {
        toast({
          title: 'Gagal',
          description: skill?.id ? 'Skill gagal diperbarui' : 'SKill gagal dibuat',
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-4 rounded-lg">
        <FormField
          control={form.control}
          name={'textOne'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal">Teks 1</FormLabel>
              <FormControl>
                <Input placeholder="Masukan teks" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'textTwo'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal">Teks 2</FormLabel>
              <FormControl>
                <Input placeholder="Masukan teks" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'textThree'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal">Teks 3</FormLabel>
              <FormControl>
                <Input placeholder="Masukan teks" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'textFour'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal">Teks 4</FormLabel>
              <FormControl>
                <Input placeholder="Masukan teks" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" effect="shineHover" className="w-full" disabled={loading}>
          {skill ? (
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

export default SkillForm;
