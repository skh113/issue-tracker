'use client';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { statusMap } from '@/app/constants';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { Button, Callout, DropdownMenu, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { MdErrorOutline } from 'react-icons/md';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type IssueFormData = z.infer<typeof issueSchema>;

// only needed in edit page, so it's optional
const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      status: issue?.status || 'OPEN'
    }
  });
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const selectedStatus = watch('status');

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      // check for updating or creating an issue
      if (issue) await axios.patch('/api/issues/' + issue.id, data);
      else await axios.post('/api/issues', data);

      router.push('/issues/list');
      // refresh to invalidate the client side cache
      router.refresh();
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

        <DropdownMenu.Root {...register('status')}>
          <DropdownMenu.Trigger>
            <Button variant="surface" color={statusMap[selectedStatus].color}>
              {selectedStatus
                ? statusMap[selectedStatus].label
                : issue
                ? issue.status
                : 'Select Status'}
              <CaretDownIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item
              onClick={() => setValue('status', 'OPEN')}
              shortcut="⌘ E"
            >
              Open
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => setValue('status', 'IN_PROGRESS')}
              shortcut="⌘ P"
            >
              In Progress
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => setValue('status', 'CLOSED')}
              shortcut="⌘ C"
            >
              Closed
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

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
          {issue ? 'Update issue' : 'Submit new issue'}
          {isLoading && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
