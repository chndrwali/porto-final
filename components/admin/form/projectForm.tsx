'use client';

import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { projectSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { techStack } from '@/lib/constant';
import FileUpload from '@/components/fileUpload';
import { createProject } from '@/actions/admin/project';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { ProjectProps } from '@/types';
import { updateProject } from '@/actions/admin/updateProject';
import { useState } from 'react';
import { LoaderIcon } from 'lucide-react';

const ProjectForm = ({ project }: ProjectProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || '',
      category: project?.category || undefined,
      description: project?.description || '',
      techStack: project?.techStack?.map((stack) => stack.name) || [],
      web: project?.web || '',
      repository: project?.repository || '',
      imageOne: project?.imageOne || '',
      imageTwo: project?.imageTwo || '',
      imageThree: project?.imageThree || '',
      imageFour: project?.imageFour || '',
      imageFive: project?.imageFive || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    try {
      setLoading(true); // Set loading ke true saat proses dimulai

      let result;
      if (project?.id) {
        // Jika ada ID, lakukan update
        result = await updateProject(project.id, values);
      } else {
        // Jika tidak ada ID, lakukan insert
        result = await createProject(values);
      }

      if (result.success) {
        toast({
          title: 'Sukses',
          description: project?.id ? 'Proyek berhasil diperbarui' : 'Proyek berhasil dibuat',
          variant: 'success',
        });

        router.push(`/admin/project/${result.data.id}`);
      } else {
        toast({
          title: 'Gagal',
          description: project?.id ? 'Proyek gagal diperbarui' : 'Proyek gagal dibuat',
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4 rounded-lg">
        <FormField
          control={form.control}
          name={'title'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal ">Judul Project</FormLabel>
              <FormControl>
                <Input required placeholder="Masukan judul" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal ">Kategori</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Kategori</SelectLabel>
                    <SelectItem value="FULLSTACK">FULLSTACK</SelectItem>
                    <SelectItem value="FRONTEND">FRONTEND</SelectItem>
                    <SelectItem value="BACKEND">BACKEND</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'description'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal ">Deskripsi</FormLabel>
              <FormControl>
                <Textarea required placeholder="Masukan deskripsi" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'techStack'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal ">TechStack</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <div key={tech.label} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value?.includes(tech.label)}
                        onCheckedChange={(checked) => {
                          const newValue = checked ? [...(field.value || []), tech.label] : field.value?.filter((item) => item !== tech.label);
                          field.onChange(newValue);
                        }}
                        disabled={loading}
                      />
                      <label className="text-sm">{tech.label}</label>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'web'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal ">Link</FormLabel>
              <FormControl>
                <Input required type="url" placeholder="Masukan Link Web" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'repository'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal ">Repository</FormLabel>
              <FormControl>
                <Input required type="url" placeholder="Masukan Link Repository" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'imageOne'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal ">Gambar 1</FormLabel>
              <FormControl>
                <FileUpload type="image" accept="image/*" placeholder="Unggah gambar" folder="admin/content" variant="dark" onFileChange={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'imageTwo'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal ">Gambar 2</FormLabel>
              <FormControl>
                <FileUpload type="image" accept="image/*" placeholder="Unggah gambar" folder="admin/content" variant="dark" onFileChange={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'imageThree'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal ">Gambar 3</FormLabel>
              <FormControl>
                <FileUpload type="image" accept="image/*" placeholder="Unggah gambar" folder="admin/content" variant="dark" onFileChange={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'imageFour'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal ">Gambar 4</FormLabel>
              <FormControl>
                <FileUpload type="image" accept="image/*" placeholder="Unggah gambar" folder="admin/content" variant="dark" onFileChange={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'imageFive'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal ">Gambar 5</FormLabel>
              <FormControl>
                <FileUpload type="image" accept="image/*" placeholder="Unggah gambar" folder="admin/content" variant="dark" onFileChange={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" effect="shineHover" className="w-full" disabled={loading}>
          {project ? (
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

export default ProjectForm;
