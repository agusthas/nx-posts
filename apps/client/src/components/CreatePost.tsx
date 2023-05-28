import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@tinymce/tinymce-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';

const formSchema = z.object({
  title: z.string().min(5, 'Title is too short'),
  content: z.string().min(100, 'Content is too short'),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreatePost() {
  const { register, handleSubmit, control, formState } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-900 mb-1.5"
        >
          Title
        </label>
        <input
          className="border rounded shadow-sm px-3 py-2 w-full outline-black focus:outline-2 focus:outline"
          placeholder="Post title"
          type="text"
          autoComplete="off"
          {...register('title')}
        />
        {formState.errors.title && (
          <p className="text-red-500 text-sm mt-1">
            {formState.errors.title.message}
          </p>
        )}
      </div>
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-900 mb-1.5"
            >
              Content
            </label>
            <Editor
              apiKey="ic2z1zdhvj0vzyazri0jh2ph5w0kiij71y6q1by6h9x18nse"
              textareaName={field.name}
              onEditorChange={field.onChange}
              init={{
                height: 500,
                menubar: false,
                plugins: 'anchor autolink link lists table image',
                toolbar:
                  'undo redo | blocks | bold italic underline strikethrough | link | numlist bullist indent outdent | image removeformat',
                images_upload_handler: async (blobInfo, progress) => {
                  const formData = new FormData();
                  formData.append(
                    'image',
                    blobInfo.blob(),
                    blobInfo.filename()
                  );

                  progress(0);
                  try {
                    const { data } = await axios.post(
                      'http://localhost:3000/api/uploads',
                      formData
                    );

                    progress(100);
                    return data;
                  } catch (error) {
                    throw new Error('Error uploading image');
                  }
                },
                images_file_types: 'jpg,jpeg,png,gif,webp',
                content_css: 'writer',
              }}
            />
            {formState.errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.content.message}
              </p>
            )}
          </div>
        )}
      />

      <button
        type="submit"
        className="px-3.5 py-2.5 bg-black hover:bg-gray-800 active:bg-black text-white rounded font-medium flex justify-center items-center"
      >
        Submit
      </button>
    </form>
  );
}
