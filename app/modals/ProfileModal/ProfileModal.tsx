'use client';
import { useState } from 'react';
import { useAuthActions, useUser } from '@/app/stores/profileStore';
import { IoMdClose } from 'react-icons/io';
import { useModalActions } from '@/app/stores/modalStore';
import Image from 'next/image';

export default function ProfileModal() {
    const user = useUser();
    const [name, setName] = useState(user?.name || '');
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState(user?.avatarUrl || '');
    const { updateProfile } = useAuthActions();
    const { closeModal } = useModalActions();
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };
    const handleSave = async () => {
        const formData = new FormData();
        formData.append('name', name);
        if (file) formData.append('avatar', file);
        await updateProfile(formData);
        closeModal();
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="relative w-100 rounded-2xl bg-white p-6">
                <button
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={() => closeModal()}
                >
                    <IoMdClose className="h-6 w-6" />
                </button>
                <h2 className="mb-4 text-center text-2xl font-bold">
                    Настройки профиля
                </h2>

                <div className="flex flex-col items-center gap-4">
                    <div className="relative h-24 w-24">
                        <Image
                            src={preview || '/img/default-avatar.jpg'}
                            alt="profile"
                            width={600}
                            height={600}
                            className="h-full w-full rounded-full border-2 border-purple-100 object-contain"
                        />
                        <label className="absolute right-0 bottom-0 cursor-pointer rounded-full bg-purple-600 p-1.5 transition-colors hover:bg-purple-700">
                            <svg
                                className="h-4 w-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </label>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-500">
                            Ваше имя
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 w-full rounded-xl bg-gray-50 p-3 transition-all outline-none focus:ring-2 focus:ring-purple-200"
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full cursor-pointer rounded-xl bg-black py-3 font-semibold text-white transition-all hover:bg-gray-800"
                    >
                        Сохранить изменения
                    </button>
                </div>
            </div>
        </div>
    );
}
