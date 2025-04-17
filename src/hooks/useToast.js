/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useToast = () => {
	const [toastOptions, setToastOptions] = useState({
		autoClose: 5000, // milliseconds
		position: 'top-center',
		closeButton: true,
	});

	const successToast = message => {
		toast.success(message, toastOptions);
	};

	const errorToast = message => {
		toast.error(message, toastOptions);
	};

	const warningToast = message => {
		toast.warning(message, toastOptions);
	};

	const infoToast = message => {
		toast.info(message, toastOptions);
	};

	return {
		successToast,
		errorToast,
		warningToast,
		infoToast,
	};
};

export default useToast;
