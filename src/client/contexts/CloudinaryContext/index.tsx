import assert from 'assert';
import {Cloudinary, Configuration} from 'cloudinary-core';
import React, {createContext, ReactNode, useMemo} from 'react';

assert(typeof process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 'string');
const cloudinaryConfig: Configuration.Options = {cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME};

export const CloudinaryContext = createContext<Cloudinary>(Cloudinary.new(cloudinaryConfig));

export const CloudinaryProvider = function (props: {children: ReactNode}) {
  const {children} = props;

  const cloudinary = useMemo(() => {
    return Cloudinary.new(cloudinaryConfig);
  }, []);

  return <CloudinaryContext.Provider value={cloudinary}>{children}</CloudinaryContext.Provider>;
};
