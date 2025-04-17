import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const FileInput = ({
  label,
  name,
  control,
  error = {},
  setBase64Logo,
  register,
  id,
  classLabel = "form-label",
  className = "",
  classGroup = "",
  description,
  base64Logo,
  onChange,
  ...rest
}) => {
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith("image/")) {
        reject(new Error("File is not an image"));
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className={`formGroup ${error[name] ? "has-error" : ""} ${classGroup}`}>
      {label && (
        <label htmlFor={id} className={`block capitalize ${classLabel}`}>
          {label}
        </label>
      )}
      <div className={`relative py-2`}>
        <label htmlFor={id} className={`h-32 w-32 bg-blue-400 rounded-lg group relative cursor-pointer flex items-center justify-center ${className}`}>
          <input
            type="file"
            id={id}
            {...register(name, {
              onChange: async (event) => {
                const file = event.target.files[0];
                if (file) {
                  const base64 = await toBase64(file);
                  setBase64Logo(base64);
                  if (onChange) {
                    onChange(event);
                  }
                }
              }
            })}
            className="hidden"
            {...rest}
          />
          {base64Logo ? (
            <img src={base64Logo} alt="logo preview" className="h-full w-full object-cover rounded-lg" />
          ) : (
            <span className="text-white text-5xl">
              <Icon icon="heroicons:cloud-arrow-up" />
            </span>
          )}
        </label>
        {error[name] && (
          <p className="mt-2 text-sm text-red-600">{error[name].message}</p>
        )}
      </div>
      {description && <span className="input-description">{description}</span>}
    </div>
  );
};

export default FileInput;