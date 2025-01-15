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

const ProjectForm = ({ project }: ProjectProps) => {
  const router = useRouter();
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
    const result = await createProject(values);

    if (result.success) {
      toast({
        title: 'Sukses',
        description: 'Konten berhasil di buat',
        variant: 'success',
      });

      router.push(`/admin/project/${result.data.id}`);
    } else {
      toast({
        title: 'Gagal',
        description: 'Konten gagal di buat',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-4 rounded-lg">
        <FormField
          control={form.control}
          name={'title'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal ">Judul Project</FormLabel>
              <FormControl>
                <Input required placeholder="Masukan judul" {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <Textarea required placeholder="Masukan deskripsi" {...field} />
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
                <Input required type="url" placeholder="Masukan Link Web" {...field} />
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
                <Input required type="url" placeholder="Masukan Link Repository" {...field} />
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
                <FileUpload type="image" accept="image/*" placeholder="Unggah gambar" folder="admin/content" variant="light" onFileChange={field.onChange} value={field.value} />
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
                <FileUpload type="image" accept="image/*" placeholder="Unggah gambar" folder="admin/content" variant="light" onFileChange={field.onChange} value={field.value} />
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
                <FileUpload type="image" accept="image/*" placeholder="Unggah gambar" folder="admin/content" variant="light" onFileChange={field.onChange} value={field.value} />
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
                <FileUpload type="image" accept="image/*" placeholder="Unggah gambar" folder="admin/content" variant="light" onFileChange={field.onChange} value={field.value} />
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
                <FileUpload type="image" accept="image/*" placeholder="Unggah gambar" folder="admin/content" variant="light" onFileChange={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Daftar</Button>
      </form>
    </Form>
  );
};

export default ProjectForm;
