'use client';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { MdErrorOutline } from 'react-icons/md';
import { z } from 'zod';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false
});

type IssueFormData = z.infer<typeof createIssueSchema>;

// only needed in edit page, so it's optional
const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setLoading(false);
      setError('An unexpected error occurred!');
    }
  });

  return (
    <div className="max-w-xl space-y-5">
      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <MdErrorOutline />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register('title')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isLoading}>
          Submit new issue
          {isLoading && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
