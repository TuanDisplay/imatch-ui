import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pen, UploadCloud } from 'lucide-react';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import * as userService from '~/services/user.service';
import { TProfileSchema } from '~/common/schema';
import { convertToBase64 } from '~/utils/files';
import Button from '~/components/Button';
import MyProduct from './MyProduct/MyProduct';
import { useUProfile } from '~/hooks/ApiQuery/useUserQuery';
import LoadingScreen from '~/layouts/components/LoadingScreen';

const list = [
  { id: 1, name: 'Ý tưởng đã đăng', value: 'postedIdea' },
  { id: 2, name: 'Ý tưởng đã mua', value: 'boughtIdea' },
  { id: 3, name: 'Vấn đề đã đăng', value: 'postedProblem' },
  { id: 4, name: 'Giải pháp đã đăng', value: 'postedSolution' },
];

export default function Profile() {
  const [selectedValue, setSelectedValue] = useState<string>('postedIdea');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);

  const { data, isLoading, refetch } = useUProfile();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TProfileSchema>({
    defaultValues: {
      fname: '',
      email: '',
      bio: '',
      avatar: '',
    },
  });

  const onSubmit = async (data: TProfileSchema) => {
    try {
      if (data) {
        console.log('image: ' + data.avatar);
        const avatar = watch('avatar');

        await userService.updateProfile(
          { ...data, avatar },
        );
        refetch();
        setIsEditing(false);
        toast.success('Lưu thành công');
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(
        error.response?.data.message || error.message || 'Có lỗi xảy ra',
      );
    }
  };

  const handleCancel = () => {
    reset(data);
    setIsEditing(false);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setImage(base64);
      setValue('avatar', base64);
    }
  };

  useEffect(() => {
    if (data)
      reset({
        ...data,
      });
  }, [data, reset]);

  return (
    <>
      <div className="relative flex justify-center">
        <img
          src="/banner/mucangchai-banner.jpg"
          alt="exchange-banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute top-1/2 container flex translate-y-[-50%] flex-col items-center text-center max-md:hidden">
          <div className="text-shadow bg-primary w-fit p-2 text-4xl font-bold text-white uppercase max-md:text-3xl">
            Thông tin cá nhân
          </div>
        </div>
      </div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="mx-auto max-w-5xl py-6">
          <>
            <div className="grid grid-cols-1 gap-6 rounded-2xl bg-white px-6 py-10 shadow-xl md:grid-cols-3">
              <div className="col-span-1 flex flex-col items-center">
                <div className="relative h-60 w-48 overflow-hidden rounded-xl shadow-md">
                  <img
                    src={image || data?.avatar || '/no-user.png'}
                    alt="avatar"
                    className={clsx('h-full object-cover', {
                      'opacity-40': isEditing,
                    })}
                  />
                  {isEditing && (
                    <label
                      htmlFor="avatar-profile"
                      className="absolute top-0 flex h-full w-full cursor-pointer flex-col items-center justify-center"
                    >
                      <input
                        id="avatar-profile"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <>
                        <UploadCloud className="h-6 w-6 text-gray-500" />
                        <span className="text-sm font-medium text-gray-600">
                          Tải lên
                        </span>
                      </>
                    </label>
                  )}
                </div>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="col-span-2 space-y-5"
              >
                <div className="flex items-start justify-between">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-30">
                    <div>
                      <h2 className="text-primary text-lg font-semibold">
                        Họ và tên
                      </h2>
                      {isEditing ? (
                        <input
                          {...register('fname')}
                          className="mt-1 w-4/5 rounded border"
                        />
                      ) : (
                        <p className="mt-1 text-gray-600">{data?.fname}</p>
                      )}
                      {errors.fname && (
                        <p className="text-xs text-red-500">
                          {errors.fname.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {!isEditing ? (
                      <Button
                        className="px-4 py-2 font-semibold"
                        primary
                        leftIcon={<Pen size={16} />}
                        onClick={() => {
                          setIsEditing(true);
                        }}
                      >
                        Chỉnh sửa
                      </Button>
                    ) : (
                      <div className="flex space-x-4">
                        <Button
                          type="submit"
                          className="px-4 py-2 font-semibold"
                          primary
                        >
                          Lưu
                        </Button>
                        <Button
                          type="button"
                          className="px-4 py-2 font-semibold"
                          primary
                          onClick={handleCancel}
                        >
                          Hủy
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h2 className="text-primary text-lg font-semibold">Email</h2>
                  {isEditing ? (
                    <input
                      type="email"
                      {...register('email')}
                      className="mt-1 w-4/5 rounded border disabled:bg-gray-300"
                      disabled
                    />
                  ) : (
                    <p className="mt-1 text-gray-600">{data?.email}</p>
                  )}
                </div>

                <div className="">
                  <h3 className="text-primary text-lg font-semibold">
                    Giới thiệu bản thân
                  </h3>
                  {isEditing ? (
                    <textarea
                      {...register('bio')}
                      className="h-32 w-full rounded border px-2 py-1"
                      placeholder="Hãy nói về bạn ở đây!"
                    />
                  ) : (
                    <p className="mt-1 line-clamp-3 text-gray-700">
                      {data?.bio !== ''
                        ? data?.bio
                        : 'Chưa có thông tin về bạn'}
                    </p>
                  )}
                  {errors.bio && (
                    <p className="text-xs text-red-500">{errors.bio.message}</p>
                  )}
                </div>
              </form>
            </div>
            {!isEditing && (
              <div className="mt-10 rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between gap-5 p-3 font-bold shadow-xl">
                  {list.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className={clsx(
                          'flex-1 cursor-pointer rounded-sm p-1 text-center text-gray-700 transition-colors duration-300 hover:bg-orange-100 hover:text-orange-600',
                          {
                            'bg-orange-100 text-orange-600':
                              selectedValue === item.value,
                          },
                        )}
                        onClick={() => setSelectedValue(item.value)}
                      >
                        {item.name}
                      </div>
                    );
                  })}
                </div>
                <div className="py-5">
                  <MyProduct selectedValue={selectedValue} />
                </div>
              </div>
            )}
          </>
        </div>
      )}
    </>
  );
}
