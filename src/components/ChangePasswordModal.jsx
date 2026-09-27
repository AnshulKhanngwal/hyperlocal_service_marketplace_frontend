import React, { useContext, useState } from 'react';
import UserContext from './UserContext';
import { postApiCall } from '../utils/apiCall';

const ChangePasswordModal = ({ item }) => {
    const { user } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState('');
    const changePassApi = async () => {
        const reqData = {
            id: item.id,
            password: password,
        };
        try {
            const response = await postApiCall('auth/changePassword', reqData);
            alert(response.message);
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div className="p-2">
            {/* Open Modal Button */}
            <button
                onClick={() => setOpen(true)}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
            >
                Change Password
            </button>

            {/* Modal */}
            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    onClick={() => setOpen(false)}
                >
                    {/* Modal Content */}
                    <div
                        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Change Password
                            </h2>

                            <button
                                onClick={() => setOpen(false)}
                                className="text-2xl text-gray-500 hover:text-gray-800"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Body */}

                        {/* Footer */}
                        <input
                            className="w-full border-1 p-2"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setOpen(false)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => {
                                    changePassApi();
                                    setOpen(false);
                                }}
                                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChangePasswordModal;
